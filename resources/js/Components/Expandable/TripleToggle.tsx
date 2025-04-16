import { usePrinterCardContext } from "@/Components/PrinterCardContext";

const TripleToggle = ({
  isYearOpen,
  isMonthOpen,
  handleIsYearOpen,
  handleIsMonthOpen,
  isPrint,
}: {
  isYearOpen: boolean;
  isMonthOpen: boolean;
  handleIsYearOpen: (isYearOpen: boolean) => void;
  handleIsMonthOpen: (isMonthOpen: boolean) => void;
  isPrint: boolean;
}) => {
  const ym_local = !isMonthOpen && !isYearOpen;
  const ymm_local = isMonthOpen && !isYearOpen;
  const yym_local = !isMonthOpen && isYearOpen;

  const { panels, setPanels } = usePrinterCardContext();
  const selectedPanels = isPrint ? panels.print : panels.scan;

  return (
    <div className="flex justify-between mx-2 mb-2">
      <div
        onClick={() => {
          if (isMonthOpen || isYearOpen) {
            handleIsMonthOpen(false);
            handleIsYearOpen(false);
            setPanels((prev) => ({
              ...prev,
              [isPrint ? "print" : "scan"]: {
                ym: true,
                ymm: false,
                yym: false,
              },
            }));
          }
        }}
        className={`bg-black border ${
          ym_local ? "text-black bg-white" : "text-white bg-black"
        } w-[4rem] text-center font-bold p-1 rounded-lg cursor-pointer select-none`}
      >
        ГМ
      </div>
      <div
        onClick={() => {
          if (!isMonthOpen) {
            handleIsMonthOpen(true);
            handleIsYearOpen(false);
            setPanels((prev) => ({
              ...prev,
              [isPrint ? "print" : "scan"]: {
                ym: false,
                ymm: true,
                yym: false,
              },
            }));
          }
        }}
        className={`bg-black border ${
          ymm_local ? "text-black bg-white" : "text-white bg-black"
        } w-[4rem] text-center font-bold p-1 rounded-lg cursor-pointer select-none`}
      >
        ГMМ
      </div>
      <div
        onClick={() => {
          if (!isYearOpen) {
            // console.log(yym_local + " changing yym_local");
            handleIsMonthOpen(false);
            handleIsYearOpen(true);
            setPanels((prev) => ({
              ...prev,
              [isPrint ? "print" : "scan"]: {
                ym: false,
                ymm: false,
                yym: true,
              },
            }));
          }
        }}
        className={`bg-black border ${
          yym_local ? "text-black bg-white" : "text-white bg-black"
        } w-[4rem] text-center font-bold p-1 rounded-lg cursor-pointer select-none`}
      >
        ГГМ
      </div>
    </div>
  );
};

export { TripleToggle };
