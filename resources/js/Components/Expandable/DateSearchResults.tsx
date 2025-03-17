import { usePrinterCardContext } from "@/Components/PrinterCardContext";

interface DateSearchResultsProps {
  endYears: number[];
  endMonths: number[];
  startYears: number[];
  startMonths: number[];
  pages: number[];
  isPrint: boolean;
}

const DateSearchResults = ({
  isPrint,
  endYears,
  endMonths,
  startYears,
  startMonths,
  pages,
}: DateSearchResultsProps) => {
  const months = [
    "январь",
    "февраль",
    "март",
    "апрель",
    "май",
    "июнь",
    "июль",
    "август",
    "сентябрь",
    "октябрь",
    "ноябрь",
    "декабрь",
  ];
  const startingMonths = months.map((month) => {
    const last_letter = month.length - 1;
    month =
      month[last_letter] !== "т"
        ? month.slice(0, last_letter) + "я"
        : month + "а";
    return month;
  });

  const { dates, panels } = usePrinterCardContext();
  const selectedDates = isPrint ? dates.print : dates.scan;
  const { endYear, endMonth, startYear, startMonth } = selectedDates;
  const selectedPanels = isPrint ? panels.print : panels.scan;
  const { ym, yym, ymm } = selectedPanels;

  let phrase;
  if (ym) {
    phrase = `За ${months[endMonth !== "" ? endMonth - 1 : 0]} 
    ${endYear} г.`;
  } else if (yym) {
    phrase = `C ${startingMonths[startMonth !== "" ? startMonth - 1 : 0]} 
    ${startYear} г. по ${months[endMonth !== "" ? endMonth - 1 : 0]} 
    ${endYear} г.`;
  } else if (ymm) {
    phrase = `C ${startingMonths[startMonth !== "" ? startMonth - 1 : 0]}  по ${
      months[endMonth !== "" ? endMonth - 1 : 0]
    } 
    ${endYear} г.`;
  }

  return (
    <ul className="bg-black outline outline-1 max-h-[45rem] custom-scrollbar overflow-scroll scrollbar-thin overflow-x-hidden outline-neutral-muted text-white px-4 rounded-md py-3 font-bold flex flex-col gap-3">
      {!pages ? (
        <div className="flex flex-col gap-1 rounded-md px-2 py-1 outline outline-1 outline-neutral-muted">
          не найдено
          <p>{}</p>
        </div>
      ) : (
        <>
          <h3 className="mb-2">
            За указанный период{" "}
            <span className="text-blue-500">
              {isPrint ? "напечатано" : "отсканировано"}
            </span>
            :
          </h3>
          <p className="px-2 py-1 rounded-md outline outline-1 outline-neutral-muted">
            {phrase}
          </p>
          {pages.map((_, index) => (
            <li
              key={`date-search-${_}`}
              className="flex flex-col gap-1 rounded-md px-2 py-1 outline outline-1 outline-neutral-muted"
            >
              <p>
                c {startingMonths[startMonths[index] - 1]} {startYears[index]}{" "}
                г. по {months[endMonths[index] - 1]} {endYears[index]} г.
              </p>
              <div className="flex gap-5 items-end">
                <p className="bg-white/5 w-fit outline outline-1 px-2 py-1 rounded-md outline-neutral-muted">
                  {pages[index].toLocaleString()} <span>страниц</span>
                </p>
              </div>
            </li>
          ))}
        </>
      )}
    </ul>
  );
};

export { DateSearchResults };
