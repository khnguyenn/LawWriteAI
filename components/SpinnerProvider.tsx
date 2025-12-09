"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import SpinnerOverlay from "./SpinnerOverlay";

interface SpinnerContextType {
  showSpinner: () => void;
  hideSpinner: () => void;
}

const SpinnerContext = createContext<SpinnerContextType | undefined>(undefined);

export function SpinnerProvider({ children }: { children: ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);

  const showSpinner = () => {
    setIsVisible(true);
  };

  const hideSpinner = () => {
    setIsVisible(false);
  };

  return (
    <SpinnerContext.Provider value={{ showSpinner, hideSpinner }}>
      {children}
      <SpinnerOverlay isVisible={isVisible} />
    </SpinnerContext.Provider>
  );
}

export function useSpinner() {
  const context = useContext(SpinnerContext);
  if (context === undefined) {
    throw new Error("useSpinner must be used within a SpinnerProvider");
  }
  return context;
}
