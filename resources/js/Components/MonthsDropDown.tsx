import {
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import DropDownMonth from "@/Components/DropDownMonth";
import { useDropdown } from "./DropdownContext";

export default forwardRef(function TextInput(
  {
    isFocused = false,
    setData,
    contentFar,
    id,
  }: InputHTMLAttributes<HTMLInputElement> & {
    contentFar?: boolean;
    db_head: string | null;
    department_heads: string[];
    isFocused?: boolean;
    setData: (key: string, value: string) => void;
    id: string;
  },
  ref
) {
  const [activeMonth, setActiveMonth] = useState<string | null>("ЯНВАРЬ");
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
  const localRef = useRef<HTMLInputElement>(null);

  // const handleClick = (activeMonth: string) => {
  //   setActiveMonth(activeMonth);
  //   setData("activeMonth", activeMonth);
  // };

  useImperativeHandle(ref, () => ({
    focus: () => localRef.current?.focus(),
  }));

  useEffect(() => {
    if (isFocused) {
      localRef.current?.focus();
    }
  }, [isFocused]);

  const { openDropdownId, setOpenDropdownId } = useDropdown();
  const isOpen = openDropdownId === id;

  const handleClick = (activeMonth: string) => {
    setActiveMonth(activeMonth);
    setData("activeMonth", activeMonth);
    setOpenDropdownId(null); // Close the dropdown after selection
  };

  const handleToggle = () => {
    setOpenDropdownId(isOpen ? null : id);
  };

  return (
    <DropDownMonth>
      <DropDownMonth.Trigger>
        <span className="inline-flex w-full rounded-xl flex-1">
          <button
            type="button"
            onClick={handleToggle}
            className="inline-flex items-center border border-transparent text-sm font-medium leading-4 transition duration-150 ease-in-out  focus:outline-none text-white py-2 px-3 hover:bg-black rounded-xl w-full justify-between"
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
          {months.map((department_head) => (
            <DropDownMonth.Option
              key={department_head}
              onClick={() => {
                handleClick(department_head);
              }}
            >
              {department_head}
            </DropDownMonth.Option>
          ))}
        </div>
      </DropDownMonth.Content>
    </DropDownMonth>
  );
});
