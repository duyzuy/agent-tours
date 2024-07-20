import { LangCode } from "@/models/management/cms/language.interface";
import { BreadCrumb } from "@/components/frontend/BreadCrumb";
import { notFound } from "next/navigation";
import { getDestinationContentDetail } from "../../_actions/destination";
import { getProductList } from "../../_actions/searchProduct";
import { FeSearchTourQueryParams } from "@/models/fe/searchTour.interface";
import { EProductType } from "@/models/management/core/productType.interface";
// import { ProductTourTabsContentSkeleton } from "./_components/ProductContent";
import TourCard from "@/components/frontend/TourCard";
import { FeProductItem } from "@/models/fe/productItem.interface";
import { mediaConfig } from "@/configs";
import { moneyFormatVND } from "@/utils/helper";
import { formatDate } from "@/utils/date";
import AreaContentHtml from "@/components/frontend/AreaContentHtml";
import IconQuote from "@/assets/icons/IconQuote";
import Title from "@/components/frontend/Title";
import { Metadata, ResolvingMetadata } from "next";
import { SITE_NAME } from "@/configs/site";
import DestionationGallery from "../_components/DestinationGallery";

interface PageProps {
  params: { locale: LangCode; slug: string };
}

export async function generateMetadata(
  { params: { locale, slug } }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const destinationContent = await getDestinationContentDetail({
    slug: slug,
    lang: locale,
  });
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];
  const nextImage = destinationContent
    ? [`${mediaConfig.rootApiPath}/${destinationContent.thumbnail?.original}`, ...previousImages]
    : previousImages;

  // const title = pageContent?.result?.metaTitle ?? "404";
  return {
    title: `${destinationContent?.title} | ${SITE_NAME}`,
    keywords: destinationContent?.metaKeyword,
    description: destinationContent?.metaDescription,
    openGraph: {
      images: nextImage,
      description: destinationContent?.metaDescription,
    },
  };
}

export default async function DestinationPageDetail({ params: { locale, slug } }: PageProps) {
  /**
   *
   * define the path: lang/templateId/sellableId/content-slug
   *
   */

  const destinationContent = await getDestinationContentDetail({
    slug: slug,
    lang: locale,
  });
  const { searchConfigs } = destinationContent || {};

  const destList = searchConfigs?.reduce<Required<Required<FeSearchTourQueryParams>["requestObject"]>["byDest"]>(
    (acc, item) => {
      acc = [
        ...acc,
        {
          countryKey: item.countryKey,
          stateProvinceKey: item.stateProvinceKey,
          keyType: item.keyType,
          regionKey: item.regionKey,
          subRegionKey: item.subRegionKey,
        },
      ];
      return acc;
    },
    [],
  );

  const initQueryParams = new FeSearchTourQueryParams(
    {
      byProductType: [EProductType.TOUR],
      byDest: destList,
    },
    1,
    999,
  );

  console.log({ destList, initQueryParams: JSON.stringify(initQueryParams) });

  const productList = await getProductList(initQueryParams);

  if (!destinationContent) {
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
          items={[{ title: "Điểm đến hấp dẫn" }, { title: destinationContent.title }]}
          classname="container mx-auto py-4 lg:px-8 md:px-6 px-4"
        />
      </div>

      <div className="container mx-auto py-8 lg:px-8 md:px-6 px-4">
        <div className="destination-inner">
          <div className="page-detail-head mb-6">
            <Title>{destinationContent.title}</Title>
          </div>
          <div className="recap bg-slate-50 pl-12 pt-6 pb-6 pr-6 rounded-lg mb-6 relative">
            <span className="absolute left-3 top-3">
              <IconQuote className=" fill-rose-300 stroke-none" />
            </span>
            <div className="recap-content italic">{destinationContent.shortDescriptions}</div>
          </div>
          <DestionationGallery images={destinationContent.images} />
          <AreaContentHtml content={destinationContent.descriptions} />
        </div>
        <div className="product-list grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {productList?.map((product) => (
            <TourCard
              key={product.recId}
              thumbnail={`${mediaConfig.rootApiPath}/${getCmsContentByLang(product)?.thumbnail.original}`}
              name={getCmsContentByLang(product)?.name}
              price={product.configs.length ? moneyFormatVND(getMinAdultPrice(product.configs)) : undefined}
              departDate={formatDate(product.startDate, "dd/MM/yyyy")}
              tourCode={product.template.code}
              openAmount={product.open}
              href={`/tour/${product.sellableTemplateId}/${product.recId}/${getCmsContentByLang(product)?.slug}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
