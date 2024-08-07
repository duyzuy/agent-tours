import React from "react";

const IconHotSale: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="24"
      height="24"
      enableBackground="new 0 0 512 512"
      viewBox="0 0 512 512"
      fill="none"
      className={className}
      {...rest}
    >
      <linearGradient id="hotSale" gradientUnits="userSpaceOnUse" x1="256" x2="256" y1="512" y2="0">
        <stop offset="0" stopColor="#fd3a84" />
        <stop offset="1" stopColor="#ffa68d" />
      </linearGradient>
      <linearGradient id="hotSaleLinear" gradientUnits="userSpaceOnUse" x1="256" x2="256" y1="512" y2="272">
        <stop offset="0" stopColor="#ffc8d1" />
        <stop offset="1" stopColor="#fff6f7" />
      </linearGradient>
      <g>
        <path
          d="m256 512c-57.429 0-111.42-22.364-152.028-62.973-40.608-40.608-62.972-94.599-62.972-152.027 0-48.485 16.497-96.184 46.452-134.31l22.27-28.343c26.619-33.877 41.278-76.262 41.278-119.347 0-8.284 6.716-15 15-15l1.524.005c38.415.247 74.478 15.442 101.549 42.785 27.037 27.308 41.927 63.513 41.927 101.944v24.695c17.461-6.19 30-22.873 30-42.43v-30.39c0-5.979 3.552-11.389 9.039-13.765s11.861-1.267 16.223 2.824c31.473 29.521 57.988 65.288 76.68 103.434 18.356 37.461 28.058 74.771 28.058 107.898 0 57.428-22.364 111.419-62.972 152.027-40.608 40.609-94.599 62.973-152.028 62.973z"
          fill="url(#hotSale)"
        />
        <path
          d="m256 512c-68.493 0-110.38-75.193-74.328-133.43l61.574-99.466c5.864-9.473 19.644-9.473 25.508 0l61.574 99.466c36.051 58.237-5.835 133.43-74.328 133.43z"
          fill="url(#hotSaleLinear)"
        />
      </g>
    </svg>
  );
};
export default IconHotSale;
