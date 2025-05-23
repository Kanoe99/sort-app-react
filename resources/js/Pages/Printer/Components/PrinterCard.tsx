import { Printer } from "@/types";
import { useState } from "react";
import { PrinterModal } from "./PrinterModal";
import { can } from "@/helpers";
import { usePage } from "@inertiajs/react";
import { IPView } from "../../../Components/IPView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDesktop, faWifi } from "@fortawesome/free-solid-svg-icons";
import { PrinterCardContextProvider } from "@/Pages/Printer/contexts/PrinterCardContext";
import { months, startingMonths } from "@/utils/months";

const PrinterCard = ({ printer }: { printer: Printer }) => {
  const [isVisible, setIsVisible] = useState(false);
  const user = usePage().props.auth.user;

  return (
    <div
      className="bg-bg-main h-full flex flex-col justify-between text-white rounded-md px-5 py-3 w-full"
      style={{ outlineWidth: "1px" }}
    >
      <div className="flex flex-col gap-2">
        <div>
          <div className="bg-black px-4 outline outline-1 outline-neutral-soft rounded-md w-full flex justify-between">
            <div className="flex-1 border-r border-neutral-soft h-full py-2">
              {printer.model}
            </div>
            <div className="pl-4 py-2">
              {printer.number ?? (
                <span className="text-red-500 select-none">
                  Нет инвентарного номера
                </span>
              )}
            </div>
          </div>
          <div className="text-sm font-bold mb-2 mt-1 px-4">{printer.type}</div>
        </div>
        <div>
          <div className="bg-black px-4 py-2 rounded-md flex justify-between outline outline-1 outline-neutral-muted ">
            {/* <div className="font-black text-accent-main">{printer.counter}</div> */}
            {/* <div className="text-accent-light">{printer.counterDate}</div> */}

            <hr />
            {printer.sum_pages.length > 0 &&
            printer.three_last_pages.length > 0 ? (
              <div>
                <div className="flex justify-between my-1 text-xs">
                  <div className="flex gap-2 test-1/2 justify-between pr-8 w-1/2">
                    <div className="py-1">
                      Всего напечатано <br /> (на{" "}
                      {months[printer.sum_pages[0].end_month]}.
                      {printer.sum_pages[0].end_year}):{" "}
                    </div>
                    <div className="bg-black rounded-md px-3 py-1 test-fit">
                      {printer.sum_pages[0].print_pages}
                    </div>
                  </div>
                  <div className="flex gap-2 border-l test-1/2 pl-6 justify-between w-1/2">
                    <div className="py-1">
                      отсканировано <br /> (на{" "}
                      {months[printer.sum_pages[0].end_month]}.
                      {printer.sum_pages[0].end_year}):{" "}
                    </div>
                    <div className="bg-black rounded-md px-3 py-1 test-fit">
                      {printer.sum_pages[0].scan_pages}
                    </div>
                  </div>
                </div>
                <hr />
                <div className="my-1 flex justify-between">
                  <div className="w-1/2">
                    <div className="text-xs mb-2">Последние три записи:</div>
                    {printer.three_last_pages.map((page, index) => (
                      <div
                        key={index}
                        className="flex justify-between pr-8 pl-6 gap-2 mb-1"
                      >
                        <div className="text-xs py-1">
                          с {startingMonths[page.start_month]}.{page.start_year}{" "}
                          <br />
                          по {months[page.end_month]}.{page.end_year}
                        </div>
                        <div className="text-xs bg-black test-fit px-3 py-1 rounded-md">
                          {page.print_pages ? (
                            page.print_pages
                          ) : (
                            <div className="text-red-500 font-bold">
                              нет данных
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-l pl-8 w-1/2">
                    <div className="text-xs mb-2">Последние три записи:</div>
                    {printer.three_last_pages.map((page, index) => (
                      <div
                        key={index}
                        className="flex gap-2 pl-6 mb-1 justify-between"
                      >
                        <div className="text-xs py-1">
                          с {startingMonths[page.start_month]}.{page.start_year}{" "}
                          <br />
                          по {months[page.end_month]}.{page.end_year}
                        </div>
                        <div className="text-xs bg-black test-fit px-3 py-1 rounded-md">
                          {page.scan_pages ? (
                            page.scan_pages
                          ) : (
                            <div className="text-red-500 font-bold">
                              нет данных
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="px-4 my-1 text-red-500 font-bold">
                Нет данных о страницах
              </div>
            )}
            <hr />
          </div>
          <div className="px-4 flex justify-between text-sm mb-4">
            <h3>Счётчик страниц</h3>
          </div>
          <div className="px-4">
            Дата последнего ремонта:{" "}
            <span className="text-accent-main">
              {printer.fixDate ?? "Не известна"}
            </span>
          </div>
        </div>
        {printer.IP !== null ? (
          <div className="pt-2">
            <IPView IPData={printer.IP} isIPv4={printer.isIPv4} />
          </div>
        ) : (
          <div className="px-3">IP нету</div>
        )}
        <div>
          <div className="bg-black px-4 py-2 rounded-md flex justify-between outline outline-1 outline-neutral-muted ">
            <div className="font-black text-accent-main">
              {printer.department_head}
            </div>
            <div className="text-accent-light">{printer.location}</div>
          </div>
          <h3 className="px-4 flex justify-between text-sm mb-4">
            {printer.department}
          </h3>
        </div>
        <div className="flex">
          <div className="flex px-4 gap-2">
            <FontAwesomeIcon
              icon={faDesktop}
              className={`${
                printer.PC_name !== null ? "text-green-500" : "text-red-500"
              }`}
            />
            <h3>{printer.PC_name ?? "Не подключён"}</h3>
          </div>

          <div className="flex px-4 gap-2">
            <FontAwesomeIcon
              icon={faWifi}
              className={`
            ${printer.network_capable === "Сетевой" && "text-green-500"}
            ${
              printer.network_capable === "Есть возможность" &&
              "text-yellow-500"
            }
            ${printer.network_capable === "Нет возможности" && "text-red-500"}`}
            />
            {printer.network_capable === "Сетевой" && <h3>Сетевой</h3>}
            {printer.network_capable === "Есть возможность" && (
              <h3>Есть возможность</h3>
            )}
            {printer.network_capable === "Нет возможности" && (
              <h3>Нет возможности</h3>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-3">
        <span className="font-bold bg-black px-4 rounded-md inline-block py-1 w-fit outline-1 outline outline-neutral-muted">
          {printer.status}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setIsVisible(!isVisible)}
            className="font-bold cursor-pointer px-2 rounded-md inline-block py-1 w-fit text-sm text-neutral-bright hover:text-white hover:bg-black transition duration-300"
          >
            смотреть
          </button>
          <PrinterCardContextProvider>
            <PrinterModal
              user={user}
              isVisible={isVisible}
              setIsVisible={setIsVisible}
              printer={printer}
            />
          </PrinterCardContextProvider>

          {can(user, "manage_printers") && (
            <button className=" font-bold underline text-accent-underline">
              <a href={route("printer.edit", printer.id)}>редактировать</a>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export { PrinterCard };
