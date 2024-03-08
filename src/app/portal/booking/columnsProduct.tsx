import { ColumnsType } from "antd/es/table";
import { formatDate } from "@/utils/date";
import { IProductListRs } from "@/models/management/booking/productItem.interface";
import { moneyFormatVND } from "@/utils/helper";

export const columnsProduct: ColumnsType<IProductListRs["result"][0]> = [
    {
        title: "Code",
        dataIndex: "code",
        key: "code",
        width: 200,
    },

    {
        title: "Ngày đi",
        dataIndex: "valid-date",
        key: "valid-date",
        width: 200,
        render: (_, record) => {
            return <>{formatDate(record.startDate)}</>;
        },
    },
    {
        title: "Ngày về",
        dataIndex: "valid-date",
        key: "valid-date",
        width: 200,
        render: (_, record) => {
            return <>{formatDate(record.endDate)}</>;
        },
    },
    {
        title: "Số lượng",
        dataIndex: "open",
        key: "open",
        width: 100,
    },
    {
        title: "Giá tiền",
        dataIndex: "open",
        key: "open",
        width: 200,
        render: (_, record) => {
            let lowestPrice = 9999999999;
            record.configs.forEach((config) => {
                if (lowestPrice > config.adult) {
                    lowestPrice = config.adult;
                }
            });
            return (
                <span>
                    <span className="text-xs mr-1 block">Chỉ từ</span>
                    <span className="text-red-600 font-bold">
                        {moneyFormatVND(lowestPrice)}
                    </span>
                </span>
            );
        },
    },
];
