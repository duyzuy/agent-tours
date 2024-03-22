"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isUndefined } from "lodash";
import PageContainer from "@/components/admin/PageContainer";
import { useGetBookingDetailCoreQuery } from "@/queries/core/bookingOrder";
import { Button, Spin, Input, Form } from "antd";
import BoxBookingTourItem, {
    BoxBookingTourItemProps,
} from "./_components/BoxBookingTourItem";
import { SplitBookingData } from "./modules/splitBooking.interface";
import CustomerInformationForm, {
    CustomerInformationFormProps,
} from "./_components/CustomerInformationForm";
import FormItem from "@/components/base/FormItem";
import useSplitBooking from "./modules/useSplitBooking";
import { HandleSubmit, useFormSubmit } from "@/hooks/useFormSubmit";
import { customerInformationSchema } from "./hooks/validate";
import useMessage from "@/hooks/useMessage";
interface SplitBookingPageProps {
    params: { orderId: number };
}
const SplitBookingPage: React.FC<SplitBookingPageProps> = ({ params }) => {
    const [bookingSplit, setBookingSplitItem] = useState(
        () =>
            new SplitBookingData(
                { recId: params.orderId, rmk3: "" },
                undefined,
            ),
    );
    const router = useRouter();
    const { onSplitBooking } = useSplitBooking();
    const { errors, handlerSubmit } = useFormSubmit<
        SplitBookingData["customerInfo"]
    >({
        schema: customerInformationSchema,
    });
    const { data: bookingOrderDetail, isLoading } =
        useGetBookingDetailCoreQuery({
            enabled: true,
            reservationId: params.orderId,
        });

    const message = useMessage();
    const onSelectItem: BoxBookingTourItemProps["onSelectItem"] = (item) => {
        setBookingSplitItem((oldData) => {
            let newItems = [...oldData.bookingDetails];
            const itemIndex = newItems.findIndex(
                (bkItem) => bkItem.booking.recId === item.booking.recId,
            );

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
    };
    const onChangeNote = (value: string) => {
        setBookingSplitItem((oldData) => ({
            ...oldData,
            bookingOrder: {
                ...oldData.bookingOrder,
                rmk3: value,
            },
        }));
    };
    const onChangeCustomerForm: CustomerInformationFormProps["onChangeForm"] = (
        key,
        value,
    ) => {
        setBookingSplitItem((oldData) => ({
            ...oldData,
            customerInfo: {
                ...oldData.customerInfo,
                [key]: value,
            },
        }));
    };

    const onSubmit: HandleSubmit<SplitBookingData["customerInfo"]> = (
        customerInfo,
    ) => {
        if (!bookingSplit.bookingOrder?.recId) {
            message.error("Thiếu Order ID.");
            return;
        }
        if (bookingSplit.bookingDetails.length === 0) {
            message.error("Vui lòng chọn hành khách.");
            return;
        }
        onSplitBooking(bookingSplit);
    };
    useEffect(() => {
        if (isUndefined(bookingOrderDetail) && !isLoading) {
            router.push("./portal/manage-booking");
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
                { title: "Quản lý booking", href: "./portal/manage-booking" },
                {
                    title: "Chi tiết booking",
                    href: "./portal/manage-booking/28",
                },
                { title: "Tách booking" },
            ]}
            onBack={() => router.push("./portal/manage-booking/order-list")}
            // className="bg-slate-50 -m-6 p-6 pb-10 h-auto"
            hideAddButton
        >
            <div className="split__booking relative">
                <div className="customer__info">
                    <CustomerInformationForm
                        onChangeForm={onChangeCustomerForm}
                        errors={errors}
                    />
                </div>
                <div className="split__booking-head mb-6">
                    <span className="font-[500] text-[16px]">
                        Chọn hành khách
                    </span>
                    <div className="block">
                        <p>
                            Lưu ý: Những hành khách được tách sẽ được tạo ở
                            booking mới và đi kèm các dịch vụ SSR đã mua trước
                            đó.
                        </p>
                    </div>
                </div>
                <BoxBookingTourItem
                    items={bookingOrderDetail.bookingDetails}
                    selectedItems={bookingSplit.bookingDetails}
                    onSelectItem={onSelectItem}
                    className="mb-6"
                />
                <div className="max-w-2xl">
                    <Form layout="vertical" component="div">
                        <FormItem label="Ghi chú">
                            <Input.TextArea
                                onChange={(evt) =>
                                    onChangeNote(evt.target.value)
                                }
                            ></Input.TextArea>
                        </FormItem>
                    </Form>
                </div>
                <div className="split__booking-actions py-6  mt-6 sticky bottom-0 bg-white">
                    <Button
                        type="primary"
                        size="large"
                        className="w-40"
                        onClick={() =>
                            handlerSubmit(
                                bookingSplit["customerInfo"],
                                onSubmit,
                            )
                        }
                    >
                        Xác nhận
                    </Button>
                </div>
            </div>
        </PageContainer>
    );
};
export default SplitBookingPage;
