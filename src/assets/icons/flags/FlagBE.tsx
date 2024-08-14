import React from "react";

const FlagBE: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...rest }) => {
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
      <g fillRule="evenodd" strokeWidth="1pt">
        <path fill="#000001" d="M0 0h170.7v512H0z" />
        <path fill="#ffd90c" d="M170.7 0h170.6v512H170.7z" />
        <path fill="#f31830" d="M341.3 0H512v512H341.3z" />
      </g>
    </svg>
  );
};
export default FlagBE;
