import { ColumnsType } from "antd/es/table";
import { ITransation } from "@/models/management/cms/translations.interface";
import { locales } from "@/constants/locale.constant";

const translationColumns = () => {
    let columns: ColumnsType<ITransation> = [
        {
            title: "#ID",
            key: "id",
            dataIndex: "id",
            width: 80,
        },
        {
            title: "Key",
            key: "keyName",
            dataIndex: "keyName",
            width: 200,
        },
    ];

    return locales.reduce((acc, locale) => {
        return (acc = [
            ...acc,
            {
                title: locale.key,
                key: locale.key,
                dataIndex: locale.key,
                width: 200,
                render(value, record, index) {
                    const item = record.languages.find(
                        (lang) => lang.lang === locale.key,
                    );

                    return item?.name || "--";
                },
            },
        ]);
    }, columns);
};
export const columns = translationColumns();
