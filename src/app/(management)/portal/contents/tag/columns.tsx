import { ColumnsType } from "antd/es/table";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";
import { locales } from "@/constants/locale.constant";
import { GlobalOutlined } from "@ant-design/icons";

import { TagListResponse } from "@/models/management/tag.interface";
import classNames from "classnames";

const tagColumns = () => {
  let columns: ColumnsType<TagListResponse["result"][0]> = [
    {
      title: "#ID",
      key: "id",
      dataIndex: "id",
      width: 120,
    },
    {
      title: "Tên thẻ",
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

export const columns = tagColumns();
