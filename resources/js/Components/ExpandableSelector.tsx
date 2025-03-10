import { useState, FormEvent, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "@inertiajs/react";

const TextContainer = ({
  monthCondition,
  yearCondition,
  tabIndex,
  placeHolder,
}: {
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
        text-center bg-transparent overflow-hidden grid place-items-center shadow-[inset_0_0_0_2px_rgba(0,0,0,0.5)] h-[2rem] text-white p-0 ${
          yearCondition && monthCondition
            ? `opacity-100 w-full block mb-2`
            : "opacity-0 hidden w-0 overflow-hidden invisible"
        }`}
    />
  );
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
      <TripleToggle
        isYearOpen={isYearOpen}
        isMonthOpen={isMonthOpen}
        handleIsYearOpen={setIsYearOpen}
        handleIsMonthOpen={setIsMonthOpen}
      />
      <div className="flex justify-center items-center relative">
        <div>
          <div className="pl-4 bg-black shadow-white/10 shadow-inner px-2 pb-1 pt-2 rounded-md outline outline-[1px] mx-2 outline-black font-bold text-sm mt-2 w-[14rem]">
            {isPrint ? "Напечатано" : "Отсканировано"}
          </div>
          <div
            className={`flex ${
              isYearOpen ? "gap-2" : "gap-0"
            } my-3 mx-2 w-[14rem]`}
          >
            <div className={isYearOpen ? "w-1/2" : "w-0"}>
              <TextContainer
                placeHolder="2024"
                tabIndex={!isYearOpen ? -1 : 0}
                yearCondition={isYearOpen}
                monthCondition={!isMonthOpen}
              />
              <TextContainer
                placeHolder="ЯНВ"
                tabIndex={!isYearOpen ? -1 : 0}
                yearCondition={isYearOpen}
                monthCondition={!isMonthOpen}
              />
            </div>
            <div className={isYearOpen ? "w-1/2" : "w-full"}>
              <TextContainer
                placeHolder="2025"
                yearCondition={true}
                monthCondition={true}
              />
              <TextContainer
                placeHolder="ЯНВ"
                tabIndex={!isMonthOpen ? -1 : 0}
                monthCondition={isMonthOpen}
                yearCondition={!isYearOpen}
              />
              <TextContainer
                placeHolder="ФЕВ"
                monthCondition={true}
                yearCondition={true}
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
