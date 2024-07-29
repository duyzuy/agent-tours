import { ColumnsType } from "antd/es/table";

import { locales } from "@/constants/locale.constant";
import { GlobalOutlined } from "@ant-design/icons";
import Image from "next/image";
import { mediaConfig } from "@/configs";
import { isUndefined } from "lodash";

import { CategoryListResponse } from "@/models/management/category.interface";
import classNames from "classnames";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";

export type CategoryType = Omit<CategoryListResponse["result"][0], "children"> & {
  children?: CategoryType[];
};

const getCategoryColumn = () => {
  let columns: ColumnsType<CategoryType> = [
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
                src={`${mediaConfig.rootApiPath}/${thumbnail.small}`}
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
      title: "Tên Danh mục",
      key: "name",
      dataIndex: "name",
      width: 320,
    },
    {
      title: "slug",
      key: "slug",
      dataIndex: "slug",
      width: 220,
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
          const item = languages.find((lang) => lang.lang === locale.key);
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

export const columns = getCategoryColumn();
