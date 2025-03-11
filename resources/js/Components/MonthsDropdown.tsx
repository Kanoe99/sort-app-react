import {
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  PropsWithChildren,
  useContext,
} from "react";

import DropDownMonth from "./DropDownMonth";

export default forwardRef(function TextInput(
  {
    isFocused = false,
    setData,
    department_heads,
    contentFar,
  }: InputHTMLAttributes<HTMLInputElement> & {
    contentFar?: boolean;
    db_head: string | null;
    department_heads: string[];
    isFocused?: boolean;
    setData: (key: string, value: string) => void;
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

  const handleClick = (activeMonth: string) => {
    setActiveMonth(activeMonth);
    setData("activeMonth", activeMonth);
  };

  const Trigger = ({ children }: PropsWithChildren) => {
    const { open, setOpen, toggleOpen } = useContext(DropDownMonthContext);

    return (
      <>
        <div
          onClick={toggleOpen}
          className="border bg-black border-neutral-light rounded-md"
        >
          {children}
        </div>

        {open && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          ></div>
        )}
      </>
    );
  };

  useImperativeHandle(ref, () => ({
    focus: () => localRef.current?.focus(),
  }));

  useEffect(() => {
    if (isFocused) {
      localRef.current?.focus();
    }
  }, [isFocused]);

  return (
    <DropDownMonth>
      <DropDownMonth.Trigger>
        <span className="inline-flex w-full rounded-xl flex-1">
          <button
            type="button"
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
          {months.map((month) => (
            <DropDownMonth.Option
              key={month}
              onClick={() => {
                handleClick(month);
              }}
            >
              {month}
            </DropDownMonth.Option>
          ))}
        </div>
      </DropDownMonth.Content>
    </DropDownMonth>
  );
});
