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
        title: "Class",
        dataIndex: "class",
        key: "class",
        width: 80,
        editable: false,
    },
    {
        title: "Channel",
        dataIndex: "channel",
        key: "channel",
        width: 120,
        editable: false,
    },
    {
        title: "Max available",
        dataIndex: "maxAvaiable",
        key: "maxAvaiable",
        width: 80,
        editable: true,
    },
    {
        title: "Limit per-booking",
        dataIndex: "limitPerBooking",
        key: "limitPerBooking",
        width: 80,
        editable: true,
    },
    {
        title: "Available",
        dataIndex: "avaiable",
        key: "avaiable",
        width: 80,
        editable: true,
    },
    {
        title: "Open",
        dataIndex: "open",
        key: "open",
        width: 80,
        editable: false,
    },
    {
        title: "Sold",
        dataIndex: "sold",
        key: "sold",
        width: 80,
        editable: false,
    },
    {
        title: "Adult",
        dataIndex: "adult",
        key: "adult",
        width: 120,
        editable: true,
        render: (_, { adult }) => {
            return moneyFormatNoSymbol(adult);
        },
    },
    {
        title: "Child",
        dataIndex: "child",
        key: "child",
        width: 120,
        editable: true,
        render: (_, { child }) => {
            return moneyFormatNoSymbol(child);
        },
    },
    {
        title: "Infant",
        dataIndex: "infant",
        key: "infant",
        width: 120,
        editable: true,
        render: (_, { infant }) => {
            return moneyFormatNoSymbol(infant);
        },
    },
    {
        title: "Descriptions",
        dataIndex: "details",
        key: "details",
        width: 160,
        editable: false,
        render: (desc) => {
            return <span className="text-xs">{desc}</span> || "--";
        },
    },
];
