import Image from "next/image";
import NavbarSecondary from "../commons/NavbarSecondary";
import dynamic from "next/dynamic";
import BoxSearchSkeleton from "../BoxSearchTourFe/BoxSearchSkeleton";
import { SITE_NAME } from "@/configs/site";
const DynamicSearchBox = dynamic(() => import("../BoxSearchTourFe"), {
  loading: () => (
    <div className="container mx-auto lg:px-8 px-4 md:px-6">
      <BoxSearchSkeleton />
    </div>
  ),
  ssr: false,
});

export interface HeroHomeWraperProps {
  title?: string;
  subTitle?: string;
  imageUrl?: string;
  chilren?: React.ReactNode;
}
export default async function HeroHomeWraper({
  title,
  subTitle,
  imageUrl = "/assets/images/slide-banner.jpg",
  chilren,
}: HeroHomeWraperProps) {
  return (
    <div className="page-middle relative pt-8 pb-6 lg:pb-16 w-full flex flex-col justify-end lg:justify-between lg:h-[650px]">
      <NavbarSecondary className="hidden lg:block" />
      <div className="trv-slider absolute top-0 bottom-0 left-0 right-0">
        <Image
          src={imageUrl}
          fill
          alt={SITE_NAME}
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>
      <div className="container mx-auto relative z-10 px-4 md:px-6 lg:px-8">
        <div className="box-content text-white text-center py-6">
          <h5 className="text-white drop-shadow-lg text-xl md:text-3xl lg:text-5xl font-bold mb-4">{title}</h5>
          <p className="font-bold text-base lg:text-xl drop-shadow-md">{subTitle}</p>
        </div>
        {chilren}
        <DynamicSearchBox />
      </div>
    </div>
  );
}
