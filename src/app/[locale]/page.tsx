import { unstable_setRequestLocale } from "next-intl/server";

import { LangCode } from "@/models/management/cms/language.interface";
import { FeSearchTourQueryParams } from "@/models/fe/searchTour.interface";
import { EProductType } from "@/models/management/core/productType.interface";
import HeroSearchSection from "./_components/HeroSearchSection";
import DestinationsList from "./_components/DestinationsList";
import PostListContainer from "./_components/PostListContainer";
import VisaSection from "./_components/VisaSection";
import { PromotionSliderSkeleton } from "./_components/PromotionSlider";
import TourListContainer from "./_components/TourListContainer";
import dynamic from "next/dynamic";

const DynamicSlider = dynamic(() => import("./_components/PromotionSlider"), {
  loading: () => <PromotionSliderSkeleton />,
  ssr: false,
});

export default async function FeHomePage({ params }: { params: { locale: LangCode } }) {
  const { locale } = params;

  unstable_setRequestLocale(locale);

  // const t = useTranslations("home");
  // const dataa = await getServerSession(authOptions);
  // console.log({ dataa });

  const travelthaiAug = new FeSearchTourQueryParams({
    byMonth: "Aug2024",
    byProductType: [EProductType.TOUR],
    byDest: [
      {
        regionKey: "ASIA",
        subRegionKey: "SOUTHEASTERN_ASIA",
        countryKey: "TH",
        stateProvinceKey: "",
        keyType: "COUNTRYLIST",
      },
    ],
  });

  const traveltaiwanAug = new FeSearchTourQueryParams({
    byMonth: "Aug2024",
    byProductType: [EProductType.TOUR],
    byDest: [
      {
        regionKey: "ASIA",
        subRegionKey: "EASTERN_ASIA",
        countryKey: "TW",
        stateProvinceKey: "",
        keyType: "COUNTRYLIST",
      },
    ],
  });

  const travelTour = new FeSearchTourQueryParams({
    // byMonth: "Aug2024",
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
      <HeroSearchSection
        title="Trải nghiệm kỳ nghỉ tuyệt vời"
        subTitle="Combo khách sạn - vé máy bay - đưa đón sân bay giá tốt nhất"
      />

      <div
        className="page-bottom pt-6 lg:pt-12"
        style={{
          background: "url(/assets/images/bg.jpg)",
          backgroundSize: "cover",
        }}
      >
        {/* <FlashSale /> */}

        <DynamicSlider items={[]} title="Tour khuyến mại" />

        <div className="lg:h-12 h-4"></div>
        <TourListContainer querySearch={travelTour} title="Chương trình du lịch hấp dẫn" />
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
