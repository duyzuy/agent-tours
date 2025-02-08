"use client";
import React, { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { isUndefined } from "lodash";
import PageContainer from "@/components/admin/PageContainer";
import { useGetBookingDetailCoreQuery } from "@/queries/core/bookingOrder";
import { Button, Spin, Input, Form, Divider } from "antd";
import { ISplitBookingPayload, SplitBookingFormData } from "./modules/splitBooking.interface";
import CustomerInformationForm, { CustomerInformationFormProps } from "./_components/CustomerInformationForm";
import FormItem from "@/components/base/FormItem";

import { HandleSubmit, useFormSubmit } from "@/hooks/useFormSubmit";
import { customerInformationSchema, invoiceSchema } from "./modules/validate";
import useMessage from "@/hooks/useMessage";
import InvoiceForm, { InvoiceFormProps } from "./_components/InvoiceForm";
import FeeForm, { FeeFormProps } from "./_components/FeeForm";

import { useSplitBooking } from "./context";
import { useSplitTwoNewBooking } from "./modules/useSplitTwoNewBooking";
import PassengerSelectorList from "./_components/PassengerSelectorList";
interface SplitBookingPageProps {
  params: { orderId: number };
}

const SplitBookingPage: React.FC<SplitBookingPageProps> = ({ params }) => {
  const { data: bookingOrderDetail, isLoading } = useGetBookingDetailCoreQuery({
    enabled: true,
    reservationId: params.orderId,
  });

  const { mutate: splitBooking, isPending } = useSplitTwoNewBooking();

  const [bookingSplit, setBookingSplit] = useSplitBooking();

  const router = useRouter();
  const message = useMessage();

  const { errors: customerErrors, handlerSubmit } = useFormSubmit<Required<SplitBookingFormData>["customerInfo"]>({
    schema: customerInformationSchema,
  });

  const { errors: invoiceErrors, handlerSubmit: handleSubmitInvoiceForm } = useFormSubmit<
    Required<SplitBookingFormData>["invoiceInfo"]
  >({
    schema: invoiceSchema,
  });

  const onChangeNote = (note: string) => {
    setBookingSplit((oldData) => ({
      ...oldData,
      bookingOrder: {
        ...oldData.bookingOrder,
        rmk3: note,
      },
    }));
  };
  const onChangeCustomerForm = useCallback<Required<CustomerInformationFormProps>["onChangeForm"]>((key, value) => {
    setBookingSplit((oldData) => ({
      ...oldData,
      customerInfo: {
        ...oldData.customerInfo,
        [key]: value,
      },
    }));
  }, []);

  const onChangeInvoiceForm = useCallback<Required<InvoiceFormProps>["onChangeForm"]>((key, value) => {
    setBookingSplit((oldData) => ({
      ...oldData,
      invoiceInfo: {
        ...oldData.invoiceInfo,
        [key]: value,
      },
    }));
  }, []);

  const onSubmit: HandleSubmit<SplitBookingFormData["customerInfo"]> = () => {
    if (!bookingSplit.bookingOrder?.recId) {
      message.error("Thiếu Order ID.");
      return;
    }
    if (bookingSplit.bookingDetails.length === 0) {
      message.error("Vui lòng chọn hành khách.");
      return;
    }

    const { bookingOrder, bookingDetails, customerInfo, invoiceInfo } = bookingSplit;

    const correctBookingDetails = bookingDetails.reduce<ISplitBookingPayload["bookingDetails"]>(
      (acc, { recId }) => [
        ...acc,
        {
          booking: {
            recId: recId,
          },
        },
      ],
      [],
    );
    const payload: ISplitBookingPayload = {
      bookingOrder: {
        recId: bookingOrder?.recId,
        rmk3: bookingOrder?.rmk3,
        fops: bookingOrder?.fops || [],
      },
      custAddress: customerInfo?.custAddress,
      custEmail: customerInfo?.custEmail,
      custName: customerInfo?.custName,
      custPhoneNumber: customerInfo?.custPhoneNumber,
      invoiceAddress: invoiceInfo?.invoiceAddress,
      invoiceCompanyName: invoiceInfo?.invoiceCompanyName,
      invoiceEmail: invoiceInfo?.invoiceEmail,
      invoiceName: invoiceInfo?.invoiceName,
      invoiceTaxCode: invoiceInfo?.invoiceTaxCode,
      bookingDetails: correctBookingDetails,
    };

    splitBooking(payload, {
      onSuccess(data, variables, context) {
        router.push("/portal/manage-booking/order-list");
      },
    });
  };

  useEffect(() => {
    setBookingSplit((oldData) => ({
      ...oldData,
      bookingOrder: {
        ...oldData.bookingOrder,
        recId: params.orderId,
      },
    }));
  }, []);
  useEffect(() => {
    if (isUndefined(bookingOrderDetail) && !isLoading) {
      router.push("/portal/manage-booking/order-list");
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
      name="Tách booking"
      modelName="Tách booking"
      breadCrumItems={[
        { title: "Quản lý booking", href: "/portal/manage-booking" },
        {
          title: `#${params.orderId}`,
          href: `/portal/manage-booking/${params.orderId}`,
        },
        { title: "Tách booking" },
      ]}
      onBack={() => router.back()}
      // className="bg-slate-50 -m-6 p-6 pb-10 h-auto"
      hideAddButton
    >
      <div className="split__booking-head mb-6">
        <h3 className="font-[500] text-[16px]">Chọn hành khách</h3>
        <p>Lưu ý: Những hành khách được tách sẽ được tạo ở booking mới và đi kèm các dịch vụ SSR đã mua trước đó.</p>
      </div>

      <PassengerSelectorList
        passengers={bookingOrderDetail.passengers}
        tourBookings={bookingOrderDetail.tourBookings}
      />
      <Divider />
      <CustomerInformationForm
        value={bookingSplit.customerInfo}
        onChangeForm={onChangeCustomerForm}
        errors={customerErrors}
        className="max-w-2xl"
      />
      <InvoiceForm
        value={bookingSplit.invoiceInfo}
        onChangeForm={onChangeInvoiceForm}
        errors={invoiceErrors}
        className="max-w-2xl"
      />
      <FeeForm className="max-w-2xl" />
      <Divider />
      <div className="max-w-2xl">
        <Form layout="vertical" component="div">
          <FormItem label="Ghi chú">
            <Input.TextArea onChange={(evt) => onChangeNote(evt.target.value)}></Input.TextArea>
          </FormItem>
        </Form>
      </div>

      <Button
        type="primary"
        size="large"
        className="w-40"
        onClick={() => handlerSubmit(bookingSplit["customerInfo"], onSubmit)}
        loading={isPending}
      >
        Xác nhận
      </Button>
    </PageContainer>
  );
};
export default SplitBookingPage;
