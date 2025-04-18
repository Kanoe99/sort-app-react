import React, { createContext, useContext, useState } from "react";

/////////////////////////////////////////////////////////////////

import { PrinterPages } from "@/types";
import { PagesRecordsContextProps } from "@/Pages/Printer/utils/interfaces";

const PagesRecordsContext = createContext<PagesRecordsContextProps>({
  printerPagesNoSumReversed: [],
  setPrinterPagesNoSumReversed: () => {},
});

export const PagesRecordsContextProvider: React.FC<{
  children: React.ReactNode;
  initialPages: PrinterPages[];
}> = ({ children, initialPages }) => {
  const [printerPagesNoSumReversed, setPrinterPagesNoSumReversed] =
    useState<PrinterPages[]>(initialPages);

  return (
    <PagesRecordsContext.Provider
      value={{ printerPagesNoSumReversed, setPrinterPagesNoSumReversed }}
    >
      {children}
    </PagesRecordsContext.Provider>
  );
};

export const usePagesRecordsContext = () => useContext(PagesRecordsContext);
