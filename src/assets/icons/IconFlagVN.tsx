import React from "react";

const IconFlagVN: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...rest }) => {
  return (
    <svg
      width="200"
      height="120"
      viewBox="0 0 200 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...rest}
    >
      <g clipPath="url(#clip0_857_109218)">
        <path d="M200 -4.44434H0V128.889H200V-4.44434Z" fill="#DA251D" />
        <path d="M100 22.2227L76.4669 94.556L138.067 49.8893H61.9336L123.534 94.556L100 22.2227Z" fill="#FFFF00" />
      </g>
      <defs>
        <clipPath id="clip0_857_109218">
          <rect width="200" height="120" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
export default IconFlagVN;
