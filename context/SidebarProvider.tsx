"use client";

import { createContext, useState, useContext, ReactNode } from "react";

interface SidebarContextType {
  isSidebarClosed: boolean;
  setIsSidebarClosed: (mode: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);

  return (
    <SidebarContext.Provider value={{ isSidebarClosed, setIsSidebarClosed }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
