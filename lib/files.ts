import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import { isImageFile } from './utils';

export interface FileItem {
  name: string;
  type: 'folder' | 'file';
  path: string;
  children?: FileItem[];
  content?: string;
  totalLines?: number;
  totalCharacters?: number;
}

// Read .gitignore patterns
function getGitignorePatterns(): string[] {
  try {
    const gitignorePath = join(process.cwd(), '.gitignore');
    const gitignoreContent = readFileSync(gitignorePath, 'utf-8');
    return gitignoreContent
      .split('\n')
      .filter(line => line.trim() && !line.startsWith('#'))
      .map(pattern => pattern.trim().replace(/^\//, '').replace(/\/$/, ''));
  } catch {
    return [];
  }
}

// Function to check if a file/folder should be ignored
function shouldIgnore(name: string, gitignorePatterns: string[]): boolean {
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
function buildFileTree(dirPath: string, relativePath: string = '', gitignorePatterns: string[]): FileItem[] {
  const entries = readdirSync(dirPath, { withFileTypes: true });

  const items = entries
    .filter(entry => !shouldIgnore(entry.name, gitignorePatterns))
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
          item.children = buildFileTree(fullPath, itemRelativePath, gitignorePatterns);
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

// Get all files in the file system
export function getAllFiles(): FileItem[] {
  const rootDir = process.cwd();
  const gitignorePatterns = getGitignorePatterns();
  return buildFileTree(rootDir, '', gitignorePatterns);
}

// Navigate to a specific path and get items
export function getItemsByPath(pathParts: string[]): FileItem[] {
  let items = getAllFiles();

  for (const pathPart of pathParts) {
    const folder = items.find(item => item.name === pathPart && item.type === 'folder');
    if (folder && folder.children) {
      items = folder.children;
    } else {
      return [];
    }
  }

  return items;
}

// Get a specific file by path
export function getFileByPath(pathParts: string[]): FileItem | null {
  if (pathParts.length === 0) return null;

  const fileName = pathParts[pathParts.length - 1];
  const dirPath = pathParts.slice(0, -1);
  const items = getItemsByPath(dirPath);

  const file = items.find(item => item.name === fileName && item.type === 'file');
  return file || null;
}

// Get all file paths (for generating static params)
export function getAllFilePaths(): string[][] {
  const allPaths: string[][] = [];

  function traverse(items: FileItem[], currentPath: string[] = []) {
    for (const item of items) {
      const newPath = [...currentPath, item.name];

      if (item.type === 'file') {
        allPaths.push(newPath);
      } else if (item.type === 'folder' && item.children) {
        traverse(item.children, newPath);
      }
    }
  }

  traverse(getAllFiles());
  return allPaths;
}

// Read full content of a file (for notepad display)
export function readFullFileContent(pathParts: string[]): { content: string; totalLines: number; totalCharacters: number } | null {
  try {
    const filePath = join(process.cwd(), ...pathParts);
    const stats = statSync(filePath);

    // Skip files larger than 10MB
    if (stats.size > 10 * 1024 * 1024) {
      return null;
    }

    const fullContent = readFileSync(filePath, 'utf-8');
    const lines = fullContent.split('\n');

    return {
      content: fullContent,
      totalLines: lines.length,
      totalCharacters: fullContent.length
    };
  } catch {
    return null;
  }
}
