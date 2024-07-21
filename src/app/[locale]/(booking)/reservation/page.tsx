"use client";
import React, { useEffect, useMemo } from "react";
import { Space, Button, Tag } from "antd";
import { useBookingSelector } from "../../hooks/useBookingInformation";
import IconSuccess from "@/assets/icons/IconSuccess";
import { useRouter } from "@/utils/navigation";
import { isUndefined } from "lodash";
import { moneyFormatVND } from "@/utils/helper";
import { formatDate } from "@/utils/date";
import { useLocale } from "next-intl";
import { revalidateTag } from "next/cache";

const ReservationPage = () => {
  const reservation = useBookingSelector((state) => state.reservation);
  const product = useBookingSelector((state) => state.bookingInfo.product);
  const locale = useLocale();
  const { bookingOrder } = reservation || {};
  console.log(reservation, locale);
  const router = useRouter();

  const templateProduct = useMemo(() => {
    return bookingOrder?.template;
  }, [bookingOrder]);

  const sellableProduct = useMemo(() => {
    return bookingOrder?.sellable;
  }, [bookingOrder]);

  // useEffect(() => {
  //     if (isUndefined(bookingOrder)) {
  //         router.push("/portal/booking");
  //     }
  // }, [bookingOrder]);
  const handleBackToHome = () => {
    router.push("/");
    // revalidateTag("productListItemByDestination");
  };
  return (
    <div className="page min-h-full">
      <div className="mx-auto">
        <div className="customer__page">
          <div className="text-center pt-8 mb-6">
            <IconSuccess width={60} height={60} className="mx-auto mb-2" />
            <div className="text-center">
              <span className="block font-[500] text-green-600 text-lg mb-2 uppercase">Đặt chỗ thành công</span>
              <span className="block">Thông tin đã được ghi nhận và giữ chỗ.</span>
            </div>
          </div>
          <div className="customer__information bg-white rounded-md  mb-6 drop-shadow-sm">
            <div className="customer__information-head border-b px-6 py-6">
              <h3 className="font-bold text-lg">Thông tin đặt chỗ</h3>
            </div>
            <div className="customer__information-body px-6 pt-6 pb-3">
              <DetailItem title="Mã đơn hàng" value={`#${bookingOrder?.recId}`} />
              <DetailItem title="Tên tour" value={product?.template.name} />
              <DetailItem title="Mã Tour" value={sellableProduct?.code} />
              <DetailItem
                title="Ngày đi"
                value={sellableProduct?.startDate ? formatDate(sellableProduct?.startDate) : undefined}
              />
              <DetailItem
                title="Ngày về"
                value={sellableProduct?.endDate ? formatDate(sellableProduct?.endDate) : undefined}
              />
            </div>
          </div>
          <div className="customer__information bg-white rounded-md  mb-6 drop-shadow-sm">
            <div className="customer__information-head border-b px-6 py-6">
              <h3 className="font-bold text-lg">Thông tin người đặt</h3>
            </div>
            <div className="customer__information-body px-6 pt-6 pb-3">
              <DetailItem title="Họ và tên" value={bookingOrder?.custName} />
              <DetailItem title="Email" value={bookingOrder?.custEmail} />
              <DetailItem title="Số điện thoại" value={bookingOrder?.custPhoneNumber} />
              <DetailItem title="Địa chỉ" value={bookingOrder?.custAddress} />
            </div>
          </div>
          <div className="customer__information bg-white rounded-md  drop-shadow-sm mb-6">
            <div className="customer__information-body px-6 pt-6 pb-3">
              <DetailItem title="Trạng thái" value={<Tag color="red">{bookingOrder?.paymentStatus}</Tag>} />
            </div>
          </div>
          <div className="customer__information bg-white rounded-md  drop-shadow-sm">
            <div className="customer__information-head border-b px-6 py-6">
              <h3 className="font-bold text-lg">Chi tiết thanh toán</h3>
            </div>
            <div className="customer__information-body px-6 pt-6 pb-3">
              <DetailItem title="Tour price" value={moneyFormatVND(bookingOrder?.tourPrice)} />
              <DetailItem title="Extra price" value={moneyFormatVND(bookingOrder?.extraPrice)} />
              <DetailItem title="Charge" value={moneyFormatVND(bookingOrder?.charge)} />
              <DetailItem
                title="Tổng tiền"
                value={
                  <span className=" text-primary-default font-[500]">{moneyFormatVND(bookingOrder?.totalAmount)}</span>
                }
              />
            </div>
          </div>
          <div className="customer__information py-4 rounded-md ">
            <div className="flex justify-center">
              <Space>
                <Button type="primary" size="large" onClick={handleBackToHome}>
                  Về trang chủ
                </Button>
              </Space>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReservationPage;

const DetailItem = ({ title, value }: { title?: string; value?: React.ReactNode }) => {
  return (
    <div className="mb-3 flex">
      <span className="label w-32">{title}</span>
      <span className="flex-1">{value ?? "--"}</span>
    </div>
  );
};
