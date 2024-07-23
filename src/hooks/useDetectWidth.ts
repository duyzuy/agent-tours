"use client";

import { useEffect, useState } from "react";

const useDetectWidth = (
  elementRef: React.RefObject<HTMLDivElement | HTMLButtonElement | null>
) => {
  const [width, setWidth] = useState(0);
  const handleResizeScreen = (el: HTMLDivElement | HTMLButtonElement) => {
    const elWidth = el.clientWidth;
    setWidth(elWidth);
  };

  useEffect(() => {
    const element = elementRef.current;

    if (!element || element === null) return;

    const containerWidth = elementRef.current.clientWidth;

    window.addEventListener("resize", () => handleResizeScreen(element));
    setWidth(containerWidth);
    return () =>
      window.removeEventListener("resize", () => handleResizeScreen(element));
  }, [elementRef]);

  return width;
};
export default useDetectWidth;
