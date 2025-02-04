import React from "react";

const IconFlagVNCircle: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...rest }) => {
  return (
    <svg
      width="24"
      height="24"
      enableBackground="new 0 0 512 512"
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...rest}
    >
      <circle cx="256" cy="256" fill="#d80027" r="256" />
      <path
        d="m256 133.565 27.628 85.029h89.405l-72.331 52.55 27.628 85.03-72.33-52.551-72.33 52.551 27.628-85.03-72.33-52.55h89.404z"
        fill="#ffda44"
      />
    </svg>
  );
};
export default IconFlagVNCircle;
