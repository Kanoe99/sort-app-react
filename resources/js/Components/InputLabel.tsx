import { LabelHTMLAttributes } from "react";

export default function InputLabel({
  value,
  className = "",
  children,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement> & { value?: string }) {
  return (
    <label
      {...props}
      className={
        `text-sm font-medium text-gray-700 flex items-center gap-2 dark:text-gray-300 ` +
        className
      }
    >
      <div className="w-2 h-2 bg-white rounded-sm"></div>
      {value ? value : children}
    </label>
  );
}
