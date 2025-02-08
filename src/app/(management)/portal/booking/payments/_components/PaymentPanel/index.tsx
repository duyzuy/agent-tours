"use client";
import React, { memo, useEffect, useMemo, useState } from "react";
import { Button, Form } from "antd";
import { isUndefined } from "lodash";
import CustomerInformationForm from "./CustomerInformationForm";
import { HandleSubmit, useFormSubmit } from "@/hooks/useFormSubmit";
import { CustomerInformation } from "@/models/management/booking/customer.interface";
import { InvoiceFormData } from "@/models/management/booking/invoice.interface";
import { useAdminProfile } from "@/modules/admin/auth/store/AdminProfileContext";
import useCreateBooking from "../../../modules/useCreateBooking";
import { usePortalBookingManagerSelector } from "../../../context";
import { customerInformationSchema } from "../../../modules/validate.schema";
import InvoiceForm from "./InvoiceForm";

import AgentListSelector, { AgentListSelectorProps } from "./AgentListSelector";
import FormItem from "@/components/base/FormItem";
import { ESellChannel } from "@/constants/channel.constant";
import { useTransition } from "react";

const PaymentPanel = () => {
  const { bookingInfo, channel: sellChannel } = usePortalBookingManagerSelector((state) => state);
  const { createBooking } = useCreateBooking();
  const userProfile = useAdminProfile();
  const [submitting, startSubmitting] = useTransition();
  const [customerFormData, setCustomerFormData] = useState<CustomerInformation>(
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
  const [invoiceForm, setInvoiceForm] = useState(new InvoiceFormData("", "", "", "", ""));
  const [agentId, setAgentId] = useState<number>();

  const { handlerSubmit, errors } = useFormSubmit<CustomerInformation>({
    schema: customerInformationSchema,
  });

  const handleSubmitBooking: HandleSubmit<CustomerInformation> = (customerInfo) => {
    startSubmitting(() => {
      createBooking({ customerInfo, invoiceInfo: invoiceForm, agentUserId: agentId });
    });
  };

  const handleSelectAgent: AgentListSelectorProps["onSelect"] = (newAgent) => {
    setAgentId(newAgent.recId);
    setCustomerFormData((prev) => ({
      ...prev,
      custAddress: "",
      custEmail: newAgent.email,
      custName: newAgent.fullname,
      custPhoneNumber: newAgent.phoneNumber,
    }));
  };
  const isDisableSubmitButton = useMemo(() => {
    return isUndefined(customerFormData) || isUndefined(customerFormData.custEmail);
  }, [bookingInfo]);

  console.log(userProfile);
  useEffect(() => {
    setCustomerFormData((prev) => ({
      ...prev,
      custEmail: userProfile?.email,
      custName: userProfile?.fullname,
      custPhoneNumber: userProfile?.phoneNumber,
    }));
  }, [userProfile]);

  useEffect(() => {
    if (userProfile?.userType === "AGENT" || userProfile?.userType === "AGENT_STAFF") {
      setAgentId(userProfile?.recId);
    }
  }, [userProfile]);
  return (
    <>
      {sellChannel === ESellChannel.B2B ? (
        <Form layout="vertical">
          <FormItem label="Chọn Agent">
            <AgentListSelector
              value={agentId}
              onSelect={handleSelectAgent}
              disabled={userProfile?.userType === "AGENT" || userProfile?.userType === "AGENT_STAFF"}
            />
          </FormItem>
        </Form>
      ) : null}
      <CustomerInformationForm
        customerInformation={customerFormData}
        setCustomerInformation={setCustomerFormData}
        errors={errors}
      />
      <InvoiceForm values={invoiceForm} onSetValues={setInvoiceForm} />
      <div className="text-right">
        <Button
          size="large"
          type="primary"
          disabled={isDisableSubmitButton}
          onClick={() => handlerSubmit(customerFormData, handleSubmitBooking)}
          className="w-48"
          loading={submitting}
        >
          Đặt và giữ chỗ
        </Button>
      </div>
    </>
  );
};
export default memo(PaymentPanel);
