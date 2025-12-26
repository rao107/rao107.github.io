import { readFileSync, readdirSync, writeFileSync, statSync, mkdirSync } from 'fs';
import { join, extname } from 'path';

interface FileItem {
  name: string;
  type: 'folder' | 'file';
  path: string;
  children?: FileItem[];
  content?: string;
  totalLines?: number;
  totalCharacters?: number;
}

// Read .gitignore patterns
const gitignorePath = join(process.cwd(), '.gitignore');
const gitignoreContent = readFileSync(gitignorePath, 'utf-8');
const gitignorePatterns = gitignoreContent
  .split('\n')
  .filter(line => line.trim() && !line.startsWith('#'))
  .map(pattern => pattern.trim().replace(/^\//, '').replace(/\/$/, ''));

// Function to check if a file/folder should be ignored
function shouldIgnore(name: string): boolean {
  // Always ignore hidden files
  if (name.startsWith('.')) return true;

  // Check against gitignore patterns
  return gitignorePatterns.some(pattern => {
    if (pattern.includes('*')) {
      // Simple wildcard matching
      const regex = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$');
      return regex.test(name);
    }
    return name === pattern || name === pattern.replace(/^\//, '');
  });
}

// Function to check if a file is an image based on extension
function isImageFile(filename: string): boolean {
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.svg', '.webp', '.ico'];
  const ext = extname(filename).toLowerCase();
  return imageExtensions.includes(ext);
}

// Function to read first N lines of a text file and get metadata
function readFileContent(filePath: string, maxLines: number = 25): { content: string; totalLines: number; totalCharacters: number } | undefined {
  try {
    const stats = statSync(filePath);
    // Skip files larger than 10MB to avoid memory issues
    if (stats.size > 10 * 1024 * 1024) {
      return undefined;
    }

    const fullContent = readFileSync(filePath, 'utf-8');
    const lines = fullContent.split('\n');
    const firstLines = lines.slice(0, maxLines);

    return {
      content: firstLines.join('\n'),
      totalLines: lines.length,
      totalCharacters: fullContent.length
    };
  } catch {
    // Return undefined if file cannot be read as text
    return undefined;
  }
}

// Recursive function to build file tree
function buildFileTree(dirPath: string, relativePath: string = ''): FileItem[] {
  const entries = readdirSync(dirPath, { withFileTypes: true });

  const items = entries
    .filter(entry => !shouldIgnore(entry.name))
    .map(entry => {
      const fullPath = join(dirPath, entry.name);
      const itemRelativePath = relativePath ? `${relativePath}/${entry.name}` : entry.name;

      const item: FileItem = {
        name: entry.name,
        type: entry.isDirectory() ? 'folder' : 'file',
        path: `/${itemRelativePath}`,
      };

      // Recursively process directories
      if (entry.isDirectory()) {
        try {
          item.children = buildFileTree(fullPath, itemRelativePath);
          // Only include children if there are any
          if (item.children.length === 0) {
            delete item.children;
          }
        } catch (error) {
          // Skip directories we can't read
          console.warn(`Skipping directory ${fullPath}: ${error}`);
        }
      } else {
        // For files, read first 50 lines if it's not an image
        if (!isImageFile(entry.name)) {
          const fileData = readFileContent(fullPath);
          if (fileData !== undefined) {
            item.content = fileData.content;
            item.totalLines = fileData.totalLines;
            item.totalCharacters = fileData.totalCharacters;
          }
        }
      }

      return item;
    })
    .sort((a, b) => {
      // Sort folders first, then files
      if (a.type !== b.type) {
        return a.type === 'folder' ? -1 : 1;
      }
      // Within the same type, sort alphabetically (case-insensitive)
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    });

  return items;
}

// Function to count files and folders recursively
function countItems(items: FileItem[]): { folders: number; files: number } {
  let folders = 0;
  let files = 0;

  for (const item of items) {
    if (item.type === 'folder') {
      folders++;
      if (item.children) {
        const childCounts = countItems(item.children);
        folders += childCounts.folders;
        files += childCounts.files;
      }
    } else {
      files++;
    }
  }

  return { folders, files };
}

const rootDir = process.cwd();
const fileSystem = buildFileTree(rootDir);

const outputDir = join(rootDir, 'generated');
mkdirSync(outputDir, { recursive: true });

const outputPath = join(outputDir, 'filesData.json');
writeFileSync(outputPath, JSON.stringify(fileSystem, null, 2));

const counts = countItems(fileSystem);
console.log(`Generated filesData.json with ${counts.folders} folders and ${counts.files} files`);
