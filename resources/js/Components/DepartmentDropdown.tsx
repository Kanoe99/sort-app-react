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
    db_head,
    department_heads,
  }: InputHTMLAttributes<HTMLInputElement> & {
    db_head: string | null;
    department_heads: string[];
    isFocused?: boolean;
    setData: (key: string, value: string) => void;
  },
  ref
) {
  const [department_head, setDepartment_head] = useState<string | null>(
    db_head ?? "Выберите ответственное лицо"
  );
  const localRef = useRef<HTMLInputElement>(null);

  const handleClick = (department_head: string) => {
    setDepartment_head(department_head);
    setData("department_head", department_head);
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
            {department_head}
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
      <DropdownForm.Content position="right">
        <div className="flex">
          <div>
            {department_heads
              .slice(0, Math.ceil(department_heads.length / 2))
              .map((department_head) => (
                <DropdownForm.Option
                  key={department_head}
                  onClick={() => {
                    handleClick(department_head);
                  }}
                >
                  {department_head}
                </DropdownForm.Option>
              ))}
          </div>
          <div>
            {department_heads
              .slice(Math.ceil(department_heads.length / 2))
              .map((department_head) => (
                <DropdownForm.Option
                  key={department_head}
                  onClick={() => {
                    handleClick(department_head);
                  }}
                >
                  {department_head}
                </DropdownForm.Option>
              ))}
          </div>
        </div>
      </DropdownForm.Content>
    </DropdownForm>
  );
});
