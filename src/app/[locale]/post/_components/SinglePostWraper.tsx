import { BreadCrumb } from "@/components/frontend/BreadCrumb";
import Image from "next/image";
import { mediaConfig } from "@/configs";
import { Link } from "@/utils/navigation";
import AreaContentHtml from "@/components/frontend/AreaContentHtml";
import { IFePostItem } from "@/models/fe/post";
import SocialsShare from "@/components/frontend/SocialsShare";
import dayjs from "dayjs";
import "dayjs/locale/vi";

import { getTranslations } from "next-intl/server";
import { isEmpty } from "lodash";
interface SinglePostWraperProps {
  data?: IFePostItem;
  relatedItems?: IFePostItem[];
}
export default async function SinglePostWraper({ data, relatedItems }: SinglePostWraperProps) {
  const t = await getTranslations("String");

  return (
    <div className="single-page">
      <div className="single-page__hero-image relative pt-[120px] lg:pt-[240px]">
        <Image
          src={
            data?.heroBanner && !isEmpty(data?.heroBanner.original)
              ? `${mediaConfig.rootApiPath}/${data?.heroBanner.original}`
              : "/assets/images/header/header-news-default.jpg"
          }
          alt="thumbnail"
          fill
          className="object-cover object-center"
        />
      </div>
      <BreadCrumb
        classname="container mx-auto max-w-[1040px] px-4 md:px-6 lg:px-8 py-4"
        items={[{ title: data?.category.name, path: `/category/${data?.category.slug}` }, { title: data?.name }]}
      />
      <div className="single-page__inner container mx-auto max-w-[1040px] px-4 md:px-6 lg:px-8">
        <div className="sing-page__head mb-6">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-[500]">{data?.name}</h1>
          <div className="h-6"></div>
          <div className="flex justify-between items-center border-b mb-3 pb-3">
            <span className="capitalize text-gray-500">
              {data?.publishDate ? dayjs(data?.publishDate).locale("vi").format("dddd, DD/MM/YYYY HH:mm") : null}
            </span>
            <SocialsShare title={data?.name} url={`post/${data?.slug}`} hideLabel />
          </div>
          {data?.tags?.length ? (
            <div className="tags flex items-center">
              <span className="mr-6 font-[500]">Tags:</span>
              <div className="tag-list flex flex-wrap gap-2">
                {data?.tags?.map((tag) => (
                  <span
                    className="tag-item block bg-slate-50 border border-slate-100 px-2 py-1 rounded-lg text-primary-default"
                    key={tag.id}
                  >{`# ${tag.name}`}</span>
                ))}
              </div>
            </div>
          ) : null}
        </div>
        <div className="single-page__body mb-12">
          <AreaContentHtml content={data?.content} />
          {relatedItems && relatedItems.length ? (
            <>
              <div className="line mb-6 mt-6 bg-gray-100 h-[1px]"></div>
              <div className="py-2 mb-6">
                <span className="block text-base lg:text-2xl font-[500]">{t("post.related.title")}</span>
              </div>
              <div className="single-page__childs grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {relatedItems?.map((post) => (
                  <div className="content-card" key={post.id}>
                    <div className="content-card__inner">
                      <div className="content-card__thumbnail relative w-full pt-[55.25%] overflow-hidden rounded-md">
                        {post.thumbnail ? (
                          <Image
                            src={`${mediaConfig.rootApiPath}/${post.thumbnail.small}`}
                            alt={post.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="no-image">no image</div>
                        )}
                      </div>
                      <div className="pt-3">
                        <Link href={`/post/${post.slug}`}>
                          <h3 className="text-gray-600 font-[500] hover:text-primary-default">{post.name}</h3>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
