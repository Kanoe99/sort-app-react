import { InertiaLinkProps, Link } from "@inertiajs/react";

export default function NavLink({
  active = false,
  className = "",
  children,
  ...props
}: InertiaLinkProps & { active: boolean }) {
  return (
    <Link
      {...props}
      className={
        "inline-flex items-center border-b-2 px-0 pt-1 pb-0 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none " +
        (active
          ? "border-dashed focus:border-indigo-700 border-blue-500 text-gray-100"
          : "border-transparent text-gray-400 hover:border-gray-700 hover:text-gray-300 focus:border-gray-700 focus:text-gray-300") +
        className
      }
    >
      {children}
    </Link>
  );
}
