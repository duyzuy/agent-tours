import { unstable_setRequestLocale } from "next-intl/server";

import { LangCode } from "@/models/management/cms/language.interface";
import { FeSearchTourQueryParams } from "@/models/fe/searchTour.interface";
import { EProductType } from "@/models/management/core/productType.interface";
import DestinationsList from "./_components/DestinationsList";
import PostListContainer from "./_components/PostListContainer";
import VisaSection from "./_components/VisaSection";
import PromotionSlider, { PromotionSliderSkeleton } from "./_components/PromotionSlider";
import TourCardListContainer from "./_components/TourCardListContainer";
import dynamic from "next/dynamic";
import NavbarSecondary from "./_components/commons/NavbarSecondary";
import BoxSearchBookingContainer, { BoxSearchBookingSkeleton } from "./_components/BoxSearchBookingContainer";
import HeroBanner from "./_components/HeroBanner";
import ServiceListContainer from "./_components/ServiceListContainer";

// const DynamicBoxSearchContainer = dynamic(() => import("./_components/BoxSearchBookingContainer"), {
//   ssr: false,
//   loading: () => (
//     <div className="container mx-auto lg:px-8 px-4 md:px-6">
//       <BoxSearchBookingSkeleton />
//     </div>
//   ),
// });

const DynamicSlider = dynamic(() => import("./_components/PromotionSlider"), {
  loading: () => <PromotionSliderSkeleton />,
  ssr: false,
});

export default async function FeHomePage({ params }: { params: { locale: LangCode } }) {
  const { locale } = params;

  unstable_setRequestLocale(locale);

  const travelTour = new FeSearchTourQueryParams({
    byProductType: [EProductType.TOUR],
    // byDest: [
    //   {
    //     regionKey: "ASIA",
    //     subRegionKey: "EASTERN_ASIA",
    //     countryKey: "TW",
    //     stateProvinceKey: "",
    //     keyType: "COUNTRYLIST",
    //   },
    // ],
  });

  const extraProductQuery = new FeSearchTourQueryParams({
    byProductType: [EProductType.EXTRA],
    // byDest: [
    //   {
    //     regionKey: "ASIA",
    //     subRegionKey: "EASTERN_ASIA",
    //     countryKey: "TW",
    //     stateProvinceKey: "",
    //     keyType: "COUNTRYLIST",
    //   },
    // ],
  });

  return (
    <div className="page-home">
      <HeroBanner
        title="Trải nghiệm kỳ nghỉ tuyệt vời"
        subTitle="Combo khách sạn - vé máy bay - đưa đón sân bay giá tốt nhất"
      >
        {/* <NavbarSecondary className="hidden lg:block" /> */}
        <div className="container mx-auto relative z-10 px-4 md:px-6 lg:px-8">
          <div className="box-content text-white text-center py-6">
            <h5 className="text-white drop-shadow-lg text-3xl md:text-3xl lg:text-5xl !leading-snug font-bold mb-4 uppercase">
              Trải nghiệm kỳ nghỉ tuyệt vời
            </h5>
            <p className="text-base lg:text-xl drop-shadow-md">
              Combo khách sạn - vé máy bay - đưa đón sân bay giá tốt nhất
            </p>
          </div>
          <BoxSearchBookingContainer />
        </div>
      </HeroBanner>

      <div
        className="page-bottom pt-6 lg:pt-12"
        style={{
          background: "url(/assets/images/bg.jpg)",
          backgroundSize: "cover",
        }}
      >
        {/* <FlashSale /> */}

        <DynamicSlider title="Tour khuyến mại" />

        <div className="lg:h-12 h-8"></div>
        <TourCardListContainer querySearch={travelTour} title="Chương trình du lịch hấp dẫn" />
        <div className="lg:h-12 h-8"></div>
        <ServiceListContainer querySearch={extraProductQuery} title="Dịch vụ" />
        <div className="lg:h-12 h-8"></div>
        <VisaSection label="Dịch vụ thị thực nhập cảnh (Visa)" />
        <div className="lg:h-12 h-8"></div>
        <DestinationsList label="Vòng quanh thế giới" />
        {/* <div className="lg:h-12 h-8"></div>
        <PostsSection /> */}
        <div className="lg:h-12 h-8"></div>
        <PostListContainer />
      </div>
    </div>
  );
}
