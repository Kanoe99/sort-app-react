import {
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import Dropdown from "./Dropdown";
import DropdownForm from "./DropDownForm";

export default forwardRef(function TextInput(
  {
    type = "text",
    className = "",
    isFocused = false,
    ...props
  }: InputHTMLAttributes<HTMLInputElement> & { isFocused?: boolean },
  ref
) {
  const localRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => localRef.current?.focus(),
  }));

  useEffect(() => {
    if (isFocused) {
      localRef.current?.focus();
    }
  }, [isFocused]);

  return (
    <Dropdown>
      <Dropdown.Trigger>esr</Dropdown.Trigger>

      <Dropdown.Content>
        <Dropdown.DropdownLink>Тест</Dropdown.DropdownLink>
        <Dropdown.DropdownLink>Lorem</Dropdown.DropdownLink>
      </Dropdown.Content>
    </Dropdown>
  );
});
