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
    value,
    ...props
  }: InputHTMLAttributes<HTMLInputElement> & {
    isFocused?: boolean;
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
      {...props}
      value={value}
      type="number"
      className={
        "mt-1 block w-full py-2 rounded-xl border-border-input text-white bg-bg-input-black focus:border-accent-main focus:ring-accent-main " +
        className
      }
      ref={inputRef}
    />
  );
});
