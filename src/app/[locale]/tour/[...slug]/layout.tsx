import { unstable_setRequestLocale } from "next-intl/server";
import { Metadata, ResolvingMetadata } from "next";
import { LangCode } from "@/models/management/cms/language.interface";
import { getTemplateContentDetail } from "../_actions/templateContent";
import { mediaConfig } from "@/configs";

export const dynamic = "force-dynamic";
type Props = {
  params: {
    locale: LangCode;
    slug: string[];
  };
};

// export async function generateStaticParams() {
//   // const posts = await fetch("https://.../posts").then((res) => res.json());
//   // return posts.map((post) => ({
//   //   slug: post.slug,
//   // }));
// }

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  // read route params
  const [templateId, sellableId, contentSlug] = params.slug;

  // fetch data
  const tourContentResponse = await getTemplateContentDetail({
    slug: contentSlug,
    lang: params.locale,
  });
  const cmsTemplateDetail = tourContentResponse?.result[0];

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  const totalImages = cmsTemplateDetail?.thumb
    ? [`${mediaConfig.rootApiPath}/${cmsTemplateDetail?.thumb}`, ...previousImages]
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
