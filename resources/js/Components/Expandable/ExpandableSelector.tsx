import { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { TextContainer } from "@/Components/Expandable/TextContainer";
import { TripleToggle } from "@/Components/Expandable/TripleToggle";
import NumberInput from "../NumberInput";

export const Expandable = ({
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

  const handleChange = (value: number) => {
    if (years[0] !== value) {
      setYears((prev) => [value, prev[0]]);
    }
  };

  const max = new Date().getFullYear().toString().length;

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
                  <NumberInput
                    onChange={() => {}}
                    className="py-[0.35rem]"
                    max={max}
                  />
                  <TextContainer onChange={() => {}} />
                </>
              )}
            </div>
            <div
              className={`${
                isYearOpen ? "w-1/2" : "w-full"
              } flex flex-col gap-2`}
            >
              <NumberInput
                onChange={() => {}}
                className="py-[0.35rem]"
                max={max}
              />
              {isMonthOpen && <TextContainer onChange={() => {}} />}
              <TextContainer onChange={() => {}} />
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
