"use client";
import React, { useMemo, useTransition } from "react";
import { Row, Col, Divider } from "antd";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import PageContainer from "@/components/admin/PageContainer";

import OrderSummary from "./_components/OrderSummary";

import useUpdateCustomerAndPassenger from "../modules/useUpdateCustomerAndPassenger";
import useUpdateInvoiceInfo from "../modules/useUpdateInvoiceInfo";
import ServiceDetail from "./_components/ServiceDetail";
import CustomerInformation from "./_components/CustomerInformation";
import TourBookingInfo from "./_components/TourBookingInfo";

import { formatDate } from "@/utils/date";
import InvoiceInformation from "./_components/InvoiceInformation";
import BookingOrderActions from "./_components/BookingOrderActions";
import DepositTimeline from "./_components/DepositTimeline";
import OrderInformation from "./_components/OrderInformation";

import BookingTimeLimitation from "./_components/BookingTimeLimitation";
import { PaymentStatus } from "@/models/common.interface";

import { IOrderDetail } from "@/models/management/booking/order.interface";
import { useSelectorManageBooking } from "./hooks/useManageBooking";
import {
    FOP_PAYMENT_TYPE,
    FOP_TYPE,
} from "@/models/management/core/formOfPayment.interface";

interface ReservationDetailPageProps {
    params: { orderId: number };
}

const BookingDetailDynamic = dynamic(
    () => import("./_components/BookingDetail"),
    {
        ssr: false,
        loading: () => (
            <div className="py-3">
                <p>Loading...</p>
            </div>
        ),
    },
);

