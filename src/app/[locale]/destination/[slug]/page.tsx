import { LangCode } from "@/models/management/cms/language.interface";
import { BreadCrumb } from "@/components/frontend/BreadCrumb";
import { notFound } from "next/navigation";
import { getDestinationContentDetail } from "../../../../actions/destination";
import { mediaConfig } from "@/configs";

import AreaContentHtml from "@/components/frontend/AreaContentHtml";
import IconQuote from "@/assets/icons/IconQuote";
import Title from "@/components/frontend/Title";
import { Metadata, ResolvingMetadata } from "next";
import { SITE_NAME } from "@/configs/site";
import DestionationGallery from "../_components/DestinationGallery";
import { isEmpty } from "lodash";
import ProductListContainer from "./ProductListContainer";

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

  if (!destinationContent) {
    notFound();
  }

  return (
    <div className="page-detail">
      <div className="bg-gray-100">
        <BreadCrumb
          items={[{ title: "Điểm đến hấp dẫn" }, { title: destinationContent.title }]}
          classname="container mx-auto py-2 lg:py-3 lg:px-8 md:px-6 px-4"
        />
      </div>

      <div className="container mx-auto py-6 lg:py-8 lg:px-8 md:px-6 px-4">
        <div className="destination-inner">
          <div className="page-detail-head mb-6">
            <Title>{destinationContent.title}</Title>
          </div>
          {destinationContent.shortDescriptions && !isEmpty(destinationContent.shortDescriptions) ? (
            <div className="recap bg-slate-50 pl-12 pt-6 pb-6 pr-6 rounded-lg mb-6 relative">
              <span className="absolute left-3 top-3">
                <IconQuote className=" fill-rose-300 stroke-none" />
              </span>
              <div className="recap-content italic">{destinationContent.shortDescriptions}</div>
            </div>
          ) : null}
          <DestionationGallery images={destinationContent.images} />
          <AreaContentHtml content={destinationContent.descriptions} />
        </div>
        <ProductListContainer destinations={searchConfigs} />
      </div>
    </div>
  );
}
