interface DateSearchResultsProps {
  endYears: number[];
  endMonths: number[];
  startYears: number[];
  startMonths: number[];
  pages: number[];
  isPrint: boolean;
  searchEndYear: number;
  searchEndMonth: number;
  searchStartYear: number;
  searchStartMonth: number;
  error: string;
}

const DateSearchResults = ({
  isPrint,
  endYears,
  endMonths,
  startYears,
  startMonths,
  pages,
  searchEndYear,
  searchEndMonth,
  searchStartYear,
  searchStartMonth,
  error,
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

  let phrase;
  if (searchEndYear && searchStartYear && searchStartMonth && searchEndMonth) {
    phrase = `с ${startingMonths[searchStartMonth - 1]} 
    ${searchStartYear}  по ${months[searchEndMonth - 1]} 
    ${searchEndYear} `;
  } else if (searchEndYear && searchStartMonth && searchEndMonth) {
    phrase = `с ${startingMonths[searchStartMonth - 1]}  по ${
      months[searchEndMonth - 1]
    } 
    ${searchEndYear} `;
  } else if (searchEndYear && searchEndMonth) {
    phrase = `за ${months[searchEndMonth - 1]} 
    ${searchEndYear} `;
  }

  return (
    <ul className="bg-black outline w-[22rem] outline-1 max-h-[45rem] custom-scrollbar overflow-y-scroll scrollbar-thin overflow-x-hidden outline-neutral-muted text-white px-4 rounded-md py-3 font-bold">
      {!pages ? (
        <div className="flex flex-col gap-3">
          <span className="text-blue-500">
            {isPrint ? "напечатано" : "отсканировано"}
          </span>
          <p className="px-2 py-1 mb-2 rounded-md outline outline-1 text-sm outline-neutral-muted text-blue-300">
            Поиск {phrase}
          </p>
          <div className="rounded-md px-2 py-1 outline outline-1 outline-red-500 text-red-500">
            {error}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3 w-full">
          <h3 className="mb-2 w-full">
            <span className="text-blue-500">
              {isPrint ? "напечатано" : "отсканировано"}
            </span>
          </h3>
          <p className="px-2 py-1 mb-2 rounded-md outline outline-1 text-sm outline-neutral-muted text-blue-300">
            Поиск {phrase}
          </p>
          {pages.map((_, index) => (
            <li
              key={`date-search-${_}`}
              className="flex flex-col w-full gap-1 rounded-md px-2 py-1 outline outline-1 outline-neutral-muted"
            >
              <p>
                c {startingMonths[startMonths[index] - 1]} {startYears[index]}{" "}
                по {months[endMonths[index] - 1]} {endYears[index]}
              </p>
              <div className="flex gap-5 items-end">
                <p className="bg-white/5 w-fit outline outline-1 px-2 py-1 rounded-md outline-neutral-muted">
                  {pages[index].toLocaleString()} <span>страниц</span>
                </p>
              </div>
            </li>
          ))}
        </div>
      )}
    </ul>
  );
};

export { DateSearchResults };
