import {
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

export default forwardRef(function TextInput(
  {
    type = "date",
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
    <>
      <input
        {...props}
        type={type}
        className={
          "text-white rounded-xl mt-1 block w-full py-3 shadow-sm border-gray-700 bg-bg-input-black focus:border-accent-main focus:ring-accent-main " +
          className
        }
        ref={localRef}
      />
      <style>{`
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(50%) brightness(100%);
          cursor: pointer;
        }
      `}</style>
    </>
  );
});
