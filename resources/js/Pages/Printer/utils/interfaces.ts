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
  setData: (key: string, value: PrinterPages[]) => void;
  changeRecordDatesValues: (
    index: number,
    records: PrinterPages[],
    year: "end_year" | "start_year",
    month: "end_month" | "start_month",
    year_value: number,
    month_value: number
  ) => PrinterPages[];
  setNewPagesNoSum: (value: PrinterPages) => void;
  newPagesNoSum: PrinterPages;
}
