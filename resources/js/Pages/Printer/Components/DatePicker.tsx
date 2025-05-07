import { useEffect, useRef, useState } from "react";

/////////////////////////////////////////////////////

import { PrinterPages } from "@/types";
import { months, startingMonths } from "@/utils/months";
import { useEditPagesRecordsContext } from "@/Pages/Printer/contexts/EditPagesRecordsContext";
import { now } from "@/utils/currentDate";

interface DatePickerProps {
  start_year?: number;
  start_month?: number;
  text?: string;
  isSum?: boolean;
  pagesData: PrinterPages;
  index: number;
  isNew?: boolean;
}

const PickerButton = ({
  year,
  month,
  isStarting,
  isSum,
  pagesData,
  index,
  isNew,
}: {
  isNew: boolean;
  index: number;
  year: number;
  month: number;
  isStarting: boolean;
  isSum: boolean;
  pagesData: PrinterPages;
}) => {
  const calendrierRef = useRef<HTMLInputElement>(null);
  const handleCalendrier = (isSum: boolean) => {
    if (!calendrierRef.current || isSum) {
      return;
    }
    calendrierRef.current.focus();
    calendrierRef.current.showPicker();
  };
  const suppressNextFocus = useRef(false);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [date, setDate] = useState<{ year: number; month: number }>({
    year: year,
    month: month,
  });

  const {
    setNewPagesNoSum,
    setPrinterPagesNoSumReversed,
    printerPagesNoSumReversed,
    setData,
    changeRecordDatesValues,
  } = useEditPagesRecordsContext();

  useEffect(() => {
    const incomingDate = new Date(year, month);
    const nowDate = new Date(now.year, now.month);

    if (incomingDate > nowDate) {
      setDate({ year: now.year, month: now.month });
    } else {
      setDate({ year, month });
    }
  }, [year, month]);

  return (
    <span
      className={`${
        isOpened ? "text-white" : "text-blue-300"
      } relative select-none ${!isSum ? "cursor-pointer" : ""}`}
      onClick={() => {
        handleCalendrier(isSum);
      }}
    >
      {isStarting ? startingMonths[date.month] : months[date.month]} {date.year}{" "}
      <input
        tabIndex={-1}
        onChange={(e) => {
          const dateStr = e.target.value;
          const date = new Date(dateStr);

          if (isNaN(date.getTime())) {
            setDate({ year, month });
            setIsOpened(false);
            suppressNextFocus.current = true;
            return;
          }

          const selectedYear = date.getFullYear();
          const selectedMonth = date.getMonth();

          setDate({ year: selectedYear, month: selectedMonth });

          const updated = [
            ...changeRecordDatesValues(
              index,
              printerPagesNoSumReversed,
              isStarting ? "start_year" : "end_year",
              isStarting ? "start_month" : "end_month",
              selectedYear,
              selectedMonth
            ),
          ].reverse();

          const new_entry = [
            ...[...printerPagesNoSumReversed].reverse(),
            {
              ...pagesData,
              ...(isStarting
                ? {
                    start_year: selectedYear,
                    start_month: selectedMonth,
                  }
                : {
                    end_year: selectedYear,
                    end_month: selectedMonth,
                  }),
            },
          ];

          isNew
            ? setNewPagesNoSum({
                ...pagesData,
                ...(isStarting
                  ? {
                      start_year: selectedYear,
                      start_month: selectedMonth,
                    }
                  : {
                      end_year: selectedYear,
                      end_month: selectedMonth,
                    }),
              })
            : setPrinterPagesNoSumReversed([...updated].reverse());

          const values: PrinterPages[] = isNew ? new_entry : updated;
          setData("printer_pages_no_sum", values);

          setIsOpened(false);
          suppressNextFocus.current = true;
        }}
        onFocus={() => {
          if (suppressNextFocus.current) {
            suppressNextFocus.current = false;
            return;
          }
          setIsOpened(true);
        }}
        onBlur={() => {
          setIsOpened(false);
        }}
        ref={calendrierRef}
        type="month"
        className="p-0 m-0 h-0 w-0 bg-transparent border-0 absolute top-4 left-0 opacity-0"
      />
    </span>
  );
};

const DatePicker = ({
  pagesData,
  text,
  isSum = false,
  index,
  isNew = false,
}: DatePickerProps) => {
  // return;
  // pagesData.end_year === pagesData.start_year &&
  //   pagesData.end_month === pagesData.start_month ? (
  //   <div className="text-blue-500 px-4 mt-1 text-sm">
  //     {text ? text + " " : ""}за{" "}
  //     <PickerButton
  //       isNew={isNew}
  //       index={index}
  //       pagesData={pagesData}
  //       isStarting={false}
  //       month={pagesData.end_month}
  //       year={pagesData.end_year}
  //       isSum={isSum}
  //     />
  //   </div>
  // ) :
  return (
    <div className="text-sm px-4 mt-1 text-blue-500">
      {text ? text + " " : ""}c{" "}
      <PickerButton
        isNew={isNew}
        index={index}
        pagesData={pagesData}
        isStarting={true}
        month={pagesData.start_month}
        year={pagesData.start_year}
        isSum={isSum}
      />
      по{" "}
      <PickerButton
        isNew={isNew}
        index={index}
        pagesData={pagesData}
        isStarting={false}
        month={pagesData.end_month}
        year={pagesData.end_year}
        isSum={isSum}
      />
    </div>
  );
};

export { DatePicker };
