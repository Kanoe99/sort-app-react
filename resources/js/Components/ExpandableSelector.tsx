import { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import TextInput from "./TextInput";
import MonthsDropdown from "./MonthsDropdown";

const TextContainer = ({
  isMonth,
  contentFar,
}: {
  isMonth: boolean;
  placeHolder?: string | undefined;
  tabIndex?: number | undefined;
  monthCondition: boolean;
  yearCondition: boolean;
  contentFar?: boolean;
}) => {
  if (!isMonth) {
    return (
      <TextInput
        type="number"
        id="number"
        max="2"
        placeholder="2025"
        className="py-[.35rem]"
        pattern="\d*"
        onChange={(e) => {
          {
            const value = parseInt(e.target.value);
          }
        }}
        isFocused
        autoComplete="number"
      />
    );
  } else {
    return (
      <MonthsDropdown
        contentFar={contentFar}
        db_head={null}
        department_heads={[]}
        setData={function (key: string, value: string): void {
          throw new Error("Function not implemented.");
        }}
      />
    );
  }
};

const TripleToggle = ({
  isYearOpen,
  isMonthOpen,
  handleIsYearOpen,
  handleIsMonthOpen,
}: {
  isYearOpen: boolean;
  isMonthOpen: boolean;
  handleIsYearOpen: (isYearOpen: boolean) => void;
  handleIsMonthOpen: (isMonthOpen: boolean) => void;
}) => {
  const ym = !isMonthOpen && !isYearOpen;
  const ymm = isMonthOpen && !isYearOpen;
  const yym = !isMonthOpen && isYearOpen;

  return (
    <div className="flex justify-between mx-2 mb-2">
      <div
        onClick={() => {
          if (isMonthOpen || isYearOpen) {
            handleIsMonthOpen(false);
            handleIsYearOpen(false);
          }
        }}
        className={`bg-black border ${
          ym ? "text-black bg-white" : "text-white bg-black"
        } w-[4rem] text-center font-bold p-1 rounded-lg cursor-pointer select-none`}
      >
        ГМ
      </div>
      <div
        onClick={() => {
          if (!isMonthOpen) {
            handleIsMonthOpen(true);
            handleIsYearOpen(false);
          }
        }}
        className={`bg-black border ${
          ymm ? "text-black bg-white" : "text-white bg-black"
        } w-[4rem] text-center font-bold p-1 rounded-lg cursor-pointer select-none`}
      >
        ГMМ
      </div>
      <div
        onClick={() => {
          if (!isYearOpen) {
            console.log(yym + " changing yym");
            handleIsMonthOpen(false);
            handleIsYearOpen(true);
          }
        }}
        className={`bg-black border ${
          yym ? "text-black bg-white" : "text-white bg-black"
        } w-[4rem] text-center font-bold p-1 rounded-lg cursor-pointer select-none`}
      >
        ГГМ
      </div>
    </div>
  );
};

export const Expandable = ({
  printedData,
  setPrintedData,
  isPrint,
  printer_id,
}: {
  printedData: string;
  setPrintedData: (printedData: string) => void;
  isPrint: boolean;
  printer_id: number;
}) => {
  const { data, setData, get, processing, errors } = useForm({
    printer_id: printer_id,
  });

  const [isMonthOpen, setIsMonthOpen] = useState<boolean>(false);
  const [isYearOpen, setIsYearOpen] = useState<boolean>(false);
  const [months, setMonths] = useState<string[]>([""]);
  const [years, setYears] = useState<string[]>([""]);

  useEffect(() => {
    console.log(printedData);
  }, [printedData]);

  const handleSearch = () => {
    const endPoint = isPrint ? "printed" : "scanned";

    const rangeEnd = `&end_year=${years[years.length - 1]}&end_month=${
      months[months.length - 1]
    }`;

    const rangeStart = isYearOpen
      ? `&start_year=${years[0]}&start_month=${months[0]}`
      : isMonthOpen
      ? `&start_month=${months[0]}`
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

  return (
    <form className="rounded-b-lg z-[99] flex flex-col justify-center min-h-[10rem] relative">
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
                  <TextContainer
                    isMonth={false}
                    placeHolder="2024"
                    tabIndex={!isYearOpen ? -1 : 0}
                    yearCondition={isYearOpen}
                    monthCondition={!isMonthOpen}
                  />
                  <TextContainer
                    isMonth={true}
                    placeHolder="ЯНВАРЬ"
                    tabIndex={!isYearOpen ? -1 : 0}
                    yearCondition={isYearOpen}
                    monthCondition={!isMonthOpen}
                  />
                </>
              )}
            </div>
            <div
              className={`${
                isYearOpen ? "w-1/2" : "w-full"
              } flex flex-col gap-2`}
            >
              <TextContainer
                contentFar={!isYearOpen}
                isMonth={false}
                placeHolder="2025"
                yearCondition={true}
                monthCondition={true}
              />
              <TextContainer
                contentFar={!isYearOpen}
                isMonth={true}
                placeHolder="ЯНВАРЬ"
                tabIndex={!isMonthOpen ? -1 : 0}
                monthCondition={isMonthOpen}
                yearCondition={!isYearOpen}
              />
              {isMonthOpen && (
                <TextContainer
                  isMonth={true}
                  placeHolder="СЕНТЯБРЬ"
                  monthCondition={true}
                  yearCondition={true}
                />
              )}
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
