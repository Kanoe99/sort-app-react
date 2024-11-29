import { ButtonHTMLAttributes } from "react";

export default function PrimaryButton({
  className = "",
  disabled,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={
        `inline-flex items-center rounded-md justify-center border border-transparent bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-none active:bg-gray-900 dark:active:text-white dark:bg-white dark:text-black dark:focus:ring-2 dark:focus:ring-white dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-white dark:active:bg-black 
        ${disabled && "opacity-25"} ` + className
      }
      disabled={disabled}
    >
      {children}
    </button>
  );
}
