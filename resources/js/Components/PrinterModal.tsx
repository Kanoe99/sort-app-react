import { faDesktop, faWifi, faXmark } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Printer } from "@/types";
import { IPView } from "./IPView";
import { Expandable } from "./ExpandableSelector";
import { useState } from "react";

interface PrinterModalProps {
  isVisible: boolean;
  setIsVisible: (prop: boolean) => void;
  printer: Printer;
}

const PrinterModal = ({
  isVisible,
  setIsVisible,
  printer,
}: PrinterModalProps) => {
  const [printedData, setPrintedData] = useState("");

  return (
    <Modal
      key={printer.id}
      show={isVisible}
      maxWidth="2xl"
      onClose={() => setIsVisible(!isVisible)}
    >
      <>
        <div className="flex w-full justify-between overflow-visible">
          <div className="px-5 py-3 flex-1">
            <div className="bg-black px-4 outline outline-1 outline-neutral-soft rounded-md w-full flex justify-between">
              <div className="flex-1 border-r border-neutral-soft h-full py-2">
                {printer.model}
              </div>
              <div className="pl-4 py-2">{printer.number}</div>
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
          <div className="bg-black absolute left-[-20rem] top-0 px-4 py-2 rounded-md flex flex-col justify-around outline outline-1 outline-neutral-muted ">
            <div className="mb-14 ml-14 mr-7">
              отсканировано
              <Expandable
                printedData={printedData}
                setPrintedData={setPrintedData}
                printer_id={printer.id}
                isPrint={false}
              />
            </div>
            <div className="mb-14 ml-14 mr-7">
              напечатано
              <Expandable
                printedData={printedData}
                setPrintedData={setPrintedData}
                printer_id={printer.id}
                isPrint={true}
              />
            </div>
            {/* <div className="text-accent-light">{printer.counterDate}</div> */}
          </div>
          <div className="px-4 flex flex-col gap-1 justify-between text-sm mb-4">
            <div className="flex justify-between">
              <div className="flex gap-2">
                <div className="py-1">
                  Всего напечатано (на {printer.sum_pages[0].end_month}.
                  {printer.sum_pages[0].end_year}г.):{" "}
                </div>
                <div className="bg-black rounded-md px-3 py-1 w-fit">
                  {printer.sum_pages[0].print_pages}
                </div>
              </div>
              <div className="flex gap-2">
                <div className="py-1">
                  Всего отсканировано (на {printer.sum_pages[0].end_month}.
                  {printer.sum_pages[0].end_year}г.):{" "}
                </div>
                <div className="bg-black rounded-md px-3 py-1 w-fit">
                  {printer.sum_pages[0].scan_pages}
                </div>
              </div>
            </div>
            <hr />
            <div className="my-1 flex justify-between mx-auto gap-24">
              <div>
                <div className="text-xs mb-2">Последние три записи:</div>
                {printer.three_last_pages.map((page, index) => (
                  <div key={index} className="flex gap-2 mb-1">
                    <div className="text-xs py-1">
                      с {page.start_month}.{page.start_year}г. по{" "}
                      {page.end_month}.{page.end_year}г.
                    </div>
                    <div className="text-xs bg-black w-fit px-3 py-1 rounded-md">
                      {page.print_pages}
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-l pl-20 border-white">
                <div className="text-xs mb-2">Последние три записи:</div>
                {printer.three_last_pages.map((page, index) => (
                  <div key={index} className="flex gap-2 mb-1">
                    <div className="text-xs py-1">
                      с {page.start_month}.{page.start_year}г. по{" "}
                      {page.end_month}.{page.end_year}г.
                    </div>
                    <div className="text-xs bg-black w-fit px-3 py-1 rounded-md">
                      {page.scan_pages}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <hr />
          </div>
          <div className="px-4">
            Дата последнего ремонта:{" "}
            <span className="text-accent-main">{printer.fixDate}</span>
          </div>
          <div className="px-4">
            Расположен в{" "}
            <span className="text-accent-main">{printer.location}</span>
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
                  printer.isLocal ? "text-green-500" : "text-red-500"
                }`}
              />
              <h3>{printer.isLocal ? printer.PC_name : "Не подключён"}</h3>
            </div>

            <div className="flex px-4 gap-2">
              <FontAwesomeIcon
                icon={faWifi}
                className={`
                   ${printer.network_capable === "yes" && "text-green-500"}
                   ${printer.network_capable === "maybe" && "text-yellow-500"}
                   ${printer.network_capable === "no" && "text-red-500"}`}
              />
              {printer.network_capable === "yes" && <h3>Сетевой</h3>}
              {printer.network_capable === "maybe" && <h3>Есть возможность</h3>}
              {printer.network_capable === "no" && <h3>Не сетевой</h3>}
            </div>
          </div>
          <div className="my-3 px-3 py-3 rounded-md bg-neutral-soft">
            <span className="font-bold bg-black px-4 rounded-md inline-block py-1 w-fit outline-1 outline outline-neutral-muted mr-10">
              {printer.status}
            </span>
            <span>{printer.comment}</span>
          </div>
        </div>
      </>
    </Modal>
  );
};
export { PrinterModal };
