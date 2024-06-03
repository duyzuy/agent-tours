import React, { useCallback, useMemo } from "react";
import { PriceConfig } from "@/models/management/core/priceConfig.interface";
import ServiceItem, { ServiceItemProps } from "../ServiceItem";
import { BookingDetailItemType, BookingDetailSSRItemType } from "../../page";

import { Button, Col, Row, Space } from "antd";
import { useRouter } from "next/navigation";
import { IOrderDetail } from "@/models/management/booking/order.interface";
import {
    useDispatchManageBooking,
    useSelectorManageBooking,
} from "../../../hooks/useManageBooking";
import { addSSROrder } from "../../../actions";
import ManageBookingOrderSummary from "../ManageBookingOrderSummary";
import { useTransition } from "react";

interface ServiceListContainerProps {
    orderId?: number;
    items: PriceConfig[];
    ssrListBooked?: BookingDetailSSRItemType[];
    bookingDetails?: BookingDetailItemType[];
    bookingOrder?: IOrderDetail["bookingOrder"];
}
const ServiceListContainer: React.FC<ServiceListContainerProps> = ({
    orderId,
    items,
    ssrListBooked,
    bookingDetails,
    bookingOrder,
}) => {
    const dispatch = useDispatchManageBooking();
    const [isPending, startTransition] = useTransition();
    const editSSROrder = useSelectorManageBooking(
        (state) => state.editSSROrder,
    );

    const router = useRouter();

    /**
     *
     * Grouping Booking service items by serviceitem
     * @param sellableDetailsId present an type of service.
     *
     */
    const groupingServices = useMemo(() => {
        return items.reduce<{
            [key: string]: {
                serviceId: number;
                serviceName: string;
                priceConfigs: PriceConfig[];
            };
        }>((acc, item) => {
            const detailsId = item.sellableDetailsId;

            if (acc[detailsId]) {
                acc = {
                    ...acc,
                    [detailsId]: {
                        ...acc[detailsId],
                        priceConfigs: [...acc[detailsId]["priceConfigs"], item],
                    },
                };
            } else {
                acc = {
                    ...acc,
                    [detailsId]: {
                        serviceId: detailsId,
                        serviceName: item.details,
                        priceConfigs: [item],
                    },
                };
            }
            return acc;
        }, {});
    }, [items]);

    const isDisableButton = useMemo(() => {
        return (
            (!editSSROrder.bookingSsrDelete.length &&
                !editSSROrder.bookingDetails) ||
            (!editSSROrder.bookingSsrDelete.length &&
                editSSROrder.bookingDetails &&
                Object.entries(editSSROrder.bookingDetails).every(
                    ([key, values]) =>
                        values.items.every((item) => !item.ssr.length),
                ))
        );
    }, [editSSROrder]);
    const onAddSSRBooking = useCallback<
        Required<ServiceItemProps>["onConfirm"]
    >((ssrItems, ssrItemRemove, serviceId) => {
        dispatch(
            addSSROrder({
                ssrAdd: { serviceId: serviceId, items: ssrItems },
                ssrRemove: [...ssrItemRemove],
            }),
        );
    }, []);
    const gotoPaymentPage = () => {
        startTransition(() =>
            router.push(
                `./portal/manage-booking/${orderId}/addon-service/payment`,
            ),
        );
    };

    return (
        <>
            <Row gutter={60}>
                <Col span={15}>
                    <div className="manage__booking-service-head mb-6">
                        <p className="font-[500] text-[16px]">Chọn dịch vụ</p>
                    </div>
                    {Object.entries(groupingServices)?.map(
                        ([key, { serviceId, serviceName, priceConfigs }]) => (
                            <ServiceItem
                                key={serviceId}
                                serviceName={serviceName}
                                serviceId={serviceId}
                                pricingConfigs={priceConfigs}
                                bookingDetails={bookingDetails}
                                ssrListBooked={ssrListBooked}
                                initSSRBookingItems={
                                    editSSROrder?.bookingDetails
                                        ? editSSROrder.bookingDetails[serviceId]
                                              ?.items
                                        : []
                                }
                                initSSRBookingItemsRemove={
                                    editSSROrder.bookingSsrDelete
                                }
                                onConfirm={onAddSSRBooking}
                            />
                        ),
                    )}
                    <div className="manage__booking-service-actions bg-white mb-6">
                        <Space>
                            <Button
                                className="w-48"
                                onClick={() => router.back()}
                            >
                                Quay lại
                            </Button>
                            <Button
                                type="primary"
                                className="w-48"
                                onClick={gotoPaymentPage}
                                disabled={isDisableButton}
                                loading={isPending}
                            >
                                Tiến hành thanh toán
                            </Button>
                        </Space>
                    </div>
                </Col>
                <Col span={9}>
                    <ManageBookingOrderSummary
                        bookingDetails={bookingDetails}
                        bookingOrder={bookingOrder}
                        ssrList={ssrListBooked}
                    />
                </Col>
            </Row>
        </>
    );
};
export default ServiceListContainer;
