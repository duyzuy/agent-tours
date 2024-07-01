"use client";
import React, { memo } from "react";
import { Button, Divider, Input, Space } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import CustomerInformationForm from "./_components/CustomerInformationForm";
import InvoiceForm from "./_components/InvoiceForm";
import CouponForm from "./_components/CouponForm";
import { yupResolver } from "@hookform/resolvers/yup";

import {
    FeCustomerInformationFormData,
    FeInvoiceFormData,
    IPaymentInformation,
} from "./modules/payment.interface";
import { paymentSchema } from "./schema/payment.schema";
import PaymentMethod from "./_components/PaymentMethod";
import useCreateBooking from "../modules/useCreateBooking";
import PolicyContent from "./_components/PolicyContent";
const PaymentPage = () => {
    const initCustomerInformation = new FeCustomerInformationFormData(
        "",
        "",
        "",
        "",
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
        createBooking(data);
    };
    return (
        <>
            <div className="payment-page bg-white rounded-md">
                <div className="payment-page-head px-6 py-4">
                    <h1 className="text-xl font-[500]">Thanh toán</h1>
                </div>
                <CustomerInformationForm
                    control={control}
                    className="bg-white px-6"
                />
                <InvoiceForm className="px-6" control={control} />
                <div className="payment-page-body">
                    <div className="customer-form"></div>
                    <div className="payment__methods bg-white mb-6 rounded-md">
                        <div className="payment__methods-head px-6 py-3">
                            <span className="font-[500] text-base">
                                Phương thức thanh toán
                            </span>
                        </div>
                        <CouponForm />
                        <PaymentMethod />
                    </div>
                </div>
            </div>
            <PolicyContent />
            <div className="text-right">
                <Space align="end">
                    <Button
                        type="primary"
                        size="large"
                        className="w-[180px]"
                        onClick={() => {}}
                        ghost
                    >
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
export default PaymentPage;
