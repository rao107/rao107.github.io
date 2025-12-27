"use client";

import React, { useState, useEffect, useRef } from "react";

interface WindowProps {
  src: string;
  className?: string;
  title?: string;
  onClose?: () => void;
  isOpen?: boolean;
  zIndex?: number;
  onFocus?: () => void;
}

const Window: React.FC<WindowProps> = ({
  src,
  className = "",
  title = "Window",
  onClose,
  isOpen = true,
  zIndex,
  onFocus,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isPositioned, setIsPositioned] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (windowRef.current && !isPositioned) {
      const rect = windowRef.current.getBoundingClientRect();
      setPosition({ x: rect.left, y: rect.top });
      setIsPositioned(true);
    }
  }, [isPositioned]);

  // Constrain window position on viewport resize
  useEffect(() => {
    const handleResize = () => {
      if (!windowRef.current || !isPositioned) return;

      const rect = windowRef.current.getBoundingClientRect();

      // Allow 50% of the window to be off-screen on left/right/bottom
      const minX = -rect.width / 2;
      const maxX = window.innerWidth - (rect.width / 2);
      const maxY = window.innerHeight - (rect.height / 2);
      const minY = 0;

      setPosition(prev => ({
        x: Math.max(minX, Math.min(prev.x, maxX)),
        y: Math.max(minY, Math.min(prev.y, maxY)),
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isPositioned]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && windowRef.current) {
        let newX = e.clientX - dragOffset.x;
        let newY = e.clientY - dragOffset.y;

        // Boundary checks
        const rect = windowRef.current.getBoundingClientRect();

        // Allow 50% of the window to be off-screen on left/right/bottom
        const minX = -rect.width / 2;
        const maxX = window.innerWidth - (rect.width / 2);
        const maxY = window.innerHeight - (rect.height / 2);
        const minY = 0;

        newX = Math.max(minX, Math.min(newX, maxX));
        newY = Math.max(minY, Math.min(newY, maxY));

        setPosition({
          x: newX,
          y: newY,
        });
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && windowRef.current && e.touches.length === 1) {
        const touch = e.touches[0];
        let newX = touch.clientX - dragOffset.x;
        let newY = touch.clientY - dragOffset.y;

        // Boundary checks
        const rect = windowRef.current.getBoundingClientRect();

        // Allow 50% of the window to be off-screen on left/right/bottom
        const minX = -rect.width / 2;
        const maxX = window.innerWidth - (rect.width / 2);
        const maxY = window.innerHeight - (rect.height / 2);
        const minY = 0;

        newX = Math.max(minX, Math.min(newX, maxX));
        newY = Math.max(minY, Math.min(newY, maxY));

        setPosition({
          x: newX,
          y: newY,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.body.classList.add("window-dragging");
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);
    } else {
      document.body.classList.remove("window-dragging");
    }

    return () => {
      document.body.classList.remove("window-dragging");
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, dragOffset]);

  const handleMouseDown = (e: React.MouseEvent) => {
    let currentPosition = position;

    // Safety check: if for some reason we aren't positioned yet,
    // measure immediately to prevent jumping to (0,0)
    if (!isPositioned && windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      currentPosition = { x: rect.left, y: rect.top };
      setPosition(currentPosition);
      setIsPositioned(true);
    }

    setIsDragging(true);
    setDragOffset({
      x: e.clientX - currentPosition.x,
      y: e.clientY - currentPosition.y,
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;

    let currentPosition = position;

    // Safety check: if for some reason we aren't positioned yet,
    // measure immediately to prevent jumping to (0,0)
    if (!isPositioned && windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      currentPosition = { x: rect.left, y: rect.top };
      setPosition(currentPosition);
      setIsPositioned(true);
    }

    const touch = e.touches[0];
    setIsDragging(true);
    setDragOffset({
      x: touch.clientX - currentPosition.x,
      y: touch.clientY - currentPosition.y,
    });
  };

  if (!isOpen) return null;

  // Check if src is an external URL
  const isExternalUrl = src ? (() => {
    try {
      const url = new URL(src, window.location.origin);
      return url.origin !== window.location.origin;
    } catch {
      return false;
    }
  })() : false;

  // Convert Spotify embed URL to regular Spotify URL
  const getDisplayUrl = (url: string) => {
    if (url.includes('open.spotify.com/embed/')) {
      return url.replace('/embed/', '/');
    }
    return url;
  };

  return (
    <div
      ref={windowRef}
      onMouseDown={() => onFocus && onFocus()}
      style={
        isPositioned
          ? {
              left: position.x,
              top: position.y,
              zIndex: zIndex,
            }
          : {
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: zIndex,
            }
      }
      className={`absolute flex flex-col border border-white/20 dark:border-white/10 bg-linear-to-br from-white/40 to-white/10 dark:from-black/40 dark:to-black/10 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-xl overflow-hidden ${className}`}
    >
      {/* Title Bar / Tab */}
      <div
        className="bg-white/10 dark:bg-black/20 text-slate-800 dark:text-slate-200 px-3 py-1 cursor-grab active:cursor-grabbing flex items-center select-none border-b border-white/20 dark:border-white/10 backdrop-blur-md"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {isExternalUrl ? (
          <a
            href={getDisplayUrl(src)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            className="font-mono text-xs uppercase tracking-widest text-blue-600 dark:text-blue-400 font-bold hover:text-blue-700 dark:hover:text-blue-300 hover:underline cursor-pointer transition-colors flex items-center gap-1"
          >
            {title}
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        ) : (
          <span className="font-mono text-xs uppercase tracking-widest text-slate-900/80 dark:text-slate-100/80 font-bold">
            {title}
          </span>
        )}
        <div className="ml-auto flex items-center">
          {/* Close button (Diamond) with distinct clickable area */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent drag start when clicking close
              if (onClose) onClose();
            }}
            className="w-6 h-6 flex items-center justify-center cursor-pointer bg-white/20 dark:bg-white/10 border border-white/30 dark:border-white/20 hover:bg-slate-500/20 hover:border-slate-500/50 transition-all rounded-sm backdrop-blur-sm shadow-sm group"
            aria-label="Close"
          >
            <div className="w-2 h-2 bg-slate-800/80 dark:bg-slate-200/80 rotate-45 group-hover:bg-slate-900 dark:group-hover:bg-white"></div>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden relative">
        <div className={`iframe-overlay absolute inset-0 bg-transparent hidden z-${(zIndex || 10) + 1}`} />

        <iframe
          src={src}
          className="w-full h-full border-none"
          title="Window Content"
        />
      </div>
    </div>
  );
};

export default Window;
