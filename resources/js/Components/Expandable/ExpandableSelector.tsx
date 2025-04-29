import { useState, ChangeEvent } from "react";
import { useForm } from "@inertiajs/react";
import { TripleToggle } from "@/Components/Expandable/TripleToggle";
import MonthsDropdown from "./MonthsDropdown";
import { printedData } from "@/Pages/Printer/Components/PrinterModal";
import { usePrinterCardContext } from "@/Pages/Printer/contexts/PrinterCardContext";
import YearsDropdown from "@/Components/Expandable/YearsDropdown";
import InputError from "../InputError";

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

  const { dates, setDates, panels } = usePrinterCardContext();
  const selectedDates = isPrint ? dates.print : dates.scan;
  const { endYear, endMonth, startYear, startMonth } = selectedDates;
  const selectedPanels = isPrint ? panels.print : panels.scan;
  const { ym, yym, ymm } = selectedPanels;

  const handleSearch = () => {
    const endPoint = isPrint ? "printed" : "scanned";

    const rangeEnd = `&end_year=${endYear}&end_month=${endMonth}`;

    const rangeStart = isYearOpen
      ? `&start_year=${startYear}&start_month=${startMonth}`
      : isMonthOpen
      ? `&start_month=${startMonth}`
      : "";

    const url = `/${endPoint}?printer_id=${printer_id}${rangeStart}${rangeEnd}`;

    const fetchData = async () => {
      const response = await fetch(url);
      const printedData = await response.json();

      console.warn("isYearOpen: " + isYearOpen);
      console.warn("isMonthOpen: " + isMonthOpen);
      setPrintedData(printedData);
    };
    fetchData();
  };

  const max = new Date().getFullYear().toString().length;

  const handleMonthChange = (key: "startMonth" | "endMonth", month: number) => {
    setDates((prev) => ({
      ...prev,
      [isPrint ? "print" : "scan"]: {
        ...prev[isPrint ? "print" : "scan"],
        [key]: month,
      },
    }));
  };

  const handleYearChange = (
    key: "startYear" | "endYear",
    year: number | "" | ChangeEvent<HTMLInputElement>
  ) => {
    setDates((prev) => ({
      ...prev,
      [isPrint ? "print" : "scan"]: {
        ...prev[isPrint ? "print" : "scan"],
        [key]: year,
      },
    }));
  };

  return (
    <form className="rounded-b-lg z-[] flex flex-col justify-center min-h-[10rem] relative">
      <TripleToggle
        isPrint={isPrint}
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
                  <YearsDropdown
                    id="startYear"
                    year={startYear}
                    onChange={(year) => handleYearChange("startYear", year)}
                  />
                  <MonthsDropdown
                    id="startMonth"
                    month={startMonth}
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
              <YearsDropdown
                id="startYear"
                contentFar={false}
                year={endYear}
                onChange={(year) => handleYearChange("endYear", year)}
              />
              {isMonthOpen && (
                <MonthsDropdown
                  id="startMonth"
                  contentFar={false}
                  month={startMonth}
                  onChange={(month) => handleMonthChange("startMonth", month)}
                />
              )}
              <MonthsDropdown
                id="endMonth"
                contentFar={false}
                month={endMonth}
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
