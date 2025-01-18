"use client";
import React from "react";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
import BoxDashboard from "@/components/admin/BoxDashboard";
interface Props {}
const DashBoardPage = ({}: Props) => {
  return (
    <>
      <BoxDashboard title="Dashboard" number={99} />
    </>
  );
};
export default DashBoardPage;
