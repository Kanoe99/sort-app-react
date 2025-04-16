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

const defaultDates: PS_dates = {
  print: {
    startYear: new Date().getFullYear(),
    startMonth: 1,
    endYear: new Date().getFullYear(),
    endMonth: 1,
  },
  scan: {
    startYear: new Date().getFullYear(),
    startMonth: 1,
    endYear: new Date().getFullYear(),
    endMonth: 1,
  },
};

const defaultPanels: PS_panels = {
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
};

const PrinterCardContext = createContext<{
  dates: PS_dates;
  setDates: React.Dispatch<React.SetStateAction<PS_dates>>;
  panels: PS_panels;
  setPanels: React.Dispatch<React.SetStateAction<PS_panels>>;
}>({
  dates: defaultDates,
  setDates: () => {},
  panels: defaultPanels,
  setPanels: () => {},
});

export const PrinterCardContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [dates, setDates] = useState<PS_dates>(defaultDates);
  const [panels, setPanels] = useState<PS_panels>(defaultPanels);

  return (
    <PrinterCardContext.Provider value={{ dates, setDates, panels, setPanels }}>
      {children}
    </PrinterCardContext.Provider>
  );
};

export const usePrinterCardContext = () => useContext(PrinterCardContext);
