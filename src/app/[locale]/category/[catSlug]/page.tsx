import { LangCode } from "@/models/management/cms/language.interface";
import { getCategoryDetail } from "../../_actions/category";
import { Metadata, ResolvingMetadata } from "next";
import { getPostListByCategorySlug } from "../../_actions/post";
import { PostsQueryParamsData } from "@/models/fe/post";
import CategoryPageWraper from "../_components/CategoryPageWraper";
import { mediaConfig } from "@/configs";
import ClientDispatchContent from "../_components/ClientDispatchContent";

interface Props {
  params: { locale: LangCode; catSlug: string };
}

export async function generateMetadata(
  { params }: { params: Props["params"] },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // fetch data
  const { locale, catSlug } = params;

  const category = await getCategoryDetail({ lang: locale, slug: catSlug });

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];
  const nextImage =
    category && category.thumbnail
      ? [`${mediaConfig.rootApiPath}/${category.thumbnail.original}`, ...previousImages]
      : previousImages;

  const title = category?.metaTitle ?? "404";
  return {
    title: `${title}`,
    keywords: category?.metaKeyword,
    description: category?.metaDescription,
    openGraph: {
      images: nextImage,
      description: category?.metaDescription,
    },
  };
}

export default async function CategoryDetailPage({ params }: Props) {
  const { locale, catSlug } = params;

  const category = await getCategoryDetail({ lang: locale, slug: catSlug });

  const initQueryParams = new PostsQueryParamsData({ lang: locale, categorySlug: catSlug, tagSlug: undefined }, 1, 10, {
    sortColumn: "id",
    direction: "asc",
  });

  const postList = await getPostListByCategorySlug(initQueryParams);

  return (
    <>
      <CategoryPageWraper data={category} postList={postList} log={{ category, postList }} />
      <ClientDispatchContent
        languages={category?.languages.map((item) => ({ lang: item.lang, slug: item.slug })) || []}
      />
    </>
  );
}
