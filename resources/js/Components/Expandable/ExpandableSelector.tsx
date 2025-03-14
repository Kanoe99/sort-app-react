import { useState, useEffect, ChangeEvent } from "react";
import { useForm } from "@inertiajs/react";
import { TripleToggle } from "@/Components/Expandable/TripleToggle";
import NumberInput from "../NumberInput";
import MonthsDropdown from "./MonthsDropdown";
import { printedData } from "@/Components/PrinterModal";

interface DateRange {
  startMonth: number;
  startYear: number | "";
  endMonth: number;
  endYear: number | "";
}

export const Expandable = ({
  setPrintedData,
  isPrint,
  printer_id,
}: {
  printedData: printedData | undefined;
  setPrintedData: (printedData: printedData) => void;
  isPrint: boolean;
  printer_id: number;
}) => {
  const { data, setData, get, processing, errors } = useForm({
    printer_id: printer_id,
  });

  const [isMonthOpen, setIsMonthOpen] = useState<boolean>(false);
  const [isYearOpen, setIsYearOpen] = useState<boolean>(false);

  const currentDate = new Date();
  const pastDate = new Date(currentDate);
  pastDate.setMonth(currentDate.getMonth() - 3);

  const [dates, setDates] = useState<DateRange>({
    startYear: pastDate.getFullYear(),
    startMonth: pastDate.getMonth() + 1,
    endYear: currentDate.getFullYear(),
    endMonth: currentDate.getMonth() + 1,
  });

  useEffect(() => {
    console.log(
      `%c${(dates?.startYear, dates?.endYear)}`,
      "background-color: black; color: white; padding: 10px; border: 1px solid green;"
    );
  }, [dates?.startYear, dates?.endYear]);

  const handleSearch = () => {
    const endPoint = isPrint ? "printed" : "scanned";

    const rangeEnd = `&end_year=${dates?.endYear}&end_month=${dates?.endMonth}`;

    const rangeStart = isYearOpen
      ? `&start_year=${dates?.startYear}&start_month=${dates?.startMonth}`
      : isMonthOpen
      ? `&start_month=${dates.startMonth}`
      : "";

    const url = `/${endPoint}?printer_id=${printer_id}${rangeStart}${rangeEnd}`;

    const fetchData = async () => {
      const response = await fetch(url);
      const printedData = await response.json();
      console.log(url);
      console.warn("isYearOpen: " + isYearOpen);
      console.warn("isMonthOpen: " + isMonthOpen);
      setPrintedData(printedData);
      console.log("printedData: " + printedData);
    };
    fetchData();
  };

  const max = new Date().getFullYear().toString().length;

  const handleMonthChange = (key: "startMonth" | "endMonth", month: number) => {
    setDates((prev) => ({
      ...prev,
      [key]: month,
    }));
  };

  const handleYearChange = (
    key: "startYear" | "endYear",
    year: number | "" | ChangeEvent<HTMLInputElement>
  ) => {
    setDates((prev) => ({
      ...prev,
      [key]: year,
    }));
  };

  return (
    <form className="rounded-b-lg z-[] flex flex-col justify-center min-h-[10rem] relative">
      <TripleToggle
        isYearOpen={isYearOpen}
        isMonthOpen={isMonthOpen}
        handleIsYearOpen={setIsYearOpen}
        handleIsMonthOpen={setIsMonthOpen}
      />
      <div className="flex justify-center items-center relative">
        <div>
          <div className="pl-4 select-none bg-black shadow-white/10 shadow-inner px-2 pb-1 pt-2 rounded-md outline outline-[1px] mx-2 outline-black font-bold text-sm mt-2 w-[14rem]">
            {isPrint ? "Напечатано" : "Отсканировано"}
          </div>
          <div
            className={`flex ${
              isYearOpen ? "gap-2" : "gap-0"
            } my-3 mx-2 w-[14rem]`}
          >
            <div
              className={`${
                isYearOpen
                  ? "w-1/2 gap-2 flex flex-col"
                  : "w-0 invisible opacity-0 hidden"
              } `}
            >
              {isYearOpen && (
                <>
                  <NumberInput
                    value={dates.startYear === "" ? "" : dates.startYear}
                    _placeholder={dates.startYear}
                    onChange={(year) => handleYearChange("startYear", year)}
                    className="py-[0.35rem]"
                    max={max}
                  />
                  <MonthsDropdown
                    id="startMonth"
                    month={dates.startMonth}
                    onChange={(month) => handleMonthChange("startMonth", month)}
                  />
                </>
              )}
            </div>

            <div
              className={`${
                isYearOpen ? "w-1/2" : "w-full"
              } flex flex-col gap-2`}
            >
              <NumberInput
                value={dates.endYear}
                _placeholder={dates.endYear}
                onChange={(year) => handleYearChange("endYear", year)}
                className="py-[0.35rem]"
                max={max}
              />
              {isMonthOpen && (
                <MonthsDropdown
                  id="startMonth"
                  contentFar={false}
                  month={dates.startMonth}
                  onChange={(month) => handleMonthChange("startMonth", month)}
                />
              )}
              <MonthsDropdown
                id="endMonth"
                contentFar={false}
                month={dates.endMonth}
                onChange={(month) => handleMonthChange("endMonth", month)}
              />
            </div>
          </div>
          <div className="w-[14rem] mx-2">
            <button
              onClick={handleSearch}
              type="button"
              className={`w-full py-1 select-none mb-5 text-center font-bold text-black bg-white hover:text-white hover:bg-black cursor-pointer text-lg rounded-lg border`}
            >
              Найти
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
