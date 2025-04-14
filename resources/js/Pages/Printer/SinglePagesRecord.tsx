import PrintPagesInput from "@/Components/PrintPagesInput";
import { PrinterPages } from "@/types";
import { DatePicker } from "@/Components/DatePicker";

interface SinglePagesRecordProps {
  changeRecordDatesValues: (
    index: number,
    records: PrinterPages[],
    year: "end_year" | "start_year",
    month: "end_month" | "start_month",
    year_value: number,
    month_value: number
  ) => PrinterPages[];
  printer_pages: PrinterPages;
  index: number;
  changePrinterPagesValues: (
    records: PrinterPages[],
    key: "print_pages" | "scan_pages",
    value: string,
    index: number
  ) => PrinterPages[];
  printerPagesNoSumReversed: PrinterPages[];
  setPrinterPagesNoSumReversed: (records: PrinterPages[]) => void;
  setData: (key: string, value: PrinterPages[]) => void;
}

const SinglePagesRecord = ({
  changeRecordDatesValues,
  printer_pages,
  index,
  changePrinterPagesValues,
  printerPagesNoSumReversed,
  setPrinterPagesNoSumReversed,
  setData,
}: SinglePagesRecordProps) => {
  return (
    <div className="flex flex-col gap-1 h-fit max-h-[40rem] px-2 py-1 pb-2 rounded-md bg-white/5 border-[1px] border-black">
      <div className="flex gap-2">
        <PrintPagesInput
          type="text"
          placeholder="5874"
          value={printer_pages.print_pages}
          onChange={(e) => {
            const records = changePrinterPagesValues(
              printerPagesNoSumReversed,
              "print_pages",
              e.target.value,
              index
            );
            setPrinterPagesNoSumReversed(records);
            setData("printer_pages_no_sum", [...records].reverse());
          }}
        />
        <PrintPagesInput
          type="text"
          placeholder="5875"
          value={printer_pages.scan_pages}
          onChange={(e) => {
            const records = changePrinterPagesValues(
              printerPagesNoSumReversed,
              "scan_pages",
              e.target.value,
              index
            );
            setPrinterPagesNoSumReversed(records);
            setData("printer_pages_no_sum", [...records].reverse());
          }}
        />
      </div>
      <DatePicker
        setData={setData}
        pagesData={printer_pages}
        changeRecordDatesValues={changeRecordDatesValues}
        start_month={printer_pages.start_month}
        start_year={printer_pages.start_year}
        end_month={printer_pages.end_month}
        end_year={printer_pages.end_year}
      />
    </div>
  );
};

export { SinglePagesRecord };
