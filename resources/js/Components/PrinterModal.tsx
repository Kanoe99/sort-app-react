import { faDesktop, faWifi, faXmark } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Printer } from "@/types";
import { IPView } from "./IPView";
import { mirrorEasing } from "framer-motion";
import DataRangeSelector from "./DataRangeSelector";

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
  return (
    <Modal
      key={printer.id}
      show={isVisible}
      maxWidth="2xl"
      onClose={() => setIsVisible(!isVisible)}
    >
      <>
        <div className="flex w-full justify-between">
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
          <div className="bg-black px-4 py-2 rounded-md flex justify-between outline outline-1 outline-neutral-muted ">
            <div className="font-black text-accent-main">{printer.counter}</div>
            <DataRangeSelector />
            {/* <div className="text-accent-light">{printer.counterDate}</div> */}
          </div>
          <div className="px-4 flex justify-between text-sm mb-4">
            <h3>Счётчик страниц</h3>
            <h3>Обновлён</h3>
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
