import {
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import DropdownForm from "./DropDownForm";

export default forwardRef(function TextInput(
  {
    isFocused = false,
    setData,
    hasIP,
    setHasIP,
  }: InputHTMLAttributes<HTMLInputElement> & {
    isFocused?: boolean;
    setData: (key: string, value: boolean) => void;
    hasIP: boolean;
    setHasIP: (hasIP: boolean) => void;
  },
  ref
) {
  const [localStringValue, setLocalStringValue] = useState<string>(
    hasIP ? "Есть" : "Нету"
  );
  const localRef = useRef<HTMLInputElement>(null);

  const handleClick = (value: boolean) => {
    setLocalStringValue(value ? "Есть" : "Нету");
    setHasIP(value);
    setData("hasIP", value);
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
    <DropdownForm>
      <DropdownForm.Trigger>
        <span className="inline-flex w-full rounded-xl flex-1">
          <button
            type="button"
            className="inline-flex items-center border border-transparent text-sm font-medium leading-4 transition duration-150 ease-in-out  focus:outline-none text-white py-3 px-3 hover:bg-black rounded-xl w-full justify-between"
          >
            {localStringValue}
            <svg
              className="-me-0.5 ms-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </span>
      </DropdownForm.Trigger>
      <DropdownForm.Content>
        <DropdownForm.Option
          onClick={() => {
            handleClick(true);
          }}
        >
          Есть
        </DropdownForm.Option>
        <DropdownForm.Option
          onClick={() => {
            handleClick(false);
          }}
        >
          Нету
        </DropdownForm.Option>
      </DropdownForm.Content>
    </DropdownForm>
  );
});
