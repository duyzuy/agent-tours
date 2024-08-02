import React from "react";

const IconHeart: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.49486 2.60186C6.99535 0.8488 4.49481 0.377232 2.61602 1.98251C0.737233 3.58779 0.472726 6.27173 1.94815 8.1703C3.17486 9.74883 6.88733 13.0781 8.10408 14.1556C8.2402 14.2762 8.30827 14.3365 8.38766 14.3601C8.45695 14.3808 8.53277 14.3808 8.60207 14.3601C8.68146 14.3365 8.74952 14.2762 8.88565 14.1556C10.1024 13.0781 13.8149 9.74883 15.0416 8.1703C16.517 6.27173 16.2848 3.5709 14.3737 1.98251C12.4626 0.394118 9.99438 0.8488 8.49486 2.60186Z"
        stroke="#333335"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default IconHeart;
