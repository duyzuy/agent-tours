import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { isUndefined } from "lodash";
import { isMobile } from "@/utils/detectMobile";
import { LangCode } from "@/models/management/cms/language.interface";
import { BreadCrumb } from "@/components/frontend/BreadCrumb";
import ProductHeader from "../_components/ProductHeader";
import SingleTourMetaContent from "../_components/SingleTourMetaContent";
import ClientStoreData from "../_components/ClientStoreData";
import ProductSummaryCard from "@/components/frontend/skeletons/ProductSummaryCard";
import ProductGalleries from "@/components/frontend/skeletons/ProductGalleries";
import { getProductListByTemplateId } from "../../../../actions/searchProduct";
import { getTemplateContentDetail } from "@/actions/product.action";
import { ProductListRelatedContainer } from "../_components/ProductListRelatedContainer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import TourInformations from "../_components/TourInfomations";
import SocialsShare from "@/components/frontend/SocialsShare";

const DynamicGalleries = dynamic(() => import("../_components/GalleriesV2"), {
  loading: () => <ProductGalleries className="w-full mb-6" />,
  ssr: false,
});

const DynamicProductSummary = dynamic(() => import("../_components/ProductSummary"), {
  loading: () => <ProductSummaryCard className="w-full lg:w-4/12" />,
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
   * define the path: lang/templateId/sellableId/content-slug
   */

  const session = await getServerSession(authOptions);

  const [templateId, sellableId, templateContentSlug] = slug;

  const cmsTemplateContent = await getTemplateContentDetail({
    slug: templateContentSlug,
    lang: locale,
  });
  const productList = await getProductListByTemplateId(Number(templateId));
  const productItem = productList?.find((item) => item.recId === Number(sellableId));

  if (
    isUndefined(cmsTemplateContent) ||
    isUndefined(templateId) ||
    isUndefined(sellableId) ||
    isUndefined(templateContentSlug) ||
    isUndefined(productList) ||
    !productList.length ||
    !productItem
  ) {
    notFound();
  }

  return (
    <div className="page-detail">
      <div className="bg-gray-50">
        <BreadCrumb
          items={[{ title: "Tour" }, { title: cmsTemplateContent?.name }]}
          classname="container mx-auto py-4 lg:px-8 md:px-6 px-4"
        />
        <div className="container mx-auto lg:px-8 md:px-6 px-4 py-8">
          <div className="flex justify-between flex-wrap mb-6 gap-3">
            <ProductHeader name={cmsTemplateContent.name} tourCode={productItem.sellableTemplateCode}>
              <h1 className="text-xl lg:text-2xl text-primary-default font-bold">{cmsTemplateContent.name}</h1>
            </ProductHeader>
            <SocialsShare hideLabel />
          </div>
          <DynamicGalleries images={cmsTemplateContent.images} />
        </div>
      </div>
      <div className="h-12"></div>
      <div className="container mx-auto lg:px-8 md:px-6 px-4 text-[1rem]">
        <div className="flex flex-wrap items-start">
          <div className="tour-contents w-full lg:w-8/12 lg:pr-20">
            <SingleTourMetaContent items={cmsTemplateContent.metaData} className="mb-8" />
            {/* <TourTabsContent data={cmsTemplateContent} locale={locale} templateId={Number(templateId)} /> */}
            <TourInformations data={cmsTemplateContent} locale={locale} templateId={Number(templateId)} />

            <div className="space h-8"></div>
            <ProductListRelatedContainer cmsIdentityCode={cmsTemplateContent.code} />
            {/* <TourReviews /> */}
          </div>

          <DynamicProductSummary
            session={session}
            tourName={cmsTemplateContent.name}
            cmsTemplate={cmsTemplateContent}
            defaultProductItem={productItem}
            productList={productList}
            isMobile={isMobile()}
            className="w-full lg:w-4/12 sticky top-4"
          />
          <ClientStoreData data={cmsTemplateContent?.languages} />
        </div>
      </div>
    </div>
  );
}
