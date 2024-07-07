import { ColumnsType } from "antd/es/table";
import { locales } from "@/constants/locale.constant";
import { GlobalOutlined } from "@ant-design/icons";
import Image from "next/image";
import { mediaConfig } from "@/configs";
import { isEmpty } from "lodash";
import Link from "next/link";
import {
  VisaTemplateKeyListResponse,
  IVisaTemplateKeyMinimalItem,
} from "@/models/management/cms/visaTemplate.interface";

const templateColumns = () => {
  let columns: ColumnsType<IVisaTemplateKeyMinimalItem> = [
    {
      title: "Ảnh",
      key: "thumb",
      dataIndex: "thumb",
      width: 100,
      render(value, record, index) {
        return (
          <div className="thumb w-14 h-14 relative bg-slate-100 flex items-center justify-center rounded-md overflow-hidden">
            {isEmpty(record.codeImage) || record.codeImage === "" ? (
              <div className="flex items-center justify-center text-xs text-gray-500">
                <span>No image</span>
              </div>
            ) : (
              <Image
                src={`${mediaConfig.rootApiPath}/${record.codeImage}`}
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
      title: "Tên template",
      key: "codeName",
      dataIndex: "codeName",
      width: 320,
      render(value, record, index) {
        return (
          <div>
            <span className="block">{record.codeName}</span>
            <span>
              <Link href={`/portal/visa-template/${record.code}`} className="text-xs">
                Nhập nội dung
              </Link>
            </span>
          </div>
        );
      },
    },
    {
      title: "Code",
      key: "code",
      dataIndex: "code",
      width: 320,
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
        render(value, record, index) {
          const item = record.visaTemplatesMinimal.find((lang) => lang.lang === locale.key);
          return item ? <GlobalOutlined /> : "-";
        },
      },
    ]);
  }, columns);
};

export const columns = templateColumns();
