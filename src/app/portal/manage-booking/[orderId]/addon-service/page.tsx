"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { isUndefined } from "lodash";
import { useRouter } from "next/navigation";
import { Spin, Button, Space } from "antd";
import PageContainer from "@/components/admin/PageContainer";
import {
    useGetBookingTourServicesCoreQuery,
    useGetBookingDetailCoreQuery,
} from "@/queries/core/bookingOrder";
import EmptyService from "@/components/admin/EmptyService";
import ServiceListContainer from "./_components/ServiceListContainer";
import { IOrderDetail } from "@/models/management/booking/order.interface";
interface AddOnServiceProps {
    params: { orderId: number };
}
export type BookingDetailItem = IOrderDetail["bookingDetails"][0]["booking"];
export type BookingDetailSSRItem = IOrderDetail["ssr"][0]["booking"];

const AddonServicePage: React.FC<AddOnServiceProps> = ({ params }) => {
    const router = useRouter();

    const { data: bookingOrderDetail, isLoading } =
        useGetBookingDetailCoreQuery({
            enabled: true,
            reservationId: params.orderId,
        });

    const { data: serviceList, isLoading: isLoadingServices } =
        useGetBookingTourServicesCoreQuery({
            enabled: !isUndefined(bookingOrderDetail?.bookingOrder.sellableId),
            sellableId: bookingOrderDetail?.bookingOrder.sellableId,
        });

    const bookingDetails = useMemo(() => {
        return bookingOrderDetail?.bookingDetails?.reduce<BookingDetailItem[]>(
            (acc, bookingItem) => {
                acc = [...acc, bookingItem.booking];
                return acc;
            },
            [],
        );
    }, [bookingOrderDetail]);

    const ssrListBooked = useMemo(() => {
        return bookingOrderDetail?.ssr?.reduce<BookingDetailSSRItem[]>(
            (acc, bookingItem) => {
                acc = [...acc, bookingItem.booking];
                return acc;
            },
            [],
        );
    }, [bookingOrderDetail]);

    if (isLoadingServices) {
        return <Spin />;
    }

    if (isUndefined(serviceList) || isUndefined(bookingOrderDetail)) {
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
            <div className="manage__booking-service w-[760px]">
                {serviceList ? (
                    <ServiceListContainer
                        orderId={params.orderId}
                        items={serviceList}
                        ssrListBooked={ssrListBooked}
                        bookingDetails={bookingDetails}
                    />
                ) : (
                    <EmptyService
                        title="Rất tiếc"
                        descriptions="Không có dịch vụ nào khả dụng cho tour này."
                        className="px-6 py-6 rounded-sm"
                    />
                )}
            </div>
        </PageContainer>
    );
};
export default AddonServicePage;
