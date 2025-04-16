import { FormEventHandler, useEffect, useRef, useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import PrintPagesInput from "@/Pages/Printer/Components/PrintPagesInput";
import { PrinterPages } from "@/types";
import { SinglePagesRecord } from "@/Pages/Printer/SinglePagesRecord";
import { DatePicker } from "@/Pages/Printer/Components/DatePicker";

interface PagesRecordsPanelProps {
  printer_pages_no_sum: PrinterPages[];
  setData: (key: string, value: PrinterPages[]) => void;
  processing: boolean;
  editPrinter: FormEventHandler;
  sums: PrinterPages;
  printer_id: number;
}

const PagesRecordsPanel = ({
  printer_pages_no_sum,
  sums,
  setData,
  processing,
  editPrinter,
  printer_id,
}: PagesRecordsPanelProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isMaxHeightReached, setIsMaxHeightReached] = useState(false);
  const [printerPagesNoSumReversed, setPrinterPagesNoSumReversed] = useState<
    PrinterPages[]
  >([...printer_pages_no_sum].reverse());

  const date = new Date();
  const now = {
    year: date.getFullYear(),
    month: date.getMonth(),
  };

  const getNewRecordDefaults = () => {
    const lastRecord = printerPagesNoSumReversed[0];
    return {
      end_year: now.year,
      end_month: now.month,
      start_year: lastRecord?.end_year ?? now.year,
      start_month: lastRecord?.end_month ?? now.month,
      isSum: 0,
      printer_id: printer_id,
      print_pages: "",
      scan_pages: "",
    };
  };

  const [newPagesNoSum, setNewPagesNoSum] = useState<PrinterPages>(
    getNewRecordDefaults()
  );

  // Update reversed list when props change
  useEffect(() => {
    setNewPagesNoSum(getNewRecordDefaults());
  }, [printer_pages_no_sum]);

  // Check for overflow
  useEffect(() => {
    const checkOverflow = () => {
      const el = contentRef.current;
      if (!el) return;
      setIsMaxHeightReached(el.scrollHeight > el.clientHeight);
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [printer_pages_no_sum]);

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

  const changeRecordDatesValues = (
    index: number,
    records: PrinterPages[],
    year: "end_year" | "start_year",
    month: "end_month" | "start_month",
    year_value: number,
    month_value: number
  ) => {
    return records.map((page, i) =>
      index === i ? { ...page, [year]: year_value, [month]: month_value } : page
    );
  };

  const handleSave = (e: React.FormEvent) => {
    if (
      newPagesNoSum.scan_pages.length !== 0 ||
      newPagesNoSum.print_pages.length !== 0
    ) {
      setPrinterPagesNoSumReversed([
        newPagesNoSum,
        ...printerPagesNoSumReversed.filter(
          (item) => item.print_pages !== "" || item.scan_pages !== ""
        ),
      ]);
    } else {
      setPrinterPagesNoSumReversed([
        ...printerPagesNoSumReversed.filter(
          (item) => item.print_pages !== "" || item.scan_pages !== ""
        ),
      ]);
    }
    editPrinter(e);
  };

  const hasRecords = printer_pages_no_sum.length > 0;

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
                printer_pages_no_sum={printer_pages_no_sum}
                setData={setData}
                pagesData={newPagesNoSum}
                changeRecordDatesValues={changeRecordDatesValues}
                text="новая запись"
                end_year={newPagesNoSum.end_year}
                end_month={newPagesNoSum.end_month}
                start_year={newPagesNoSum.start_year}
                start_month={newPagesNoSum.start_month}
              />
              <div className="flex gap-2 h-fit w-full px-2 py-1 pb-2">
                <div className="w-1/2">
                  <PrintPagesInput
                    type="text"
                    placeholder="5872"
                    value={newPagesNoSum.print_pages}
                    onChange={(e) => {
                      const updated = {
                        ...newPagesNoSum,
                        print_pages: e.target.value,
                      };
                      setNewPagesNoSum(updated);
                      setData("printer_pages_no_sum", [
                        ...printer_pages_no_sum,
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
                    value={newPagesNoSum.scan_pages}
                    onChange={(e) => {
                      const updated = {
                        ...newPagesNoSum,
                        scan_pages: e.target.value,
                      };
                      setNewPagesNoSum(updated);
                      setData("printer_pages_no_sum", [
                        ...printer_pages_no_sum,
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
                printer_pages_no_sum={printer_pages_no_sum}
                setData={setData}
                pagesData={{
                  ...printerPagesNoSumReversed[0],
                  start_month:
                    printerPagesNoSumReversed[
                      printerPagesNoSumReversed.length - 1
                    ].start_month,
                  start_year:
                    printerPagesNoSumReversed[
                      printerPagesNoSumReversed.length - 1
                    ].start_year,
                }}
                changeRecordDatesValues={changeRecordDatesValues}
                text="всего"
                isSum={true}
                end_year={
                  hasRecords ? printerPagesNoSumReversed[0].end_year : now.year
                }
                end_month={
                  hasRecords
                    ? printerPagesNoSumReversed[0].end_month
                    : now.month
                }
                start_year={
                  hasRecords
                    ? printerPagesNoSumReversed[
                        printerPagesNoSumReversed.length - 1
                      ].start_year
                    : now.year
                }
                start_month={
                  hasRecords
                    ? printerPagesNoSumReversed[
                        printerPagesNoSumReversed.length - 1
                      ].start_month
                    : now.month
                }
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
            {printerPagesNoSumReversed.map((printer_pages, index) => (
              <SinglePagesRecord
                printer_pages_no_sum={printer_pages_no_sum}
                changeRecordDatesValues={changeRecordDatesValues}
                printer_pages={printer_pages}
                key={`${printer_pages.start_year}-${printer_pages.start_month}-${index}`}
                index={index}
                changePrinterPagesValues={changePrinterPagesValues}
                printerPagesNoSumReversed={printerPagesNoSumReversed}
                setPrinterPagesNoSumReversed={setPrinterPagesNoSumReversed}
                setData={setData}
              />
            ))}
          </div>
        </div>

        <PrimaryButton
          onClick={handleSave}
          disabled={processing}
          className="w-[calc(100%)] !py-4 mt-2"
        >
          сохранить
        </PrimaryButton>
      </div>
    </div>
  );
};

export { PagesRecordsPanel };
