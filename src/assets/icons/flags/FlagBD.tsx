import React from "react";

const FlagBD: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 512 512"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path fill="#006a4e" d="M0 0h512v512H0z" />
      <circle cx="230" cy="256" r="170.7" fill="#f42a41" />
    </svg>
  );
};
export default FlagBD;
