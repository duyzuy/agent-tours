import React from "react";

const IconHotDealTwo: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...rest }) => {
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
      <linearGradient id="SVGID_2" gradientUnits="userSpaceOnUse" x1="256" x2="256" y1="512" y2="0">
        <stop offset="0" stopColor="#fd5900" />
        <stop offset="1" stopColor="#ffde00" />
      </linearGradient>
      <linearGradient
        id="SVGID_00000046336462876740070330000012459139009981962882_"
        gradientUnits="userSpaceOnUse"
        x1="256"
        x2="256"
        y1="421"
        y2="241"
      >
        <stop offset="0" stopColor="#ffe59a" />
        <stop offset="1" stopColor="#ffffd5" />
      </linearGradient>
      <g id="Hot_Discount_2_">
        <g>
          <g>
            <path
              d="m380.731 171.303c-29.531-32.124-55.02-60.883-55.02-104.33 0-24.712 4.922-48.677 4.966-48.911.923-4.424-.19-9.023-3.047-12.524-2.841-3.502-7.118-5.538-11.63-5.538-25.386 0-97.852 18.794-97.852 102.29 0 53.364-10.811 70.8-15.469 75.399-2.622 2.607-6.123 4.072-8.965 3.647-13.813-.161-16.421-19.937-16.509-20.684-.557-5.098-3.691-9.565-8.306-11.821-4.614-2.285-10.02-2.036-14.429.659-58.519 35.758-93.47 97.999-93.47 166.51 0 107.52 87.48 196 195 196s195-88.48 195-196c0-68.188-37.339-108.838-70.269-144.697z"
              fill="url(#SVGID_2)"
            />
          </g>
        </g>
        <g>
          <g>
            <path
              d="m241 286c0-24.814-20.186-45-45-45s-45 20.186-45 45 20.186 45 45 45 45-20.186 45-45zm-60 0c0-8.276 6.724-15 15-15s15 6.724 15 15-6.724 15-15 15-15-6.724-15-15zm135 45c-24.814 0-45 20.186-45 45s20.186 45 45 45 45-20.186 45-45-20.185-45-45-45zm0 60c-8.276 0-15-6.724-15-15s6.724-15 15-15 15 6.724 15 15-6.724 15-15 15zm9.375-146.719c-6.475-5.156-15.894-4.072-21.094 2.344l-120 150c-5.171 6.475-4.116 15.908 2.344 21.094 6.448 5.151 15.872 4.138 21.094-2.344l120-150c5.171-6.475 4.116-15.908-2.344-21.094z"
              fill="url(#SVGID_00000046336462876740070330000012459139009981962882_)"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};
export default IconHotDealTwo;
