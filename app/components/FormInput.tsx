import React from "react";

interface FormInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  type?: "text" | "email" | "url" | "password";
  multiline?: boolean;
  rows?: number;
  maxLength?: number;
  optional?: boolean;
  error?: boolean;
  className?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  multiline = false,
  rows = 5,
  maxLength,
  optional = false,
  error = false,
  className = "",
}) => {
  const baseInputClasses = error
    ? "w-full px-4 py-2 rounded-md border border-red-500 dark:border-red-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400"
    : "w-full px-4 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:focus:ring-slate-400";

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
      >
        {label}{" "}
        {optional && (
          <span className="text-slate-500 dark:text-slate-400 text-xs">
            (optional)
          </span>
        )}
      </label>
      {multiline ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          maxLength={maxLength}
          className={`${baseInputClasses} resize-none ${className}`}
        />
      ) : (
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`${baseInputClasses} ${className}`}
        />
      )}
    </div>
  );
};

export default FormInput;
