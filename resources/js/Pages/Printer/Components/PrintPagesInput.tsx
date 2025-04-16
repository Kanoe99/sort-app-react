import {
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

export default forwardRef(function TextInput(
  {
    type = "text",
    className = "",
    max,
    isFocused = false,
    disabled = false,
    ...props
  }: InputHTMLAttributes<HTMLInputElement> & {
    isFocused?: boolean;
    disabled?: boolean;
  },
  ref
) {
  const inputRef = useRef<HTMLInputElement>(null);

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
      disabled={disabled}
      {...props}
      type={type}
      className={`mt-1 block w-full ${
        className ?? "py-3"
      } rounded-xl border-border-input text-white bg-bg-input-black focus:border-accent-main focus:ring-accent-main `}
      ref={inputRef}
    />
  );
});
