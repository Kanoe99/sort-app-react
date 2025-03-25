import { ButtonHTMLAttributes } from "react";

export default function PrimaryButton({
  className = "",
  disabled,
  children,
  onClick,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      onClick={onClick}
      {...props}
      className={
        `inline-flex items-center rounded-md justify-center border border-transparent bg-button-main px-4 py-3 text-xs font-black uppercase tracking-widest transition duration-150 ease-in-out  focus:outline-none focus:ring-none active:text-white text-black focus:ring-2 focus:ring-white hover:bg-white focus:bg-white focus:ring-offset-white active:bg-black
        ${disabled && "opacity-25"} ` + className
      }
      disabled={disabled}
    >
      {children}
    </button>
  );
}
