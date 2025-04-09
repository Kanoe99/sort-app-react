import { useRef, useState } from "react";

import PrintPagesInput from "@/Components/PrintPagesInput";
import { PrinterPages } from "@/types";
import { DatePicker } from "@/Components/DatePicker";

interface SinglePagesRecordProps {
  index: number;
  printer_pages: PrinterPages;
  changePrinterPagesValues: (
    printerPagesNoSum: PrinterPages[],
    key: "print_pages" | "scan_pages",
    value: string,
    index: number
  ) => PrinterPages[];
  hasRecords: boolean;
  now: { year: number; month: number };
  printerPagesNoSum: PrinterPages[];
  setPrinterPagesNoSum: (records: PrinterPages[]) => void;
  setData: (key: string, value: PrinterPages[]) => void;
}

const SinglePagesRecord = ({
  index,
  printer_pages,
  changePrinterPagesValues,
  hasRecords,
  now,
  printerPagesNoSum,
  setPrinterPagesNoSum,
  setData,
}: SinglePagesRecordProps) => {
  return (
    <div
      key={index.toString() + printer_pages.end_year.toString()}
      className="flex flex-col gap-1 h-fit max-h-[40rem] px-2 py-1 pb-2 rounded-md bg-white/5 border-[1px] border-black"
    >
      <div className="flex gap-2">
        <PrintPagesInput
          type="text"
          placeholder={"5874"}
          className=""
          pattern="\d*"
          value={printerPagesNoSum[index].print_pages}
          onChange={(e) => {
            const records = changePrinterPagesValues(
              printerPagesNoSum,
              "print_pages",
              e.target.value,
              index
            );
            setPrinterPagesNoSum(records);
            setData("printer_pages_no_sum", records);
          }}
        />
        <PrintPagesInput
          type="text"
          placeholder="5875"
          className=""
          pattern="\d*"
          value={printerPagesNoSum[index].scan_pages}
          onChange={(e) => {
            const records = changePrinterPagesValues(
              printerPagesNoSum,
              "scan_pages",
              e.target.value,
              index
            );
            setPrinterPagesNoSum(records);
            setData("printer_pages_no_sum", records);
          }}
        />
      </div>
      <DatePicker
        start_month={
          hasRecords
            ? printerPagesNoSum[printerPagesNoSum.length - 1].end_month - 1
            : now.month
        }
        start_year={
          hasRecords
            ? printerPagesNoSum[printerPagesNoSum.length - 1].end_year
            : now.year
        }
        end_month={hasRecords ? printer_pages.end_month - 1 : now.month}
        end_year={printer_pages.end_year}
      />
    </div>
  );
};
export { SinglePagesRecord };
