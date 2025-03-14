import { useContext } from "react";
import { usePrinterCardContext } from "@/Components/PrinterCardContext";

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

  const { test, setTest } = usePrinterCardContext();

  return (
    <div className="flex justify-between mx-2 mb-2">
      <div
        className="bg-green-300 rounded-md border-2 border-blue-600 cursor-pointer select-none"
        onClick={() => {
          setTest("new test value");
        }}
      >
        click here
      </div>
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

export { TripleToggle };
