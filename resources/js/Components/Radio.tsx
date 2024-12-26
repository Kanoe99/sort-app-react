import { InputHTMLAttributes } from "react";

export default function Radio({
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      type="radio"
      className={
        "rounded-full text-indigo-600 shadow-sm border-gray-700 bg-gray-900 focus:ring-indigo-600 focus:ring-offset-gray-800 " +
        className
      }
    />
  );
}
