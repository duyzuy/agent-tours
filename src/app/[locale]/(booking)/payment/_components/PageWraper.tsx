"use client";
import { Button, Divider, Input, Space } from "antd";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";

import PaymentMethod from "./PaymentMethod";
import PolicyContent from "./PolicyContent";
import { useUserSelector } from "@/store";
import { useRouter } from "@/utils/navigation";
import useCreateBooking from "@/modules/fe/booking/payment/useCreateBooking";
import { paymentSchema } from "@/modules/fe/booking/payment/payment.schema";
import InvoiceForm from "@/components/frontend/booking/InvoiceForm";
import CustomerInformationForm from "@/components/frontend/booking/CustomerInformationForm";
import CouponForm from "./CouponForm";
import {
  FeCustomerInformationFormData,
  FeInvoiceFormData,
  IPaymentInformation,
} from "@/modules/fe/booking/payment/payment.interface";

interface PageWraperProps {
  session: Session | null;
}
const PageWraper: React.FC<PageWraperProps> = ({ session }) => {
  const userProfile = useUserSelector((state) => state.profile);
  const router = useRouter();
  const initCustomerInformation = new FeCustomerInformationFormData(
    userProfile?.fullname,
    userProfile?.user.phoneNumber,
    userProfile?.user.email,
    userProfile?.address,
    "",
    "",
  );
  const initInvoiceData = new FeInvoiceFormData("", "", "", "", "");
  const session2 = useSession();
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(paymentSchema),
    defaultValues: {
      customerInformation: initCustomerInformation,
      invoice: initInvoiceData,
    },
  });
  const { createBooking, isPending } = useCreateBooking();

  const handleSubmitForm: SubmitHandler<IPaymentInformation> = (data) => {
    createBooking(data, session);
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
};
export default PageWraper;
