import React from "react";

interface ShortcutProps {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  className?: string;
}

const Shortcut: React.FC<ShortcutProps> = ({
  label,
  onClick,
  icon,
  className = "",
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-2 cursor-pointer group hover:bg-white/10 dark:hover:bg-white/5 rounded-lg transition-colors w-24 ${className}`}
    >
      <div className="w-12 h-12 flex items-center justify-center bg-linear-to-br from-white/20 to-white/5 dark:from-white/10 dark:to-white/5 backdrop-blur-md rounded-xl shadow-lg group-hover:scale-105 transition-transform border border-white/20 dark:border-white/10 text-slate-700 dark:text-slate-200">
        {icon || <div className="w-6 h-6 bg-slate-400/50 dark:bg-slate-400/30 rounded-full" />}
      </div>
      <span className="mt-2 text-xs font-medium text-slate-700 dark:text-slate-300 bg-white/50 dark:bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded shadow-sm group-hover:bg-white/80 dark:group-hover:bg-black/60 transition-colors text-center truncate w-full">
        {label}
      </span>
    </div>
  );
};

export default Shortcut;
