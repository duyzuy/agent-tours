import React from "react";

const IconChevronDown: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...rest}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
};
export default IconChevronDown;
