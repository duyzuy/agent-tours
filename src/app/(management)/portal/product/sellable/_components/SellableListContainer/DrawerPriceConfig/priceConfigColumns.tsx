import { PriceConfigColumnTypes } from ".";
import { moneyFormatNoSymbol } from "@/utils/helper";

export const priceConfigColumns: (PriceConfigColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
})[] = [
    {
        title: "#ID",
        dataIndex: "recId",
        key: "recId",
        width: 80,
        editable: false,
    },
    {
        title: "Class/Channel",
        dataIndex: "class",
        key: "class",
        width: 100,
        editable: false,
        render(value, record, index) {
            return (
                <div>
                    <span className="block">{record.channel}</span>
                    <span className="text-xs text-gray-600">
                        {record.class}
                    </span>
                </div>
            );
        },
    },
    {
        title: "Tối đa",
        dataIndex: "maxAvaiable",
        key: "maxAvaiable",
        width: 80,
        editable: true,
    },
    {
        title: "Tối đa mỗi booking",
        dataIndex: "limitPerBooking",
        key: "limitPerBooking",
        width: 80,
        editable: true,
    },
    {
        title: "Khả dụng",
        dataIndex: "avaiable",
        key: "avaiable",
        width: 80,
        editable: true,
    },
    {
        title: "SL đang còn",
        dataIndex: "open",
        key: "open",
        width: 80,
        editable: false,
    },
    {
        title: "Đã bán",
        dataIndex: "sold",
        key: "sold",
        width: 80,
        editable: false,
    },
    {
        title: "Người lớn",
        dataIndex: "adult",
        key: "adult",
        width: 120,
        editable: true,
        render: (_, { adult }) => {
            return moneyFormatNoSymbol(adult);
        },
    },
    {
        title: "Trẻ em",
        dataIndex: "child",
        key: "child",
        width: 120,
        editable: true,
        render: (_, { child }) => {
            return moneyFormatNoSymbol(child);
        },
    },
    {
        title: "Em bé",
        dataIndex: "infant",
        key: "infant",
        width: 120,
        editable: true,
        render: (_, { infant }) => {
            return moneyFormatNoSymbol(infant);
        },
    },
    {
        title: "Mô tả",
        dataIndex: "details",
        key: "details",
        width: 160,
        editable: false,
        render: (desc) => {
            return <span className="text-xs">{desc}</span> || "--";
        },
    },
];
