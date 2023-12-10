import React from "react";

const IconChevronUp: React.FC<React.SVGProps<SVGSVGElement>> = ({
    className,
    ...rest
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...rest}
        >
            <path d="m18 15-6-6-6 6" />
        </svg>
    );
};
export default IconChevronUp;
