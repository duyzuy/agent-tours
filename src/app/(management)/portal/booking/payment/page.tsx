"use client";
import React, { useEffect, useMemo, useState, useTransition } from "react";
import { Breadcrumb, Col, Row, Select } from "antd";
import useBooking from "../hooks/useBooking";
import { useRouter } from "next/navigation";
import { isArray, isUndefined } from "lodash";
import useCreateBooking from "../modules/useCreateBooking";
import CustomerInformationForm, { CustomerInformationFormProps } from "./_components/CustomerInformationForm";
import { Space, Button } from "antd";
import { HandleSubmit, useFormSubmit } from "@/hooks/useFormSubmit";
import { CustomerInformation } from "@/models/management/booking/customer.interface";
import { customerInformationSchema } from "../schema/customerInformation.schema";
import BookingSummary from "../_components/BookingSummary";

import PaymentMethod from "./_components/PaymentMethod";
import InvoiceForm from "./_components/InvoiceForm";
import { InvoiceFormData } from "@/models/management/booking/invoice.interface";
import useLocalUserProfile from "@/hooks/useLocalProfile";

import { ILocalUserMinimal } from "@/models/management/localUser.interface";

const PaymentPage = () => {
  const [bookingInformation, setBookingInfomation] = useBooking();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { createBooking } = useCreateBooking();
  const userProfile = useLocalUserProfile();
  const sellChannel = useMemo(() => {
    return bookingInformation.channel;
  }, []);
  console.log(sellChannel);
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
    invoiceInformation;
    createBooking({ customerInfo, invoiceInfo: invoiceInformation, agentUserId: agentInfo?.recId });
  };

  const isDisableNextAction = useMemo(() => {
    return isUndefined(customerInformation) || isUndefined(customerInformation.custEmail);
  }, [bookingInformation]);

  const goToBuyService = () => {
    startTransition(() => {
      router.push("/portal/booking/tour-services");
    });
  };

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
  // console.log(bookingInformation);
  // useEffect(() => {
  //     if (
  //         isUndefined(bookingInformation?.bookingInfo?.product) ||
  //         isUndefined(bookingInformation?.bookingInfo?.bookingItems) ||
  //         !bookingInformation?.bookingInfo?.bookingItems.length
  //     ) {
  //         router.push("./portal/booking");
  //     }
  // }, [bookingInformation]);

  return (
    <div className="payment__page bg-slate-50 -mx-6 -my-6 p-6 min-h-full mb-8">
      <div className="max-w-6xl mx-auto">
        <Breadcrumb
          items={[
            {
              title: "Chọn tour",
            },
            {
              title: "Thông tin người đặt",
            },
          ]}
        />
        <div className="h-4"></div>
        <div className="payment__customer">
          <Row gutter={32}>
            <Col span={15}>
              <CustomerInformationForm
                customerInformation={customerInformation}
                setCustomerInformation={setCustomerInformation}
                onSelectAgent={handleSelectAgent}
                sellChannel={sellChannel}
                userAgentId={agentInfo?.recId}
                errors={errors}
                className="bg-white rounded-md drop-shadow-sm mb-6"
              />
              <InvoiceForm
                className="bg-white rounded-md drop-shadow-sm mb-6"
                values={invoiceInformation}
                onSetValues={setInvoiceInformation}
              />
              <PaymentMethod />
              <div className="text-right">
                <Space align="end">
                  <Button
                    type="primary"
                    ghost
                    disabled={isDisableNextAction}
                    onClick={goToBuyService}
                    loading={isPending}
                  >
                    Mua thêm dịch vụ
                  </Button>
                  <Button
                    type="primary"
                    disabled={isDisableNextAction}
                    onClick={() => handlerSubmit(customerInformation, handleSubmitBooking)}
                  >
                    Đặt và giữ chỗ
                  </Button>
                </Space>
              </div>
            </Col>
            <Col span={9}>
              <BookingSummary label="Chi tiết giá tour" />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};
export default PaymentPage;
