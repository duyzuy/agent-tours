import IconCalendar from "@/assets/icons/IconCalendar";
import IconChevronRight from "@/assets/icons/IconChevronRight";
import IconHotel from "@/assets/icons/IconHotel";
import IconMeal from "@/assets/icons/IconMeal";
import IconPlane from "@/assets/icons/IconPlane";
import LineSpacing from "@/components/frontend/LineSpacing";
import CustomTabs from "@/components/frontend/CustomTabs";

import Image from "next/image";

import {
    IconScrollText,
    IconCalendarCheck,
    IconCalendarPlus,
    IconClipboard,
} from "@/assets/icons";

import BookingBreakDownBox from "../_components/BookingBreakDownBox";
import TourRelateds from "../_components/TourRelateds";
import TourReviews from "../_components/TourReviews";
import {
    getTemplateContentDetail,
    getSellableListByTemplateId,
} from "../_actions/templateContent";
import { LangCode } from "@/models/management/cms/language.interface";
import { BreadCrumb } from "@/components/frontend/BreadCrumb";
import Galleries from "./_components/Galleries";
import { notFound } from "next/navigation";
import ProductHeader from "./_components/ProductHeader";
import Benefit from "./_components/Benefit";
import ProductContent from "./_components/ProductContent";

// export async function generateStaticParams() {
//     const posts = await fetch('https://.../posts').then((res) => res.json())

//     return posts.map((post) => ({
//       slug: post.slug,
//     }))
//   }

type PageTourDetailProps = {
    params: {
        locale: LangCode;
        slug: string[];
    };
};
export default async function PageTourDetail({
    params: { locale, slug },
}: PageTourDetailProps) {
    const [templateId, sellableId, contentSlug] = slug;

    const cmsContentDetail = await getTemplateContentDetail({
        slug: contentSlug,
        lang: locale,
    });

    const cmsTemplateContent = cmsContentDetail?.result[0];
    const productResponse = await getSellableListByTemplateId(
        Number(templateId),
    );
    const sellableList = productResponse?.result;
    const currentSellable = sellableList?.find(
        (item) => item.recId === Number(sellableId),
    );

    if (!cmsTemplateContent || !sellableList || !sellableList.length) {
        notFound();
    }

    console.log({ productResponse, cmsContentDetail });

    return (
        <div className="page-detail">
            <BreadCrumb items={[{ title: cmsTemplateContent.name }]} />
            <div className="container mx-auto py-8">
                <div className="flex flex-wrap">
                    <div
                        className="tour-contents pr-8"
                        style={{ width: "calc(100% - 380px)" }}
                    >
                        <ProductHeader
                            name={cmsTemplateContent.name}
                            tourCode={currentSellable?.template.code}
                        />
                        <Galleries
                            data={cmsContentDetail}
                            data2={productResponse}
                        />
                        <Benefit items={cmsTemplateContent.metaData} />
                        <LineSpacing spaceY={12} />
                        <ProductContent data={cmsTemplateContent} />
                        <div className="space h-8"></div>
                        {/* <TourRelateds className="mb-8" /> */}
                        {/* <TourReviews /> */}
                    </div>
                    <BookingBreakDownBox className="w-full max-w-[380px] lg:block hidden" />
                </div>
            </div>
        </div>
    );
}
