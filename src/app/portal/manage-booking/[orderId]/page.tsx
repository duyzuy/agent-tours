"use client";
import PageContainer from "@/components/admin/PageContainer";
import { useGetBookingDetailCoreQuery } from "@/queries/core/bookingOrder";

import { Button, Space, Spin } from "antd";
import { isUndefined } from "lodash";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import OrderSummary from "./_components/OrderSummary";
import BookingDetail from "./_components/BookingDetail";
import useUpdateCustomerAndPassenger from "../modules/useUpdateCustomerAndPassenger";
import useCancelBookingOrder from "../modules/useCancelBookingOrder";
import ServiceDetail from "./_components/ServiceDetail";
import CustomerInformation from "./_components/CustomerInformation";
interface ReservationDetailPageProps {
    params: { orderId: number };
}
const ReservationDetailPage: React.FC<ReservationDetailPageProps> = ({
    params,
}) => {
    const router = useRouter();
    const { data: bookingOrderDetail, isLoading } =
        useGetBookingDetailCoreQuery({
            enabled: true,
            reservationId: params.orderId,
        });
    const { onUpdateCustomerInfo, onUpdatePassengerInfo } =
        useUpdateCustomerAndPassenger();

    const { onCancelBookingOrder } = useCancelBookingOrder();

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
            onBack={() => router.push("./portal/manage-booking/order-list")}
            // className="bg-slate-50 -m-6 p-6 pb-10 h-auto"
            hideAddButton
        >
            <div className="booking__order__Detail relative">
                <OrderSummary
                    orderDetail={bookingOrderDetail.bookingOrder}
                    fops={bookingOrderDetail.fops}
                    onCancelBooking={onCancelBookingOrder}
                    className="mb-6"
                />
                <CustomerInformation
                    bookingOrder={bookingOrderDetail.bookingOrder}
                    onSave={onUpdateCustomerInfo}
                    className="mb-6"
                />

                <BookingDetail
                    orderId={bookingOrderDetail.bookingOrder.recId}
                    bookingOrderDetailList={bookingOrderDetail.bookingDetails}
                    onSave={onUpdatePassengerInfo}
                />
                <ServiceDetail
                    serviceList={bookingOrderDetail.ssr}
                    className="mb-6"
                />
            </div>
        </PageContainer>
    );
};
export default ReservationDetailPage;
