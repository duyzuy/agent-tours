import Link from "next/link";
import ArticleTour from "@/components/frontend/TourCard";
import VisaSection from "./_components/VisaSection";
import PostsSection from "./_components/PostsSection";
import ExploreSection from "./_components/ExploreSection";
import FlashSale from "./_components/FlashSale";
import LineSpacing from "@/components/frontend/LineSpacing";
import BannerSection from "./_components/BannerSection";
import TopSliderSection from "./_components/TopSliderSection";
import { useTranslations } from "next-intl";
import { useSession, signIn, signOut } from "next-auth/react";
import TourListContainer from "./_components/TourListContainer";
import { Suspense } from "react";
import SkeletonLoadingCards from "@/components/frontend/skeletons/SkeletonLoadingCards";
import { LangCode } from "@/models/management/cms/language.interface";
import { FeSearchTourQueryParams } from "@/models/fe/searchTour.interface";
import { EProductType } from "@/models/management/core/productType.interface";
import { getTranslations } from "next-intl/server";

export default async function FeHomePage({
    params,
}: {
    params: { locale: LangCode };
}) {
    const { locale } = params;

    // const t = useTranslations("home");
    // const { data: session } = useSession();
    // console.log(session);

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
                {/* <LineSpacing spaceY={12} className="lg:px-0 px-4" /> */}
                <BannerSection />
                <LineSpacing spaceY={12} className="lg:px-0 px-4" />
                <Suspense
                    fallback={
                        <div className="container mx-auto">
                            <SkeletonLoadingCards length={4} />
                        </div>
                    }
                >
                    <TourListContainer
                        lang={locale}
                        querySearch={travelthaiAug}
                        title="Du lich thailand"
                    />
                </Suspense>
                <LineSpacing spaceY={12} className="lg:px-0 px-4" />
                <Suspense
                    fallback={
                        <div className="container mx-auto">
                            <SkeletonLoadingCards length={4} />
                        </div>
                    }
                >
                    <TourListContainer
                        lang={locale}
                        querySearch={traveltaiwanAug}
                        title="Du lich Dailoan"
                    />
                </Suspense>

                <LineSpacing spaceY={12} className="lg:px-0 px-4" />
                <VisaSection />
                <LineSpacing spaceY={12} className="lg:px-0 px-4" />
                <PostsSection />
                <LineSpacing spaceY={12} className="lg:px-0 px-4" />
                <ExploreSection />
            </div>
        </div>
    );
}
