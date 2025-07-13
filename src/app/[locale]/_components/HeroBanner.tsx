import Image from "next/image";
import { SITE_NAME } from "@/configs/site";
import { PropsWithChildren } from "react";

export interface HeroBannerProps extends PropsWithChildren {
  title?: string;
  subTitle?: string;
  imageUrl?: string;
}
export default async function HeroBanner({
  title,
  subTitle,
  imageUrl = "/assets/images/master-banner.jpeg",
  children,
}: HeroBannerProps) {
  return (
    <div className="page-middle relative pt-8 pb-6 lg:pb-16 w-full flex flex-col justify-end lg:justify-between lg:h-[520px]">
      <div className="absolute top-0 bottom-0 left-0 right-0">
        <Image
          src={imageUrl}
          fill
          loading="lazy"
          alt={SITE_NAME}
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>
      {children}
    </div>
  );
}
