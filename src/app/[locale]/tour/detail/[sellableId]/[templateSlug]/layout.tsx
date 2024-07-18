import { unstable_setRequestLocale } from "next-intl/server";
import { Metadata, ResolvingMetadata } from "next";
import { LangCode } from "@/models/management/cms/language.interface";
import { getTemplateContentDetail } from "../../../_actions/templateContent";
import { mediaConfig } from "@/configs";

export const dynamic = "force-dynamic";

type Props = {
  params: {
    locale: LangCode;
    sellableId: string;
    templateSlug: string;
  };
};

// export async function generateStaticParams() {
//   // const posts = await fetch("https://.../posts").then((res) => res.json());
//   // return posts.map((post) => ({
//   //   slug: post.slug,
//   // }));
// }

export async function generateMetadata(
  { params: { sellableId, templateSlug, locale } }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params

  // fetch data
  const tourContentResponse = await getTemplateContentDetail({
    slug: templateSlug,
    lang: locale,
  });
  const cmsTemplateDetail = tourContentResponse;

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  const totalImages = cmsTemplateDetail?.thumbnail.original
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

const LayoutTourSingle = ({
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
export default LayoutTourSingle;
