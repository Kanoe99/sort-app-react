import { PrinterPages } from "@/types";
import { DatePicker } from "@/Pages/Printer/Components/DatePicker";
import PrintPagesInput from "@/Pages/Printer/Components/PrintPagesInput";
import { usePagesRecordsContext } from "@/Pages/Printer/contexts/PagesRecordsContext";

interface SinglePagesRecordProps {
  printer_pages: PrinterPages;
  index: number;
  changePrinterPagesValues: (
    records: PrinterPages[],
    key: "print_pages" | "scan_pages",
    value: string,
    index: number
  ) => PrinterPages[];
}

const SinglePagesRecord = ({
  printer_pages,
  index,
  changePrinterPagesValues,
}: SinglePagesRecordProps) => {
  const { printerPagesNoSumReversed, setPrinterPagesNoSumReversed, setData } =
    usePagesRecordsContext();

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
        index={index}
        pagesData={printer_pages}
        start_month={printer_pages.start_month}
        start_year={printer_pages.start_year}
        end_month={printer_pages.end_month}
        end_year={printer_pages.end_year}
      />
    </div>
  );
};

export { SinglePagesRecord };
