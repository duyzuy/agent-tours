import React from "react";

const IconCaravan: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...rest }) => {
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
      {...rest}
    >
      <rect width="4" height="4" x="2" y="9" />
      <rect width="4" height="10" x="10" y="9" />
      <path d="M18 19V9a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v8a2 2 0 0 0 2 2h2" />
      <circle cx="8" cy="19" r="2" />
      <path d="M10 19h12v-2" />
    </svg>
  );
};
export default IconCaravan;
