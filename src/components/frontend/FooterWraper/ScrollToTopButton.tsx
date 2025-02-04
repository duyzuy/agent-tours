"use client";
import { IconChevronUp } from "@/assets/icons";
import { Button } from "antd";

const ScrollToTopButton = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <Button
      icon={<IconChevronUp className="stroke-white" />}
      type="text"
      className="w-9 h-9 !bg-red-600"
      shape="circle"
      onClick={handleScrollToTop}
    />
  );
};
export default ScrollToTopButton;
