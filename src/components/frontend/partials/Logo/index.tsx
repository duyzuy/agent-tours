import Image from "next/image";
import React, { memo } from "react";
import classNames from "classnames";
import { Link } from "@/utils/navigation";
import { SITE_LOGO, SITE_NAME } from "@/configs/site";
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
  alt = SITE_NAME,
  className = "",
  href = "/",
  thumbUrl = SITE_LOGO,
  ...restProps
}) => {
  return (
    <Link
      href={href}
      className={classNames("logo block", {
        [className]: className,
      })}
    >
      <Image src={thumbUrl} alt={alt} width={width} height={height} loading="lazy" {...restProps} />
    </Link>
  );
};
export default memo(Logo);
