import React from "react";

import { unstable_setRequestLocale } from "next-intl/server";
import { Metadata, ResolvingMetadata } from "next";
import { LangCode } from "@/models/management/cms/language.interface";
import { getTemplateContentDetail } from "@/actions/product.action";
import { mediaConfig } from "@/configs";

export const dynamic = "force-dynamic";

type Props = {
  params: {
    locale: LangCode;
    slug: string[];
  };
};

export async function generateMetadata(
  { params: { slug, locale } }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const [templateId, sellableId, templateContentSlug] = slug;
  // fetch data
  const tourContentResponse = await getTemplateContentDetail({
    slug: templateContentSlug,
    lang: locale,
  });
  const cmsTemplateDetail = tourContentResponse;

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  const totalImages = cmsTemplateDetail?.thumbnail?.original
    ? [`${mediaConfig.rootApiPath}/${cmsTemplateDetail?.thumbnail.original}`, ...previousImages]
    : [...previousImages];

  return {
    title: cmsTemplateDetail?.name || "",
    openGraph: {
      title: cmsTemplateDetail?.name || "",
      images: [...totalImages],
    },
  };
}

const SingleTourLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    locale: LangCode;
    slug: string[];
  };
}) => {
  unstable_setRequestLocale(params.locale);
  return <>{children}</>;
};
export default SingleTourLayout;
