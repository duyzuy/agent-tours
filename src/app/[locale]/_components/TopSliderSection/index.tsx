import Image from "next/image";
import NavbarSecond from "./NavbarSecond";
import dynamic from "next/dynamic";
import BoxSearchSkeleton from "../BoxSearchTourFe/BoxSearchSkeleton";
const DynamicSearchBox = dynamic(() => import("../BoxSearchTourFe"), {
  loading: () => (
    <div className="container mx-auto lg:px-8 px-4 md:px-6">
      <BoxSearchSkeleton />
    </div>
  ),
  ssr: false,
});

export default async function TopSliderSection() {
  return (
    <div className="page-middle relative pt-8 pb-6 lg:pb-16 w-full flex flex-col justify-end lg:justify-between lg:h-[650px]">
      <NavbarSecond className="hidden lg:block" />
      <div className="trv-slider absolute top-0 bottom-0 left-0 right-0">
        <Image
          src="/assets/images/slide-banner.jpg"
          fill
          alt="slider"
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>
      <div className="container mx-auto relative z-10 px-4 md:px-6 lg:px-8">
        <div className="box-content text-white text-center py-6">
          <h5 className="text-white drop-shadow-lg text-xl md:text-3xl lg:text-5xl font-bold mb-4">
            Trải nghiệm kỳ nghỉ tuyệt vời
          </h5>
          <p className="font-bold text-base lg:text-xl drop-shadow-md">
            Combo khách sạn - vé máy bay - đưa đón sân bay giá tốt nhất
          </p>
        </div>
        <DynamicSearchBox />
      </div>
    </div>
  );
}
