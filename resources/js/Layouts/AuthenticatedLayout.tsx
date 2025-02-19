import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import { Link, usePage } from "@inertiajs/react";
import { PropsWithChildren, ReactNode, useState } from "react";
import { can } from "@/helpers";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SuccessMessage from "@/Components/SuccessMessage";

export default function Authenticated({
  header,
  children,
}: PropsWithChildren<{ header?: ReactNode }>) {
  const user = usePage().props.auth.user;
  const success: any = usePage().props.success;
  const refreshed: any = usePage().props.refreshed;
  const time: any = usePage().props.time;

  return (
    <div className="min-h-screen bg-black flex text-white flex-col">
      <nav className="border-b border-gray-700 bg-black sticky top-0 z-[99]">
        <div className="mx-auto max-w-[90vw]">
          <div className="flex h-16 justify-between">
            <div className="flex items-center pl-36 w-[calc(60vw_-_0.25rem)]">
              <div className="flex shrink-0 items-center select-none">
                <Link href="/">
                  <ApplicationLogo className="block h-9 w-auto fill-current text-gray-200" />
                </Link>
              </div>

              <div className="hidden h-10 space-x-8 sm:-my-px sm:ms-10 sm:flex pb-2 select-none">
                <NavLink href={route("main")} active={route().current("main")}>
                  Главная
                </NavLink>
                {can(user, "manage_users") && (
                  <NavLink
                    prefetch
                    href={route("user.index")}
                    active={route().current("user.index")}
                  >
                    Пользователи
                  </NavLink>
                )}
                <NavLink
                  href={route("graph")}
                  active={route().current("graph")}
                >
                  Графики
                </NavLink>
              </div>
            </div>
            <div className="hidden sm:ms-6 sm:flex sm:items-center justify-end select-none gap-5 w-1/3">
              {can(user, "manage_printers") && (
                <span className="inline-flex rounded-md">
                  <button
                    type="button"
                    className="inline-flex gap-3 outline outline-1 outline-neutral-light items-center rounded-md border border-transparent px-3 py-2 text- font-medium leading-4 transition duration-150 ease-in-out bg-black text-gray-400 hover:text-gray-300"
                  >
                    {" "}
                    <Link href={route("printer.create")}>Добавить принтер</Link>
                    <FontAwesomeIcon className="text-xs" icon={faPlus} />
                  </button>
                </span>
              )}

              <div className="relative">
                <Dropdown>
                  <Dropdown.Trigger>
                    <span className="inline-flex rounded-md">
                      <button
                        type="button"
                        className="inline-flex items-center rounded-md border border-transparent px-3 py-2 text-sm font-medium leading-4 transition duration-150 ease-in-out  focus:outline-none bg-black text-gray-400 hover:text-gray-300"
                      >
                        {user.name}

                        <svg
                          className="-me-0.5 ms-2 h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </span>
                  </Dropdown.Trigger>

                  <Dropdown.Content>
                    <Dropdown.Link prefetch href={route("profile.edit")}>
                      Профиль
                    </Dropdown.Link>
                    <Dropdown.Link
                      href={route("logout")}
                      method="post"
                      as="button"
                    >
                      Выйти
                    </Dropdown.Link>
                  </Dropdown.Content>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {header && (
        <header className="shadow bg-black">
          <div className="mx-auto max-w-7xl px-4 pt-6 pb-0 sm:px-6 lg:px-8">
            {header}
          </div>
        </header>
      )}
      <div className="py-10 flex-grow">
        <div className="mx-auto w-[90vw]">
          <SuccessMessage success={success} refreshed={refreshed} time={time} />

          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
