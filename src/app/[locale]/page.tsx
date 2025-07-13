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

const ITEMS = [
  {
    id: 1,
    name: "Banner 1",
    slug: "/post/chill-he-cuc-nhiet-voi-loat-uu-dai-qua-tang-tu-vietravel-va-enchanteur",
    thumb: "/assets/images/banner-n1.jpg",
  },
  {
    id: 2,
    name: "Banner 2",
    slug: "/post/vui-he-cuc-tiet-kiem-voi-voucher-giam-gia-len-den-60-tu-vietravel-va-mykingdom",
    thumb: "/assets/images/banner-n2.jpg",
  },
  {
    id: 3,
    name: "Banner 3",
    slug: "/post/du-lich-tha-ga-thoa-suc-rinh-uu-dai-tu-anthai-va-ocb",
    thumb: "/assets/images/banner-n3.jpg",
  },
  {
    id: 4,
    name: "Banner 4",
    slug: "/post/deal-sieu-hot-tu-vietravel-x-momo-giam-den-250-000-dong-khi-thanh-toan-tour-du-lich-tron-goi",
    thumb: "/assets/images/banner-n4.jpg",
  },
];

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

        <PromotionSlider items={[]} title="Tour khuyến mại" />

        <div className="lg:h-12 h-4"></div>
        <TourCardListContainer querySearch={travelTour} title="Chương trình du lịch hấp dẫn" />
        <div className="lg:h-12 h-4"></div>
        <VisaSection label="Dịch vụ thị thực nhập cảnh (Visa)" />
        <div className="lg:h-12 h-4"></div>
        <DestinationsList label="Vòng quanh thế giới" />
        {/* <div className="lg:h-12 h-4"></div>
        <PostsSection /> */}
        <div className="lg:h-12 h-4"></div>
        <PostListContainer />
      </div>
    </div>
  );
}
