//PrinterCardContext.tsx

import { Printer, PrinterPages } from "@/types";
import React, { FormEventHandler } from "react";
import { EditMainForm } from "../EditMainForm";

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

//EditPagesRecordsContext.tsx

export interface EditPagesRecordsContextProps {
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

//EditMainFormContext.tsx

export interface EditMainFormContextProps {
  hasIP: boolean;
  setHasIP: (hasIP: boolean) => void;
  isLocal: boolean;
  setIsLocal: (isLocal: boolean) => void;
  isIPv4: boolean;
  setIsIPv4: (isIPv4: boolean) => void;
  hasNumber: boolean;
  setHasNumber: (hasNumber: boolean) => void;
  IPData: {
    IPv4Data: string;
    IPv6Data: string;
  };
  setIPData: (
    data:
      | { IPv4Data: string; IPv6Data: string }
      | ((prev: { IPv4Data: string; IPv6Data: string }) => {
          IPv4Data: string;
          IPv6Data: string;
        })
  ) => void;
  isModalVisible: boolean;
  setIsModalVisible: (isModalVisible: boolean) => void;
  number: number | string;
  setNumber: (number: number | string) => void;
  PC_name: string;
  setPC_name: (PC_name: string) => void;
  closeModal: ({
    clearErrors,
    reset,
  }: {
    clearErrors: () => void;
    reset: () => void;
  }) => void;
}

//CreateMainFormContext.tsx

export interface CreateMainFormContextProps {
  hasIP: boolean;
  setHasIP: (hasIP: boolean) => void;
  isLocal: boolean;
  setIsLocal: (isLocal: boolean) => void;
  isIPv4: boolean;
  setIsIPv4: (isIPv4: boolean) => void;
  hasNumber: boolean;
  setHasNumber: (hasNumber: boolean) => void;
  IPData: {
    IPv4Data: string;
    IPv6Data: string;
  };
  setIPData: (
    data:
      | { IPv4Data: string; IPv6Data: string }
      | ((prev: { IPv4Data: string; IPv6Data: string }) => {
          IPv4Data: string;
          IPv6Data: string;
        })
  ) => void;
  isModalVisible: boolean;
  setIsModalVisible: (isModalVisible: boolean) => void;
  number: number | string;
  setNumber: (number: number | string) => void;
  PC_name: string;
  setPC_name: (PC_name: string) => void;
  closeModal: ({
    clearErrors,
    reset,
  }: {
    clearErrors: () => void;
    reset: () => void;
  }) => void;
}

//EditMainForm.tsx

export interface EditMainFormProps {
  editPrinter: FormEventHandler;
  data: {
    type: string;
    model: string;
    hasNumber: boolean;
    number: number | null;
    network_capable: string;
    department_head: string;
    location: string;
    isLocal: boolean;
    PC_name: string;
    IP: string;
    hasIP: boolean;
    isIPv4: boolean;

    status: string;
    fixDate: string;
    comment: string;
    printer_pages_no_sum: PrinterPages[];
  };
  clearErrors: () => void;
  reset: () => void;
  processing: boolean;
  department_heads: string[];
  setData: (key: string, value: string | boolean | number | null) => void;
  errors: Partial<
    Record<
      | "number"
      | "printer_pages_no_sum"
      | "type"
      | "model"
      | "network_capable"
      | "department_head"
      | "location"
      | "PC_name"
      | "IP"
      | "isIPv4"
      | "status"
      | "comment"
      | "fixDate"
      | "hasNumber"
      | "isLocal"
      | "hasIP",
      string
    >
  >;
}

//CreateMainForm.tsx

export interface CreateMainFormProps {
  createPrinter: FormEventHandler;
  clearErrors: () => void;
  data: {
    type: string;
    model: string;
    counter: undefined | number;
    number: undefined | number;
    location: string;
    status: string;
    fixDate: string;
    IPBool: string;
    IP: string;
    comment: string;
    isIPv4: boolean;
    isLocal: boolean;
    department_head: string;
    PC_name: string;
    network_capable: string;
    hasNumber: boolean;
  };
  reset: () => void;
  processing: boolean;
  department_heads: string[];
  setData: (key: string, value: string | boolean | number | null) => void;
  errors: Partial<
    Record<
      | "number"
      | "printer_pages_no_sum"
      | "type"
      | "model"
      | "network_capable"
      | "department_head"
      | "location"
      | "PC_name"
      | "IP"
      | "isIPv4"
      | "status"
      | "comment"
      | "fixDate"
      | "hasNumber"
      | "isLocal"
      | "hasIP",
      string
    >
  >;
}
