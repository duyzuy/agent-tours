"use client";
import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Col, Divider, Row, Tabs } from "antd";

import { usePortalBookingServiceSelector } from "../store/bookingServiceContext";

import PortalBookingSummary from "../_components/PortalBookingSummary";
import { ContentDetailList } from "@/components/admin/ContentDetailList";
import { formatDate } from "@/utils/date";
import { CheckCircleOutlined } from "@ant-design/icons";
import { moneyFormatVND } from "@/utils/helper";
import PaymentPanel from "./_components/PaymentPanel";

const ServicePage = () => {
  const {
    bookingInfo: { product },
  } = usePortalBookingServiceSelector((state) => state);
  const router = useRouter();

  if (!product) {
    router.push("/portal/booking-service");
  }
  return (
    <div className="services__page bg-slate-400/10 -mx-6 -my-6 p-6 min-h-full">
      <Card>
        <ContentDetailList
          items={[
            { label: "Mã sản phẩm", value: product?.template.code },
            {
              label: "Ngày đi",
              value: product?.startDate ? formatDate(product.startDate) : "--",
            },
            {
              label: "Ngày về",
              value: product?.endDate ? formatDate(product.endDate) : "--",
            },
          ]}
        />
        <Divider />
        <h4 className="font-semibold mb-3">Các giảm giá có thể áp dụng</h4>
        {product?.promotions?.length
          ? product?.promotions?.map((promo) => (
              <div className="promo-item flex mb-1 items-start" key={promo.code}>
                <CheckCircleOutlined className="!text-emerald-600 mr-1 mt-[3px]" />
                <span>{moneyFormatVND(promo.discountAmount)}</span>
              </div>
            ))
          : "--"}
      </Card>
      <div className="h-8"></div>
      <Row gutter={32} className="max-w-7xl">
        <Col span={15}>
          <div className="bg-white p-6 rounded-md">
            <h3 className="font-[500] text-lg mb-6">Thanh toán</h3>
            <PaymentPanel />
          </div>
        </Col>
        <Col span={9}>
          <PortalBookingSummary label="Chi tiết đặt chỗ" />
        </Col>
      </Row>
    </div>
  );
};
export default ServicePage;
