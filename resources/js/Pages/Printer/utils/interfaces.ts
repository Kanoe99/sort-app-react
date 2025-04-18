//PrinterCardContext.tsx

import { PrinterPages } from "@/types";
import React from "react";

export interface DateRange {
  startMonth: number;
  startYear: number;
  endMonth: number;
  endYear: number;
}

export interface PS_dates {
  print: DateRange;
  scan: DateRange;
}

export interface Panel {
  ym: boolean;
  ymm: boolean;
  yym: boolean;
}

export interface PS_panels {
  print: Panel;
  scan: Panel;
}

export interface PrinterCardContextProps {
  dates: PS_dates;
  setDates: React.Dispatch<React.SetStateAction<PS_dates>>;
  panels: PS_panels;
  setPanels: React.Dispatch<React.SetStateAction<PS_panels>>;
}

//PagesRecordsContext.tsx

export interface PagesRecordsContextProps {
  printerPagesNoSumReversed: PrinterPages[];
  setPrinterPagesNoSumReversed: React.Dispatch<
    React.SetStateAction<PrinterPages[]>
  >;
}
