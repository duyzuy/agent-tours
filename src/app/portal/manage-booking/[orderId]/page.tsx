"use client";
import React, { useEffect, useMemo } from "react";
import { Spin, Row, Col, Steps, StepProps, Divider } from "antd";
import { isUndefined } from "lodash";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import PageContainer from "@/components/admin/PageContainer";
import { useGetBookingDetailCoreQuery } from "@/queries/core/bookingOrder";

import OrderSummary from "./_components/OrderSummary";

import useUpdateCustomerAndPassenger from "../modules/useUpdateCustomerAndPassenger";
import useUpdateInvoiceInfo from "../modules/useUpdateInvoiceInfo";
import useCancelBookingOrder from "../modules/useCancelBookingOrder";
import ServiceDetail from "./_components/ServiceDetail";
import CustomerInformation from "./_components/CustomerInformation";
import TourBookingInfo from "./_components/TourBookingInfo";
import { useLocalGetRuleAndPolicyQuery } from "@/queries/ruleAndPolicy";
import { formatDate } from "@/utils/date";
import InvoiceInformation from "./_components/InvoiceInformation";
import BookingOrderActions from "./_components/BookingOrderActions";
import DepositTimeline from "./_components/DepositTimeline";
import OrderInformation from "./_components/OrderInformation";

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
    const { data: ruleAndPolicyList, isLoading: isLoadingRule } =
        useLocalGetRuleAndPolicyQuery();

    const { data: bookingOrderDetail, isLoading } =
        useGetBookingDetailCoreQuery({
            enabled: !isLoadingRule,
            reservationId: params.orderId,
            localRuleAndPolicies: ruleAndPolicyList,
        });
    const { onUpdateCustomerInfo, onUpdatePassengerInfo } =
        useUpdateCustomerAndPassenger();

    const { onCancelBookingOrder } = useCancelBookingOrder();
    const { onUpdate: onUpdateInvoiceInfo } = useUpdateInvoiceInfo();

    const bookingOrder = useMemo(() => {
        return bookingOrderDetail?.bookingOrder;
    }, [bookingOrderDetail]);

    const rulesAndPolicies = useMemo(() => {
        return bookingOrderDetail?.rulesAndPolicies;
    }, [bookingOrderDetail]);

    useEffect(() => {
        if (isUndefined(bookingOrderDetail) && !isLoading && !isLoadingRule) {
            router.push("./portal/manage-booking");
        }
    }, [bookingOrderDetail, isLoading, isLoadingRule]);

    if (isLoading || isLoadingRule) {
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
                <OrderInformation
                    sysFstUpdate={
                        bookingOrder?.sysFstUpdate &&
                        formatDate(bookingOrder?.sysFstUpdate)
                    }
                    orderId={bookingOrder?.recId}
                    paymentStatus={bookingOrder?.paymentStatus}
                    className="mb-6"
                />
                <div className="bg-slate-50 p-6 rounded-md">
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
                <Divider />
                <BookingOrderActions
                    orderId={bookingOrder?.recId}
                    onCancelBooking={onCancelBookingOrder}
                    totalAmount={bookingOrder?.totalAmount}
                    totalPaid={bookingOrder?.totalPaid}
                />
                <div className="mb-6">
                    <div className="mb-3">
                        <p className="font-[500] text-[16px]">
                            Thời gian thực hiện thanh toán
                        </p>
                    </div>
                    <Steps
                        current={0}
                        items={rulesAndPolicies?.bookingTimelimits.map<StepProps>(
                            (item) => {
                                return {
                                    title: `Hạn thanh toán: ${formatDate(
                                        item.deadline,
                                    )}`,
                                    description: `${
                                        item.isCompleted === true
                                            ? "Đã thanh toán"
                                            : "Chưa thanh toán"
                                    }`,
                                    subTitle:
                                        item.isExpired === true
                                            ? "Hết hạn"
                                            : null,
                                };
                            },
                        )}
                    />
                </div>
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
                    rulesAndPolicies={rulesAndPolicies}
                    // code={bookingOrder?.sellable.code}
                    // name={bookingOrder?.template.name}
                    // startDate={bookingOrder?.sellable.startDate}
                    // endDate={bookingOrder?.sellable.endDate}
                    className="mb-6"
                />
                <DepositTimeline
                    depositTimelimits={rulesAndPolicies?.depositTimelimits}
                />

                <BookingDetailDynamic
                    orderId={bookingOrder?.recId}
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
