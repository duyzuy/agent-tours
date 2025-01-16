import React from "react";

const IconEmptyBox: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="512"
      viewBox="0 0 48 48"
      width="512"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...rest}
    >
      <linearGradient id="linear-gradient" gradientUnits="userSpaceOnUse" x1="28.5" x2="28.5" y1="25" y2="20">
        <stop offset="0" stopColor="#54a5ff" />
        <stop offset="1" stopColor="#8ad3fe" />
      </linearGradient>
      <linearGradient id="linear-gradient-2" gradientUnits="userSpaceOnUse" x1="34" x2="30" y1="4" y2="4">
        <stop offset="0" stopColor="#fe9661" />
        <stop offset="1" stopColor="#ffb369" />
      </linearGradient>
      <linearGradient id="linear-gradient-3" x1="10" x2="10" xlinkHref="#linear-gradient" y1="31" />
      <linearGradient id="linear-gradient-4" x1="18.5" x2="18.5" xlinkHref="#linear-gradient" y1="47" y2="25" />
      <linearGradient id="linear-gradient-5" x1="32" x2="42" xlinkHref="#linear-gradient" y1="33.5" y2="33.5" />
      <linearGradient id="linear-gradient-6" x1="8" x2="14" xlinkHref="#linear-gradient-2" y1="42" y2="42" />
      <g id="Empty_Box" data-name="Empty Box">
        <path d="m15 20h27v5h-27z" fill="url(#linear-gradient)" />
        <path
          d="m35.53 2.71c-.9-1.07-2.53-1.87-3.53-.93-.95-.93-2.6-.16-3.53.93-1.07 1.29-1.25 2.87-.41 3.58s2.4.27 3.47-1c.78-.93.16-.93.94 0 1.07 1.27 2.62 1.71 3.47 1s.66-2.29-.41-3.58z"
          fill="#d7e9f7"
        />
        <ellipse cx="32" cy="4" fill="url(#linear-gradient-2)" rx="2" ry="3" />
        <path d="m15 26-10 5v-6l10-5z" fill="url(#linear-gradient-3)" />
        <path
          d="m5 25h27a0 0 0 0 1 0 0v22a0 0 0 0 1 0 0h-25a2 2 0 0 1 -2-2v-20a0 0 0 0 1 0 0z"
          fill="url(#linear-gradient-4)"
        />
        <path d="m40.89 42.55-8.89 4.45v-22l10-5v20.76a2 2 0 0 1 -1.11 1.79z" fill="url(#linear-gradient-5)" />
        <path d="m32 25-2.76 7.35a1 1 0 0 1 -.93.65h-24.87a1 1 0 0 1 -.93-1.35l2.49-6.65z" fill="#8ad3fe" />
        <path
          d="m45.11 28.45-8.22 4.1a1 1 0 0 1 -1.34-.44l-3.55-7.11 10-5 3.55 7.11a1 1 0 0 1 -.44 1.34z"
          fill="#8ad3fe"
        />
        <path
          d="m20 23a1 1 0 0 1 -1-1v-7a3 3 0 0 1 3-3h8a1 1 0 0 0 1-1v-1a1 1 0 0 1 2 0v1a3 3 0 0 1 -3 3h-5.17a3 3 0 0 1 -3.83 3.83v4.17a1 1 0 0 1 -1 1zm1-8a1 1 0 1 0 1-1 1 1 0 0 0 -1 1z"
          fill="#d7e9f7"
        />
        <g fill="#ffb369">
          <path d="m14 13a1 1 0 1 1 1-1 1 1 0 0 1 -1 1z" />
          <path d="m34 18a1 1 0 1 1 1-1 1 1 0 0 1 -1 1z" />
          <path d="m39 10a1 1 0 1 1 1-1 1 1 0 0 1 -1 1z" />
        </g>
        <rect fill="url(#linear-gradient-6)" height="4" rx="1" width="6" x="8" y="40" />
        <path d="m11 38h-2a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2z" fill="#f0f7fc" />
      </g>
    </svg>
  );
};
export default IconEmptyBox;
