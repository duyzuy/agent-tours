import { LangCode } from "@/models/management/cms/language.interface";
import { getCategoryDetail } from "../../_actions/category";

import { getPostListByCategorySlug } from "../../_actions/post";
import { PostsQueryParamsData } from "@/models/fe/post";

import { mediaConfig } from "@/configs";

import { Link } from "@/utils/navigation";
import { IconChevronRight } from "@/assets/icons";
import PostListSlider from "./PostListSlider";
import { getLocale } from "next-intl/server";
import dayjs from "dayjs";
import { DATE_FORMAT } from "@/constants/common";
import "dayjs/locale/vi";

export default async function PostListContainer() {
  const locale = (await getLocale()) as LangCode;
  const catSlug = "tin-tuc-du-lich";

  const category = await getCategoryDetail({ lang: locale, slug: catSlug });

  const initQueryParams = new PostsQueryParamsData({ lang: locale, categorySlug: catSlug, tagSlug: undefined }, 1, 6, {
    sortColumn: "id",
    direction: "asc",
  });

  const postList = await getPostListByCategorySlug(initQueryParams);

  const itemsList = postList?.reduce<
    { id: number; thumb?: string; title: string; slug: string; date: string; description: string }[]
  >((acc, item) => {
    acc = [
      ...acc,
      {
        id: item.id,
        thumb: item.thumbnail ? `${mediaConfig.rootApiPath}/${item.thumbnail.original}` : undefined,
        title: item.name,
        slug: item.slug,
        description: item.excerpt,
        date: dayjs(item.publishDate, DATE_FORMAT).locale("vi").format("dddd, DD/MM/YYYY HH:mm"),
      },
    ];
    return acc;
  }, []);
  return (
    <section
      className="relative lg:py-16 py-12"
      style={{
        background: "url(/assets/images/bg-footer.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center bottom",
      }}
    >
      <div className="overlay bg-slate-900 opacity-40 absolute left-0 top-0 w-full h-full"></div>
      <div className="container mx-auto relative z-10 px-4 md:px-6 lg:px-8">
        <div className="section-title w-full flex items-center justify-between mb-6 lg:mb-12">
          <div className="text-2xl lg:text-4xl drop-shadow-lg text-white relative">
            <span className="">Trải nghiệm, khám phá</span>
          </div>
        </div>
        <div className="w-full">
          <div className="slider relative block w-full">
            <PostListSlider items={itemsList || []} />
          </div>
          <div className="text-center pt-6">
            <Link
              className="btn rounded-full flex items-center border w-fit px-3 py-1 font-semibold text-[14px] mx-auto"
              href="/category/tin-tuc-du-lich"
            >
              <span className="text-white">Xem thêm</span>
              <span className="ml-1">
                <IconChevronRight width={16} color="white" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
