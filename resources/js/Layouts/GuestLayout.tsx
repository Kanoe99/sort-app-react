import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0 bg-black">
      <Link
        href="/"
        className="sm:max-w-md w-full flex justify-between items-center px-6"
      >
        <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
        <h2 className="text-white text-2xl font-bold">Принтеры - Вход</h2>
      </Link>

      <div className="mt-6 w-full overflow-hidden px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg bg-bg-main outline outline-1 outline-neutral-muted">
        {children}
      </div>
    </div>
  );
}
