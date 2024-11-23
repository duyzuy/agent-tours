import { PriceConfigColumnTypes } from ".";
import { moneyFormatNoSymbol } from "@/utils/helper";

const getColumn = (
  columns?: (PriceConfigColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[],
) => {
  const tourConfigColumn: (PriceConfigColumnTypes[number] & {
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
            <span className="text-xs text-gray-600">{record.class}</span>
          </div>
        );
      },
    },
    {
      title: "Tối đa",
      dataIndex: "maxAvailable",
      key: "maxAvailable",
      width: 80,
      editable: true,
    },
    {
      title: "Max each booking",
      dataIndex: "limitPerBooking",
      key: "limitPerBooking",
      width: 80,
      editable: true,
    },
    {
      title: "Khả dụng",
      dataIndex: "available",
      key: "available",
      width: 80,
      editable: true,
    },
    {
      title: "Đang còn",
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
      title: "Chi tiết",
      dataIndex: "details",
      key: "details",
      width: 120,
      editable: false,
      render: (_, { details }) => {
        return details;
      },
    },
  ];

  return [...tourConfigColumn, ...(columns || [])];
};
const tourConfigColumn = getColumn();
const extraConfigColumn = getColumn();

export { tourConfigColumn, extraConfigColumn };
