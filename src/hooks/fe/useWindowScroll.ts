import { useState, useEffect, useCallback } from "react";
const useWindowScroll = (elementRef?: React.RefObject<HTMLDivElement | null>) => {
  const [element, setElement] = useState({
    top: 0,
    left: 0,
    right: 0,
    height: 0,
    width: 0,
  });
  const [scrollLing, setScrolling] = useState<{
    direction: "up" | "down" | undefined;
    scrollY: number;
  }>({
    direction: undefined,
    scrollY: 0,
  });

  useEffect(() => {
    const el = elementRef?.current;
    if (!el) return;

    setElement({
      width: el.getBoundingClientRect().width,
      height: el.getBoundingClientRect().height,
      top: el.getBoundingClientRect().top,
      left: el.getBoundingClientRect().left,
      right: el.getBoundingClientRect().right,
    });
  }, []);

  useEffect(() => {
    let tempScroll = 0;
    const handleScrollEvent = () => {
      const windowScrollY = window.scrollY;
      let direction: "up" | "down" | undefined = undefined;
      if (windowScrollY > tempScroll) {
        direction = "down";
      } else {
        direction = "up";
      }
      tempScroll = windowScrollY;

      setScrolling({
        direction,
        scrollY: windowScrollY,
      });
    };

    window.addEventListener("scroll", handleScrollEvent);

    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, [elementRef]);

  useEffect(() => {
    const handleResizeEvent = () => {
      const windowScrollY = window.scrollY;

      setScrolling((prev) => ({
        ...prev,
        scrollY: windowScrollY,
      }));

      const el = elementRef?.current;
      if (!el) return;

      setElement({
        width: el.getBoundingClientRect().width,
        height: el.getBoundingClientRect().height,
        top: el.getBoundingClientRect().top,
        left: el.getBoundingClientRect().left,
        right: el.getBoundingClientRect().right,
      });
    };

    window.addEventListener("resize", handleResizeEvent);

    return () => window.removeEventListener("resize", handleResizeEvent);
  }, [elementRef]);

  return {
    scrollLing,
    element,
  };
};
export default useWindowScroll;
