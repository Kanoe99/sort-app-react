import { useEffect, useRef, useState, useMemo } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import PrintPagesInput from "@/Pages/Printer/Components/PrintPagesInput";
import { PrinterPages } from "@/types";
import { SinglePagesRecord } from "@/Pages/Printer/SinglePagesRecord";
import { DatePicker } from "@/Pages/Printer/Components/DatePicker";
import { useEditPagesRecordsContext } from "@/Pages/Printer/contexts/EditPagesRecordsContext";
import { now } from "@/utils/currentDate";
// import { now } from "@/utils/currentDate";

interface CreatePagesRecordsPanelProps {
  processing: boolean;
  printer_id: number;
  errors: Record<string, string>;
}

const CreatePagesRecordsPanel = ({
  errors,
  processing,
}: CreatePagesRecordsPanelProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isMaxHeightReached, setIsMaxHeightReached] = useState(false);
  const {
    printerPagesNoSumReversed,
    setPrinterPagesNoSumReversed,
    setData,
    setNewPagesNoSum,
    newPagesNoSum,
  } = useEditPagesRecordsContext();

  const onlyNumbers = (value: string) => {
    const regex = /[^0-9]+/g;
    const result = value.replace(regex, "");
    return result;
  };

  const sums = useMemo(() => {
    const records = printerPagesNoSumReversed;
    const total = {
      end_month: now.month,
      end_year: now.year,
      start_year: now.year,
      start_month: now.month,
      isSum: 1,
      printer_id: 0,
      print_pages: 0,
      scan_pages: 0,
    };

    if (records.length === 0) return total;

    total.start_year = records[records.length - 1].start_year;
    total.start_month = records[records.length - 1].start_month;
    total.end_year = records[0].end_year;
    total.end_month = records[0].end_month;

    for (const item of records) {
      total.print_pages += parseInt(item.print_pages || "0", 10);
      total.scan_pages += parseInt(item.scan_pages || "0", 10);
    }

    return total;
  }, [printerPagesNoSumReversed]);

  // useEffect(() => {
  //   printerPagesNoSumReversed.forEach((item: any) => {
  //     sums.print_pages += item.print_pages;
  //     sums.scan_pages += item.scan_pages;
  //   });
  // }, [printerPagesNoSumReversed]);

  //
  // clear new page entry

  //adjust scrollable area
  useEffect(() => {
    const checkOverflow = () => {
      const el = contentRef.current;
      if (!el) return;
      setIsMaxHeightReached(el.scrollHeight > el.clientHeight);
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [sums]);

  const changePrinterPagesValues = (
    records: PrinterPages[],
    pages: "print_pages" | "scan_pages",
    value: string,
    index: number
  ): PrinterPages[] => {
    return records.map((page, i) =>
      index === i ? { ...page, [pages]: value } : page
    );
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    const isValid =
      (newPagesNoSum && newPagesNoSum.print_pages.length > 0) ||
      (newPagesNoSum && newPagesNoSum.scan_pages.length > 0);

    const cleanedRecords = printerPagesNoSumReversed.filter(
      (item: any) => item.print_pages !== "" || item.scan_pages !== ""
    );

    // Step 1: Add only if valid
    if (isValid) {
      setPrinterPagesNoSumReversed([newPagesNoSum, ...cleanedRecords]);
    } else {
      setPrinterPagesNoSumReversed([...cleanedRecords]);
    }

    // Step 2: Reset cleanly
    setNewPagesNoSum({
      end_year: now.year,
      end_month: now.month,
      start_year:
        cleanedRecords.length > 0 ? cleanedRecords[0].end_year : now.year,
      start_month:
        cleanedRecords.length > 0 ? cleanedRecords[0].end_month : now.month,
      isSum: 0,
      printer_id: 0,
      print_pages: "",
      scan_pages: "",
    });

    console.log("handleAdd was clicked");
  };

  return (
    <div className="fixed right-5 lg:right-5 xl:right-20 2xl:right-20 3xl:right-60 z-40 pb-10">
      <div className="flex flex-col justify-between p-6 shadow-sm sm:rounded-lg bg-bg-main">
        <div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2 w-full">
              <div className="flex justify-between gap-2">
                <div className="w-1/2">
                  <div className="px-4 font-bold text-gray-300">напечатано</div>
                </div>
                <div className="w-1/2">
                  <div className="px-4 font-bold text-gray-300">
                    отсканировано
                  </div>
                </div>
              </div>
              <hr />

              {/* New Record Input */}
              <DatePicker
                index={0}
                isNew={true}
                pagesData={newPagesNoSum}
                text="новая запись"
              />
              <div className="flex gap-2 h-fit w-full px-2 py-1 pb-2">
                <div className="w-1/2">
                  <PrintPagesInput
                    type="text"
                    placeholder="5872"
                    value={onlyNumbers(newPagesNoSum.print_pages)}
                    onChange={(e) => {
                      const updated = {
                        ...newPagesNoSum,
                        print_pages: e.target.value,
                      };
                      setNewPagesNoSum(updated);
                      setData("printer_pages_no_sum", [
                        ...[...printerPagesNoSumReversed].reverse(),
                        updated,
                      ]);
                    }}
                    isFocused
                  />
                </div>
                <div className="w-1/2">
                  <PrintPagesInput
                    type="text"
                    placeholder="5873"
                    value={onlyNumbers(newPagesNoSum.scan_pages)}
                    onChange={(e) => {
                      const updated = {
                        ...newPagesNoSum,
                        scan_pages: e.target.value,
                      };
                      setNewPagesNoSum(updated);
                      setData("printer_pages_no_sum", [
                        ...[...printerPagesNoSumReversed].reverse(),
                        updated,
                      ]);
                    }}
                  />
                </div>
              </div>
            </div>
            <hr />

            {/* Sums Display */}
            <div className="flex flex-col gap-2 w-full px-2 py-1 pb-2 rounded-md bg-white/5 border-[1px] border-black">
              <div className="flex gap-2">
                <div className="w-1/2">
                  <PrintPagesInput
                    disabled
                    type="text"
                    placeholder="5873"
                    value={sums.print_pages}
                  />
                </div>
                <div className="w-1/2">
                  <PrintPagesInput
                    disabled
                    type="text"
                    placeholder="5874"
                    value={sums.scan_pages}
                  />
                </div>
              </div>
              <DatePicker
                index={0}
                pagesData={sums}
                text="всего"
                isSum={true}
                start_year={sums.start_year}
                start_month={sums.start_month}
              />
            </div>
          </div>

          <hr className="my-5" />

          {/* Records List */}
          <div
            ref={contentRef}
            className={`overflow-x-hidden h-fit flex flex-col gap-2 mb-[1.2rem] max-h-[21.3rem] custom-scrollbar scroll-padding overflow-y-auto scrollbar-thin ${
              isMaxHeightReached ? "pr-3" : ""
            }`}
          >
            {printerPagesNoSumReversed.map((printer_pages: any, index: any) => (
              <SinglePagesRecord
                errors={errors}
                printer_pages={printer_pages}
                key={`${printer_pages.start_year}-${printer_pages.start_month}-${index}`}
                index={index}
                changePrinterPagesValues={changePrinterPagesValues}
              />
            ))}
          </div>
        </div>

        <PrimaryButton
          onClick={handleAdd}
          disabled={processing}
          className="w-[calc(100%)] !py-4 mt-2"
        >
          добавить запись
        </PrimaryButton>
      </div>
    </div>
  );
};

export { CreatePagesRecordsPanel };
