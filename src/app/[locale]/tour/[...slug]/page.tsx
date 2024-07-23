import dynamic from "next/dynamic";

import { LangCode } from "@/models/management/cms/language.interface";
import { BreadCrumb } from "@/components/frontend/BreadCrumb";
import { notFound } from "next/navigation";
import ProductHeader from "./_components/ProductHeader";
import Benefit from "./_components/Benefit";
import ClientStoreData from "./_components/ClientStoreData";
import ProductSummaryCard from "@/components/frontend/skeletons/ProductSummaryCard";
import ProductGalleries from "@/components/frontend/skeletons/ProductGalleries";
import { getTemplateContentDetail, getSellableListByTemplateId } from "../_actions/templateContent";
import { isMobile } from "@/utils/detectMobile";

// import { ProductTourTabsContentSkeleton } from "./_components/ProductContent";

import ProductContent from "./_components/ProductContent";
import { isUndefined } from "lodash";
import TourRelateds from "../_components/TourRelateds";
import { getProductListByCMSIdentity } from "../../_actions/searchProduct";
import { FeProductItem } from "@/models/fe/productItem.interface";

const DynamicGalleries = dynamic(() => import("./_components/Galleries"), {
  loading: () => <ProductGalleries className="w-full mb-6" />,
  ssr: false,
});

// const DynamicProductContent = dynamic(() => import("./_components/ProductContent"), {
//   loading: () => <ProductTourTabsContentSkeleton />,
//   ssr: true,
// });

const DynamicProductSummary = dynamic(() => import("./_components/ProductSummary"), {
  loading: () => <ProductSummaryCard className="w-full lg:w-5/12 lg:pl-8 " />,
  ssr: false,
});
const DynamicMobProductSummary = dynamic(() => import("./_components/mobile/MobProductSummary"), {
  loading: () => <ProductSummaryCard className="w-full lg:w-5/12 lg:pl-8 " />,
  ssr: false,
});

type PageProps = {
  params: {
    locale: LangCode;
    slug: string[];
  };
};

export default async function PageTourDetail({ params: { locale, slug } }: PageProps) {
  /**
   *
   * define the path: lang/templateId/sellableId/content-slug
   *
   */
  const [templateId, sellableId, templateContentSlug] = slug;

  const cmsTemplateContent = await getTemplateContentDetail({
    slug: templateContentSlug,
    lang: locale,
  });

  let productRelatedList: FeProductItem[] | undefined = [];
  if (cmsTemplateContent) {
    productRelatedList = await getProductListByCMSIdentity(cmsTemplateContent?.code, 10);
  }

  const productList = await getSellableListByTemplateId(Number(templateId));
  const currentSellable = productList?.find((item) => item.recId === Number(sellableId));

  if (
    isUndefined(cmsTemplateContent) ||
    isUndefined(templateId) ||
    isUndefined(sellableId) ||
    isUndefined(templateContentSlug) ||
    isUndefined(productList) ||
    !productList.length ||
    !currentSellable
  ) {
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
            {productRelatedList?.length ? (
              <TourRelateds
                className="mb-8"
                items={productRelatedList}
                sellableTemplateCode={cmsTemplateContent.templateCodes}
              />
            ) : null}

            {/* <TourReviews /> */}
          </div>
          {isMobile() ? (
            <DynamicMobProductSummary
              defaultSellable={currentSellable}
              name={cmsTemplateContent?.name}
              sellableList={productList}
              className="w-full"
            />
          ) : (
            <DynamicProductSummary
              defaultSellable={currentSellable}
              sellableList={productList}
              className="w-full lg:w-5/12 lg:pl-8"
            />
          )}
          <ClientStoreData data={cmsTemplateContent?.languages} log={{ productList, cmsTemplateContent }} />
        </div>
      </div>
    </div>
  );
}
