import React from "react";
import dynamic from "next/dynamic";

const DynamicPie = dynamic(() => import("@ant-design/plots").then((module) => module.Pie), {
  ssr: false,
});
interface PropsPieChart {
  key: string[];
  value: number;
}
const PieChartMethod = ({ dataItem }: { dataItem: PropsPieChart[] }) => {
  if (!dataItem) {
    return null;
  }
  const data = dataItem?.map((item) => {
    const type = item.key.join(" & ");
    const value = item.value;
    return {
      type,
      value,
    };
  });

  const config: any = {
    appendPadding: 10,
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

    color: ["#00A0E8", "#00BE94", "#E9A800"],
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
  return <DynamicPie data={data} {...config} />;
};
export default PieChartMethod;
