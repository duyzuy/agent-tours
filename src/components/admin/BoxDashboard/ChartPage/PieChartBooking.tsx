import React from "react";
import dynamic from "next/dynamic";
const DynamicPie = dynamic(
  () => import("@ant-design/plots").then((module) => module.Pie),
  { ssr: false }
);

interface PropsPieChart {
  value: number;
  type: string;
}
const PieChartBooking = ({ dataItem }: { dataItem: PropsPieChart[] }) => {
  const data = dataItem || [];

  const config: any = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }: any) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    color: ["#00B43D", "#E9A800"],
    legend: {
      position: "bottom",
      align: "center",
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };
  return <DynamicPie {...config} />;
};
export default PieChartBooking;
