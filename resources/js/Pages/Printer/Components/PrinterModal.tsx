import { faDesktop, faWifi, faXmark } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../../Components/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Printer } from "@/types";
import { IPView } from "../../../Components/IPView";
import { Expandable } from "../../../Components/Expandable/ExpandableSelector";
import { useState } from "react";
import { DateSearchResults } from "@/Components/Expandable/DateSearchResults";
import { can } from "@/helpers";

interface PrinterModalProps {
  isVisible: boolean;
  setIsVisible: (prop: boolean) => void;
  printer: Printer;
  user: any;
}
export interface printedData {
  isPrint: boolean;
  pages: number[];
  end_years: number[];
  end_months: number[];
  start_years: number[];
  start_months: number[];
  search_end_year: number;
  search_end_month: number;
  search_start_year: number;
  search_start_month: number;
  error: string;
}

const PrinterModal = ({
  user,
  isVisible,
  setIsVisible,
  printer,
}: PrinterModalProps) => {
  const [printedData, setPrintedData] = useState<printedData>();

  return (
    <Modal
      key={printer.id}
      show={isVisible}
      maxWidth="fit"
      transparent={true}
      onClose={() => setIsVisible(!isVisible)}
    >
      <div
        className={`inline-grid ${
          printedData ? "grid-cols-[2fr_1fr_1fr]" : "grid-cols-[2fr_1fr]"
        } auto-cols-auto h-fit w-fit gap-3`}
      >
        <div className="h-fit w-[700px] bg-neutral-muted outline outline-1 outline-neutral-soft rounded-md">
          <div className="flex test-full justify-between overflow-visible">
            <div className="px-5 py-3 flex-1">
              <div className="px-4 bg-black outline outline-1 outline-neutral-soft rounded-md test-full flex justify-between">
                <div className="flex-1 border-r border-neutral-soft h-full py-2">
                  {can(user, "manage_printers") ? (
                    <button>
                      <a href={route("printer.edit", printer.id)}>
                        {printer.model}
                      </a>
                    </button>
                  ) : (
                    printer.model
                  )}
                </div>
                <div className="pl-4 py-2">
                  {printer.number ?? (
                    <span className="text-red-500 select-none">
                      Нет инвентарного номера
                    </span>
                  )}
                </div>
              </div>
              <div className="text-sm font-bold mb-2 mt-1 px-4">
                {printer.type}
              </div>
            </div>
            <FontAwesomeIcon
              icon={faXmark}
              className="hover:bg-neutral-soft rounded-md text-5xl px-2 py-0 mt-2 mr-5 cursor-pointer"
              onClick={() => {
                setIsVisible(!isVisible);
              }}
            />
          </div>
          <div className="px-5 py-3">
            <div className="px-4 flex flex-col gap-1 justify-between text-sm mb-4">
              <hr />
              {printer.sum_pages.length > 0 &&
              printer.three_last_pages.length > 0 ? (
                <div>
                  <div className="flex justify-between my-1 text-xs">
                    <div className="flex gap-2 test-1/2 justify-between pr-8 w-1/2">
                      <div className="py-1">
                        Всего напечатано (на {printer.sum_pages[0].end_month}.
                        {printer.sum_pages[0].end_year}):{" "}
                      </div>
                      <div className="bg-black rounded-md px-3 py-1 test-fit">
                        {printer.sum_pages[0].print_pages}
                      </div>
                    </div>
                    <div className="flex gap-2 border-l test-1/2 pl-8 justify-between w-1/2">
                      <div className="py-1">
                        отсканировано (на {printer.sum_pages[0].end_month}.
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
                          className="flex justify-between pr-8 pl-8 gap-2 mb-1"
                        >
                          <div className="text-xs py-1">
                            с {page.start_month}.{page.start_year} по{" "}
                            {page.end_month}.{page.end_year}
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
                          className="flex gap-2 pl-8 mb-1 justify-between"
                        >
                          <div className="text-xs py-1">
                            с {page.start_month}.{page.start_year} по{" "}
                            {page.end_month}.{page.end_year}
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
              <div className="px-4 my-1">
                Дата последнего ремонта:{" "}
                <span className="text-yellow-400">
                  {printer.fixDate ?? "Не известна"}
                </span>
              </div>
              <hr />
            </div>
            {printer.IP !== null ? (
              <div className="py-3">
                <IPView IPData={printer.IP} isIPv4={printer.isIPv4} />
              </div>
            ) : (
              <div className="px-9">IP нету</div>
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
                   ${
                     printer.network_capable === "Нет возможности" &&
                     "text-red-500"
                   }`}
                />
                {printer.network_capable === "Сетевой" && <h3>Сетевой</h3>}
                {printer.network_capable === "Есть возможность" && (
                  <h3>Есть возможность</h3>
                )}
                {printer.network_capable === "Нет возможности" && (
                  <h3>Не сетевой</h3>
                )}
              </div>
            </div>
            <div className="my-3 px-3 py-3 rounded-md bg-neutral-soft">
              <span className="font-bold bg-black px-4 rounded-md inline-block py-1 test-fit outline-1 outline outline-neutral-muted mr-10">
                {printer.status}
              </span>
              <span>{printer.comment}</span>
            </div>
          </div>
        </div>
        {printedData && (
          <DateSearchResults
            error={printedData.error}
            searchEndYear={printedData.search_end_year}
            searchEndMonth={printedData.search_end_month}
            searchStartYear={printedData.search_start_year}
            searchStartMonth={printedData.search_start_month}
            isPrint={printedData.isPrint}
            pages={printedData.pages}
            endYears={printedData.end_years}
            endMonths={printedData.end_months}
            startYears={printedData.start_years}
            startMonths={printedData.start_months}
          />
        )}
        <div className="bg-black min-h-full w-fit h-fit px-4 py-2 rounded-md flex flex-col justify-start pt-10 gap-14 outline outline-1 outline-neutral-muted ">
          <div className="ml-7 mr-7">
            <Expandable
              printedData={printedData}
              setPrintedData={setPrintedData}
              printer_id={printer.id}
              isPrint={false}
            />
          </div>
          <div className="ml-7 mr-7">
            <Expandable
              printedData={printedData}
              setPrintedData={setPrintedData}
              printer_id={printer.id}
              isPrint={true}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
export { PrinterModal };
