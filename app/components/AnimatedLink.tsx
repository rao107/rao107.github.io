import React from "react";
import Link from "next/link";

interface AnimatedLinkProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  hoverColor?: "slate" | "blue" | "red";
  external?: boolean;
  className?: string;
}

const AnimatedLink: React.FC<AnimatedLinkProps> = ({
  href,
  onClick,
  children,
  hoverColor = "slate",
  external = false,
  className = "",
}) => {
  const baseClasses =
    "text-slate-600 dark:text-slate-300 font-semibold transition-colors duration-200 underline decoration-2 decoration-transparent underline-offset-4";

  const hoverColorClasses = {
    slate:
      "hover:text-slate-900 dark:hover:text-slate-100 hover:decoration-slate-900 dark:hover:decoration-slate-100",
    blue: "hover:text-blue-700 dark:hover:text-blue-400 hover:decoration-blue-700 dark:hover:decoration-blue-400",
    red: "hover:text-red-600 dark:hover:text-red-400 hover:decoration-red-600 dark:hover:decoration-red-400",
  };

  const combinedClasses = `${baseClasses} ${hoverColorClasses[hoverColor]} ${className}`;

  // Render as button if onClick is provided
  if (onClick) {
    return (
      <button onClick={onClick} className={combinedClasses}>
        {children}
      </button>
    );
  }

  // Render as external link
  if (href && external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={combinedClasses}
      >
        {children}
      </a>
    );
  }

  // Render as Next.js Link
  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  // Fallback
  return <span className={combinedClasses}>{children}</span>;
};

export default AnimatedLink;
