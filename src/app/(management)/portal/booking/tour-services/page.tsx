"use client";
import React, { useEffect, useMemo, useTransition } from "react";
import { Breadcrumb, Button, Col, Divider, Empty, Row, Space, Spin } from "antd";
import useBooking, { useBookingSelector } from "../hooks/useBooking";
import { useRouter } from "next/navigation";
import BookingSummary from "../_components/BookingSummary";
import ServiceListContainer from "./_components/ServiceListContainer";
import { ContentDetailList } from "@/components/admin/ContentDetailList";
import { formatDate } from "@/utils/date";
import { CheckCircleOutlined } from "@ant-design/icons";
import { moneyFormatVND } from "@/utils/helper";

const ServicePage = () => {
  const [bookingInformation, setBookingInfomation] = useBooking();
  // const bookingItems = useBookingSelector((state) => state.bookingInfo?.bookingItems);
  // const productInformation = useBookingSelector((state) => state.bookingInfo?.product);
  const [isInitGotoNext, startGotoNext] = useTransition();

  const router = useRouter();

  const bookingItems = useMemo(() => {
    return bookingInformation.bookingInfo?.bookingItems;
  }, [bookingInformation]);

  const bookingSsrWithPax = useMemo(() => {
    return bookingInformation.bookingInfo?.bookingSsrWithPax;
  }, [bookingInformation]);

  const bookingSsr = useMemo(() => {
    return bookingInformation.bookingInfo?.bookingSsr;
  }, [bookingInformation]);

  const productInformation = useMemo(() => {
    return bookingInformation.bookingInfo?.product;
  }, [bookingInformation]);

  if (!productInformation || !bookingItems) {
    return null;
  }
  const isNoSSR = (!bookingSsrWithPax || !bookingSsrWithPax.length) && (!bookingSsr || !bookingSsr.length);

  const handleGotoPayment = () => {
    startGotoNext(() => router.push("/portal/booking/payment"));
  };
  const handleGotoPassengerInformation = () => {
    startGotoNext(() => router.push("/portal/booking/passenger-information"));
  };

  //   useEffect(() => {
  //     if (!isUndefined(tourServices) && !isLoading) {
  //       setBookingInfomation((prev) => ({
  //         ...prev,
  //         serviceList: [...tourServices],
  //       }));
  //     }
  //   }, [tourServices, isLoading]);

  // useEffect(() => {
  //     if (
  //         isUndefined(bookingInformation?.bookingInfo?.product) ||
  //         isUndefined(bookingInformation?.bookingInfo?.bookingItems) ||
  //         !bookingInformation?.bookingInfo?.bookingItems.length
  //     ) {
  //         router.push("/portal/booking");
  //     }
  // }, [bookingInformation]);

  return (
    <div className="services__page bg-slate-50 -mx-6 -my-6 p-6 h-full mb-8">
      <Breadcrumb
        items={[
          {
            title: "Chọn tour",
          },
          {
            title: "Mua thêm dịch vụ",
          },
        ]}
      />
      <div className="h-8"></div>
      <div className="bg-white p-6 rounded-md mb-6 shadow-sm">
        <ContentDetailList
          items={[
            { label: "Mã sản phẩm", value: productInformation.template.code },
            {
              label: "Ngày đi",
              value: formatDate(productInformation.startDate),
            },
            {
              label: "Ngày về",
              value: formatDate(productInformation.endDate),
            },
          ]}
        />
        <Divider />
        <h4 className="font-semibold mb-3">Các dịch vụ đi kèm</h4>
        <div className="flex flex-wrap gap-4">
          {productInformation.sellableDetails.inventories.map((item) => (
            <div className="detail-item flex mb-1 items-start" key={item.recId}>
              <CheckCircleOutlined className="!text-emerald-600 mr-1 mt-[3px]" />
              <div>{item.name}</div>
            </div>
          ))}
          {productInformation.sellableDetails.stocks.map((item) => (
            <div className="detail-item flex mb-1 items-start" key={item.recId}>
              <CheckCircleOutlined className="!text-emerald-600 mr-1 mt-[3px]" />
              <div>{`${item.inventory.name} - ${item.code}`}</div>
            </div>
          ))}
        </div>
        <div className="h-4"></div>
        <h4 className="font-semibold mb-3">Các giảm giá có thể áp dụng</h4>
        {productInformation.promotions.map((promo) => (
          <div className="promo-item flex mb-1 items-start" key={promo.code}>
            <CheckCircleOutlined className="!text-emerald-600 mr-1 mt-[3px]" />
            <span>{moneyFormatVND(promo.discountAmount)}</span>
          </div>
        ))}
      </div>

      <div className="max-w-6xl">
        <Row gutter={32}>
          <Col span={15}>
            {isNoSSR ? (
              <Empty description={<p>Không có dịch vụ nào khả dụng.</p>} />
            ) : (
              <ServiceListContainer
                sellableId={productInformation?.sellableId}
                bookingItems={bookingItems}
                bookingSsrWithPax={bookingSsrWithPax}
                bookingSsr={bookingSsr}
              />
            )}
          </Col>
          <Col span={9}>
            <BookingSummary label="Chi tiết giá tour" />
          </Col>
        </Row>

        <div className="">
          <Space>
            <Button type="primary" size="large" ghost onClick={handleGotoPassengerInformation} loading={isInitGotoNext}>
              Nhập thông tin khách
            </Button>
            <Button type="primary" size="large" onClick={handleGotoPayment} loading={isInitGotoNext}>
              Tiến hành đặt chỗ
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};
export default ServicePage;
