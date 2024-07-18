import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { LangCode } from "@/models/management/cms/language.interface";
import { getPageContentDetail } from "../../_actions/pageContent";
import { mediaConfig } from "@/configs";
import SinglePageContentWraper from "../_components/SinglePageContentWraper";

type PageParams = { slug: string; locale: LangCode };

export async function generateMetadata(
  { params }: { params: PageParams },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // fetch data
  const pageContent = await getPageContentDetail({
    lang: params.locale,
    slug: params.slug,
  });

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];
  const nextImage =
    pageContent && pageContent
      ? [`${mediaConfig.rootApiPath}/${pageContent.thumbnail}`, ...previousImages]
      : previousImages;

  const title = pageContent?.metaTitle ?? "404";
  return {
    title: `${title}`,
    keywords: pageContent?.metaKeyword,
    description: pageContent?.metaDescription,
    openGraph: {
      images: nextImage,
      description: pageContent?.metaDescription,
    },
  };
}

export default async function PageContentDetail({ params }: { params: PageParams }) {
  const pageContent = await getPageContentDetail({
    lang: params.locale,
    slug: params.slug,
  });

  if (!pageContent) {
    notFound();
  }

  return <SinglePageContentWraper data={pageContent} />;
}
