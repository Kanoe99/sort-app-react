import { useState, FormEvent, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "@inertiajs/react";

const TextContainer = ({
  monthCondition,
  yearCondition,
  tabIndex,
  placeHolder,
  width,
}: {
  width: string;
  placeHolder?: string | undefined;
  tabIndex?: number | undefined;
  monthCondition: boolean;
  yearCondition: boolean;
}) => {
  return (
    <input
      placeholder={placeHolder}
      tabIndex={tabIndex ?? 0}
      type="text"
      className={`rounded-lg
        px-5
        text-center bg-transparent overflow-hidden grid place-items-center ${width} shadow-[inset_0_0_0_2px_rgba(0,0,0,0.5)] h-[2rem] text-white p-0 ${
        yearCondition && monthCondition
          ? "opacity-100 block mb-2"
          : "opacity-0 hidden overflow-hidden"
      }`}
    />
  );
};

const Arrow = ({
  handleClick,
  isOpen,
  orientation,
}: {
  handleClick: () => void;
  isOpen: boolean;
  orientation: "horizontal" | "vertical";
}) => {
  return (
    <div
      className={`py-1 h-full bg-black/90 backdrop-blur-sm border border-black hover:bg-black flex justify-center items-center rounded-lg select-none cursor-pointer ${
        orientation === "vertical" && "min-h-[10rem]"
      }`}
      onClick={handleClick}
    >
      <div>
        <FontAwesomeIcon
          icon={faAngleDown}
          className={`text-3xl transition-all duration-500 px-2 ${
            isOpen && orientation === "horizontal" && "rotate-180"
          }
        ${isOpen && orientation === "vertical" && "rotate-[-90deg]"}
        ${orientation === "vertical" && "rotate-90"}
        `}
        />
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
  // const [printedData, setPrintedData] = useState("");
  const [months, setMonths] = useState<string[]>([""]);
  const [years, setYears] = useState<string[]>([""]);

  const handleIsMonthOpen = () => {
    setIsYearOpen(false);
    setIsMonthOpen(!isMonthOpen);
  };

  const handleIsYearOpen = () => {
    setIsMonthOpen(false);
    setIsYearOpen(!isYearOpen);
  };

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
      <div className="absolute left-[-50px] h-full">
        <Arrow
          isOpen={isYearOpen}
          handleClick={handleIsYearOpen}
          orientation="vertical"
        />
      </div>
      <div className="flex justify-center items-center relative">
        <div>
          <div className="pl-4 bg-black shadow-white/10 shadow-inner px-2 pb-1 pt-2 rounded-md outline outline-[1px] outline-black font-bold text-sm mt-2 mx-4 w-[12rem]">
            {isPrint ? "Напечатано" : "Отсканировано"}
          </div>
          <div className={`flex gap-2 my-3 mx-2`}>
            <div className="">
              {/* {isYearOpen && (
                <div className="text-sm text-center w-fit mx-auto">c</div>
              )} */}
              <TextContainer
                width={"w-[6rem]"}
                placeHolder="2024"
                tabIndex={!isYearOpen ? -1 : 0}
                yearCondition={isYearOpen}
                monthCondition={!isMonthOpen}
              />
              <TextContainer
                width={"w-[6rem]"}
                placeHolder="ЯНВ"
                tabIndex={!isYearOpen ? -1 : 0}
                yearCondition={isYearOpen}
                monthCondition={!isMonthOpen}
              />
            </div>
            <div>
              {/* {isYearOpen && (
                <div className="text-sm text-center w-fit mx-auto">по</div>
              )} */}
              <TextContainer
                width={isYearOpen ? "w-[6rem]" : "w-[12rem]"}
                placeHolder="2025"
                yearCondition={true}
                monthCondition={true}
              />
              <TextContainer
                width={isYearOpen ? "w-[6rem]" : "w-[12rem]"}
                placeHolder="ЯНВ"
                tabIndex={!isMonthOpen ? -1 : 0}
                monthCondition={isMonthOpen}
                yearCondition={!isYearOpen}
              />
              <TextContainer
                width={isYearOpen ? "w-[6rem]" : "w-[12rem]"}
                placeHolder="ФЕВ"
                monthCondition={true}
                yearCondition={true}
              />
            </div>
          </div>
          <div className="w-[14rem] px-4">
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
      <div className="absolute bottom-[-50px] w-full">
        <Arrow
          isOpen={isMonthOpen}
          handleClick={handleIsMonthOpen}
          orientation="horizontal"
        />
      </div>
    </form>
  );
};
