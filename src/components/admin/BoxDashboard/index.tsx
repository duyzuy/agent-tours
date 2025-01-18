import React from "react";
import { Statistic, Card } from "@/components/base";
import AreaChartBookingDate from "./ChartPage/AreaChartBookingDate";

interface Props {
  title: string;
  number: any;
  backgroundColor?: string;
}

const BoxDashboard = ({ title, number, backgroundColor }: Props) => {
  return (
    <Card bordered={false} style={{ backgroundColor: backgroundColor }}>
      <Statistic
        title={title}
        value={Array.isArray(number) ? number[0] : number}
        precision={0}
        valueStyle={{ color: "#000" }}
      />
    </Card>
  );
};

export default BoxDashboard;
