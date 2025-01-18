import dynamic from "next/dynamic";
// const DynamicColumn = dynamic(() => import("@ant-design/plots").then((module) => module.Column), {
//   ssr: false,
// });
import { Column } from "@ant-design/plots";

interface PropsColumn {
  year: string;
  value: number;
  type: string;
}
const ColumnChart = ({ dataItem }: { dataItem: PropsColumn[] }) => {
  const data = dataItem || [];
  const config: any = {
    data,
    isStack: true,
    xField: "year",
    yField: "value",
    seriesField: "type",
    label: {
      position: "middle",
    },
    interactions: [
      {
        type: "active-region",
        enable: false,
      },
    ],
    legend: {
      position: "bottom",
      align: "center",
    },
    color: ["#25E165", "#00A0E8"],
    columnBackground: {
      style: {
        fill: "rgba(0,0,0,0.1)",
      },
    },
  };

  return <Column {...config} />;
};

export default ColumnChart;
