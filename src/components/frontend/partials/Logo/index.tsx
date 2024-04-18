import Link from "next/link";
import Image from "next/image";
import React, { memo } from "react";
import classNames from "classnames";
export interface LogoProps {
    width?: number;
    height?: number;
    alt?: string;
    className?: string;
    href?: string;
    thumbUrl?: string;
}

const Logo: React.FC<LogoProps> = ({
    width = 100,
    height = 100,
    alt = "Logo",
    className = "",
    href = "/",
    thumbUrl = "/assets/images/logo-anthai.svg",
}) => {
    return (
        <Link
            href={href}
            className={classNames("logo", {
                [className]: className,
            })}
        >
            <Image
                src={thumbUrl}
                alt={alt}
                width={width}
                height={height}
                loading="lazy"
            />
        </Link>
    );
};
export default memo(Logo);
