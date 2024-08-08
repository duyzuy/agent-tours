import React from "react";

const FlagAI: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...rest }) => {
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
      <defs>
        <path
          id="ai-b"
          fill="#f90"
          d="M271 87c1.5 3.6 6.5 7.6 7.8 9.6-1.7 2-2 1.8-1.8 5.4 3-3.1 3-3.5 5-3 4.2 4.2.8 13.3-2.8 15.3-3.4 2.1-2.8 0-8 2.6 2.3 2 5.1-.3 7.4.3 1.2 1.5-.6 4.1.4 6.7 2-.2 1.8-4.3 2.2-5.8 1.5-5.4 10.4-9.1 10.8-14.1 1.9-.9 3.7-.3 6 1-1.1-4.6-4.9-4.6-5.9-6-2.4-3.7-4.5-7.8-9.6-9-3.8-.7-3.5.3-6-1.4-1.6-1.2-6.3-3.4-5.5-1.6"
        />
      </defs>
      <clipPath id="ai-a">
        <path d="M0 0v128h298.7v128H256zm256 0H128v298.7H0V256z" />
      </clipPath>
      <path fill="#012169" d="M0 0h512v512H0z" />
      <path stroke="#fff" strokeWidth="50" d="m0 0 256 256m0-256L0 256" />
      <path stroke="#c8102e" strokeWidth="30" d="m0 0 256 256m0-256L0 256" clipPath="url(#ai-a)" />
      <path stroke="#fff" strokeWidth="75" d="M128 0v298.7M0 128h298.7" />
      <path stroke="#c8102e" strokeWidth="50" d="M128 0v298.7M0 128h298.7" />
      <path fill="#012169" d="M0 256h256V0h85.3v341.3H0z" />
      <path
        fill="#fff"
        d="M323.6 224.1c0 90.4 9.8 121.5 29.4 142.5a179.4 179.4 0 0 0 35 30 179.7 179.7 0 0 0 35-30c19.5-21 29.3-52.1 29.3-142.5-14.2 6.5-22.3 9.7-34 9.5a78.4 78.4 0 0 1-30.3-9.5 78.4 78.4 0 0 1-30.3 9.5c-11.7.2-19.8-3-34-9.5z"
      />
      <g transform="matrix(1.96 0 0 2.002 -141.1 95.2)">
        <use xlinkHref="#ai-b" />
        <circle cx="281.3" cy="91.1" r=".8" fill="#fff" fill-rule="evenodd" />
      </g>
      <g transform="matrix(-.916 -1.77 1.733 -.935 463.1 861.4)">
        <use xlinkHref="#ai-b" />
        <circle cx="281.3" cy="91.1" r=".8" fill="#fff" fill-rule="evenodd" />
      </g>
      <g transform="matrix(-1.01 1.716 -1.68 -1.031 825 -71)">
        <use xlinkHref="#ai-b" />
        <circle cx="281.3" cy="91.1" r=".8" fill="#fff" fill-rule="evenodd" />
      </g>
      <path
        fill="#9cf"
        d="M339.8 347.4a78 78 0 0 0 13.2 19.2 179.4 179.4 0 0 0 35 30 180 180 0 0 0 35-30 78 78 0 0 0 13.2-19.2z"
      />
      <path
        fill="#fdc301"
        d="M321 220.5c0 94.2 10.1 126.6 30.5 148.5a187 187 0 0 0 36.5 31 186.3 186.3 0 0 0 36.4-31.1C444.8 347 455 314.7 455 220.5c-14.8 6.8-23.3 10.1-35.5 10-11-.3-22.6-5.7-31.5-10-9 4.3-20.6 9.7-31.5 10-12.3.1-20.7-3.2-35.6-10zm4 5c13.9 6.5 21.9 9.6 33.4 9.4a76.4 76.4 0 0 0 29.6-9.4c8.4 4 19.3 9.2 29.6 9.4 11.5.2 19.4-3 33.4-9.4 0 89-9.6 119.6-28.8 140.2a176 176 0 0 1-34.2 29.4 175.6 175.6 0 0 1-34.3-29.4c-19.2-20.6-28.7-51.3-28.7-140.2"
      />
    </svg>
  );
};
export default FlagAI;
