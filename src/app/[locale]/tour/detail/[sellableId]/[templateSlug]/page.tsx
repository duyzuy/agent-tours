import dynamic from "next/dynamic";

import { LangCode } from "@/models/management/cms/language.interface";
import { BreadCrumb } from "@/components/frontend/BreadCrumb";
import { notFound } from "next/navigation";
import ProductHeader from "../_components/ProductHeader";
import Benefit from "../_components/Benefit";
import ClientStoreData from "../_components/ClientStoreData";
import ProductSummaryCard from "@/components/frontend/skeletons/ProductSummaryCard";
import ProductGalleries from "@/components/frontend/skeletons/ProductGalleries";
import { getTemplateContentDetail, getSellableListByTemplateCode } from "../../../_actions/templateContent";

// import { ProductTourTabsContentSkeleton } from "./_components/ProductContent";
import ProductContent from "../_components/ProductContent";
import { isUndefined } from "lodash";

const DynamicGalleries = dynamic(() => import("../_components/Galleries"), {
  loading: () => <ProductGalleries className="w-full mb-6" />,
  ssr: false,
});

// const DynamicProductContent = dynamic(() => import("./_components/ProductContent"), {
//   loading: () => <ProductTourTabsContentSkeleton />,
//   ssr: true,
// });

const DynamicProductSummary = dynamic(() => import("../_components/ProductSummary"), {
  loading: () => <ProductSummaryCard className="w-full lg:w-5/12 lg:pl-8 " />,
  ssr: false,
});
type PageProps = {
  params: {
    locale: LangCode;
    sellableId: string;
    templateSlug: string;
  };
};

export default async function PageTourDetail({ params: { locale, templateSlug, sellableId } }: PageProps) {
  /**
   *
   * define the path: lang/templateId/sellableId/content-slug
   *
   */

  const cmsTemplateContent = await getTemplateContentDetail({
    slug: templateSlug,
    lang: locale,
  });

  if (isUndefined(cmsTemplateContent)) {
    notFound();
  }

  const productList = await getSellableListByTemplateCode(cmsTemplateContent.code);
  console.log({ productList, cmsTemplateContent });

  const currentSellable = productList?.find((item) => item.recId === Number(sellableId));

  if (isUndefined(productList) || !productList.length) {
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
          <div className="tour-contents w-full lg:w-7/12">
            <ProductHeader name={cmsTemplateContent?.name} tourCode={currentSellable?.template.code}>
              <h1 className="text-xl text-primary-default font-bold">{cmsTemplateContent?.name}</h1>
            </ProductHeader>

            <DynamicGalleries images={cmsTemplateContent?.images} />

            <Benefit items={cmsTemplateContent?.metaData} />

            <div className="line w-full h-[1px] bg-gray-100"></div>

            <ProductContent data={cmsTemplateContent} />

            <div className="space h-8"></div>
            {/* <TourRelateds className="mb-8" /> */}
            {/* <TourReviews /> */}
          </div>
          <DynamicProductSummary
            defaultSellable={currentSellable}
            sellableList={productList}
            className="w-full lg:w-5/12 lg:pl-8 "
          />
          <ClientStoreData data={cmsTemplateContent?.languages} log={{ productList, cmsTemplateContent }} />
        </div>
      </div>
    </div>
  );
}
