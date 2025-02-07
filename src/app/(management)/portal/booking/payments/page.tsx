"use client";
import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Col, Divider, Row, Tabs } from "antd";
import styled from "styled-components";

import { usePortalBookingManagerSelector } from "../context";

import PortalBookingSummary from "../_components/PortalBookingSummary";
import { ContentDetailList } from "@/components/admin/ContentDetailList";
import { formatDate } from "@/utils/date";
import { CheckCircleOutlined } from "@ant-design/icons";
import { moneyFormatVND } from "@/utils/helper";

import PassengerInformationPanel from "./_components/PassengerInformationPanel";
import ServicePanel from "./_components/ServicePanel";
import PaymentPanel from "./_components/PaymentPanel";

const ServicePage = () => {
  const {
    bookingInfo: { bookingItems, product },
  } = usePortalBookingManagerSelector((state) => state);
  const router = useRouter();
  const [tabKey, setTabsKeys] = useState<"PASSENGER" | "SERVICE" | "PAYMENT">("PASSENGER");

  const handleChangeTabPanel = (newTabKey: "PASSENGER" | "SERVICE" | "PAYMENT") => {
    setTabsKeys(newTabKey);
  };

  if (!product) {
    router.push("/portal/booking");
  }
  return (
    <div className="services__page bg-slate-50 -mx-6 -my-6 p-6 h-full mb-8">
      <div className="bg-white p-6 rounded-md mb-6">
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
        <h4 className="font-semibold mb-3">Các dịch vụ đi kèm</h4>
        <div className="flex flex-wrap gap-4">
          {product?.sellableDetails.inventories.map((item) => (
            <div className="detail-item flex mb-1 items-start" key={item.recId}>
              <CheckCircleOutlined className="!text-emerald-600 mr-1 mt-[3px]" />
              <div>{item.name}</div>
            </div>
          ))}
          {product?.sellableDetails.stocks.map((item) => (
            <div className="detail-item flex mb-1 items-start" key={item.recId}>
              <CheckCircleOutlined className="!text-emerald-600 mr-1 mt-[3px]" />
              <div>{`${item.inventory.name} - ${item.code}`}</div>
            </div>
          ))}
        </div>
        <div className="h-4"></div>
        <h4 className="font-semibold mb-3">Các giảm giá có thể áp dụng</h4>
        {product?.promotions?.map((promo) => (
          <div className="promo-item flex mb-1 items-start" key={promo.code}>
            <CheckCircleOutlined className="!text-emerald-600 mr-1 mt-[3px]" />
            <span>{moneyFormatVND(promo.discountAmount)}</span>
          </div>
        ))}
      </div>
      <Row gutter={32} className="max-w-7xl">
        <Col span={15}>
          <ServiceContainerTabStyled
            type="card"
            size="large"
            defaultActiveKey={tabKey}
            activeKey={tabKey}
            onChange={(activeKey) => handleChangeTabPanel(activeKey as "PASSENGER" | "SERVICE" | "PAYMENT")}
            items={[
              {
                label: "Thông tin hành khách",
                key: "PASSENGER",
                children: (
                  <PassengerInformationPanel bookingItems={bookingItems || []} onNext={() => setTabsKeys("SERVICE")} />
                ),
              },
              {
                label: "Dịch vụ",
                key: "SERVICE",
                children: (
                  <ServicePanel
                    sellableId={product?.sellableId}
                    bookingItems={bookingItems || []}
                    onNext={() => setTabsKeys("PAYMENT")}
                  />
                ),
              },
              {
                label: "Thanh toán",
                key: "PAYMENT",
                children: <PaymentPanel />,
              },
            ]}
          />
        </Col>
        <Col span={9}>
          <div className="h-10"></div>
          <PortalBookingSummary label="Chi tiết đặt chỗ" />
        </Col>
      </Row>
    </div>
  );
};
export default ServicePage;

const ServiceContainerTabStyled = styled(Tabs)`
  &.travel-tabs-card {
    .travel-tabs-nav {
      margin-bottom: 0px !important;

      .travel-tabs-tab {
        border-width: 0 !important;
      }
    }
    .travel-tabs-content-holder {
      padding: 24px;
      background-color: #fff;
      border-bottom-right-radius: 8px;
      border-bottom-left-radius: 8px;
    }
  }
`;
