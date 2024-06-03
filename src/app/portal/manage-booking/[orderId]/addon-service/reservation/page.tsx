"use client";
import React, { useEffect, useMemo } from "react";
import { Space, Button, Tag } from "antd";
import { useSelectorManageBooking } from "../../hooks/useManageBooking";
import IconSuccess from "@/assets/icons/IconSuccess";
import { useRouter } from "next/navigation";
import { isUndefined } from "lodash";
import { moneyFormatVND } from "@/utils/helper";
import { formatDate } from "@/utils/date";
import { getPassengerType } from "@/utils/common";
import { IOrderDetail } from "@/models/management/booking/order.interface";
import { resetEditBooking } from "../../actions";
type BookingSSRItemType = IOrderDetail["ssr"][0]["booking"];
import { useDispatchManageBooking } from "../../hooks/useManageBooking";

interface ManageBookingReservationPageProps {
    params: { orderId: number };
}

const ManageBookingReservationPage: React.FC<
    ManageBookingReservationPageProps
> = ({ params }) => {
    const orderDetailInformation = useSelectorManageBooking(
        (state) => state.order,
    );
    const editSSROrder = useSelectorManageBooking(
        (state) => state.editSSROrder,
    );
    const { bookingDetails, bookingOrder, ssr } = orderDetailInformation || {};
    const router = useRouter();
    const dispatch = useDispatchManageBooking();

    const ssrGroupedByService = useMemo(() => {
        return ssr?.reduce<{
            [key: string]: {
                serviceId: number;
                serviceName: string;
                items: BookingSSRItemType[];
            };
        }>((acc, { booking }) => {
            const serviceId = booking.config.sellableDetailsId;

            if (acc[serviceId]) {
                acc = {
                    ...acc,
                    [serviceId]: {
                        ...acc[serviceId],
                        items: [...acc[serviceId].items, booking],
                    },
                };
            } else {
                acc = {
                    ...acc,
                    [serviceId]: {
                        serviceId: serviceId,
                        serviceName: booking.config.details,
                        items: [booking],
                    },
                };
            }
            return acc;
        }, {});
    }, [ssr]);

    useEffect(() => {
        if (
            (!editSSROrder.bookingSsrDelete.length &&
                !editSSROrder.bookingDetails) ||
            (!editSSROrder.bookingSsrDelete.length &&
                editSSROrder.bookingDetails &&
                Object.entries(editSSROrder.bookingDetails).every(
                    ([key, values]) =>
                        values.items.every((item) => !item.ssr.length),
                )) ||
            isUndefined(orderDetailInformation)
        ) {
            router.push(`./portal/manage-booking/${params.orderId}`);
        } else {
            dispatch(resetEditBooking());
        }
    }, [orderDetailInformation]);

    return (
        <div className="page bg-slate-50 -mx-6 -my-6 p-6 min-h-full">
            <div className="max-w-4xl mx-auto">
                <div className="customer__page">
                    <div className="text-center pt-8 mb-6">
                        <IconSuccess
                            width={60}
                            height={60}
                            className="mx-auto mb-2"
                        />
                        <div className="text-center">
                            <span className="block font-[500] text-green-600 text-lg mb-2 uppercase">
                                Cập nhập đặt chỗ thành công
                            </span>
                        </div>
                    </div>
                    <div className="customer__information bg-white rounded-md max-w-xl mx-auto mb-6 drop-shadow-sm">
                        <div className="customer__information-head border-b px-6 py-6">
                            <h3 className="font-bold text-lg">
                                Thông tin đặt chỗ
                            </h3>
                        </div>
                        <div className="customer__information-body px-6 pt-6 pb-3">
                            <DetailItem
                                title="Mã đơn hàng"
                                value={`#${bookingOrder?.recId}`}
                            />
                            <DetailItem
                                title="Tên tour"
                                value={bookingOrder?.template?.name}
                            />
                            <DetailItem
                                title="Mã Tour"
                                value={bookingOrder?.sellable?.code}
                            />
                            <DetailItem
                                title="Ngày đi"
                                value={
                                    bookingOrder?.sellable?.startDate
                                        ? formatDate(
                                              bookingOrder.sellable?.startDate,
                                          )
                                        : undefined
                                }
                            />
                            <DetailItem
                                title="Ngày về"
                                value={
                                    bookingOrder?.sellable?.endDate
                                        ? formatDate(
                                              bookingOrder.sellable?.endDate,
                                          )
                                        : undefined
                                }
                            />
                        </div>
                    </div>
                    <div className="customer__information bg-white rounded-md max-w-xl mx-auto mb-6 drop-shadow-sm">
                        <div className="customer__information-head border-b px-6 py-6">
                            <h3 className="font-bold text-lg">
                                Thông tin người đặt
                            </h3>
                        </div>
                        <div className="customer__information-body px-6 pt-6 pb-3">
                            <DetailItem
                                title="Họ và tên"
                                value={bookingOrder?.custName}
                            />
                            <DetailItem
                                title="Email"
                                value={bookingOrder?.custEmail}
                            />
                            <DetailItem
                                title="Số điện thoại"
                                value={bookingOrder?.custPhoneNumber}
                            />
                            <DetailItem
                                title="Địa chỉ"
                                value={bookingOrder?.custAddress}
                            />
                        </div>
                    </div>
                    <div className="customer__information bg-white rounded-md max-w-xl mx-auto drop-shadow-sm mb-6">
                        <div className="customer__information-body px-6 pt-6 pb-3">
                            <DetailItem
                                title="Trạng thái"
                                value={
                                    <Tag color="red">
                                        {bookingOrder?.paymentStatus}
                                    </Tag>
                                }
                            />
                        </div>
                    </div>
                    <div className="pax__information bg-white rounded-md max-w-xl mx-auto mb-6 drop-shadow-sm">
                        <div className="customer__information-head border-b px-6 py-6">
                            <h3 className="font-bold text-lg">
                                Thông tin hành khách
                            </h3>
                        </div>
                        <div className="px-6 pt-6 pb-3">
                            {bookingDetails?.map(({ booking }, _index) => (
                                <React.Fragment key={_index}>
                                    <div>
                                        <DetailItem
                                            title={
                                                getPassengerType(
                                                    booking.pax.type,
                                                ) || ""
                                            }
                                            value={`${booking.pax.paxLastname}, ${booking.pax.paxMiddleFirstName}`}
                                        />
                                        <DetailItem
                                            title={"Giá tiền"}
                                            value={moneyFormatVND(
                                                booking.amount,
                                            )}
                                        />
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                    <div className="pax__information bg-white rounded-md max-w-xl mx-auto mb-6 drop-shadow-sm">
                        <div className="customer__information-head border-b px-6 py-6">
                            <h3 className="font-bold text-lg">Dịch vụ</h3>
                        </div>
                        <div className="px-6 pt-6 pb-3">
                            {ssrGroupedByService
                                ? Object.entries(ssrGroupedByService).map(
                                      ([key, value]) => (
                                          <div key={key} className="mb-3">
                                              <div className="mb-3">
                                                  <p className="font-[500]">
                                                      {value.serviceName}
                                                  </p>
                                              </div>
                                              <div>
                                                  {value.items.map(
                                                      (item, _index) => (
                                                          <div
                                                              className="flex items-center"
                                                              key={`${value.serviceId}-${_index}`}
                                                          >
                                                              <span className="block w-32">
                                                                  {item.class}
                                                              </span>
                                                              <span>
                                                                  {`1x ${moneyFormatVND(
                                                                      item.amount,
                                                                  )}`}
                                                              </span>
                                                          </div>
                                                      ),
                                                  )}
                                              </div>
                                          </div>
                                      ),
                                  )
                                : null}
                        </div>
                    </div>
                    <div className="customer__information bg-white rounded-md max-w-xl mx-auto drop-shadow-sm">
                        <div className="customer__information-head border-b px-6 py-6">
                            <h3 className="font-bold text-lg">
                                Chi tiết thanh toán
                            </h3>
                        </div>
                        <div className="customer__information-body px-6 pt-6 pb-3">
                            <DetailItem
                                title="Tour price"
                                value={moneyFormatVND(bookingOrder?.tourPrice)}
                            />
                            <DetailItem
                                title="Phí bổ sung"
                                value={moneyFormatVND(bookingOrder?.extraPrice)}
                            />
                            <DetailItem
                                title="Phí"
                                value={moneyFormatVND(bookingOrder?.charge)}
                            />
                            <DetailItem
                                title="Đã thanh toán"
                                value={moneyFormatVND(bookingOrder?.totalPaid)}
                            />
                            <DetailItem
                                title="Tổng tiền"
                                value={
                                    <span className=" text-primary-default font-[500]">
                                        {moneyFormatVND(
                                            bookingOrder?.totalAmount,
                                        )}
                                    </span>
                                }
                            />
                        </div>
                    </div>
                    <div className="customer__information py-4 rounded-md max-w-xl mx-auto">
                        <div className="flex justify-center">
                            <Space>
                                <Button
                                    onClick={() =>
                                        router.push("./portal/booking")
                                    }
                                >
                                    Về trang đặt chỗ
                                </Button>
                                <Button
                                    type="primary"
                                    onClick={() =>
                                        router.push(
                                            `./portal/manage-booking/${bookingOrder?.recId}`,
                                        )
                                    }
                                >
                                    Quản lý đặt chỗ
                                </Button>
                            </Space>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ManageBookingReservationPage;

const DetailItem = ({
    title,
    value,
}: {
    title?: string;
    value?: React.ReactNode;
}) => {
    return (
        <div className="mb-3 flex">
            <span className="label w-32">{title}</span>
            <span className="flex-1">{value ?? "--"}</span>
        </div>
    );
};
