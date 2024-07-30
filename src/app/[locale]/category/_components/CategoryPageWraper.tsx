"use client";
import { IPageContentDetail } from "@/models/management/cms/pageContent.interface";
import { BreadCrumb } from "@/components/frontend/BreadCrumb";
import { isEmpty } from "lodash";
import Image from "next/image";
import { mediaConfig } from "@/configs";
import { Link } from "@/utils/navigation";
import AreaContentHtml from "@/components/frontend/AreaContentHtml";
import { IFeCategory } from "@/models/fe/category";
import { IFePostItem } from "@/models/fe/post";
import IconEmptyBox from "@/assets/icons/IconEmptyBox";
import EmptyContent from "@/components/frontend/EmptyContent";
interface CategoryPageWraperProps {
  data?: IFeCategory;
  postList?: IFePostItem[];
  log: any;
}
const CategoryPageWraper: React.FC<CategoryPageWraperProps> = ({ data, log, postList }) => {
  console.log(log);
  return (
    <div className="category-page">
      <BreadCrumb classname="container mx-auto px-4 md:px-6 lg:px-8 py-4" items={[{ title: data?.name }]} />
      <div className="category-page__inner container mx-auto px-4 md:px-6 lg:px-8">
        <div className="category-page__head mb-3">
          <h1 className="text-xl">{data?.name}</h1>
        </div>
        <div className="category-page__body mb-12">
          <AreaContentHtml content={data?.descriptions} />
          <div className="line mb-6 mt-6 bg-gray-100 h-[1px]"></div>
          {postList && postList.length ? (
            <div className="articles grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {postList?.map((post) => (
                <div className="article post-card" key={post.id}>
                  <div className="post-card__thumbnail relative w-full pt-[55.25%] overflow-hidden rounded-md">
                    {post.thumbnail ? (
                      <Image
                        src={`${mediaConfig.rootApiPath}/${post.thumbnail.small}`}
                        alt={post.name}
                        fill
                        className="object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="post-card__content pt-3">
                    <Link href={`/post/${post.slug}`}>
                      <h3 className="text-gray-600 font-[500] hover:text-primary-default">{post.name}</h3>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyContent
              title="Chưa có bài viết"
              description="Hiện chưa có nội dung nào cho mục này, vui lòng trở lại hoặc tìm kiềm mục khác."
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default CategoryPageWraper;
