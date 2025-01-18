import { unstable_setRequestLocale } from "next-intl/server";
import type { Metadata, ResolvingMetadata } from "next";
import { LangCode } from "@/models/management/cms/language.interface";
import { notFound } from "next/navigation";
import { getVisaTemplateDetail } from "@/actions/visa.action";
import { mediaConfig } from "@/configs";

import PageWraper from "./_components/PageWraper";

type PageParams = { slug: string; locale: LangCode };
export async function generateMetadata(
  { params }: { params: PageParams },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const visaContentResponse = await getVisaTemplateDetail({
    lang: params.locale,
    slug: params.slug,
  });
  const contentDetail = visaContentResponse?.result[0];
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];
  const nextImage =
    contentDetail && contentDetail
      ? [`${mediaConfig.rootApiPath}/${contentDetail.thumb}`, ...previousImages]
      : previousImages;

  const title = contentDetail?.metaTitle ?? "404";
  return {
    title: `${title}`,
    keywords: contentDetail?.metaKeyword,
    description: contentDetail?.metaDescription,
    openGraph: {
      images: nextImage,
      description: contentDetail?.metaDescription,
    },
  };
}

export default async function PageContentDetail({ params }: { params: PageParams }) {
  unstable_setRequestLocale(params.locale);

  const visaContentResponse = await getVisaTemplateDetail({
    lang: params.locale,
    slug: params.slug,
  });
  const contentDetail = visaContentResponse?.result[0];

  if (!contentDetail) {
    notFound();
  } else {
    return <PageWraper data={contentDetail} />;
  }
}
