import { ButtonHTMLAttributes } from "react";

export default function DangerButton({
  className = "",
  disabled,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={
        `inline-flex items-center rounded-md justify-center border border-transparent bg-red-500 px-4 py-3 text-xs font-black uppercase tracking-widest transition duration-150 ease-in-out  focus:outline-none focus:ring-none active:text-red-500 text-white focus:ring-2 focus:ring-red-500 hover:bg-red-500/80 focus:bg-red-500 focus:ring-offset-red-500 active:bg-black
        ${disabled && "opacity-25"} ` + className
      }
      disabled={disabled}
    >
      {children}
    </button>
  );
}
