import { formatNumber } from "@/utils/common";
import dynamic from "next/dynamic";

const DynamicArea = dynamic(
  () => import("@ant-design/plots").then((module) => module.Area),
  { ssr: false }
);
interface PropsAreaChart {
  scales: number;
  Date: string;
}
const AreaChartBookingDate = ({ dataItem }: { dataItem: PropsAreaChart[] }) => {
  const data = dataItem || [];
  const config = {
    xField: "Date",
    yField: "scales",
    xAxis: {
      range: [0, 1],
      tickCount: 12,
    },
    yAxis: {
      label: {
        formatter: (value: any) => formatNumber(value)
      },
    },
    areaStyle: () => {
      return {
        fill: "l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff", // Màu chart
      };
    },
    tooltip: {
      domStyles: {
        "g2-tooltip": {
          backgroundColor: "#000000",
          boxShadow: "0px 0px 10px #aeaeae",
          borderRadius: "4px",
          fontSize: "14px",
          lineHeight: "18px",
          padding: "8px 12px",
          color: "#ffffff", // Màu chữ trong tooltip
        },
        "g2-tooltip-title": {
          marginBottom: "4px",
          fontWeight: "bold",
        },
        "g2-tooltip-list-item": {
          marginBottom: "4px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#ffffff", // Màu chữ trong tooltip
          fontWeight: "bold",
        },
      },
      formatter: (datum: any) => {
        return {
          name: "Lượt booking",
          value: datum.scales,
        };
      },
    },
  };

  return <DynamicArea data={data} {...config} />;
};

export default AreaChartBookingDate;
