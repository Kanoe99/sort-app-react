import { Printer } from "@/types";
import { useState } from "react";
import { PrinterModal } from "./PrinterModal";

const PrinterCard = ({ printer }: { printer: Printer }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="bg-bg-main flex flex-col gap-2 text-white rounded-md px-5 py-3 w-full h-fit"
      style={{ outlineWidth: "1px" }}
    >
      <div>
        <div className="bg-black px-4 outline outline-1 outline-neutral-soft rounded-md w-full flex justify-between">
          <div className="flex-1 border-r border-neutral-soft h-full py-2">
            {printer.model}
          </div>
          <div className="pl-4 py-2">{printer.number}</div>
        </div>
        <div className="text-sm font-bold mb-2 mt-1 px-4">{printer.type}</div>
      </div>
      <div>
        <div className="bg-black px-4 py-2 rounded-md flex justify-between outline outline-1 outline-neutral-muted ">
          <div className="font-black text-accent-main">{printer.counter}</div>
          <div className="text-accent-light">{printer.counterDate}</div>
        </div>
        <div className="px-4 flex justify-between text-sm mb-4">
          <h3>Счётчик страниц</h3>
          <h3>Обновлён</h3>
        </div>
        <div className="px-4">
          Дата последнего ремонта:{" "}
          <span className="text-accent-main">{printer.fixDate}</span>
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
          <PrinterModal
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            printer={printer}
          />
          <button className=" font-bold underline text-accent-underline">
            <a href={route("printer.edit", printer.id)}>редактировать</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export { PrinterCard };
