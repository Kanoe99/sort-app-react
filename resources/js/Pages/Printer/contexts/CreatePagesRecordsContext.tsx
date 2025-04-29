import React, { createContext, useContext, useEffect, useState } from "react";

/////////////////////////////////////////////////////////////////

import { PrinterPages } from "@/types";
import { PagesRecordsContextProps } from "@/Pages/Printer/utils/interfaces";
import { now } from "@/utils/currentDate";

const CreatePagesRecordsContext = createContext<PagesRecordsContextProps>({
  printerPagesNoSumReversed: [],
  setPrinterPagesNoSumReversed: () => {},
  setData: () => {},
  changeRecordDatesValues: () => [],
  setNewPagesNoSum: () => {},
  newPagesNoSum: {
    end_year: now.year,
    end_month: now.month,
    start_year: now.year,
    start_month: now.month,
    isSum: 0,
    printer_id: 0,
    print_pages: "",
    scan_pages: "",
  },
});

export const CreatePagesRecordsContextProvider: React.FC<{
  children: React.ReactNode;
  initialPages: PrinterPages[];
  setData: (key: string, value: PrinterPages[]) => void;
  printer_id: number;
}> = ({ children, initialPages, setData, printer_id }) => {
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

  const getNewRecordDefaults = () => {
    const lastRecord = printerPagesNoSumReversed[0];
    return {
      end_year: now.year,
      end_month: now.month,
      start_year: lastRecord?.start_year ?? now.year,
      start_month: lastRecord?.start_month ?? now.month,
      isSum: 0,
      printer_id: printer_id,
      print_pages: "",
      scan_pages: "",
    };
  };

  const [newPagesNoSum, setNewPagesNoSum] = useState<PrinterPages>(
    getNewRecordDefaults()
  );

  return (
    <CreatePagesRecordsContext.Provider
      value={{
        printerPagesNoSumReversed,
        setPrinterPagesNoSumReversed,
        setData,
        changeRecordDatesValues,
        setNewPagesNoSum,
        newPagesNoSum,
      }}
    >
      {children}
    </CreatePagesRecordsContext.Provider>
  );
};

export const useCreatePagesRecordsContext = () =>
  useContext(CreatePagesRecordsContext);
