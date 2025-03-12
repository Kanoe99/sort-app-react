import {
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import DropDownMonth from "@/Components/DropDownMonth";

interface MonthsDropdownProps {
  id: string;
  month: number;
  onChange?: (month: number) => void; // Add onChange prop
  contentFar?: boolean;
}

export default function MonthsDropdown({
  id,
  month,
  onChange,
  contentFar,
}: MonthsDropdownProps) {
  const months = [
    "ЯНВАРЬ",
    "ФЕВРАЛЬ",
    "МАРТ",
    "АПРЕЛЬ",
    "МАЙ",
    "ИЮНЬ",
    "ИЮЛЬ",
    "АВГУСТ",
    "СЕНТЯБРЬ",
    "ОКТЯБРЬ",
    "НОЯБРЬ",
    "ДЕКАБРЬ",
  ];

  const [activeMonth, setActiveMonth] = useState<string | null>(
    months[month - 1]
  );

  const handleClick = (month: string) => {
    const monthIndex = months.indexOf(month) + 1;
    setActiveMonth(month);
    onChange?.(monthIndex);
  };

  return (
    <DropDownMonth>
      <DropDownMonth.Trigger>
        <span className="inline-flex w-full rounded-xl flex-1">
          <button
            type="button"
            className="inline-flex items-center border border-transparent text-sm font-medium leading-4 transition duration-150 ease-in-out focus:outline-none text-white py-2 px-3 hover:bg-black rounded-xl w-full justify-between"
          >
            {activeMonth}
          </button>
        </span>
      </DropDownMonth.Trigger>
      <DropDownMonth.Content
        position="right"
        contentClasses="left-[0rem]"
        contentFar={contentFar}
      >
        <div className="font-semibold">
          {months.map((month) => (
            <DropDownMonth.Option
              key={month}
              onClick={() => handleClick(month)}
            >
              {month}
            </DropDownMonth.Option>
          ))}
        </div>
      </DropDownMonth.Content>
    </DropDownMonth>
  );
}
