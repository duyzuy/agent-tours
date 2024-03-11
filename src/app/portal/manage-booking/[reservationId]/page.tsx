"use client";
import PageContainer from "@/components/admin/PageContainer";
import { useGetBookingDetailCoreQuery } from "@/queries/core/bookingOrder";

import { Spin } from "antd";
import { isUndefined } from "lodash";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import OrderDetail from "./_components/OrderDetail";
import BookingDetail from "./_components/BookingDetail";
import useUpdateCustomerAndPassenger from "../modules/useUpdateCustomerAndPassenger";
interface ReservationDetailPageProps {
    params: { reservationId: number };
}
const ReservationDetailPage: React.FC<ReservationDetailPageProps> = ({
    params,
}) => {
    const router = useRouter();
    const { data: bookingOrderDetail, isLoading } =
        useGetBookingDetailCoreQuery({
            enabled: Boolean(params.reservationId),
            reservationId: params.reservationId,
        });
    const { onUpdateCustomerAndPassengerInfo } =
        useUpdateCustomerAndPassenger();

    useEffect(() => {
        if (isUndefined(bookingOrderDetail) && !isLoading) {
            router.push("./portal/manage-booking");
        }
    }, [bookingOrderDetail, isLoading]);
    if (isLoading) {
        return <Spin />;
    }

    if (isUndefined(bookingOrderDetail)) {
        return null;
    }
    return (
        <PageContainer
            name="Chi tiết booking"
            modelName="Chi tiết booking"
            breadCrumItems={[
                { title: "Quản lý booking", href: "./portal/manage-booking" },
                { title: "Chi tiết booking" },
            ]}
            onBack={() => router.back()}
            // className="bg-slate-50 -m-6 p-6 pb-10 h-auto"
            hideAddButton
        >
            <div className="booking__order__Detail">
                <OrderDetail
                    orderDetail={bookingOrderDetail.bookingOrder}
                    className="mb-6"
                />
                <BookingDetail
                    bookingsDetail={bookingOrderDetail.bookingDetails}
                    onSave={(data) =>
                        onUpdateCustomerAndPassengerInfo({
                            bookingOrder: {
                                recId: bookingOrderDetail.bookingOrder.recId,
                            },
                            bookingDetails: data,
                        })
                    }
                />
            </div>
        </PageContainer>
    );
};
export default ReservationDetailPage;
