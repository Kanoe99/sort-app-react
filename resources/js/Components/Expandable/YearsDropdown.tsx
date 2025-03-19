import { useState } from "react";

import DropDownMonth from "@/Components/DropDownMonth";

interface MonthsDropdownProps {
  id: string;
  year: number;
  onChange?: (month: number) => void;
  contentFar?: boolean;
}

export default function MonthsDropdown({
  id,
  year,
  onChange,
  contentFar,
}: MonthsDropdownProps) {
  const [activeYear, setActiveYear] = useState<number>(
    new Date().getFullYear()
  );

  const handleClick = (year: number) => {
    setActiveYear(year);
    onChange?.(year);
  };

  const currentYear = new Date().getFullYear();

  return (
    <DropDownMonth>
      <DropDownMonth.Trigger>
        <span className="inline-flex w-full rounded-xl flex-1">
          <button
            type="button"
            className="inline-flex items-center border border-transparent text-sm font-medium leading-4 transition duration-150 ease-in-out focus:outline-none text-white py-2 px-3 hover:bg-black rounded-xl w-full justify-between"
          >
            {activeYear}
          </button>
        </span>
      </DropDownMonth.Trigger>
      <DropDownMonth.Content
        position="right"
        contentClasses="left-[0rem]"
        contentFar={contentFar}
      >
        <div className="font-semibold max-h-[20rem] overflow-y-scroll custom-scrollbar overflow-x-hidden scrollbar-thin">
          {Array.from(
            { length: currentYear - 1950 + 1 },
            (_, i) => currentYear - i
          ).map((year) => (
            <DropDownMonth.Option key={year} onClick={() => handleClick(year)}>
              {year}
            </DropDownMonth.Option>
          ))}
        </div>
      </DropDownMonth.Content>
    </DropDownMonth>
  );
}
