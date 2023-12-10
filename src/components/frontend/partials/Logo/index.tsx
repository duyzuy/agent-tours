import Link from "next/link";
import Image from "next/image";
import React, { memo } from "react";
interface LogoProps {
    width?: number;
    height?: number;
    alt?: string;
}

const Logo: React.FC<LogoProps> = ({
    width = 100,
    height = 100,
    alt = "Logo",
}) => {
    return (
        <Link href="/">
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
