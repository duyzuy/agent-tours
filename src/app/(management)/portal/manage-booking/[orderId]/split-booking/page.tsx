"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { isUndefined } from "lodash";
import PageContainer from "@/components/admin/PageContainer";
import { useGetBookingDetailCoreQuery } from "@/queries/core/bookingOrder";
import { Button, Spin, Input, Form, Radio, Space } from "antd";
import PassengerDetailList, { PassengerDetailListProps } from "./_components/PassengerDetailList";
import { SplitBookingFormData } from "./modules/splitBooking.interface";
import CustomerInformationForm, { CustomerInformationFormProps } from "./_components/CustomerInformationForm";
import FormItem from "@/components/base/FormItem";
import useSplitBooking from "./modules/useSplitBooking";
import { HandleSubmit, useFormSubmit } from "@/hooks/useFormSubmit";
import { customerInformationSchema, invoiceSchema } from "./hooks/validate";
import useMessage from "@/hooks/useMessage";
import InvoiceForm, { InvoiceFormProps } from "./_components/InvoiceForm";
import SplitFeeForm, { SplitFeeFormProps } from "./_components/SplitFeeForm";

import useSplitBookingProvider from "./hooks/useSplitBookingProvider";
interface SplitBookingPageProps {
  params: { orderId: number };
}
const SplitBookingPage: React.FC<SplitBookingPageProps> = ({ params }) => {
  const [bookingSplit, setBookingSplit] = useSplitBookingProvider();

  const customerInfo = useMemo(() => {
    return bookingSplit.customerInfo;
  }, [bookingSplit.customerInfo]);

  const invoiceInfo = useMemo(() => {
    return bookingSplit.invoiceInfo;
  }, [bookingSplit.invoiceInfo]);

  const fop = useMemo(() => {
    return bookingSplit.bookingOrder.fop;
  }, [bookingSplit.bookingOrder]);

  const router = useRouter();
  const { onSplitBooking } = useSplitBooking();

  const { data: bookingOrderDetail, isLoading } = useGetBookingDetailCoreQuery({
    enabled: true,
    reservationId: params.orderId,
  });
  const message = useMessage();
  const { errors: customerErrors, handlerSubmit } = useFormSubmit<Required<SplitBookingFormData>["customerInfo"]>({
    schema: customerInformationSchema,
  });

  const { errors: invoiceErrors, handlerSubmit: handleSubmitInvoiceForm } = useFormSubmit<
    Required<SplitBookingFormData>["invoiceInfo"]
  >({
    schema: invoiceSchema,
  });

  const [splitType, setSplitType] = useState<SplitFeeFormProps["splitType"]>("SplitToOnce");

  const onSelectItem = useCallback<PassengerDetailListProps["onSelectItem"]>((item) => {
    setBookingSplit((oldData) => {
      let newItems = [...oldData.bookingDetails];
      const itemIndex = newItems.findIndex((bkItem) => bkItem.booking.recId === item.booking.recId);
      if (itemIndex !== -1) {
        newItems.splice(itemIndex, 1);
      } else {
        newItems = [...newItems, item];
      }
      return {
        ...oldData,
        bookingDetails: [...newItems],
      };
    });
  }, []);
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

  useEffect(() => {
    setBookingSplit((oldData) => ({
      ...oldData,
      bookingOrder: {
        ...oldData.bookingOrder,
        recId: params.orderId,
      },
    }));
  }, []);
  const onChangeSplitCharge = useCallback<SplitFeeFormProps["onChange"]>((fopType, { key, value }) => {
    setBookingSplit((oldData) => {
      let newFops = oldData.bookingOrder.fop;

      const fopIndex = oldData.bookingOrder.fop.findIndex((item) => item.type === fopType);

      if (fopIndex !== -1) {
        newFops.splice(fopIndex, 1, {
          ...newFops[fopIndex],
          [key]: value,
        });
      } else {
        let item = { amount: 0, rmk: "" };
        if (key === "amount" && !isNaN(Number(value))) {
          value = Number(value);
          item = {
            rmk: "",
            amount: value,
          };
        }
        if (key === "rmk") {
          value = value.toString();
          item = {
            rmk: value,
            amount: 0,
          };
        }
        newFops = [...newFops, { type: fopType, ...item }];
      }

      return {
        ...oldData,
        bookingOrder: {
          ...oldData.bookingOrder,
          fop: newFops,
        },
      };
    });
  }, []);
  const onSubmit: HandleSubmit<SplitBookingFormData["customerInfo"]> = (customerInfo) => {
    if (!bookingSplit.bookingOrder?.recId) {
      message.error("Thiếu Order ID.");
      return;
    }
    if (bookingSplit.bookingDetails.length === 0) {
      message.error("Vui lòng chọn hành khách.");
      return;
    }

    console.log(bookingSplit);
    onSplitBooking(splitType, bookingSplit, () => {});
  };

  const onChangeSplitType = (type: SplitFeeFormProps["splitType"]) => setSplitType(type);
  useEffect(() => {
    if (isUndefined(bookingOrderDetail) && !isLoading) {
      router.push("/portal/manage-booking");
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
          title: "Chi tiết booking",
          href: `/portal/manage-booking/${params.orderId}`,
        },
        { title: "Tách booking" },
      ]}
      onBack={() => router.push(`/portal/manage-booking/${params.orderId}`)}
      // className="bg-slate-50 -m-6 p-6 pb-10 h-auto"
      hideAddButton
    >
      <div className="split__booking relative">
        <CustomerInformationForm value={customerInfo} onChangeForm={onChangeCustomerForm} errors={customerErrors} />
        <InvoiceForm value={invoiceInfo} onChangeForm={onChangeInvoiceForm} errors={invoiceErrors} />
        <SplitFeeForm
          value={fop}
          onChange={onChangeSplitCharge}
          splitType={splitType}
          onChangeSplitType={onChangeSplitType}
          className="max-w-2xl"
        />
        <div className="split__booking-head mb-6">
          <span className="font-[500] text-[16px]">Chọn hành khách</span>
          <div className="block">
            <p>
              Lưu ý: Những hành khách được tách sẽ được tạo ở booking mới và đi kèm các dịch vụ SSR đã mua trước đó.
            </p>
          </div>
        </div>

        <PassengerDetailList
          items={bookingOrderDetail.bookingDetails}
          selectedItems={bookingSplit.bookingDetails}
          onSelectItem={onSelectItem}
          className="mb-6 max-w-6xl"
        />
        <div className="max-w-2xl">
          <Form layout="vertical" component="div">
            <FormItem label="Ghi chú">
              <Input.TextArea onChange={(evt) => onChangeNote(evt.target.value)}></Input.TextArea>
            </FormItem>
          </Form>
        </div>

        <div className="split__booking-actions py-6  mt-6 sticky bottom-0 bg-white">
          <Button
            type="primary"
            size="large"
            className="w-40"
            onClick={() => handlerSubmit(bookingSplit["customerInfo"], onSubmit)}
          >
            Xác nhận
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};
export default SplitBookingPage;
