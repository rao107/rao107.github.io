"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function NotepadContent() {
  const searchParams = useSearchParams();
  const content = searchParams.get('content') || "Wait a minute...\n\nyou're not supposed to be here!";
  const totalLines = searchParams.get('totalLines');
  const totalCharacters = searchParams.get('totalCharacters');

  // Use metadata if available, otherwise calculate from visible content
  const displayLines = totalLines ? parseInt(totalLines) : content.split('\n').length;
  const displayCharacters = totalCharacters ? parseInt(totalCharacters) : content.length;

  return (
    <div className="h-screen w-screen bg-white dark:bg-slate-900 overflow-hidden flex flex-col">
      {/* Text Area */}
      <div className="flex-1 overflow-hidden">
        <textarea
          value={content}
          readOnly
          className="w-full h-full bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono text-sm p-4 focus:outline-none resize-none overflow-hidden cursor-default"
          spellCheck={false}
        />
      </div>

      {/* Status Bar */}
      <div className="bg-slate-100 dark:bg-slate-800 border-t border-slate-300 dark:border-slate-700 px-6 py-2">
        <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
          <span>Characters: {displayCharacters}</span>
          <span>Lines: {displayLines}</span>
        </div>
      </div>
    </div>
  );
}

export default function Notepad() {
  return (
    <Suspense fallback={
      <div className="h-screen w-screen bg-white dark:bg-slate-900 flex items-center justify-center">
        <div className="text-slate-900 dark:text-slate-100">Loading...</div>
      </div>
    }>
      <NotepadContent />
    </Suspense>
  );
}
