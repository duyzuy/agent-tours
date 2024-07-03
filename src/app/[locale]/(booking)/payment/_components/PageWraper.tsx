"use client";
import { Button, Divider, Input, Space } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import CustomerInformationForm from "./CustomerInformationForm";
import InvoiceForm from "./InvoiceForm";
import CouponForm from "./CouponForm";
import { yupResolver } from "@hookform/resolvers/yup";

import {
    FeCustomerInformationFormData,
    FeInvoiceFormData,
    IPaymentInformation,
} from "../modules/payment.interface";
import { paymentSchema } from "../schema/payment.schema";
import PaymentMethod from "./PaymentMethod";
import useCreateBooking from "../../modules/useCreateBooking";
import PolicyContent from "./PolicyContent";
import { Session } from "next-auth";
import { useTransition } from "react";

interface PageWraperProps {
    session: Session | null;
}
const PageWraper: React.FC<PageWraperProps> = ({ session }) => {
    const [isPending, startTransition] = useTransition();
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
    const { createBooking } = useCreateBooking();

    const handleSubmitForm: SubmitHandler<IPaymentInformation> = (data) => {
        startTransition(() => {
            createBooking(data, session);
        });
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
export default PageWraper;
