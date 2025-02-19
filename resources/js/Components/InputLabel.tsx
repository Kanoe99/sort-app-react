import { LabelHTMLAttributes } from "react";

export default function InputLabel({
  value,
  optional,
  className = "",
  children,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement> & {
  value?: string;
  optional?: boolean;
}) {
  return (
    <label
      {...props}
      className={
        `text-sm font-medium flex items-center gap-2 text-gray-300 ` + className
      }
    >
      <div className="w-2 h-2 bg-white rounded-[2px]"></div>
      {value ? value : children}
      {optional && (
        <p className="text-xs text-white/40">{`(Не обязательно)`}</p>
      )}
    </label>
  );
}
