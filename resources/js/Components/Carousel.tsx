import { Printer } from "@/types";
import { div } from "framer-motion/client";

const PrinterCard = ({ printer }: { printer: Printer }) => {
  return (
    <div
      className="bg-[#252525] hover:outline text-white rounded-md px-5 py-3 w-full h-full"
      style={{ outlineWidth: "1px" }}
    >
      {printer.model}
    </div>
  );
};

const Carousel = ({ printers }: { printers: Printer[] }) => {
  return (
    <div className=" w-full h-fit grid grid-cols-2 gap-3 px-3 py-2">
      {printers.map((printer) => (
        <PrinterCard printer={printer} />
      ))}
    </div>
  );
};
export { Carousel };
