import { formatNumber } from "@/utils/common";
import dynamic from "next/dynamic";

// const DynamicArea = dynamic(
//   () =>
//     import("@ant-design/plots")
//       .then((module) => module.Area)
//       .catch((err) => {
//         throw new Error(err);
//       }),
//   {
//     ssr: false,
//   },
// );
import { Area } from "@ant-design/plots";
import { moneyFormatVND } from "@/utils/helper";
interface PropsAreaChart {
  booking: number;
  destination: string;
  month: string;
}
const AreaChartBookingDate = ({ dataItem }: { dataItem: PropsAreaChart[] }) => {
  const data = dataItem || [];
  const config = {
    data: data,
    xField: "month",
    yField: "booking",
    colorField: "destination",
    // xAxis: {
    //   range: [0, 11111],
    //   tickCount: 1,
    // },
    // yAxis: {
    //   label: {
    //     formatter: (value: any) => formatNumber(value),
    //   },
    // },
    // areaStyle: () => {
    //   return {
    //     fill: "l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff", // Màu chart
    //   };
    // },
    // line: {
    //   style: {
    //     stroke: "darkgreen",
    //     strokeWidth: 2,
    //   },
    // },
    // style: {
    //   fill: "linear-gradient(-90deg, white 0%, darkgreen 100%)",
    // },
    // axis: {
    //   y: { labelFormatter: "~s" },
    // },
  };

  return <Area {...config} />;
};

export default AreaChartBookingDate;
