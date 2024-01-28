import { ColumnsType } from "antd/es/table";
import { Tag, Button } from "antd";
import { formatDate } from "@/utils/date";
import { Status } from "@/models/management/common.interface";
import { IStockListOfInventoryRs } from "@/models/management/core/stockInventory.interface";
import { PlusOutlined } from "@ant-design/icons";
import { SellablePriceConfigRs } from "@/models/management/core/priceConfig.interface";
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
        width: 100,
        editable: false,
    },
    {
        title: "Class",
        dataIndex: "class",
        key: "class",
        width: 100,
        editable: false,
    },
    {
        title: "Channel",
        dataIndex: "channel",
        key: "channel",
        width: 150,
        editable: false,
    },

    {
        title: "Max available",
        dataIndex: "maxAvaiable",
        key: "maxAvaiable",
        width: 120,
        editable: true,
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
        title: "Other Price 01",
        dataIndex: "otherPrice01",
        key: "otherPrice01",
        width: 120,
        editable: true,
        render: (_, { otherPrice01 }) => {
            return moneyFormatNoSymbol(otherPrice01);
        },
    },
    {
        title: "Other Price 02",
        dataIndex: "otherPrice02",
        key: "otherPrice02",
        width: 120,
        editable: true,
        render: (_, { otherPrice02 }) => {
            return moneyFormatNoSymbol(otherPrice02);
        },
    },
    {
        title: "Other Price 03",
        dataIndex: "otherPrice03",
        key: "otherPrice03",
        width: 120,
        editable: true,
        render: (_, { otherPrice03 }) => {
            return moneyFormatNoSymbol(otherPrice03);
        },
    },
    {
        title: "Other Price no seat 01",
        dataIndex: "otherPriceNoSeat01",
        key: "otherPriceNoSeat01",
        width: 120,
        editable: true,
        render: (_, { otherPriceNoSeat01 }) => {
            return moneyFormatNoSymbol(otherPriceNoSeat01);
        },
    },
    {
        title: "Available",
        dataIndex: "avaiable",
        key: "avaiable",
        width: 100,
        editable: false,
    },
    {
        title: "Open",
        dataIndex: "open",
        key: "open",
        width: 100,
        editable: false,
    },
    {
        title: "Sold",
        dataIndex: "sold",
        key: "sold",
        width: 100,
        editable: false,
    },
];
