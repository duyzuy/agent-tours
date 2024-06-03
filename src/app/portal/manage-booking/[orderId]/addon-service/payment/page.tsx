"use client";
import React, { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import PageContainer from "@/components/admin/PageContainer";
import { moneyFormatVND } from "@/utils/helper";
import { useSelectorManageBooking } from "../../hooks/useManageBooking";
import useUpdateSSROrder from "../modules/useUpdateSSROrder";
import { Button, Space } from "antd";
import { formatDate } from "@/utils/date";
import useSummaryBookingOrder from "../hooks/useSummaryBookingOrder";

interface AddOnServiceProps {
    params: { orderId: number };
}

const ManageBookingEditSSRPaymentPage: React.FC<AddOnServiceProps> = ({
    params,
}) => {
    const router = useRouter();

    const orderDetail = useSelectorManageBooking((state) => state.order);
    const editSSROrder = useSelectorManageBooking(
        (state) => state.editSSROrder,
    );
    const { groupingServices, subTotal } = useSummaryBookingOrder();
    const { onUpdateSSRByPax, isLoading } = useUpdateSSROrder();

    const bookingOrder = useMemo(() => {
        return orderDetail?.bookingOrder;
    }, [orderDetail]);

    useEffect(() => {
        if (
            (!editSSROrder.bookingSsrDelete.length &&
                !editSSROrder.bookingDetails) ||
            (!editSSROrder.bookingSsrDelete.length &&
                editSSROrder.bookingDetails &&
                Object.entries(editSSROrder.bookingDetails).every(
                    ([key, values]) =>
                        values.items.every((item) => !item.ssr.length),
                ))
        ) {
            router.push(`./portal/manage-booking/${params.orderId}`);
        }
    }, [editSSROrder]);

    return (
        <PageContainer
            name="Xác nhận và thanh toán"
            modelName="Xác nhận và thanh toán"
            breadCrumItems={[
                { title: "Quản lý booking", href: "./portal/manage-booking" },
                {
                    title: bookingOrder?.template.name,
                    href: `./portal/manage-booking/${params.orderId}`,
                },
                { title: "Mua thêm dịch vụ" },
            ]}
            onBack={() =>
                router.push(
                    `./portal/manage-booking/${params.orderId}/addon-service`,
                )
            }
            //className="bg-slate-50 -m-6 p-6 pb-10 h-auto"
            hideAddButton
        >
            <div className="manage__booking-payment w-[550px]">
                <div className="mb-6 border-b pb-6">
                    <div>
                        <p className="font-[500]">Sản phẩm</p>
                    </div>
                    <div>
                        <span className="block">
                            {bookingOrder?.template.name}
                        </span>
                        <span className="text-xs text-gray-600">
                            {bookingOrder?.sellable.code}
                        </span>
                    </div>
                    <div className="pt-4">
                        <div
                            className="line h-[1px] bg-gray-100"
                            style={{ width: "calc(100% - 144px)" }}
                        ></div>
                        <div className="flex justify-between -mt-[6px]">
                            <div className="date__box-item w-36">
                                <span className="w-3 h-3 bg-slate-200 rounded-full block"></span>
                                <span className="mt-2 block">
                                    <span className="block">Ngày đi</span>
                                    <span className="date-value">
                                        {bookingOrder?.sellable.startDate
                                            ? formatDate(
                                                  bookingOrder?.sellable
                                                      .startDate,
                                              )
                                            : ""}
                                    </span>
                                </span>
                            </div>
                            <div className="date__box-item w-36">
                                <span className="w-3 h-3 bg-slate-200 rounded-full block"></span>
                                <span className="mt-2 block">
                                    <span className="block">Ngày về</span>
                                    <span>
                                        {bookingOrder?.sellable.endDate
                                            ? formatDate(
                                                  bookingOrder?.sellable
                                                      .endDate,
                                              )
                                            : ""}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-b mb-6 pb-6">
                    <div>
                        <p className="font-[500]">Thông tin tour</p>
                    </div>
                    <div>
                        {orderDetail?.bookingDetails
                            ? orderDetail?.bookingDetails.map(({ booking }) => (
                                  <div
                                      className="flex justify-between"
                                      key={booking.recId}
                                  >
                                      <span>{`${booking.pax.paxLastname}, ${booking.pax.paxMiddleFirstName}`}</span>
                                      <span className="text-primary-default">
                                          {moneyFormatVND(booking.amount)}
                                      </span>
                                  </div>
                              ))
                            : "--"}
                    </div>
                </div>
                <div className="border-b mb-6 pb-6">
                    <div className="mb-3">
                        <p>Dịch vụ</p>
                    </div>
                    <div>
                        {groupingServices
                            ? Object.entries(groupingServices)?.map(
                                  ([
                                      key,
                                      { serviceId, serviceName, items },
                                  ]) => (
                                      <div
                                          key={serviceId}
                                          className="mb-3 flex"
                                      >
                                          <div className="w-64 pr-8">
                                              <p>{serviceName}</p>
                                          </div>
                                          <div className="flex-1">
                                              <div className="flex justify-between text-xs py-2">
                                                  <span className="w-16">
                                                      Hạng
                                                  </span>
                                                  <span className="w-16">
                                                      Số lượng
                                                  </span>
                                                  <span>Tạm tính</span>
                                              </div>
                                              {items.map((item, _index) => (
                                                  <div
                                                      className="flex justify-between"
                                                      key={_index}
                                                  >
                                                      <span className="w-16">
                                                          {item.class}
                                                      </span>
                                                      <span className="w-16 text-center">
                                                          1 x
                                                      </span>
                                                      <span className="text-primary-default">
                                                          {moneyFormatVND(
                                                              item.amount,
                                                          )}
                                                      </span>
                                                  </div>
                                              ))}
                                          </div>
                                      </div>
                                  ),
                              )
                            : null}
                    </div>
                </div>
                <div className="manage__booking-payment-summary mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <span>Tổng tiền chặng cũ</span>
                        <span className="text-primary-default">
                            {moneyFormatVND(subTotal.totalAmountOldOrder)}
                        </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span>Đã thanh toán</span>
                        <span className="text-primary-default">
                            {moneyFormatVND(subTotal.totalPaid)}
                        </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span>Tổng tiền chặng mới</span>
                        <span className="text-primary-default">
                            {moneyFormatVND(subTotal.totalAmountNewOrder)}
                        </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span>Phí bổ sung</span>
                        <span className="text-primary-default">
                            {moneyFormatVND(subTotal.totalCharge)}
                        </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span>Số tiền còn phải thanh toán</span>
                        <span className="text-primary-default">
                            {moneyFormatVND(subTotal.totalAmountNeedToPay)}
                        </span>
                    </div>
                </div>
                <div className="manage__booking-service-actions bg-white mb-6">
                    <Space>
                        <Button className="w-48" onClick={() => router.back()}>
                            Quay lại
                        </Button>
                        <Button
                            type="primary"
                            className="w-48"
                            onClick={() => onUpdateSSRByPax()}
                            loading={isLoading}
                        >
                            Thanh toán
                        </Button>
                    </Space>
                </div>
            </div>
        </PageContainer>
    );
};
export default ManageBookingEditSSRPaymentPage;
