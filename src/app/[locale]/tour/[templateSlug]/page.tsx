import dynamic from "next/dynamic";

import { LangCode } from "@/models/management/cms/language.interface";
import { BreadCrumb } from "@/components/frontend/BreadCrumb";
import { notFound } from "next/navigation";
import { isUndefined } from "lodash";
import { formatDate } from "@/utils/date";
import { moneyFormatVND } from "@/utils/helper";
import LineSpacing from "@/components/frontend/LineSpacing";
import { FeProductItem } from "@/models/fe/productItem.interface";

// import ProductSummaryCard from "@/components/frontend/skeletons/ProductSummaryCard";
// import ProductGalleries from "@/components/frontend/skeletons/ProductGalleries";
import { getTemplateContentDetail, getSellableListByTemplateCode } from "../_actions/templateContent";
import Title from "@/components/frontend/Title";
import TourCard from "@/components/frontend/TourCard";
import { mediaConfig } from "@/configs";
import Galleries from "../detail/[sellableId]/_components/Galleries";
import ProductGallery from "../_components/ProductGallery";

// // import { ProductTourTabsContentSkeleton } from "./_components/ProductContent";
// import ProductContent from "./_components/ProductContent";

// const DynamicGalleries = dynamic(() => import("./_components/Galleries"), {
//   loading: () => <ProductGalleries className="w-full mb-6" />,
//   ssr: false,
// });

// const DynamicProductContent = dynamic(() => import("./_components/ProductContent"), {
//   loading: () => <ProductTourTabsContentSkeleton />,
//   ssr: true,
// });
type PageProps = {
  params: {
    locale: LangCode;
    templateSlug: string;
  };
};
export default async function PageTours({ params: { locale, templateSlug } }: PageProps) {
  /**
   *
   * define the path: lang/templateId/sellableId/content-slug
   *
   */
  // const [templateId, sellableId, contentSlug] = slug;

  const cmsTemplateContent = await getTemplateContentDetail({
    slug: templateSlug,
    lang: locale,
  });

  if (isUndefined(cmsTemplateContent)) {
    notFound();
  }

  const productList = await getSellableListByTemplateCode(cmsTemplateContent.code);
  console.log({ productList, cmsTemplateContent });

  if (isUndefined(productList) || !productList.length) {
    notFound();
  }

  const getCmsContentByLang = (item: FeProductItem) => {
    return item.template.cms.find((cmsItem) => cmsItem.lang === locale);
  };

  const getMinAdultPrice = (pricingList: FeProductItem["configs"]) => {
    let minPrice = 99999999999;
    pricingList.forEach((item) => {
      if (item.open > 0 && item.adult < minPrice) {
        minPrice = item.adult;
      }
    });

    return minPrice;
  };

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
          <div className="tour-contents w-full">
            <Title>{cmsTemplateContent?.name}</Title>
            {/* <ProductGallery images={cmsTemplateContent?.images} /> */}
            <div className="tour__list-items grid lg:grid-cols-4 grid-cols-2 gap-3 lg:gap-6">
              {productList?.map((product) => (
                <TourCard
                  key={product.recId}
                  thumbnail={`${mediaConfig.rootApiPath}/${getCmsContentByLang(product)?.thumbnail.original}`}
                  name={getCmsContentByLang(product)?.name}
                  price={product.configs.length ? moneyFormatVND(getMinAdultPrice(product.configs)) : undefined}
                  departDate={formatDate(product.startDate, "dd/MM/yyyy")}
                  tourCode={product.template.code}
                  openAmount={product.open}
                  href={`/tour/detail/${product.recId}/${getCmsContentByLang(product)?.slug}`}
                  shadow="md"
                />
              ))}
            </div>
            {/* 
          

            <Benefit items={cmsTemplateContent?.metaData} />

            <div className="line w-full h-[1px] bg-gray-100"></div>

            <ProductContent data={cmsTemplateContent} />

            <div className="space h-8"></div>
            {/* <TourRelateds className="mb-8" /> */}
            {/* <TourReviews /> */}
          </div>
          {/* <DynamicProductSummary
            defaultSellable={currentSellable}
            sellableList={sellableList}
            className="w-full lg:w-5/12 lg:pl-8 "
          />
          <ClientStoreData
            data={cmsTemplateContent?.languages}
            log={{ productResponse, cmsTemplateContentDetailResponse }}
          />  */}
        </div>
      </div>
    </div>
  );
}
