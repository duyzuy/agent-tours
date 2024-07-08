export const dynamic = "force-dynamic";
import { Metadata, ResolvingMetadata } from "next";
import { LangCode } from "@/models/management/cms/language.interface";
import { getTemplateContentDetail } from "../_actions/templateContent";
import { mediaConfig } from "@/configs";

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
  const tourContent = await getTemplateContentDetail({
    slug: contentSlug,
    lang: params.locale,
  });

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  const totalImages = tourContent?.result[0].thumb
    ? [`${mediaConfig.rootApiPath}/${tourContent.result[0].thumb}`, ...previousImages]
    : [...previousImages];

  return {
    title: tourContent?.result[0].name || "",
    openGraph: {
      title: tourContent?.result[0].name || "",
      images: [...totalImages],
    },
  };
}

const LayoutTourSingle = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};
export default LayoutTourSingle;
