"use client";
import React, { useEffect } from "react";
export const useClickOutSide = (
  elementRef: React.RefObject<HTMLDivElement | HTMLInputElement | HTMLButtonElement | null>,
  handleEvent?: () => void,
) => {
  useEffect(() => {
    const handleClickOutSide = (e: any) => {
      if (!elementRef || elementRef.current === null) return;

      if (!elementRef.current.contains(e.target)) {
        handleEvent && handleEvent();
      }
    };
    document.addEventListener("click", handleClickOutSide);

    return () => document.removeEventListener("click", handleClickOutSide);
  }, [handleEvent, elementRef]);
};
