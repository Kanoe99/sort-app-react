import {
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

export default forwardRef(function NumberInput(
  {
    className = "",
    isFocused = false,
    _placeholder,
    value,
    max,
    onChange,
    ...props
  }: InputHTMLAttributes<HTMLInputElement> & {
    value: number | "";
    _placeholder: number | "";
    max: number;
    isFocused?: boolean;
    onChange: (value: number | "") => void;
  },
  ref
) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const input = inputRef.current;
    const handleWheel = (e: WheelEvent) => e.preventDefault();

    if (input) {
      input.addEventListener("wheel", handleWheel);
    }

    // Cleanup the event listener on component unmount
    return () => {
      if (input) {
        input.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
  }));

  useEffect(() => {
    if (isFocused) {
      inputRef.current?.focus();
    }
  }, [isFocused]);

  return (
    <input
      onChange={(e) => {
        const input = e.target;
        if (input.value === "") {
          onChange("");
          return;
        }
        if (input.value.length > max) {
          input.value = input.value.slice(0, 4);
        }
        onChange(Number(input.value));
      }}
      {...props}
      value={value ?? ""}
      placeholder={_placeholder.toString()}
      type="number"
      max={max}
      className={`mt-1 block w-full ${
        className ?? "py-3"
      } rounded-xl border-border-input text-white bg-bg-input-black focus:border-accent-main focus:ring-accent-main`}
      ref={inputRef}
    />
  );
});
