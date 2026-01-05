import { getAllFilePaths, readFullFileContent } from '@/lib/files';
import { isImageFile } from '@/lib/utils';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  const allPaths = getAllFilePaths();
  // Only generate params for non-image files
  return allPaths
    .filter(pathParts => {
      const fileName = pathParts[pathParts.length - 1];
      return !isImageFile(fileName);
    })
    .map(pathParts => ({
      path: pathParts
    }));
}

export default async function NotepadPage({ params }: { params: Promise<{ path: string[] }> }) {
  const { path: pathParts } = await params;

  const fileData = readFullFileContent(pathParts);

  if (!fileData) {
    notFound();
  }

  const { content, totalLines, totalCharacters } = fileData;

  return (
    <div className="h-screen w-screen bg-white dark:bg-slate-900 overflow-hidden flex flex-col">
      {/* Text Area */}
      <div className="flex-1 overflow-hidden">
        <textarea
          value={content}
          readOnly
          className="w-full h-full bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono text-sm p-4 focus:outline-none resize-none cursor-default"
          spellCheck={false}
        />
      </div>

      {/* Status Bar */}
      <div className="bg-slate-100 dark:bg-slate-800 border-t border-slate-300 dark:border-slate-700 px-6 py-2">
        <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
          <span>Characters: {totalCharacters}</span>
          <span>Lines: {totalLines}</span>
        </div>
      </div>
    </div>
  );
}
