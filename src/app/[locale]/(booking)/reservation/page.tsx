"use client";
import React, { useMemo } from "react";
import { Space, Button, Tag } from "antd";
import IconSuccess from "@/assets/icons/IconSuccess";
import { Link, useRouter } from "@/utils/navigation";
import { moneyFormatVND } from "@/utils/helper";
import { formatDate } from "@/utils/date";
import { PaymentStatus } from "@/models/common.interface";
import { useBookingSelector } from "@/store";
const ReservationPage = () => {
  const reservation = useBookingSelector((state) => state.reservation);
  const cmsTemplate = useBookingSelector((state) => state.bookingInfo.cmsTemplate);

  const router = useRouter();
  const bookingOrder = useMemo(() => {
    return reservation?.bookingOrder;
  }, [reservation]);

  const templateProduct = useMemo(() => {
    return bookingOrder?.template;
  }, [bookingOrder]);

  const sellableProduct = useMemo(() => {
    return bookingOrder?.sellable;
  }, [bookingOrder]);

  const handleBackToHome = () => {
    router.push("/");
  };
  return (
    <div className="page-reservation mx-auto min-h-full">
      <div className="customer__information bg-white rounded-md mb-6">
        <div className="text-center pt-8 mb-6">
          <IconSuccess width={60} height={60} className="mx-auto mb-2" />
          <div className="text-center">
            <span className="block font-[500] text-green-600 text-lg mb-2 uppercase">Đặt chỗ thành công</span>
            <span className="block">Thông tin đã được ghi nhận và giữ chỗ.</span>
          </div>
        </div>
        <div className="customer__information-body px-6 pt-6 pb-3">
          <DetailItem title="Mã đơn hàng" value={`#${bookingOrder?.recId}`} />
          <DetailItem title="Tên tour" value={cmsTemplate?.name} />
          <DetailItem
            title="Ngày đi"
            value={sellableProduct?.startDate ? formatDate(sellableProduct?.startDate) : undefined}
          />
          <DetailItem
            title="Ngày về"
            value={sellableProduct?.endDate ? formatDate(sellableProduct?.endDate) : undefined}
          />
          <DetailItem
            title="Trạng thái"
            value={
              <Tag color="red">
                {bookingOrder?.paymentStatus === PaymentStatus.NOTPAID
                  ? "Chờ thanh toán"
                  : bookingOrder?.paymentStatus === PaymentStatus.PAID
                  ? "Đã thanh toán"
                  : bookingOrder?.paymentStatus === PaymentStatus.DEPOSITED
                  ? "Đã thanh toán 1 phần"
                  : "Unknown"}
              </Tag>
            }
          />
        </div>
      </div>
      <div className="customer__information bg-white rounded-md mb-6">
        <div className="customer__information-head border-b px-6 py-4">
          <h3 className="font-bold text-lg">Thông tin người đặt</h3>
        </div>
        <div className="customer__information-body px-6 pt-6 pb-3">
          <DetailItem title="Họ và tên" value={bookingOrder?.custName} />
          <DetailItem title="Email" value={bookingOrder?.custEmail} />
          <DetailItem title="Số điện thoại" value={bookingOrder?.custPhoneNumber} />
          <DetailItem title="Địa chỉ" value={bookingOrder?.custAddress} />
        </div>
      </div>

      <div className="customer__information bg-white rounded-md ">
        <div className="customer__information-head border-b px-6 py-4">
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
      <div className="flex justify-center py-4">
        <Space>
          <Button type="primary" size="large" onClick={handleBackToHome}>
            Về trang chủ
          </Button>
          <Link
            href={`/customer/order/${reservation?.bookingOrder.recId}`}
            className="!bg-emerald-600 !border-emerald-700 !text-white !h-10 px-3 inline-flex items-center justify-center rounded-md"
          >
            Chi tiết đặt chỗ
          </Link>
        </Space>
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
