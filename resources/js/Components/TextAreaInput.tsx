import {
  forwardRef,
  InputHTMLAttributes,
  useImperativeHandle,
  useRef,
} from "react";

export default forwardRef(function TextAreaInput(
  {
    className = "",
    rows = 6,
    ...props
  }: InputHTMLAttributes<HTMLTextAreaElement> & { rows: number },
  ref
) {
  const localRef = useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => localRef.current?.focus(),
  }));

  return (
    <textarea
      {...props}
      rows={rows}
      className={
        "rounded-md shadow-sm border-gray-700 bg-gray-900 text-gray-300 focus:border-indigo-600 focus:ring-indigo-600 " +
        className
      }
      ref={localRef}
    ></textarea>
  );
});
