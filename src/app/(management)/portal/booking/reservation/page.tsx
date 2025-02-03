"use client";
import React, { useEffect, useMemo } from "react";
import { Space, Button, Tag } from "antd";
import { usePortalBookingManagerSelector } from "../context";
import IconSuccess from "@/assets/icons/IconSuccess";
import { useRouter } from "next/navigation";
import { isUndefined } from "lodash";
import { moneyFormatVND } from "@/utils/helper";
import { formatDate } from "@/utils/date";

const ReservationPage = () => {
  const { reservation } = usePortalBookingManagerSelector((state) => state);
  const router = useRouter();
  const bookingOrder = useMemo(() => reservation?.bookingOrder, [reservation]);
  const templateProduct = useMemo(() => reservation?.bookingOrder.template, [reservation]);
  const sellableProduct = useMemo(() => reservation?.bookingOrder.sellable, [reservation]);

  useEffect(() => {
    if (isUndefined(reservation)) {
      router.push("/portal/booking");
    }
  }, [reservation]);

  return (
    <div className="page bg-slate-50 -mx-6 -my-6 p-6 min-h-full">
      <div className="container max-w-xl mx-auto">
        <div className="text-center pt-8 mb-6">
          <IconSuccess width={60} height={60} className="mx-auto mb-2" />
          <div className="text-center mb-6">
            <span className="block font-[500] text-lg mb-2 uppercase">Đặt chỗ thành công</span>
            <span className="block">Thông tin đã được ghi nhận và giữ chỗ.</span>
          </div>
          <Button type="primary" ghost onClick={() => router.push(`/portal/manage-booking/${bookingOrder?.recId}`)}>
            Chi tiết đặt chỗ
          </Button>
        </div>
        <div className="customer__information bg-white rounded-md mb-6">
          <div className="customer__information-head px-6 pt-3">
            <h3 className="font-bold text-lg">Thông tin đặt chỗ</h3>
          </div>
          <div className="customer__information-body px-6 pb-3 pt-3">
            <DetailItem title="Mã đơn hàng" value={`#${bookingOrder?.recId}`} />
            <DetailItem title="Tên tour" value={templateProduct?.name} />
            <DetailItem title="Mã Tour" value={sellableProduct?.code} />
            <DetailItem
              title="Ngày đi"
              value={sellableProduct?.startDate ? formatDate(sellableProduct?.startDate) : undefined}
            />
            <DetailItem
              title="Ngày về"
              value={sellableProduct?.endDate ? formatDate(sellableProduct?.endDate) : undefined}
            />
            <DetailItem title="Trạng thái" value={<Tag color="red">{bookingOrder?.paymentStatus}</Tag>} />
          </div>
        </div>
        <div className="customer__information bg-white rounded-md mb-6">
          <div className="customer__information-head px-6 pt-3">
            <h3 className="font-bold text-lg">Thông tin người đặt</h3>
          </div>
          <div className="customer__information-body px-6 pt-3 pb-3">
            <DetailItem title="Họ và tên" value={bookingOrder?.custName} />
            <DetailItem title="Email" value={bookingOrder?.custEmail} />
            <DetailItem title="Số điện thoại" value={bookingOrder?.custPhoneNumber} />
            <DetailItem title="Địa chỉ" value={bookingOrder?.custAddress} />
          </div>
        </div>
        <div className="customer__information bg-white rounded-md">
          <div className="customer__information-head px-6 pt-3">
            <h3 className="font-bold text-lg">Chi tiết thanh toán</h3>
          </div>
          <div className="customer__information-body px-6 pt-3 pb-3">
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
        <div className="py-4 text-center">
          <Space>
            <Button size="large" onClick={() => router.push("/portal/booking")}>
              Về trang đặt chỗ
            </Button>
            <Button
              type="primary"
              size="large"
              ghost
              onClick={() => router.push(`/portal/manage-booking/${bookingOrder?.recId}`)}
            >
              Chi tiết đặt chỗ
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};
export default ReservationPage;

const DetailItem = ({ title, value }: { title?: string; value?: React.ReactNode }) => {
  return (
    <div className="mb-3 flex">
      <span className="label w-44">{title}</span>
      <span className="flex-1">{value ?? "--"}</span>
    </div>
  );
};
