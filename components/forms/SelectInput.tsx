import * as React from "react";

type SelectInputProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export function SelectInput({
  className = "",
  children,
  ...props
}: SelectInputProps) {
  return (
    <select
      {...props}
      className={`w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 ${className}`}
    >
      {children}
    </select>
  );
}
