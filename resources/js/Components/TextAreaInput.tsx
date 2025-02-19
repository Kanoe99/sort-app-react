import {
  forwardRef,
  InputHTMLAttributes,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";

export default forwardRef(function TextAreaInput(
  { className = "", ...props }: InputHTMLAttributes<HTMLTextAreaElement>,
  ref
) {
  const localRef = useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => localRef.current?.focus(),
  }));

  const adjustHeight = () => {
    if (localRef.current) {
      localRef.current.style.height = "auto"; // Reset height to auto
      localRef.current.style.height = `${localRef.current.scrollHeight}px`; // Set to scrollHeight
    }
  };

  useEffect(() => {
    if (localRef.current) {
      adjustHeight(); // Adjust height on initial render
    }
  }, []);

  return (
    <textarea
      {...props}
      className={
        "shadow-sm border-gray-700 overflow-hidden resize-none bg-bg-input-black rounded-xl min-h-[100px] text-gray-300 focus:border-accent-main focus:ring-accent-main " +
        className
      }
      ref={localRef}
      onInput={adjustHeight} // Adjust height on input
    ></textarea>
  );
});
