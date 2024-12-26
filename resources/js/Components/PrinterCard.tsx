import { Printer } from "@/types";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Modal from "./Modal";

const PrinterCard = ({ printer }: { printer: Printer }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="bg-[#252525] flex flex-col gap-2 text-white rounded-md px-5 py-3 w-full h-fit"
      style={{ outlineWidth: "1px" }}
    >
      <div>
        <div className="bg-black px-4 outline outline-1 outline-[#454545] rounded-md w-full flex justify-between">
          <div className="flex-1 border-r border-[#454545] h-full py-2">
            {printer.model}
          </div>
          <div className="pl-4 py-2">{printer.number}</div>
        </div>
        <div className="text-sm font-bold mb-2 mt-1 px-4">{printer.type}</div>
      </div>
      <div>
        <div className="bg-black px-4 py-2 rounded-md flex justify-between outline outline-1 outline-[#303030] ">
          <div className="font-black text-blue-500">{printer.counter}</div>
          <div className="text-blue-200">{printer.counterDate}</div>
        </div>
        <div className="px-4 flex justify-between text-sm mb-4">
          <h3>Счётчик страниц</h3>
          <h3>Обновлён</h3>
        </div>
        <div className="px-4">
          Дата последнего ремонта:{" "}
          <span className="text-blue-500">{printer.fixDate}</span>
        </div>
      </div>
      <div className="flex justify-between mt-3">
        <span className="font-bold bg-[#181818] px-4 rounded-md inline-block py-1 w-fit outline-1 outline outline-[#303030]">
          {printer.status}
        </span>
        <div className="flex gap-2">
          {printer.comment && (
            <>
              <button
                onClick={() => setIsVisible(!isVisible)}
                className="font-bold cursor-pointer px-2 rounded-md inline-block py-1 w-fit text-sm text-gray-400 hover:text-white hover:bg-black transition duration-300"
              >
                комментарий
              </button>
            </>
          )}
          <Modal
            show={isVisible}
            maxWidth="2xl"
            onClose={() => setIsVisible(!isVisible)}
          >
            <div className="text-white bg-black/0">
              <>
                <div className="flex w-full justify-between">
                  <h2 className="text-3xl p-10 py-5 rounded-br-3xl bg-black/0">
                    {printer.model}
                  </h2>
                  <FontAwesomeIcon
                    icon={faXmark}
                    className="hover:bg-gray-900 rounded-md text-5xl px-3 py-2 cursor-pointer"
                    onClick={() => {
                      setIsVisible(!isVisible);
                    }}
                  />
                </div>
                <p className="w-[50%] ml-10 text-xl my-10 text-left">
                  {printer.comment}
                </p>
              </>
            </div>
          </Modal>
          <button className=" font-bold underline text-yellow-600 ">
            редактировать
          </button>
        </div>
      </div>
    </div>
  );
};

export { PrinterCard };
