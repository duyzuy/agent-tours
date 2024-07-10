import { unstable_setRequestLocale } from "next-intl/server";
import VisaSection from "./_components/VisaSection";
import PostsSection from "./_components/PostsSection";
import ExploreSection from "./_components/ExploreSection";

import BannerSection from "./_components/BannerSection";
import TopSliderSection from "./_components/TopSliderSection";

import TourListContainer from "./_components/TourListContainer";
import { Suspense } from "react";
import SkeletonLoadingCards from "@/components/frontend/skeletons/SkeletonLoadingCards";
import { LangCode } from "@/models/management/cms/language.interface";
import { FeSearchTourQueryParams } from "@/models/fe/searchTour.interface";
import { EProductType } from "@/models/management/core/productType.interface";

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

  return (
    <div className="page-home">
      <TopSliderSection />
      <div
        className="page-bottom pt-12"
        style={{
          background: "url(/assets/images/bg.jpg)",
          backgroundSize: "cover",
        }}
      >
        {/* <FlashSale /> */}

        <BannerSection />

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
        </Suspense>

        <div className="lg:h-12 h-4"></div>
        <VisaSection />
        <div className="lg:h-12 h-4"></div>
        <PostsSection />
        <div className="lg:h-12 h-4"></div>
        <ExploreSection />
      </div>
    </div>
  );
}
