import { ReactNode } from "react";

const Placeholder = ({
  children,
  additionalClasses,
}: {
  children: ReactNode;
  additionalClasses?: string;
}) => {
  const classes = `text-white h-full flex items-center justify-center text-center font-bold border-2 border-dashed border-white w-full px-4 py-4 rounded-xl h-16 ${additionalClasses}`;

  return <div className={classes}>{children}</div>;
};

export { Placeholder };
