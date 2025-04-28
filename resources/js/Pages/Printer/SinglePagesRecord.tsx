import { useEffect } from "react";

/////////////////////////////////////////////////////////

import { PrinterPages } from "@/types";
import { DatePicker } from "@/Pages/Printer/Components/DatePicker";
import PrintPagesInput from "@/Pages/Printer/Components/PrintPagesInput";
import { usePagesRecordsContext } from "@/Pages/Printer/contexts/PagesRecordsContext";
import InputError from "@/Components/InputError";

interface SinglePagesRecordProps {
  errors: Record<string, string>;
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
  errors,
  printer_pages,
  index,
  changePrinterPagesValues,
}: SinglePagesRecordProps) => {
  const { printerPagesNoSumReversed, setPrinterPagesNoSumReversed, setData } =
    usePagesRecordsContext();

  // useEffect(
  //   () =>
  //     setData("printer_pages_no_sum", [...printerPagesNoSumReversed].reverse()),
  //   [printerPagesNoSumReversed]
  // );

  const errorIndex = printerPagesNoSumReversed.length - 1 - index;

  const onlyNumbers = (value: string) => {
    const regex = /[^0-9]+/g;
    const result = value.replace(regex, "");
    return result;
  };

  return (
    <div className="flex flex-col gap-1 h-fit max-h-[40rem] px-2 py-1 pb-2 rounded-md bg-white/5 border-[1px] border-black">
      <div className="flex gap-2">
        <PrintPagesInput
          className={
            errors[`printer_pages_no_sum.${errorIndex}.print_pages`] &&
            "border-red-500"
          }
          type="text"
          placeholder="5874"
          value={onlyNumbers(printer_pages.print_pages)}
          onChange={(e) => {
            const records = changePrinterPagesValues(
              printerPagesNoSumReversed,
              "print_pages",
              e.target.value,
              index
            );
            onlyNumbers(e.target.value);
            setPrinterPagesNoSumReversed(records);
            setData("printer_pages_no_sum", [...records].reverse());
          }}
        />
        <PrintPagesInput
          className={
            errors[`printer_pages_no_sum.${errorIndex}.scan_pages`] &&
            "border-red-500"
          }
          type="text"
          placeholder="5875"
          value={onlyNumbers(printer_pages.scan_pages)}
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
      <div className="px-4 mt-0">
        {errors[`printer_pages_no_sum.${errorIndex}.print_pages`] && (
          <InputError
            message={errors[`printer_pages_no_sum.${errorIndex}.print_pages`]}
          />
        )}
        {errors[`printer_pages_no_sum.${errorIndex}.print_pages`] && (
          <InputError
            message={errors[`printer_pages_no_sum.${errorIndex}.scan_pages`]}
          />
        )}
      </div>
      <InputError
        className="mt-2 px-4"
        message={errors[`printer_pages_no_sum.${errorIndex}.scan_pages`]}
      />
      <DatePicker index={index} pagesData={printer_pages} />
      <div className="px-2">
        <InputError
          className="mt-2 px-2"
          message={errors[`printer_pages_no_sum.${errorIndex}.end_year`]}
        />
        <InputError
          className="mt-2 px-2"
          message={errors[`printer_pages_no_sum.${errorIndex}.start_year`]}
        />
      </div>
    </div>
  );
};

export { SinglePagesRecord };
