import { ColumnsType } from "antd/es/table";
import { IPageContentListRs } from "@/models/management/cms/pageContent.interface";
import { locales } from "@/constants/locale.constant";
import { GlobalOutlined } from "@ant-design/icons";
import Image from "next/image";
import { mediaConfig } from "@/configs";
import { isEmpty } from "lodash";
import Table from "antd/es/table";

export type PageContentDataType = Omit<
    IPageContentListRs["result"][0],
    "children"
> & { children?: PageContentDataType[] };

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
                        {isEmpty(record.thumbnail) ||
                        record.thumbnail === "" ? (
                            <div>no image</div>
                        ) : (
                            <Image
                                src={`${mediaConfig.rootPath}/${record.thumbnail}`}
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
                render(value, record, index) {
                    const item = record.languages.find(
                        (lang) => lang.lang === locale.key,
                    );
                    return item ? <GlobalOutlined /> : "-";
                },
            },
        ]);
    }, columns);
};

export const columns = pageColumns();
