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
    ...props
  }: InputHTMLAttributes<HTMLInputElement> & { isFocused?: boolean },
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
      {...props}
      type={type}
      className={`mt-1 block w-full ${
        className ?? "py-3"
      } rounded-xl border-border-input text-white bg-bg-input-black focus:border-accent-main focus:ring-accent-main `}
      ref={inputRef}
    />
  );
});
