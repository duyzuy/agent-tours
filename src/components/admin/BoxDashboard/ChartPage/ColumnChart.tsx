import dynamic from "next/dynamic";
// const DynamicColumn = dynamic(
//   () =>
//     import("@ant-design/plots")
//       .then((module) => module.Column)
//       .catch((err) => {
//         throw new Error("Error");
//       }),
//   {
//     ssr: false,
//   },
// );
import { Column } from "@ant-design/plots";

interface PropsColumn {
  month: string;
  booking: number;
  destination: string;
}
const ColumnChart = ({ dataItem }: { dataItem: PropsColumn[] }) => {
  const data = dataItem || [];
  const config: any = {
    data,
    isStack: true,
    xField: "month",
    yField: "booking",
    seriesField: "destination",
    colorField: "destination",
    stack: true,
    sort: {
      reverse: true,
      by: "y",
    },
    interactions: [
      {
        type: "active-region",
        enable: false,
      },
    ],
    axis: {
      y: { labelFormatter: "~s" },
      x: {
        labelSpacing: 4,
        style: {
          labelTransform: "rotate(90)",
        },
      },
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
