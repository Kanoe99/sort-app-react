import { months, startingMonths } from "@/utils/months";
import { PrinterPages } from "@/types";

interface DatePickerProps {
  hasRecords: boolean;
  now: { year: number; month: number };
  printerPagesNoSum: PrinterPages[];
  printer_pages: PrinterPages;
}

const DatePicker = ({
  hasRecords,
  now,
  printerPagesNoSum,
  printer_pages,
}: DatePickerProps) => {
  return (
    <div className="text-xs px-4 mt-1">
      с{" "}
      <span className="text-blue-300">
        {
          startingMonths[
            hasRecords
              ? printerPagesNoSum[printerPagesNoSum.length - 1].end_month - 1
              : now.month
          ]
        }{" "}
        {hasRecords
          ? printerPagesNoSum[printerPagesNoSum.length - 1].end_year
          : now.year}
      </span>{" "}
      по{" "}
      <span className="text-blue-300">
        {" "}
        {months[hasRecords ? printer_pages.end_month - 1 : now.month]}{" "}
        {printer_pages.end_year}
      </span>
    </div>
  );
};

export { DatePicker };
