import { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import MonthsDropdown from "@/Components/MonthsDropDown";
import NumberInput from "./NumberInput";

const TextContainer = ({
  onChange,
  isMonth,
  contentFar,
}: {
  isMonth: boolean;
  placeHolder?: string | undefined;
  tabIndex?: number | undefined;
  monthCondition: boolean;
  yearCondition: boolean;
  contentFar?: boolean;
  onChange: (value: number) => void;
}) => {
  const max = new Date().getFullYear().toString().length;
  if (!isMonth) {
    return (
      <NumberInput onChange={onChange} className="py-[0.35rem]" max={max} />
    );
  } else {
    return (
      <MonthsDropdown
        id=""
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
  const [months, setMonths] = useState<number[]>([]);
  const [years, setYears] = useState<number[]>([]);

  // useEffect(() => {
  //   console.log(printedData);
  // }, [printedData]);

  useEffect(() => {
    console.log(
      `%c${years}`,
      "background-color: black; color: white; padding: 10px; border: 1px solid green;"
    );
  }, [years, months]);

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

  const handleYears = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: number
  ) => {
    setYears((prev) => [Number(e.target.value), prev[0]]);
    console.log("test");
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
                  <TextContainer
                    onChange={(value: number) => {
                      if (years[0] !== value) {
                        setYears((prev) => [value, prev[0]]);
                      }
                    }}
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
                onChange={(value: number) => {
                  if (years[0] !== value) {
                    setYears((prev) => [value, prev[1]]);
                  }
                }}
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
