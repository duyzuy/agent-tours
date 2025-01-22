import React from "react";
import { Statistic, Card, Divider } from "@/components/base";
import AreaChartBookingDate from "./ChartPage/AreaChartBookingDate";
import PieChartMethod from "./ChartPage/PieChartMethod";
import PieChartBooking from "./ChartPage/PieChartBooking";
import { random } from "lodash";
import { access } from "fs";
import ColumnChart from "./ChartPage/ColumnChart";
import { ArrowUpOutlined } from "@ant-design/icons";

interface Props {
  title: string;
  number: any;
  backgroundColor?: string;
}

const BoxDashboard = ({ title, number, backgroundColor }: Props) => {
  const demoAreaData = Array.from({ length: 12 }, (v, k) => {
    return [
      { month: `2025-${k + 1}`, booking: random(100, false), destination: "Thái lan" },
      { month: `2025-${k + 1}`, booking: random(100, false), destination: "Việt nam" },
      { month: `2025-${k + 1}`, booking: random(100, false), destination: "Singapore" },
      { month: `2025-${k + 1}`, booking: random(100, false), destination: "Korean" },
      { month: `2025-${k + 1}`, booking: random(100, false), destination: "Japan" },
      { month: `2025-${k + 1}`, booking: random(100, false), destination: "USA" },
    ];
  }).reduce((acc, item) => {
    return [...acc, ...item];
  }, []);

  const demoColumnChart = Array.from({ length: 12 }, (v, k) => {
    return [
      { month: `Tháng ${k + 1}, 2025`, booking: random(100, false), destination: "Thái lan" },
      { month: `Tháng ${k + 1}, 2025`, booking: random(100, false), destination: "Việt nam" },
      { month: `Tháng ${k + 1}, 2025`, booking: random(100, false), destination: "Singapore" },
      { month: `Tháng ${k + 1}, 2025`, booking: random(100, false), destination: "Korean" },
      { month: `Tháng ${k + 1}, 2025`, booking: random(100, false), destination: "Japan" },
      { month: `Tháng ${k + 1}, 2025`, booking: random(100, false), destination: "USA" },
      { month: `Tháng ${k + 1}, 2025`, booking: random(100, false), destination: "Trung quốc" },
      { month: `Tháng ${k + 1}, 2025`, booking: random(100, false), destination: "Hongkong" },
      { month: `Tháng ${k + 1}, 2025`, booking: random(100, false), destination: "Đài loan" },
      { month: `Tháng ${k + 1}, 2025`, booking: random(100, false), destination: "Campuchia" },
    ];
  }).reduce((acc, item) => {
    return [...acc, ...item];
  }, []);

  return (
    <Card bordered style={{ backgroundColor: backgroundColor }}>
      <div className="flex gap-x-6">
        <Statistic
          title="Lượt booking"
          value={11.28}
          precision={2}
          valueStyle={{ color: "#3f8600" }}
          prefix={<ArrowUpOutlined />}
          suffix="%"
        />
      </div>

      {/* <AreaChartBookingDate dataItem={demoAreaData} /> */}
      <Divider />
      <h3 className="text-lg font-[500]">Lượt booking theo điểm đến</h3>
      <ColumnChart dataItem={demoColumnChart} />
      {/* <div>
        <h3 className="text-lg font-[500]">Doanh thu theo điểm đến</h3>
        <PieChartMethod
          dataItem={[
            { name: "Thái Lan", value: 90000000 },
            { name: "Nhật bản", value: 30000000 },
            { name: "Hàn Quốc", value: 46000000 },
            { name: "Đài Loan", value: 52000000 },
            { name: "Việt nam", value: 130000000 },
            { name: "Trung Quốc", value: 73000000 },
            { name: "Mỹ", value: 64550000 },
            { name: "Ninh Bình", value: 45650000 },
            { name: "Hà Nội", value: 32450000 },
          ]}
        />
      </div> */}
      {/* <div className="flex">
        <PieChartMethod
          dataItem={[
            { key: ["Thang 1", "Thang 2"], value: 20 },
            { key: ["Thang 12", "Thang 11"], value: 30 },
            { key: ["1", "2"], value: 20 },
            { key: ["1", "3"], value: 10 },
          ]}
        />
        <PieChartBooking
          dataItem={[
            { type: "123", value: 20 },
            { type: "aaa", value: 20 },
            { type: "bbb", value: 20 },
            { type: "ccc", value: 20 },
          ]}
        />
      </div> */}
    </Card>
  );
};

export default BoxDashboard;
