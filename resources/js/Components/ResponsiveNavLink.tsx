import { InertiaLinkProps, Link } from "@inertiajs/react";

export default function ResponsiveNavLink({
  prefetch,
  active = false,
  className = "",
  children,
  ...props
}: InertiaLinkProps & { active?: boolean }) {
  return (
    <Link
      prefetch
      {...props}
      className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${
        active
          ? " bg-indigo-500 border-accent-main bg-indigo-900/50 text-indigo-300 focus:border-indigo-300 focus:bg-indigo-900 focus:text-indigo-200"
          : "border-transparent text-gray-400 hover:border-gray-600 hover:bg-gray-700 hover:text-gray-200 focus:border-gray-600 focus:bg-gray-700 focus:text-gray-200"
      } text-base font-medium transition duration-150 ease-in-out focus:outline-none ${className}`}
    >
      {children}
    </Link>
  );
}
