import React, { createContext, useContext, useState } from "react";

/////////////////////////////////////////////////////////////////

import { PrinterPages } from "@/types";
import { PagesRecordsContextProps } from "@/Pages/Printer/utils/interfaces";

const PagesRecordsContext = createContext<PagesRecordsContextProps>({
  printerPagesNoSumReversed: [],
  setPrinterPagesNoSumReversed: () => {},
  setData: () => {},
  changeRecordDatesValues: () => [],
});

export const PagesRecordsContextProvider: React.FC<{
  children: React.ReactNode;
  initialPages: PrinterPages[];
  setData: (key: string, value: PrinterPages[]) => void;
}> = ({ children, initialPages, setData }) => {
  const [printerPagesNoSumReversed, setPrinterPagesNoSumReversed] =
    useState<PrinterPages[]>(initialPages);

  const changeRecordDatesValues = (
    index: number,
    records: PrinterPages[],
    year: "end_year" | "start_year",
    month: "end_month" | "start_month",
    year_value: number,
    month_value: number
  ) => {
    return records.map((page, i) =>
      index === i ? { ...page, [year]: year_value, [month]: month_value } : page
    );
  };

  return (
    <PagesRecordsContext.Provider
      value={{
        printerPagesNoSumReversed,
        setPrinterPagesNoSumReversed,
        setData,
        changeRecordDatesValues,
      }}
    >
      {children}
    </PagesRecordsContext.Provider>
  );
};

export const usePagesRecordsContext = () => useContext(PagesRecordsContext);
