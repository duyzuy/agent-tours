"use client";
import React, { memo } from "react";
import { Button, Divider, Space } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { useBookingSelector, useUserSelector } from "@/store";
import { useRouter } from "@/utils/navigation";
import useCreateBooking from "@/modules/fe/booking/payment/useCreateBooking";
import { paymentSchema } from "@/modules/fe/booking/payment/payment.schema";
import InvoiceForm from "@/components/frontend/booking/InvoiceForm";
import CustomerInformationForm from "@/components/frontend/booking/CustomerInformationForm";
import PaymentMethod from "./_components/PaymentMethod";
import PolicyContent from "./_components/PolicyContent";
import CouponForm from "./_components/CouponForm";
import {
  FeCustomerInformationFormData,
  FeInvoiceFormData,
  IPaymentInformation,
} from "@/modules/fe/booking/payment/payment.interface";
import { LangCode } from "@/models/management/cms/language.interface";
import { getAccessToken } from "@/utils/common";

interface Props {
  params: { locale: LangCode };
}
export default function PaymentPage({ params: { locale } }: Props) {
  const accessToken = getAccessToken();
  const userProfile = useUserSelector();
  const {
    bookingInfo: { product },
  } = useBookingSelector();

  const router = useRouter();
  const initCustomerInformation = new FeCustomerInformationFormData(
    userProfile?.profile?.fullname,
    userProfile?.profile?.user.phoneNumber,
    userProfile?.profile?.user.email,
    userProfile?.profile?.address,
    "",
    "",
  );
  const initInvoiceData = new FeInvoiceFormData("", "", "", "", "");

  const { handleSubmit, control } = useForm({
    resolver: yupResolver(paymentSchema),
    defaultValues: {
      customerInformation: initCustomerInformation,
      invoice: initInvoiceData,
    },
  });
  const { createBooking, isPending } = useCreateBooking();

  const handleSubmitForm: SubmitHandler<IPaymentInformation> = (data) => {
    createBooking(data, accessToken);
  };

  return (
    <>
      <div className="payment-page bg-white rounded-md mb-6">
        <div className="payment-page-head px-3 lg:px-6 py-4">
          <h1 className="text-xl font-[500]">Thanh toán</h1>
          <p>Quý khách vui lòng nhập đầy đủ thông tin và thực hiện thanh toán.</p>
        </div>
        <CustomerInformationForm control={control} disabled={isPending} className="px-3 lg:px-6" />
        <InvoiceForm className="px-3 lg:px-6" control={control} />
        <Divider />
        <CouponForm className="px-3 lg:px-6" />
        <Divider />
        <PaymentMethod className="px-3 lg:px-6" />
      </div>
      <PolicyContent />
      <div className="text-right">
        <Space align="end">
          <Button type="primary" size="large" className="w-[180px]" onClick={() => router.push("/passenger")} ghost>
            Quay lại
          </Button>
          <Button
            type="primary"
            size="large"
            className="w-[180px]"
            loading={isPending}
            onClick={handleSubmit(handleSubmitForm)}
          >
            Thanh toán
          </Button>
        </Space>
      </div>
    </>
  );
}
