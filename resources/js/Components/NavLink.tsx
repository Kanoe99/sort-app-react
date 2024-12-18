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
          ? "border-indigo-400  text-gray-900 border-dashed focus:border-indigo-700 dark:border-blue-500 dark:text-gray-100"
          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-300 dark:focus:border-gray-700 dark:focus:text-gray-300") +
        className
      }
    >
      {children}
    </Link>
  );
}
