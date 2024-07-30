import { ColumnsType } from "antd/es/table";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";
import { locales } from "@/constants/locale.constant";
import { GlobalOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { PostListResponse } from "@/models/management/post.interface";
import Image from "next/image";
import { mediaConfig } from "@/configs";

const postColumns = () => {
  let columns: ColumnsType<PostListResponse["result"][0]> = [
    {
      title: "#ID",
      key: "id",
      dataIndex: "id",
      width: 120,
    },
    {
      title: "Ảnh",
      key: "thumb",
      dataIndex: "thumb",
      width: 100,
      render(value, { thumbnail }, index) {
        return (
          <div className="thumb w-14 h-14 relative bg-slate-100 flex items-center justify-center rounded-md overflow-hidden">
            {!thumbnail ? (
              <div className="italic text-xs">no image</div>
            ) : (
              <Image
                src={`${mediaConfig.rootApiPath}/${thumbnail.original}`}
                alt="thumbnail"
                fill
                style={{ objectFit: "contain" }}
              />
            )}
          </div>
        );
      },
    },
    {
      title: "Tên bài viết",
      key: "name",
      dataIndex: "name",
      width: 320,
    },
    {
      title: "Danh mục",
      key: "name",
      dataIndex: "name",
      width: 320,
      render(value, { category }, index) {
        return category.name;
      },
    },
  ];

  return locales.reduce((acc, locale) => {
    return (acc = [
      ...acc,
      {
        title: locale.key,
        key: locale.key,
        dataIndex: locale.key,
        width: 50,
        render(value, { languages }, index) {
          const item = languages.find((item) => item.lang === locale.key);
          return item ? (
            <span
              className={classNames({
                "text-emerald-500": item.status === PageContentStatus.PUBLISH,
              })}
            >
              <GlobalOutlined />
            </span>
          ) : (
            "-"
          );
        },
      },
    ]);
  }, columns);
};

export const columns = postColumns();
