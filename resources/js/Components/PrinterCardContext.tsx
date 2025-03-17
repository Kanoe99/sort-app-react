import React, { createContext, useContext, useState } from "react";

interface DateRange {
  startMonth: number | "";
  startYear: number | "";
  endMonth: number | "";
  endYear: number | "";
}

const PrinterCardContext = createContext<{
  dates: DateRange;
  setDates: React.Dispatch<React.SetStateAction<DateRange>>;
}>({
  dates: { endYear: "", endMonth: "", startYear: "", startMonth: "" },
  setDates: () => {}, // Placeholder function
});

export const PrinterCardContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [dates, setDates] = useState<DateRange>({
    endYear: "",
    endMonth: "",
    startYear: "",
    startMonth: "",
  });

  return (
    <PrinterCardContext.Provider value={{ dates, setDates }}>
      {children}
    </PrinterCardContext.Provider>
  );
};

export const usePrinterCardContext = () => useContext(PrinterCardContext);
