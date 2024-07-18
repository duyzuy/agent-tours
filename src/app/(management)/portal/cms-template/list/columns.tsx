import { ColumnsType } from "antd/es/table";
import { locales } from "@/constants/locale.constant";
import { GlobalOutlined } from "@ant-design/icons";
import Image from "next/image";
import { mediaConfig } from "@/configs";
import { isEmpty } from "lodash";
import { ICMSTemplate, ICMSTemplateMinimal } from "@/models/management/cms/cmsTemplate.interface";
import Link from "next/link";
import classNames from "classnames";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";

const templateColumns = () => {
  let columns: ColumnsType<ICMSTemplateMinimal> = [
    {
      title: "Ảnh",
      key: "thumb",
      dataIndex: "thumb",
      width: 100,
      render(value, { codeImage }, index) {
        return (
          <div className="thumb w-14 h-14 relative bg-slate-100 flex items-center justify-center rounded-md overflow-hidden">
            {!codeImage ? (
              <div className="flex items-center justify-center text-xs text-gray-500">
                <span>No image</span>
              </div>
            ) : (
              <Image
                src={`${mediaConfig.rootApiPath}/${codeImage.small}`}
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
              <Link href={`/portal/cms-template/${record.code}`} className="text-xs">
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
        render(value, { templatesMinimal }, index) {
          const template = templatesMinimal.find((item) => item.lang === locale.key);
          return template ? (
            <span
              className={classNames({
                "text-emerald-500": template.status === PageContentStatus.PUBLISH,
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

export const columns = templateColumns();
