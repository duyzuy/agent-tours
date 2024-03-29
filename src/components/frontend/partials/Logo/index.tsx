import Link from "next/link";
import Image from "next/image";
import React, { memo } from "react";
import classNames from "classnames";
interface LogoProps {
    width?: number;
    height?: number;
    alt?: string;
    className?: string;
}

const Logo: React.FC<LogoProps> = ({
    width = 100,
    height = 100,
    alt = "Logo",
    className = "",
}) => {
    return (
        <Link
            href="/"
            className={classNames("logo", {
                [className]: className,
            })}
        >
            <Image
                src="/assets/images/logo-anthai.svg"
                alt={alt}
                width={width}
                height={height}
            />
        </Link>
    );
};
export default memo(Logo);
