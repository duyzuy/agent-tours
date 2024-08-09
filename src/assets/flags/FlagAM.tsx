import React from "react";

const FlagAM: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...rest }) => {
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
      <path fill="#d90012" d="M0 0h512v170.7H0z" />
      <path fill="#0033a0" d="M0 170.7h512v170.6H0z" />
      <path fill="#f2a800" d="M0 341.3h512V512H0z" />
    </svg>
  );
};
export default FlagAM;
