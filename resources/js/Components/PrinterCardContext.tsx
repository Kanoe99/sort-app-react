import React, { createContext, useContext, useState } from "react";

interface DateRange {
  startMonth: number | "";
  startYear: number | "";
  endMonth: number | "";
  endYear: number | "";
}

interface PS_dates {
  print: DateRange;
  scan: DateRange;
}

interface Panel {
  ym: boolean;
  ymm: boolean;
  yym: boolean;
}

interface PS_panels {
  print: Panel;
  scan: Panel;
}

const PrinterCardContext = createContext<{
  dates: PS_dates;
  setDates: React.Dispatch<React.SetStateAction<PS_dates>>;
  panels: PS_panels;
  setPanels: React.Dispatch<React.SetStateAction<PS_panels>>;
}>({
  dates: {
    print: { endYear: "", endMonth: "", startYear: "", startMonth: "" },
    scan: { endYear: "", endMonth: "", startYear: "", startMonth: "" },
  },
  setDates: () => {},
  panels: {
    print: {
      ym: true,
      ymm: false,
      yym: false,
    },
    scan: {
      ym: true,
      ymm: false,
      yym: false,
    },
  },
  setPanels: () => {},
});

export const PrinterCardContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const currentDate = new Date();
  const pastDate = new Date(currentDate);
  pastDate.setMonth(currentDate.getMonth());

  const [dates, setDates] = useState<PS_dates>({
    print: {
      startYear: pastDate.getFullYear(),
      startMonth: pastDate.getMonth() + 1,
      endYear: currentDate.getFullYear(),
      endMonth: currentDate.getMonth() + 1,
    },
    scan: {
      startYear: pastDate.getFullYear(),
      startMonth: pastDate.getMonth() + 1,
      endYear: currentDate.getFullYear(),
      endMonth: currentDate.getMonth() + 1,
    },
  });

  const [panels, setPanels] = useState<PS_panels>({
    print: {
      ym: true,
      ymm: false,
      yym: false,
    },
    scan: {
      ym: true,
      ymm: false,
      yym: false,
    },
  });

  return (
    <PrinterCardContext.Provider value={{ dates, setDates, panels, setPanels }}>
      {children}
    </PrinterCardContext.Provider>
  );
};

export const usePrinterCardContext = () => useContext(PrinterCardContext);
