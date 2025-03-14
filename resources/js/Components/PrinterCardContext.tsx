import React, { createContext, useContext, useState } from "react";

const PrinterCardContext = createContext<{
  test: string | null;
  setTest: (test: string | null) => void;
}>({
  test: null,
  setTest: () => {},
});

export const PrinterCardContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [test, setTest] = useState<string | null>(null);

  return (
    <PrinterCardContext.Provider value={{ test, setTest }}>
      {children}
    </PrinterCardContext.Provider>
  );
};

export const usePrinterCardContext = () => useContext(PrinterCardContext);
