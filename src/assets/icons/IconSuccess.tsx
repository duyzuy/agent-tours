import React from "react";

const IconSuccess: React.FC<React.SVGProps<SVGSVGElement>> = ({
    className,
    fill = "none",
    stroke = "#fff",
    ...rest
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            enableBackground="new 0 0 128 128"
            width="18"
            height="18"
            viewBox="0 0 128 128"
            stroke="none"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...rest}
        >
            <circle cx="64" cy="64" fill="#3db39e" r="64" />
            <path
                d="m117.6 29.1-56.6 58.6.1 6.3h2.6l61.3-49.4c-1.8-5.5-4.3-10.8-7.4-15.5z"
                fill="#37a18e"
            />
            <path
                d="m126.8 26.3-11.3-11.2c-1.5-1.5-4-1.5-5.6 0l-48.3 49.9-20.9-20.6c-1.5-1.5-4-1.5-5.6 0l-10 9.9c-1.5 1.5-1.5 4 0 5.5l33.4 33.1c.9.9 2.1 1.2 3.3 1.1 1.2.1 2.4-.2 3.3-1.1l61.7-61c1.5-1.6 1.5-4.1 0-5.6z"
                fill="#f2f1ef"
            />
            <path
                d="m65.1 92.9 61.7-61c1.5-1.5 1.5-4 0-5.5l-1.8-1.7-63.3 62.2-35-34.1-1.5 1.5c-1.5 1.5-1.5 4 0 5.5l33.4 33.1c.9.9 2.1 1.2 3.3 1.1 1.1.1 2.3-.2 3.2-1.1z"
                fill="#e6e5e3"
            />
        </svg>
    );
};
export default IconSuccess;
