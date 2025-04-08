import { FormEventHandler, useEffect, useRef, useState } from "react";

import PrimaryButton from "@/Components/PrimaryButton";
import PrintPagesInput from "@/Components/PrintPagesInput";
import { PrinterPages } from "@/types";
import { months, startingMonths } from "@/utils/months";
import { SinglePagesRecord } from "./SinglePagesRecord";

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
  const calendrierRef = useRef<HTMLInputElement>(null);
  const [isMaxHeightReached, setIsMaxHeightReached] = useState(false);
  const [printerPagesNoSum, setPrinterPagesNoSum] =
    useState<PrinterPages[]>(printer_pages_no_sum);
  const date = new Date();
  const now = {
    year: date.getFullYear(),
    month: date.getMonth(),
  };
  const [newPagesNoSum, setNewPagesNoSum] = useState<PrinterPages>({
    end_year: now.year,
    end_month: now.month,
    start_year:
      printer_pages_no_sum.length !== 0
        ? printer_pages_no_sum[printer_pages_no_sum.length - 1].end_year
        : now.year,
    start_month:
      printer_pages_no_sum.length !== 0
        ? printer_pages_no_sum[printer_pages_no_sum.length - 1].end_month
        : now.month,
    isSum: 0,
    printer_id: printer_id,
    print_pages: "",
    scan_pages: "",
  });

  useEffect(() => {
    const checkOverflow = () => {
      const el = contentRef.current;
      if (!el) return;
      if (el.scrollHeight > el.clientHeight) {
        setIsMaxHeightReached(true);
      } else {
        setIsMaxHeightReached(false);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => window.removeEventListener("resize", checkOverflow);
  }, [printer_pages_no_sum]);

  const changePrinterPagesValues = (
    printerPagesNoSum: PrinterPages[],
    key: "print_pages" | "scan_pages",
    value: string,
    index: number
  ): PrinterPages[] => {
    return printerPagesNoSum.map((page, i) =>
      index === i
        ? {
            ...page,
            [key]: value,
          }
        : page
    );
  };

  useEffect(() => {
    setPrinterPagesNoSum(printer_pages_no_sum);
  }, [printer_pages_no_sum]);

  const handleCalendrier = () => {
    calendrierRef.current?.showPicker?.();
    calendrierRef.current?.click();
  };

  return (
    <div
      //bg-accent-underline bg-accent-underline sm:bg-red-500 md:bg-green-500 lg:bg-yellow-500 xl:bg-blue-500 2xl:bg-purple-500 3xl:bg-pink-500
      className="fixed
      
      2xl:right-20 3xl:right-60 xl:right-20 lg:right-5 right-5 z-40 pb-10"
    >
      <div className="px-2 py-1 rounded-md border-2 border-white bg-blue-300 flex flex-col gap-0">
        <div className="flex flex-col gap-1">
          <div
            className="bg-red-400 relative px-2 py-1 rounded-md w-fit cursor-pointer select-none"
            onClick={handleCalendrier}
          >
            <input
              type="date"
              className="absolute left-0 top-10 text-black h-0 w-0 p-0 m-0 border-0 outline-0 ring-0"
              ref={calendrierRef}
            />
            trigger
          </div>
          <div className="bg-blue-700 rounded-md border-2 w-fit border-white px-2 py-1 text-white">
            results
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between p-6 shadow-sm sm:rounded-lg bg-bg-main">
        <div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2 w-full">
              {/*here*/}
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
              <div className="text-xs px-4 mt-1">
                новая запись с{" "}
                <span className="text-blue-300">
                  {
                    startingMonths[
                      printer_pages_no_sum.length !== 0
                        ? printer_pages_no_sum[printer_pages_no_sum.length - 1]
                            .end_month - 1
                        : now.month
                    ]
                  }{" "}
                  {printer_pages_no_sum.length !== 0
                    ? printer_pages_no_sum[printer_pages_no_sum.length - 1]
                        .end_year
                    : now.year}
                </span>{" "}
                по{" "}
                <span className="text-blue-300">
                  {months[now.month]} {now.year}
                </span>
              </div>
              <div
                // key={index.toString() + printer_page.end_year.toString()}
                className="flex gap-2 h-fit w-full px-2 py-1 pb-2"
              >
                <div className="w-1/2">
                  <PrintPagesInput
                    type="text"
                    id="number"
                    placeholder={"5872"}
                    className=""
                    pattern=""
                    value={newPagesNoSum.print_pages}
                    onChange={(e) => {
                      const records = changePrinterPagesValues(
                        [newPagesNoSum],
                        "print_pages",
                        e.target.value,
                        0
                      );
                      setNewPagesNoSum(records[0]);
                      setData("printer_pages_no_sum", [
                        ...printerPagesNoSum,
                        records[0],
                      ]);
                    }}
                    isFocused
                  />
                </div>
                <div className="w-1/2">
                  <PrintPagesInput
                    type="text"
                    // id="number"
                    placeholder="5873"
                    className=""
                    pattern="\d*"
                    value={newPagesNoSum.scan_pages}
                    onChange={(e) => {
                      const records = changePrinterPagesValues(
                        [newPagesNoSum],
                        "scan_pages",
                        e.target.value,
                        0
                      );
                      setNewPagesNoSum(records[0]);
                      setData("printer_pages_no_sum", [
                        ...printerPagesNoSum,
                        records[0],
                      ]);
                    }}
                  />
                </div>
              </div>
            </div>
            <hr />
            <div className="flex flex-col gap-2 w-full px-2 py-1 pb-2 rounded-md bg-white/5 border-[1px] border-black">
              <div className="flex gap-2">
                <div className="w-1/2">
                  <PrintPagesInput
                    disabled={true}
                    type="text"
                    // id="number"
                    placeholder="5873"
                    className=""
                    // pattern="\d*"
                    value={sums.print_pages}
                    isFocused
                    // autoComplete="number"
                  />
                </div>
                <div className="w-1/2">
                  <PrintPagesInput
                    disabled={true}
                    type="text"
                    // id="number"
                    placeholder="5874"
                    className=""
                    // pattern="\d*"
                    value={sums.scan_pages}
                    isFocused
                    // autoComplete="number"
                  />
                </div>
              </div>
              <div className="text-xs px-4 mt-1">
                всего с{" "}
                <span className="text-blue-300">
                  {
                    startingMonths[
                      printer_pages_no_sum.length !== 0
                        ? printer_pages_no_sum[printer_pages_no_sum.length - 1]
                            .end_month - 1
                        : now.month
                    ]
                  }{" "}
                  {printer_pages_no_sum.length !== 0
                    ? printer_pages_no_sum[printer_pages_no_sum.length - 1]
                        .end_year
                    : now.year}
                </span>{" "}
                по{" "}
                <span className="text-blue-300">
                  {
                    months[
                      printer_pages_no_sum.length !== 0
                        ? printer_pages_no_sum[printer_pages_no_sum.length - 1]
                            .end_month - 1
                        : now.month
                    ]
                  }{" "}
                  {printer_pages_no_sum.length !== 0
                    ? printer_pages_no_sum[printer_pages_no_sum.length - 1]
                        .end_year
                    : now.year}
                </span>
              </div>
            </div>
          </div>

          <hr className="my-5" />
          <div
            ref={contentRef}
            className={`overflow-x-hidden h-fit flex flex-col gap-2 mb-[1.2rem] max-h-[21.3rem] custom-scrollbar scroll-padding overflow-y-auto scrollbar-thin ${
              isMaxHeightReached ? "pr-3" : ""
            }`}
          >
            {printerPagesNoSum.map((printer_pages, index) => (
              <SinglePagesRecord
                index={index}
                printer_pages={printer_pages}
                changePrinterPagesValues={changePrinterPagesValues}
                hasRecords={printer_pages_no_sum.length !== 0}
                now={now}
                printerPagesNoSum={printerPagesNoSum}
                setPrinterPagesNoSum={setPrinterPagesNoSum}
                setData={setData}
              />
            ))}
          </div>
        </div>
        <PrimaryButton
          onClick={(e) => {
            editPrinter(e);
            setNewPagesNoSum({
              end_year: now.year,
              end_month: now.month,
              start_year:
                printer_pages_no_sum.length !== 0
                  ? printer_pages_no_sum[printer_pages_no_sum.length - 1]
                      .end_year
                  : now.year,
              start_month:
                printer_pages_no_sum.length !== 0
                  ? printer_pages_no_sum[printer_pages_no_sum.length - 1]
                      .end_month
                  : now.month,
              isSum: 0,
              printer_id: printer_id,
              print_pages: "",
              scan_pages: "",
            });
          }}
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
