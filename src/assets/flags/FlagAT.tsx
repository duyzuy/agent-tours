import React from "react";

const FlagAT: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      viewBox="0 0 512 512"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path fill="#fff" d="M0 170.7h512v170.6H0z" />
      <path fill="#c8102e" d="M0 0h512v170.7H0zm0 341.3h512V512H0z" />
    </svg>
  );
};
export default FlagAT;
