"use client";

import { useState } from "react";
import { isImageFile } from "@/lib/utils";
import type { FileItem } from "@/lib/files";
import FolderIcon from "./FolderIcon";
import FileIcon from "./FileIcon";
import ImageIcon from "./ImageIcon";
import PageHeader from "../components/PageHeader";

interface FilesClientProps {
  initialFileSystem: FileItem[];
}

export default function FilesClient({ initialFileSystem }: FilesClientProps) {
  const [currentPath, setCurrentPath] = useState<string[]>([]);

  // Navigate to the current directory based on path
  const getCurrentItems = (): FileItem[] => {
    let items = initialFileSystem;

    for (const pathPart of currentPath) {
      const folder = items.find(item => item.name === pathPart && item.type === "folder");
      if (folder && folder.children) {
        items = folder.children;
      } else {
        return [];
      }
    }

    return items;
  };

  const handleItemClick = (item: FileItem) => {
    if (item.type === "folder") {
      setCurrentPath([...currentPath, item.name]);
    } else if (item.type === "file") {
      const filePath = item.path.substring(1); // Remove leading slash
      const route = isImageFile(item.name)
        ? `/image-viewer/${filePath}`
        : `/notepad/${filePath}`;

      // Send message to parent window to open the file in a new window
      window.parent.postMessage({
        type: 'openWindow',
        windowConfig: {
          id: `file-${Date.now()}`,
          title: item.name,
          src: route,
          className: isImageFile(item.name)
            ? (item.name.toLowerCase().endsWith('.ico')
              ? 'w-[30vw] h-[30vh] max-w-75 max-h-75'
              : 'w-[60vw] h-[60vh] max-w-150 max-h-125')
            : 'w-[70vw] h-[60vh] max-w-150 max-h-100',
          type: 'file' as const
        }
      }, '*');
    }
  };

  const handleBackClick = () => {
    setCurrentPath(currentPath.slice(0, -1));
  };

  const currentItems = getCurrentItems();
  const displayPath = currentPath.length === 0 ? "/home/arr/rao107.github.io" : `/home/arr/rao107.github.io/${currentPath.join("/")}`;

  return (
    <div className="h-screen w-screen bg-white dark:bg-slate-900 overflow-hidden">
      <div className="h-full flex flex-col">
        <PageHeader title="" className="px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBackClick}
              disabled={currentPath.length === 0}
              className={`font-semibold transition-colors duration-200 ${
                currentPath.length > 0
                  ? "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 cursor-pointer"
                  : "text-slate-400 dark:text-slate-600 opacity-50 cursor-not-allowed"
              }`}
            >
              ← Back
            </button>
            <div className="flex-1">
              <p className="text-slate-900 dark:text-slate-100 font-mono text-lg">
                {displayPath}
              </p>
            </div>
          </div>
        </PageHeader>

        {/* File Grid */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {currentItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleItemClick(item)}
                className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 group"
              >
                {/* Icon */}
                <div className="w-16 h-16 flex items-center justify-center">
                  {item.type === "folder" ? (
                    <FolderIcon className="w-full h-full text-blue-500 dark:text-blue-400" />
                  ) : isImageFile(item.name) ? (
                    <ImageIcon className="w-full h-full text-green-500 dark:text-green-400" />
                  ) : (
                    <FileIcon className="w-full h-full text-slate-400 dark:text-slate-500" />
                  )}
                </div>

                {/* Label */}
                <span className="text-sm text-slate-900 dark:text-slate-100 text-center break-all max-w-full line-clamp-2">
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
