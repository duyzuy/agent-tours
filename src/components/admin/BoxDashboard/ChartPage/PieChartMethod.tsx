import React from "react";
import dynamic from "next/dynamic";

import { Pie } from "@ant-design/plots";
interface PropsPieChart {
  name: string;
  value: number;
}
const PieChartMethod = ({ dataItem }: { dataItem: PropsPieChart[] }) => {
  const config: any = {
    angleField: "value",
    colorField: "name",
    label: {
      text: "value",
      type: "inner",
      // offset: "-30%",
      position: "outside",
      // content: ({ percent }: any) => `${(percent * 100).toFixed(0)}%`,
      // style: {
      //   fontSize: 14,
      //   textAlign: "center",
      // },
    },
    legend: {
      color: {
        title: false,
        position: "right",
        rowPadding: 5,
      },
    },
  };
  return <Pie data={dataItem} {...config} />;
};
export default PieChartMethod;
