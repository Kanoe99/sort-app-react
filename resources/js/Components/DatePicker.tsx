import { useEffect, useRef, useState } from "react";

import { months, startingMonths } from "@/utils/months";

interface DatePickerProps {
  end_year: number;
  end_month: number;
  start_year: number;
  start_month: number;
  text?: string;
  isSum?: boolean;
}

interface Dates {
  start: {
    month: number;
    year: number;
  };
  end: {
    month: number;
    year: number;
  };
}

const PickerButton = ({
  year,
  month,
  isStarting,
  isSum,
}: {
  year: number;
  month: number;
  isStarting: boolean;
  isSum: boolean;
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
          console.log("date month: ", date.getMonth());
          if (isNaN(date.getTime())) {
            setDate({ year: year, month: month });
            setIsOpened(false);
            suppressNextFocus.current = true;
            return;
          }
          setDate({ year: date.getFullYear(), month: date.getMonth() - 1 });
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
  end_year,
  end_month,
  start_year,
  start_month,
  text,
  isSum = false,
}: DatePickerProps) => {
  const [dates, setDates] = useState<Dates>({
    start: {
      year: start_year,
      month: start_month,
    },
    end: {
      year: end_year,
      month: end_month,
    },
  });

  return end_year === start_year && end_month === start_month ? (
    <div className="text-blue-500 px-4 mt-1 text-sm">
      {text ? text + " " : ""}за{" "}
      <PickerButton
        isStarting={false}
        month={end_month}
        year={end_year}
        isSum={isSum}
      />
    </div>
  ) : (
    <div className="text-sm px-4 mt-1 text-blue-500">
      {text ? text + " " : ""}c{" "}
      <PickerButton
        isStarting={true}
        month={start_month}
        year={start_year}
        isSum={isSum}
      />
      по{" "}
      <PickerButton
        isStarting={false}
        month={end_month}
        year={end_year}
        isSum={isSum}
      />
    </div>
  );
};

export { DatePicker };
