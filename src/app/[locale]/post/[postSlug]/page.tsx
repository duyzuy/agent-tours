import Image from "next/image";
import { getPostDetail } from "../../_actions/post";
import { LangCode } from "@/models/management/cms/language.interface";
import { notFound } from "next/navigation";
import SinglePostWraper from "../_components/SinglePostWraper";
import { Metadata, ResolvingMetadata } from "next";
import { mediaConfig } from "@/configs";
import { SITE_NAME } from "@/configs/site";
import { getPostListByCategorySlug } from "../../_actions/post";
import { IFePostItem, PostsQueryParamsData } from "@/models/fe/post";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";
import ClientDispatchContent from "../_components/ClientDispatchContent";

interface Props {
  params: { locale: LangCode; postSlug: string };
}

export async function generateMetadata(
  { params }: { params: Props["params"] },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // fetch data
  const { locale, postSlug } = params;
  const postData = await getPostDetail(locale, postSlug);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];
  const nextImage =
    postData && postData.thumbnail
      ? [`${mediaConfig.rootApiPath}/${postData.thumbnail.original}`, ...previousImages]
      : previousImages;

  const title = postData?.metaTitle ?? "404";
  return {
    title: `${title} | ${SITE_NAME}`,
    keywords: postData?.metaKeyword,
    description: postData?.metaDescription,
    openGraph: {
      images: nextImage,
      description: postData?.metaDescription,
    },
  };
}

export default async function SinglePostPage({ params }: Props) {
  const { locale, postSlug } = params;

  const postData = await getPostDetail(locale, postSlug);

  let relatedPosts: IFePostItem[] | undefined = [];
  if (postData) {
    const initQueryParams = new PostsQueryParamsData(
      { lang: locale, categorySlug: postData?.category.slug, status: PageContentStatus.PUBLISH },
      1,
      6,
      { sortColumn: "id", direction: "desc" },
    );

    relatedPosts = await getPostListByCategorySlug(initQueryParams);
  }

  if (!postData) {
    notFound();
  }
  return (
    <>
      <SinglePostWraper data={postData} relatedItems={relatedPosts} />;
      <ClientDispatchContent
        languages={postData?.languages.map((item) => ({ lang: item.lang, slug: item.slug })) || []}
      />
    </>
  );
}
