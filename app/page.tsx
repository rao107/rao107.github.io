"use client";

import { useState, useEffect, useCallback } from "react";
import Window from "./components/Window";
import Shortcut from "./components/Shortcut";
import FloatingDots from "./components/FloatingDots";

interface WindowItem {
  id: string;
  title: string;
  src: string;
  className: string;
  type: 'app' | 'file';
}

export default function Home() {
  const [windows, setWindows] = useState<WindowItem[]>([
    {
      id: 'bio',
      title: 'About Me',
      src: '/about',
      className: 'w-[95vw] h-[85vh] max-w-225 max-h-175',
      type: 'app'
    }
  ]);

  const [zIndices, setZIndices] = useState<Record<string, number>>({
    bio: 1,
  });

  const openWindow = useCallback((windowConfig: WindowItem) => {
    // Check if window is already open
    const existingWindow = windows.find(w => w.id === windowConfig.id);
    if (existingWindow) {
      bringToFront(windowConfig.id);
      return;
    }

    setWindows(prev => [...prev, windowConfig]);
    setZIndices(prev => ({
      ...prev,
      [windowConfig.id]: Math.max(...Object.values(prev)) + 1
    }));
  }, [windows]);

  const openFile = useCallback((filename: string, content: string = '', totalLines?: number, totalCharacters?: number) => {
    const id = `file-${Date.now()}`;
    const params = new URLSearchParams({
      file: filename,
      content: content,
    });
    if (totalLines !== undefined) params.set('totalLines', totalLines.toString());
    if (totalCharacters !== undefined) params.set('totalCharacters', totalCharacters.toString());

    const windowConfig: WindowItem = {
      id,
      title: filename,
      src: `/notepad?${params.toString()}`,
      className: 'w-[70vw] h-[60vh] max-w-150 max-h-100',
      type: 'file'
    };
    openWindow(windowConfig);
  }, [openWindow]);

  const openImage = useCallback((filename: string, imagePath: string) => {
    const id = `image-${Date.now()}`;
    const params = new URLSearchParams({
      path: imagePath,
      filename: filename,
    });

    // Use smaller window size for ico files
    const isIcoFile = filename.toLowerCase().endsWith('.ico');
    const className = isIcoFile
      ? 'w-[30vw] h-[30vh] max-w-75 max-h-75'
      : 'w-[60vw] h-[60vh] max-w-150 max-h-125';

    const windowConfig: WindowItem = {
      id,
      title: filename,
      src: `/image-viewer?${params.toString()}`,
      className,
      type: 'file'
    };
    openWindow(windowConfig);
  }, [openWindow]);

  // Listen for file open messages from Files window
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'openFile') {
        openFile(event.data.filename, event.data.content, event.data.totalLines, event.data.totalCharacters);
      } else if (event.data.type === 'openImage') {
        openImage(event.data.filename, event.data.imagePath);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [openFile, openImage]);

  const bringToFront = (id: string) => {
    setZIndices((prev) => {
      const maxZ = Math.max(...Object.values(prev));
      return { ...prev, [id]: maxZ + 1 };
    });
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
    setZIndices(prev => {
      const newIndices = { ...prev };
      delete newIndices[id];
      return newIndices;
    });
  };

  return (
    <div className="absolute inset-0 bg-slate-50 dark:bg-slate-900 overflow-hidden">
      <FloatingDots />
      {/* Desktop Shortcuts Area - Top Left */}
      <div className="absolute top-4 left-4 flex flex-col gap-4 w-auto">
        <Shortcut
          label="My Bio"
          onClick={() => openWindow({
            id: 'bio',
            title: 'About Me',
            src: '/about',
            className: 'w-[95vw] h-[85vh] max-w-225 max-h-175',
            type: 'app'
          })}
        />
        <Shortcut
          label="Files"
          onClick={() => openWindow({
            id: 'files',
            title: 'Files',
            src: '/files',
            className: 'w-[95vw] h-[80vh] max-w-200 max-h-150',
            type: 'app'
          })}
        />
      </div>

      {/* Now Playing - Bottom Right */}
      <div className="absolute bottom-4 right-4">
        <Shortcut
          label="Now Playing"
          onClick={() => openWindow({
            id: 'music',
            title: 'Now Playing',
            src: 'https://open.spotify.com/embed/track/3pkXNBtkg8E2xRAKrnu43s',
            className: 'w-full h-[187px] max-w-100 max-h-50',
            type: 'app'
          })}
        />
      </div>

      {/* Render all open windows */}
      {windows.map(window => (
        <Window
          key={window.id}
          title={window.title}
          src={window.src}
          className={window.className}
          isOpen={true}
          onClose={() => closeWindow(window.id)}
          zIndex={zIndices[window.id] || 1}
          onFocus={() => bringToFront(window.id)}
        />
      ))}
    </div>
  );
}
