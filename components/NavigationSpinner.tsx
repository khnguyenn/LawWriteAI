"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useSpinner } from "./SpinnerProvider";

export default function NavigationSpinner() {
  const pathname = usePathname();
  const { showSpinner, hideSpinner } = useSpinner();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    // Only show spinner if pathname actually changed
    if (prevPathname.current !== pathname) {
      showSpinner();

      // Hide spinner after a short delay to allow page to render
      const timer = setTimeout(() => {
        hideSpinner();
      }, 500);

      prevPathname.current = pathname;

      return () => {
        clearTimeout(timer);
      };
    }
  }, [pathname]);

  return null;
}
