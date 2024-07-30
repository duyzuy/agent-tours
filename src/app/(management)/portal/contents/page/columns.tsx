import { ColumnsType } from "antd/es/table";
import { IPageContentListRs, PageContentStatus } from "@/models/management/cms/pageContent.interface";
import { locales } from "@/constants/locale.constant";
import { GlobalOutlined } from "@ant-design/icons";
import Image from "next/image";
import { mediaConfig } from "@/configs";
import classNames from "classnames";

export type PageContentDataType = Omit<IPageContentListRs["result"][0], "children"> & {
  children?: PageContentDataType[];
};

const pageColumns = () => {
  let columns: ColumnsType<PageContentDataType> = [
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
      render(value, record, index) {
        return (
          <div className="thumb w-14 h-14 relative bg-slate-100 flex items-center justify-center rounded-md overflow-hidden">
            {record.thumbnail ? (
              <Image
                src={`${mediaConfig.rootApiPath}/${record.thumbnail.original}`}
                alt="thumbnail"
                fill
                style={{ objectFit: "contain" }}
              />
            ) : (
              <div className="italic text-xs">no image</div>
            )}
          </div>
        );
      },
    },
    {
      title: "Tên trang",
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

export const columns = pageColumns();
