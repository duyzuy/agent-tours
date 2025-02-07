"use client";
import React, { useMemo } from "react";
import { Row, Col, Divider, Space, Card } from "antd";
import { useRouter } from "next/navigation";

import { formatDate } from "@/utils/date";
import { PaymentStatus, Status } from "@/models/common.interface";
import { EFopType } from "@/models/management/core/formOfPayment.interface";
import { useSelectorManageBooking } from "./context";
import PageContainer from "@/components/admin/PageContainer";
import ServiceListContainer from "./_components/ServiceListContainer";
import CustomerInformation from "./_components/CustomerInformation";
import PassengerListContainer from "./_components/PassengerListContainer";
import OrderSummary from "./_components/OrderSummary";
import TourBookingInfo from "./_components/TourBookingInfo";
import InvoiceInformation from "./_components/InvoiceInformation";
import BookingOrderActions from "./_components/BookingOrderActions";
import DepositTimeline from "./_components/DepositTimeline";
import OrderInformation from "./_components/OrderInformation";
import BookingTimeLimitation from "./_components/BookingTimeLimitation";
import SplitBookingButton from "./_components/SplitBookingButton";
import CancelBookingButton from "./_components/CancelBookingButton";
import CommentButton from "./_components/CommentButton";
import { getAdminUserInformationStorage } from "@/utils/common";
import { useGetOperationOrderStatusQuery } from "../modules/useGetOperationOrderStatusQuery";

interface ReservationDetailPageProps {
  params: { orderId: number };
}

const ReservationDetailPage: React.FC<ReservationDetailPageProps> = ({ params }) => {
  const { data: operationStatus } = useGetOperationOrderStatusQuery({ enabled: true, orderId: Number(params.orderId) });
  const router = useRouter();
  const orderInformation = useSelectorManageBooking((state) => state.order);
  const adminInfo = getAdminUserInformationStorage();

  const bookingOrder = useMemo(() => orderInformation?.bookingOrder, [orderInformation]);
  const couponAppliedList = useMemo(() => {
    return orderInformation?.fops.filter(
      (item) => item.type === EFopType.DISCOUNT_COUPON || item.type === EFopType.DISCOUNT_POLICY,
    );
  }, [orderInformation]);

  const isAllowEdit = useMemo(() => {
    if (adminInfo?.localUserType === "AGENT" || adminInfo?.localUserType === "AGENT_STAFF") {
      return operationStatus !== "HANDOVERED" && bookingOrder?.status === Status.OK;
    }
    return bookingOrder?.status === Status.OK;
  }, [operationStatus]);

  const allowDeleteOrder = useMemo(() => {
    return adminInfo?.localUserType === "ADMIN" && bookingOrder?.status === Status.OK;
  }, [adminInfo, bookingOrder]);

  const isBookingCanceled = bookingOrder?.status === Status.XX;

  if (!orderInformation || !bookingOrder) return null;

  return (
    <PageContainer
      name={`Chi tiết đặt chỗ #${params.orderId}`}
      modelName="Chi tiết booking"
      breadCrumItems={[
        { title: "Danh sách đặt chỗ", href: "/portal/manage-booking" },
        { title: `Chi tiết đặt chỗ #${params.orderId}` },
      ]}
      onBack={() => router.push("/portal/manage-booking")}
      hideAddButton
    >
      {isBookingCanceled ? null : (
        <Space>
          <CommentButton orderId={params.orderId} comments={orderInformation.comments} />
          <SplitBookingButton orderId={params.orderId} />
          {allowDeleteOrder ? <CancelBookingButton orderId={params.orderId} /> : null}
        </Space>
      )}
      <Divider />
      <OrderInformation
        sysFstUpdate={formatDate(bookingOrder.sysFstUpdate)}
        orderId={bookingOrder.recId}
        paymentStatus={bookingOrder.paymentStatus}
        orderStatus={bookingOrder.status}
        referenceId={bookingOrder.referenceId}
        agentId={bookingOrder.agentUserId}
        channel={bookingOrder.channel}
        sellableCode={bookingOrder.sellable.code}
        className="mb-6"
      />
      <div className="bg-gray-400/5 p-6 rounded-md">
        <TourBookingInfo
          startDate={formatDate(bookingOrder.sellable.startDate)}
          endDate={formatDate(bookingOrder.sellable.endDate)}
          sysFstUpdate={formatDate(bookingOrder?.sysFstUpdate)}
          name={bookingOrder.template.name}
          code={bookingOrder.template.code}
          sellableCode={bookingOrder.sellable.code}
          className="bg-gray-300/10  px-6 py-4 rounded-md mb-6"
        />
        <div className="h-6"></div>
        <Row gutter={[24, 24]}>
          <Col span={24} lg={12}>
            <CustomerInformation
              orderId={bookingOrder.recId}
              cusInfo={{
                custName: bookingOrder.custName,
                custEmail: bookingOrder.custEmail,
                custPhoneNumber: bookingOrder.custPhoneNumber,
                custAddress: bookingOrder.custAddress,
                rmk: bookingOrder.rmk,
              }}
              allowEdit={isAllowEdit}
            />
          </Col>
          <Col span={24} lg={12}>
            <InvoiceInformation
              orderId={bookingOrder?.recId}
              invoiceInfo={{
                invoiceAddress: bookingOrder?.invoiceAddress,
                invoiceCompanyName: bookingOrder?.invoiceCompanyName,
                invoiceEmail: bookingOrder?.invoiceEmail,
                invoiceName: bookingOrder?.invoiceName,
                invoiceTaxCode: bookingOrder?.invoiceTaxCode,
              }}
              allowEdit={isAllowEdit}
            />
          </Col>
        </Row>
      </div>
      <div className="h-12"></div>
      {bookingOrder?.paymentStatus === PaymentStatus.NOTPAID ? (
        <BookingTimeLimitation
          orderId={params.orderId}
          items={orderInformation?.rulesAndPolicies?.bookingTimelimits}
          isBookingCanceled={isBookingCanceled}
        />
      ) : null}

      <DepositTimeline
        depositTimelimits={orderInformation?.rulesAndPolicies?.depositTimelimits}
        paymentStatus={bookingOrder?.paymentStatus}
        className="mb-6"
      />
      {isBookingCanceled ? null : (
        <BookingOrderActions
          orderId={bookingOrder?.recId}
          sellableId={bookingOrder?.sellableId}
          totalAmount={bookingOrder?.totalAmount}
          totalPaid={bookingOrder?.totalPaid}
          paymentStatus={bookingOrder?.paymentStatus}
        />
      )}
      <Divider style={{ margin: "16px 0" }} />
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
        coupons={couponAppliedList}
        rulesAndPolicies={orderInformation?.rulesAndPolicies}
      />
      <Divider style={{ margin: "16px 0" }} />
      <div className="h-12"></div>
      <PassengerListContainer
        orderId={bookingOrder.recId}
        sellableId={bookingOrder.sellableId}
        passengers={orderInformation.passengers}
        tourBookings={orderInformation.tourBookings}
        isBookingCanceled={isBookingCanceled}
      />
      <Divider />
      <ServiceListContainer
        includedItems={orderInformation?.bookingOrder.sellableDetails}
        serviceList={orderInformation?.ssrBookings}
        sellableId={orderInformation?.bookingOrder.sellableId}
        passengerList={orderInformation?.passengers || []}
        orderId={params.orderId}
        channel={bookingOrder.channel}
        isBookingCanceled={isBookingCanceled}
      />
    </PageContainer>
  );
};
export default ReservationDetailPage;
