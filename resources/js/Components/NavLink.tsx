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
          ? "border-dashed focus:border-accent-main border-accent-main text-gray-100"
          : "border-transparent text-neutral-bright hover:border-neutral-light hover:text-gray-300 focus:border-neutral-bright focus:text-neutral-bright") +
        className
      }
    >
      {children}
    </Link>
  );
}
