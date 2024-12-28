import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PageProps, Printer } from "@/types";
import { Tags } from "./Tags";
import { div } from "framer-motion/client";

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
  console.log(printer.tags);

  return (
    <Modal
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
        <div className="mx-5 my-3 px-3 py-3 rounded-md bg-neutral-soft">
          <span className="font-bold bg-black px-4 rounded-md inline-block py-1 w-fit outline-1 outline outline-neutral-muted mr-10">
            {printer.status}
          </span>
          <span>{printer.comment}</span>
        </div>
        {printer.tags.length !== 0 && (
          <div className="mx-5 my-3 bg-black rounded-md flex gap-2 py-2 px-2 flex-wrap">
            {printer.tags.map((tag) => (
              <div
                key={printer.id}
                className="px-2 rounded-md bg-neutral-muted cursor-pointer hover:bg-neutral-soft"
              >
                {tag.name}
              </div>
            ))}
          </div>
        )}
      </>
    </Modal>
  );
};
export { PrinterModal };
