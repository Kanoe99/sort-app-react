import React, { createContext, useContext, useState } from "react";

/////////////////////////////////////////////////////////////////

import { PrinterPages } from "@/types";
import { EditPagesRecordsContextProps } from "@/Pages/Printer/utils/interfaces";
import { now } from "@/utils/currentDate";

const EditPagesRecordsContext = createContext<EditPagesRecordsContextProps>({
  printerPagesNoSumReversed: [],
  setPrinterPagesNoSumReversed: () => {},
  setData: () => {},
  changeRecordDatesValues: () => [],
  setNewPagesNoSum: () => {},
  newPagesNoSum: {
    end_month: 0,
    end_year: 0,
    start_year: 0,
    start_month: 0,
    isSum: 0,
    printer_id: 0,
    print_pages: "",
    scan_pages: "",
  },
});

export const EditPagesRecordsContextProvider: React.FC<{
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
      start_year: lastRecord?.end_year ?? now.year,
      start_month: lastRecord?.end_month ?? now.month,
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
    <EditPagesRecordsContext.Provider
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
    </EditPagesRecordsContext.Provider>
  );
};

export const useEditPagesRecordsContext = () =>
  useContext(EditPagesRecordsContext);
