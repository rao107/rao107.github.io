import React from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  children,
  className = "",
}) => {
  return (
    <div
      className={`bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-8 py-6 ${className}`}
    >
      {children ? (
        children
      ) : (
        <>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            {title}
          </h1>
          {description && (
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              {description}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default PageHeader;
