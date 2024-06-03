"use client";
import React, { useMemo } from "react";
import { isEmpty, isUndefined } from "lodash";
import { useRouter } from "next/navigation";
import { Spin } from "antd";
import PageContainer from "@/components/admin/PageContainer";
import { useGetBookingTourServicesCoreQuery } from "@/queries/core/bookingOrder";
import EmptyService from "@/components/admin/EmptyService";
import ServiceListContainer from "./_components/ServiceListContainer";
import { IOrderDetail } from "@/models/management/booking/order.interface";
import { useSelectorManageBooking } from "../hooks/useManageBooking";
interface AddOnServiceProps {
    params: { orderId: number };
}
export type BookingDetailItemType =
    IOrderDetail["bookingDetails"][0]["booking"];
export type BookingDetailSSRItemType = IOrderDetail["ssr"][0]["booking"];

const AddonServicePage: React.FC<AddOnServiceProps> = ({ params }) => {
    const router = useRouter();

    const orderDetailInformation = useSelectorManageBooking(
        (state) => state.order,
    );

    const { data: serviceList, isLoading: isLoadingServices } =
        useGetBookingTourServicesCoreQuery({
            enabled: !isUndefined(
                orderDetailInformation?.bookingOrder.sellableId,
            ),
            sellableId: orderDetailInformation?.bookingOrder.sellableId,
        });

    const bookingDetails = useMemo(() => {
        return orderDetailInformation?.bookingDetails?.reduce<
            BookingDetailItemType[]
        >((acc, bookingItem) => {
            acc = [...acc, bookingItem.booking];
            return acc;
        }, []);
    }, [orderDetailInformation]);

    const ssrListBooked = useMemo(() => {
        return orderDetailInformation?.ssr?.reduce<BookingDetailSSRItemType[]>(
            (acc, bookingItem) => {
                acc = [...acc, bookingItem.booking];
                return acc;
            },
            [],
        );
    }, [orderDetailInformation]);

    if (isLoadingServices) {
        return <Spin />;
    }

    if (isUndefined(serviceList) || isUndefined(orderDetailInformation)) {
        return null;
    }
    return (
        <PageContainer
            name="Mua thêm dịch vụ"
            modelName="Mua thêm dịch vụ"
            breadCrumItems={[
                { title: "Quản lý booking", href: "./portal/manage-booking" },
                {
                    title: "Chi tiết booking",
                    href: `./portal/manage-booking/${params.orderId}`,
                },
                { title: "Mua thêm dịch vụ" },
            ]}
            onBack={() =>
                router.push(`./portal/manage-booking/${params.orderId}`)
            }
            //className="bg-slate-50 -m-6 p-6 pb-10 h-auto"
            hideAddButton
        >
            <div className="manage__booking-service w-[1040px]">
                {!isEmpty(serviceList) ? (
                    <ServiceListContainer
                        orderId={params.orderId}
                        items={serviceList}
                        bookingOrder={orderDetailInformation?.bookingOrder}
                        ssrListBooked={ssrListBooked}
                        bookingDetails={bookingDetails}
                    />
                ) : (
                    <EmptyService
                        title="Rất tiếc"
                        descriptions="Không có dịch vụ nào khả dụng cho tour này."
                        className="px-6 py-6 rounded-sm"
                        onClick={() =>
                            router.push(
                                `./portal/manage-booking/${params.orderId}`,
                            )
                        }
                    />
                )}
            </div>
        </PageContainer>
    );
};
export default AddonServicePage;