const ReservationDetailPage: React.FC<ReservationDetailPageProps> = ({
    params,
}) => {
    const router = useRouter();

    const orderInformation = useSelectorManageBooking((state) => state.order);

    const [isPending, startTransition] = useTransition();

    const { onUpdateCustomerInfo, onUpdatePassengerInfo } =
        useUpdateCustomerAndPassenger();

    const { onUpdate: onUpdateInvoiceInfo } = useUpdateInvoiceInfo();

    const bookingOrder = useMemo(
        () => orderInformation?.bookingOrder,
        [orderInformation],
    );

    const fopListCoupon = useMemo(() => {
        return orderInformation?.bookingOrder.fops.filter(
            (item) => item.type === FOP_TYPE.DISCOUNT_COUPON,
        );
    }, [orderInformation]);

    const bookingSSRList = useMemo(() => {
        return orderInformation?.ssr.reduce<
            IOrderDetail["ssr"][0]["booking"][]
        >((acc, item) => {
            return (acc = [...acc, item.booking]);
        }, []);
    }, [orderInformation]);

    const onClickBuyService = () => {
        startTransition(() => {
            router.push(
                `/portal/manage-booking/${params.orderId}/addon-service`,
            );
        });
    };

    return (
        <PageContainer
            name="Chi tiết booking"
            modelName="Chi tiết booking"
            breadCrumItems={[
                { title: "Quản lý booking", href: "/portal/manage-booking" },
                { title: "Chi tiết booking" },
            ]}
            onBack={() => router.push("/portal/manage-booking/order-list")}
            // className="bg-slate-50 -m-6 p-6 pb-10 h-auto"
            hideAddButton
        >
            <div className="booking__order__Detail relative">
                <OrderInformation
                    sysFstUpdate={
                        bookingOrder?.sysFstUpdate &&
                        formatDate(bookingOrder?.sysFstUpdate)
                    }
                    orderId={bookingOrder?.recId}
                    paymentStatus={bookingOrder?.paymentStatus}
                    referenceId={bookingOrder?.referenceId}
                    className="mb-6"
                />
                <div className="bg-slate-50 p-6 rounded-md mb-6">
                    <TourBookingInfo
                        startDate={
                            bookingOrder?.sellable.startDate &&
                            formatDate(bookingOrder.sellable.startDate)
                        }
                        endDate={
                            bookingOrder?.sellable.endDate &&
                            formatDate(bookingOrder.sellable.endDate)
                        }
                        sysFstUpdate={
                            bookingOrder?.sysFstUpdate &&
                            formatDate(bookingOrder?.sysFstUpdate)
                        }
                        name={bookingOrder?.template.name}
                        code={bookingOrder?.sellable.code}
                        className="mb-6"
                    />
                    <Row gutter={[24, 24]}>
                        <Col span={24} md={12}>
                            <CustomerInformation
                                orderId={bookingOrder?.recId}
                                cusInfo={{
                                    custName: bookingOrder?.custName,
                                    custEmail: bookingOrder?.custEmail,
                                    custPhoneNumber:
                                        bookingOrder?.custPhoneNumber,
                                    custAddress: bookingOrder?.custAddress,
                                    rmk: bookingOrder?.rmk,
                                }}
                                onSave={onUpdateCustomerInfo}
                                className="bg-white border border-slate-100 px-6 py-4 h-full rounded-md"
                            />
                        </Col>
                        <Col span={24} md={12}>
                            <InvoiceInformation
                                orderId={bookingOrder?.recId}
                                invoiceInfo={{
                                    invoiceAddress:
                                        bookingOrder?.invoiceAddress,
                                    invoiceCompanyName:
                                        bookingOrder?.invoiceCompanyName,
                                    invoiceEmail: bookingOrder?.invoiceEmail,
                                    invoiceName: bookingOrder?.invoiceName,
                                    invoiceTaxCode:
                                        bookingOrder?.invoiceTaxCode,
                                }}
                                onSave={onUpdateInvoiceInfo}
                                className="bg-white border border-slate-100 px-6 py-4 h-full rounded-md"
                            />
                        </Col>
                    </Row>
                </div>

                {bookingOrder?.paymentStatus === PaymentStatus.NOTPAID ? (
                    <BookingTimeLimitation
                        orderId={params.orderId}
                        items={
                            orderInformation?.rulesAndPolicies
                                ?.bookingTimelimits
                        }
                    />
                ) : null}
                <DepositTimeline
                    depositTimelimits={
                        orderInformation?.rulesAndPolicies?.depositTimelimits
                    }
                    paymentStatus={bookingOrder?.paymentStatus}
                />

                <BookingOrderActions
                    orderId={bookingOrder?.recId}
                    totalAmount={bookingOrder?.totalAmount}
                    totalPaid={bookingOrder?.totalPaid}
                    paymentStatus={bookingOrder?.paymentStatus}
                />
                <OrderSummary
                    orderId={bookingOrder?.recId}
                    data={{
                        sysFstUpdate: bookingOrder?.sysFstUpdate,
                        tourPrice: bookingOrder?.tourPrice,
                        extraPrice: bookingOrder?.extraPrice,
                        totalAmount: bookingOrder?.totalAmount,
                        charge: bookingOrder?.charge,
                        totalFop: bookingOrder?.totalFop,
                        totalPaid: bookingOrder?.totalPaid,
                        totalRefunded: bookingOrder?.totalRefunded,
                        paymentStatus: bookingOrder?.paymentStatus,
                    }}
                    coupons={fopListCoupon}
                    rulesAndPolicies={orderInformation?.rulesAndPolicies}
                    // code={bookingOrder?.sellable.code}
                    // name={bookingOrder?.template.name}
                    // startDate={bookingOrder?.sellable.startDate}
                    // endDate={bookingOrder?.sellable.endDate}
                    className="mb-6"
                />

                <BookingDetailDynamic
                    orderId={bookingOrder?.recId}
                    bookingOrderDetailList={
                        orderInformation?.bookingDetails || []
                    }
                    onSave={onUpdatePassengerInfo}
                />
                <ServiceDetail
                    serviceList={bookingSSRList || []}
                    isLoading={isPending}
                    onBuyService={onClickBuyService}
                    className="mb-6"
                />
            </div>
        </PageContainer>
    );
};
export default ReservationDetailPage;
