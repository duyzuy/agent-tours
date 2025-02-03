"use client";
import React, { memo, useEffect, useMemo, useState, useTransition } from "react";
import { Space, Button } from "antd";
import { useRouter } from "next/navigation";
import { isArray, isUndefined } from "lodash";
import CustomerInformationForm, { CustomerInformationFormProps } from "./CustomerInformationForm";

import { HandleSubmit, useFormSubmit } from "@/hooks/useFormSubmit";
import { CustomerInformation } from "@/models/management/booking/customer.interface";
import useCreateBooking from "../../../modules/useCreateBooking";
import useBooking from "../../../hooks/useBooking";
import { customerInformationSchema } from "../../../schema/customerInformation.schema";
import InvoiceForm from "./InvoiceForm";
import { InvoiceFormData } from "@/models/management/booking/invoice.interface";
import useAdminProfile from "@/modules/admin/auth/hooks/useAdminProfile";
import { ILocalUserMinimal } from "@/models/management/localUser.interface";

const PaymentPanel = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const [bookingInformation, _] = useBooking();
  const { createBooking } = useCreateBooking();
  const userProfile = useAdminProfile();

  const sellChannel = useMemo(() => {
    return bookingInformation.channel;
  }, []);

  const [customerInformation, setCustomerInformation] = useState<CustomerInformation>(
    () =>
      new CustomerInformation(
        userProfile?.infoLegalRepresentative,
        userProfile?.infoPhoneNumber,
        userProfile?.infoEmail,
        "",
        "",
        "",
      ),
  );
  const [invoiceInformation, setInvoiceInformation] = useState(new InvoiceFormData("", "", "", "", ""));
  const [agentInfo, setAgentInfo] = useState<ILocalUserMinimal>();

  const { handlerSubmit, errors } = useFormSubmit<CustomerInformation>({
    schema: customerInformationSchema,
  });

  const handleSubmitBooking: HandleSubmit<CustomerInformation> = (customerInfo) => {
    createBooking({ customerInfo, invoiceInfo: invoiceInformation, agentUserId: agentInfo?.recId });
  };

  const isDisableSubmitButton = useMemo(() => {
    return isUndefined(customerInformation) || isUndefined(customerInformation.custEmail);
  }, [bookingInformation]);

  const handleSelectAgent: CustomerInformationFormProps["onSelectAgent"] = (value, data) => {
    const userInfo = isArray(data) ? data[0] : data;
    setAgentInfo(userInfo);
    setCustomerInformation((prev) => ({
      ...prev,
      custAddress: "",
      custEmail: userInfo.email,
      custName: userInfo.fullname,
      custPhoneNumber: userInfo.phoneNumber,
    }));
  };

  useEffect(() => {
    if (bookingInformation.bookingInfo?.customerInformation) {
      const customerInfo = bookingInformation.bookingInfo?.customerInformation;

      setCustomerInformation((prev) => ({
        ...prev,
        custAddress: customerInfo.custAddress,
        custEmail: customerInfo.custEmail,
        custName: customerInfo.custName,
        custPhoneNumber: customerInfo.custPhoneNumber,
      }));
    }
  }, [bookingInformation]);
  return (
    <>
      <CustomerInformationForm
        customerInformation={customerInformation}
        setCustomerInformation={setCustomerInformation}
        onSelectAgent={handleSelectAgent}
        sellChannel={sellChannel}
        userAgentId={agentInfo?.recId}
        errors={errors}
      />
      <InvoiceForm values={invoiceInformation} onSetValues={setInvoiceInformation} />
      <div className="text-right">
        <Button
          size="large"
          type="primary"
          disabled={isDisableSubmitButton}
          onClick={() => handlerSubmit(customerInformation, handleSubmitBooking)}
          className="w-48"
        >
          Đặt và giữ chỗ
        </Button>
      </div>
    </>
  );
};
export default memo(PaymentPanel);
