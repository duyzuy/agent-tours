import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { ITravelInformationNotice } from "@/models/management/cms/cmsStateProvinceNotice";
import { locales } from "@/constants/locale.constant";
import { GlobalOutlined } from "@ant-design/icons";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";
import classNames from "classnames";
import { Tag } from "antd";

const createColumns = () => {
  let columns: ColumnsType<ITravelInformationNotice> = [
    {
      title: "#ID",
      key: "id",
      dataIndex: "id",
      width: 120,
    },
    {
      title: "Tiêu đề",
      key: "name",
      dataIndex: "name",
      width: 320,
      render: (_, { originId, name }) => {
        return (
          <>
            <div>
              <span>{name}</span>
            </div>
            <Link href={`/portal/destination/notice-information/${originId}`} className="text-xs">
              Tạo nội dung
            </Link>
          </>
        );
      },
    },
    {
      title: "Điểm đến",
      key: "country",
      dataIndex: "country",
      width: 120,
      render: (_, { country }) => {
        return (
          <>
            {country.keyType === "STATEPROVINCELIST" ? (
              <Tag color="orange">{country.stateProvinceKey}</Tag>
            ) : country.keyType === "COUNTRYLIST" ? (
              <Tag color="volcano">{country.countryKey}</Tag>
            ) : country.keyType === "SUBREGIONLIST" ? (
              <Tag color="red">{country.subRegionKey}</Tag>
            ) : country.keyType === "REGIONLIST" ? (
              <Tag color="magenta">{country.regionKey}</Tag>
            ) : null}
          </>
        );
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

export const columns = createColumns();
