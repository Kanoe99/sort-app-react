import React, { createContext, useContext, useState } from "react";

const DropdownContext = createContext<{
  openDropdownId: string | null;
  setOpenDropdownId: (id: string | null) => void;
}>({
  openDropdownId: null,
  setOpenDropdownId: () => {},
});

export const useDropdown = () => useContext(DropdownContext);

export const DropdownProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  return (
    <DropdownContext.Provider value={{ openDropdownId, setOpenDropdownId }}>
      {children}
    </DropdownContext.Provider>
  );
};
