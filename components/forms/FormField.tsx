type FormFieldProps = {
  htmlFor: string;
  label: string;
  children: React.ReactNode;
};

export function FormField({ htmlFor, label, children }: FormFieldProps) {
  return (
    <div className="space-y-1">
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-slate-800"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
