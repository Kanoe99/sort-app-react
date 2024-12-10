import { ReactNode } from "react";

const Placeholder = ({ children }: { children: ReactNode }) => {
  const classes =
    "text-white flex items-center justify-center text-center font-bold border-2 border-dashed border-white w-full px-4 py-4 rounded-xl h-20";

  return <div className={classes}>{children}</div>;
};
export { Placeholder };
