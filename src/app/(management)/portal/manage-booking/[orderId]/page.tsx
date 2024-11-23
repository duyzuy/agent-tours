"use client";
import React, { useCallback, useMemo, useState, useTransition } from "react";
import { Row, Col, Divider, Space, Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import PageContainer from "@/components/admin/PageContainer";
import useUpdateCustomerAndPassenger from "../modules/useUpdateCustomerAndPassenger";
import { formatDate } from "@/utils/date";
import { PaymentStatus } from "@/models/common.interface";

import { EFopPaymentType, EFopType } from "@/models/management/core/formOfPayment.interface";

import { IOrderDetail } from "@/models/management/booking/order.interface";
import { useSelectorManageBooking } from "./hooks/useManageBooking";
import FormItem from "@/components/base/FormItem";
import ModalCancelBookingConfirmation from "./_components/BookingOrderActions/ModalCanelBookingConfirmation";
import useCancelBookingOrder from "../modules/useCancelBookingOrder";
import { IBookingOrderCancelPayload } from "../modules/bookingOrder.interface";
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
import DrawerCommentContainer from "./_components/DrawerCommentContainer";
interface ReservationDetailPageProps {
  params: { orderId: number };
}

const ReservationDetailPage: React.FC<ReservationDetailPageProps> = ({ params }) => {
  const [isShowModalConfirm, setShowModalConfirm] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const router = useRouter();
  const orderInformation = useSelectorManageBooking((state) => state.order);

  const [isStartSplitBooking, startSplitBookingTransition] = useTransition();
  const { onUpdateCustomerInfo, onUpdatePassengerInfo } = useUpdateCustomerAndPassenger();

  const bookingOrder = useMemo(() => orderInformation?.bookingOrder, [orderInformation]);
  const passengerList = useMemo(() => {
    const { passengers, tourBookings } = orderInformation || {};

    return passengers?.reduce<
      (IOrderDetail["passengers"][number] & { tourItem?: IOrderDetail["tourBookings"][number] })[]
    >((acc, pax) => {
      const bookingItem = tourBookings?.find((item) => item.paxId === pax.recId);
      acc = [...acc, { ...pax, tourItem: bookingItem }];

      return acc;
    }, []);
  }, [orderInformation]);

  const fopListCoupon = useMemo(() => {
    return orderInformation?.fops.filter(
      (item) => item.type === EFopType.DISCOUNT_COUPON || item.type === EFopType.DISCOUNT_POLICY,
    );
  }, [orderInformation]);

  const onShowModalCancelBooking = useCallback(() => setShowModalConfirm(true), []);
  const onCloseModalCancelBooking = useCallback(() => setShowModalConfirm(false), []);

  // const bookingSSRList = useMemo(() => {
  //   return orderInformation?.ssrBookings.reduce<IOrderDetail["ssr"][0]["booking"][]>((acc, item) => {
  //     return (acc = [...acc, item.booking]);
  //   }, []);
  // }, [orderInformation]);

  const onSplitBooking = () => {
    startSplitBookingTransition(() => router.push(`/portal/manage-booking/${params.orderId}/split-booking`));
  };

  if (!orderInformation || !bookingOrder) return null;
  return (
    <PageContainer
      name={`Chi tiết đặt chỗ #${params.orderId}`}
      modelName="Chi tiết booking"
      breadCrumItems={[
        { title: "Danh sách đặt chỗ", href: "/portal/manage-booking" },
        { title: `Chi tiết đặt chỗ #${params.orderId}` },
      ]}
      onBack={router.back}
      // className="bg-slate-50 -m-6 p-6 pb-10 h-auto"
      hideAddButton
    >
      <Space>
        <Button
          type="text"
          className="!text-orange-600 !bg-orange-100 hover:!bg-orange-200"
          onClick={() => setShowComment(true)}
        >
          Ghi chú
        </Button>
        <Button
          type="text"
          className="!text-blue-600 !bg-blue-100 hover:!bg-blue-200"
          loading={isStartSplitBooking}
          onClick={onSplitBooking}
        >
          Tách đặt chỗ
        </Button>
        <Button
          type="text"
          className="!text-rose-700 !bg-rose-100 hover:!bg-rose-200"
          onClick={onShowModalCancelBooking}
        >
          Huỷ đặt chỗ
        </Button>
      </Space>
      <Divider />
      <OrderInformation
        sysFstUpdate={formatDate(bookingOrder.sysFstUpdate)}
        orderId={bookingOrder.recId}
        paymentStatus={bookingOrder.paymentStatus}
        referenceId={bookingOrder.referenceId}
        agentId={bookingOrder.agentUserId}
        channel={bookingOrder.channel}
        sellableCode={bookingOrder.sellable.code}
        className="mb-6"
      />
      <div className="bg-slate-50 p-6 rounded-md mb-6">
        <TourBookingInfo
          startDate={formatDate(bookingOrder.sellable.startDate)}
          endDate={formatDate(bookingOrder.sellable.endDate)}
          sysFstUpdate={formatDate(bookingOrder?.sysFstUpdate)}
          name={bookingOrder.template.name}
          code={bookingOrder.template.code}
          sellableCode={bookingOrder.sellable.code}
          className="mb-6"
        />
        <Row gutter={[24, 24]}>
          <Col span={24} md={12}>
            <CustomerInformation
              orderId={bookingOrder.recId}
              cusInfo={{
                custName: bookingOrder.custName,
                custEmail: bookingOrder.custEmail,
                custPhoneNumber: bookingOrder.custPhoneNumber,
                custAddress: bookingOrder.custAddress,
                rmk: bookingOrder.rmk,
              }}
              onSave={onUpdateCustomerInfo}
              className="bg-white border border-slate-100 px-6 py-4 h-full rounded-md"
            />
          </Col>
          <Col span={24} md={12}>
            <InvoiceInformation
              orderId={bookingOrder?.recId}
              invoiceInfo={{
                invoiceAddress: bookingOrder?.invoiceAddress,
                invoiceCompanyName: bookingOrder?.invoiceCompanyName,
                invoiceEmail: bookingOrder?.invoiceEmail,
                invoiceName: bookingOrder?.invoiceName,
                invoiceTaxCode: bookingOrder?.invoiceTaxCode,
              }}
              className="bg-white border border-slate-100 px-6 py-4 h-full rounded-md"
            />
          </Col>
        </Row>
      </div>

      {bookingOrder?.paymentStatus === PaymentStatus.NOTPAID ? (
        <BookingTimeLimitation orderId={params.orderId} items={orderInformation?.rulesAndPolicies?.bookingTimelimits} />
      ) : null}
      <DepositTimeline
        depositTimelimits={orderInformation?.rulesAndPolicies?.depositTimelimits}
        paymentStatus={bookingOrder?.paymentStatus}
      />

      <BookingOrderActions
        orderId={bookingOrder?.recId}
        sellableId={bookingOrder?.sellableId}
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

      <PassengerListContainer
        orderId={bookingOrder.recId}
        sellableId={bookingOrder.sellableId}
        items={passengerList || []}
        onSave={onUpdatePassengerInfo}
      />
      <Divider />
      <ServiceListContainer
        includedItems={orderInformation?.bookingOrder.sellableDetails}
        serviceList={orderInformation?.ssrBookings}
        sellableId={orderInformation?.bookingOrder.sellableId}
        passengerList={orderInformation?.passengers || []}
        orderId={params.orderId}
        className="mb-6"
      />
      <DrawerCommentContainer
        orderId={bookingOrder.recId}
        items={orderInformation.comments}
        isOpen={showComment}
        onClose={() => setShowComment(false)}
      />
      <ModalCancelBookingConfirmation
        orderId={bookingOrder.recId}
        isShowModal={isShowModalConfirm}
        title="Huỷ đặt chỗ!"
        descriptions="Bạn chắc chắn muốn huỷ đặt chỗ?"
        onCancel={onCloseModalCancelBooking}
      />
    </PageContainer>
  );
};
export default ReservationDetailPage;
