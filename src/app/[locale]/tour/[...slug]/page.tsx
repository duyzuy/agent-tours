import dynamic from "next/dynamic";
import { getTemplateContentDetail, getSellableListByTemplateId } from "../_actions/templateContent";
import { LangCode } from "@/models/management/cms/language.interface";
import { BreadCrumb } from "@/components/frontend/BreadCrumb";
import { notFound } from "next/navigation";
import ProductHeader from "./_components/ProductHeader";
import Benefit from "./_components/Benefit";

import LineSpacing from "@/components/frontend/LineSpacing";
import ClientStoreData from "./_components/ClientStoreData";
import ProductSummaryCard from "@/components/frontend/skeletons/ProductSummaryCard";
import ProductGalleries from "@/components/frontend/skeletons/ProductGalleries";
import { ResolvingMetadata, Metadata } from "next";
import { mediaConfig } from "@/configs";

const DynamicGalleries = dynamic(() => import("./_components/Galleries"), {
  loading: () => <ProductGalleries className="w-full mb-6" />,
  ssr: false,
});

const DynamicProductContent = dynamic(() => import("./_components/ProductContent"), {
  loading: () => <p>Loading product content...</p>,
  ssr: false,
});

const DynamicProductSummary = dynamic(() => import("./_components/ProductSummary"), {
  loading: () => <ProductSummaryCard className="w-full lg:w-5/12 lg:pl-8 " />,
  ssr: false,
});
type PageProps = {
  params: {
    locale: LangCode;
    slug: string[];
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const [templateId, sellableId, contentSlug] = params.slug;

  // fetch data
  const tourContent = await getTemplateContentDetail({
    slug: contentSlug,
    lang: params.locale,
  });

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  const totalImages = tourContent?.result[0].thumb
    ? [`${mediaConfig.rootApiPath}/${tourContent.result[0].thumb}`, ...previousImages]
    : [...previousImages];

  return {
    title: tourContent?.result[0].name || "",
    openGraph: {
      title: tourContent?.result[0].name || "",
      images: [...totalImages],
    },
  };
}

export default async function PageTourDetail({ params: { locale, slug } }: PageProps) {
  const [templateId, sellableId, contentSlug] = slug;

  const [productResponse, cmsContentDetail] = await Promise.all([
    getSellableListByTemplateId(Number(templateId)),
    getTemplateContentDetail({
      slug: contentSlug,
      lang: locale,
    }),
  ]);

  const cmsTemplateContent = cmsContentDetail?.result[0];

  const sellableList = productResponse?.result;
  const currentSellable = sellableList?.find((item) => item.recId === Number(sellableId));

  if (!cmsTemplateContent || !sellableList || !sellableList.length || !currentSellable) {
    notFound();
  }

  return (
    <div className="page-detail">
      <div className="bg-gray-100">
        <BreadCrumb
          items={[{ title: cmsTemplateContent?.name }]}
          classname="container mx-auto py-4 lg:px-8 md:px-6 px-4"
        />
      </div>

      <div className="container mx-auto py-8 lg:px-8 md:px-6 px-4">
        <div className="flex flex-wrap">
          <div
            className="tour-contents w-full lg:w-7/12"
            // style={{ width: "calc(100% - 380px)" }}
          >
            <ProductHeader name={cmsTemplateContent?.name} tourCode={currentSellable?.template.code}>
              <h1 className="text-xl text-primary-default font-bold">{cmsTemplateContent?.name}</h1>
            </ProductHeader>

            <DynamicGalleries images={cmsTemplateContent?.images.listImage} />

            <Benefit items={cmsTemplateContent?.metaData} />
            <LineSpacing spaceY={6} />
            <DynamicProductContent data={cmsTemplateContent} log={{ productResponse, cmsContentDetail }} />
            <div className="space h-8"></div>
            {/* <TourRelateds className="mb-8" /> */}
            {/* <TourReviews /> */}
          </div>
          <DynamicProductSummary
            defaultSellable={currentSellable}
            sellableList={sellableList}
            className="w-full lg:w-5/12 lg:pl-8 "
          />
          <ClientStoreData data={cmsTemplateContent?.languages} />
        </div>
      </div>
    </div>
  );
}
