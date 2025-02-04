import Image from "next/image";
import dynamic from "next/dynamic";
import { SITE_NAME } from "@/configs/site";
import NavbarSecondary from "./commons/NavbarSecondary";
import { BoxSearchBookingSkeleton } from "./BoxSearchBookingContainer";
const DynamicBoxSearchContainer = dynamic(() => import("./BoxSearchBookingContainer"), {
  ssr: false,
  loading: () => (
    <div className="container mx-auto lg:px-8 px-4 md:px-6">
      <BoxSearchBookingSkeleton />
    </div>
  ),
});
export interface HeroSearchSectionProps {
  title?: string;
  subTitle?: string;
  imageUrl?: string;
  chilren?: React.ReactNode;
}
export default async function HeroSearchSection({
  title,
  subTitle,
  imageUrl = "/assets/images/master-banner.jpeg",
  chilren,
}: HeroSearchSectionProps) {
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
      <NavbarSecondary className="hidden lg:block" />
      <div className="container mx-auto relative z-10 px-4 md:px-6 lg:px-8">
        <div className="box-content text-white text-center py-6">
          <h5 className="text-white drop-shadow-lg text-3xl md:text-3xl lg:text-5xl font-bold mb-4 uppercase">
            {title}
          </h5>
          <p className="text-base lg:text-xl drop-shadow-md">{subTitle}</p>
        </div>
        {chilren}
        <DynamicBoxSearchContainer />
      </div>
    </div>
  );
}
