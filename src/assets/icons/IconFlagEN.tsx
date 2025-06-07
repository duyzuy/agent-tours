import React from "react";

const IconFlagEN: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...rest }) => {
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
      <g clipPath="url(#clip0_857_109205)">
        <path d="M0 0H200V120H0V0Z" fill="#012169" />
        <path
          d="M23.3125 0.00019919L0.000212352 0.000198089L0.000212848 14.0024L176.69 120.001L200 120.001L200 105.997L23.3125 0.00019919Z"
          fill="white"
        />
        <path
          d="M200 14.0025L200 0.000272264L176.688 0.000266495L0.000207768 105.997L0.000206565 120.001L23.3104 120.001L200 14.0025Z"
          fill="white"
        />
        <path d="M80 0H120V120H80V0Z" fill="white" />
        <path d="M0 40H200V80H0V40Z" fill="white" />
        <path d="M88 0H112V120H88V0Z" fill="#C8102E" />
        <path d="M0 48H200V72H0V48Z" fill="#C8102E" />
        <path d="M200 120.001V110.67L148.872 79.999H133.321L200 120.001Z" fill="#C8102E" />
        <path d="M0 0L5.22911e-07 9.32863L51.1266 39.9996L66.675 39.9996L0 0Z" fill="#C8102E" />
        <path d="M120.001 39.9996H133.34L200 0H184.466L120.001 38.6746V39.9996Z" fill="#C8102E" />
        <path d="M79.9993 79.999H66.6647L0.0166016 119.98V120.001H15.5361L79.9993 81.3281V79.999Z" fill="#C8102E" />
      </g>
      <defs>
        <clipPath id="clip0_857_109205">
          <rect width="200" height="120" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
export default IconFlagEN;
