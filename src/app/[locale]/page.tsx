import { unstable_setRequestLocale } from "next-intl/server";
import VisaSection from "./_components/VisaSection";

import PromotionSlider from "./_components/PromotionSlider";

import TourListContainer from "./_components/TourListContainer";
import { Suspense } from "react";
import SkeletonLoadingCards from "@/components/frontend/skeletons/SkeletonLoadingCards";
import { LangCode } from "@/models/management/cms/language.interface";
import { FeSearchTourQueryParams } from "@/models/fe/searchTour.interface";
import { EProductType } from "@/models/management/core/productType.interface";
import HeroHomeWraper from "./_components/HeroHomeWraper";
import DestinationsList from "./_components/DestinationsList";
import PostListContainer from "./_components/PostListContainer";

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
      <HeroHomeWraper
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

        <PromotionSlider items={[]} title="Ưu đãi dành cho bạn" />
        <div className="lg:h-12 h-4"></div>
        <Suspense
          fallback={
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
              <SkeletonLoadingCards length={4} />
            </div>
          }
        >
          <TourListContainer lang={locale} querySearch={travelTour} title="Tour du lịch" />
        </Suspense>
        {/*         
        <div className="lg:h-12 h-4"></div>
        <Suspense
          fallback={
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
              <SkeletonLoadingCards length={4} />
            </div>
          }
        >
          <TourListContainer lang={locale} querySearch={travelthaiAug} title="Du lich thailand thang 8" />
        </Suspense>
        <div className="lg:h-12 h-4"></div>
        <Suspense
          fallback={
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
              <SkeletonLoadingCards length={4} />
            </div>
          }
        >
          <TourListContainer lang={locale} querySearch={traveltaiwanAug} title="Du lich Dailoan thang 8" />
        </Suspense> */}

        <div className="lg:h-12 h-4"></div>
        <VisaSection />
        <div className="lg:h-12 h-4"></div>
        <DestinationsList />
        {/* <div className="lg:h-12 h-4"></div>
        <PostsSection /> */}
        <div className="lg:h-12 h-4"></div>
        <PostListContainer />
      </div>
    </div>
  );
}
