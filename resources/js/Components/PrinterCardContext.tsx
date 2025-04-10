import React, { createContext, useContext, useState } from "react";

interface DateRange {
  startMonth: number;
  startYear: number;
  endMonth: number;
  endYear: number;
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
    print: {
      endYear: new Date().getFullYear(),
      endMonth: 1,
      startYear: new Date().getFullYear(),
      startMonth: 1,
    },
    scan: {
      endYear: new Date().getFullYear(),
      endMonth: 1,
      startYear: new Date().getFullYear(),
      startMonth: 1,
    },
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
      startMonth: pastDate.getMonth(),
      endYear: currentDate.getFullYear(),
      endMonth: currentDate.getMonth(),
    },
    scan: {
      startYear: pastDate.getFullYear(),
      startMonth: pastDate.getMonth(),
      endYear: currentDate.getFullYear(),
      endMonth: currentDate.getMonth(),
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
