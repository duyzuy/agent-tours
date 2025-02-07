"use client";
import { Button, Form, Input, Space } from "antd";
import classNames from "classnames";
import React, { useEffect, useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { InvoinceFormData } from "@/modules/fe/manageBooking/manageBooking.type";
import FormItem from "antd/es/form/FormItem";
import { EditOutlined } from "@ant-design/icons";
import { invoiceSchema } from "@/modules/fe/manageBooking/validate.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { isEqual } from "lodash";
import { useUpdateInvoice } from "@/modules/fe/manageBooking/hooks/useUpdateInvoice";
import { useRouter } from "next/navigation";
export interface InvoiceBoxProps {
  bookingOrderId: number;
  title?: string;
  invoiceName: BoxInvoiceInfoProps["invoiceName"];
  invoiceCompanyName: BoxInvoiceInfoProps["invoiceCompanyName"];
  invoiceAddress: BoxInvoiceInfoProps["invoiceAddress"];
  invoiceTaxCode: BoxInvoiceInfoProps["invoiceTaxCode"];
  invoiceEmail: BoxInvoiceInfoProps["invoiceEmail"];
  className?: string;
  allowEdit?: boolean;
}

const InvoiceBox: React.FC<InvoiceBoxProps> = ({
  bookingOrderId,
  title,
  invoiceName,
  invoiceCompanyName,
  invoiceAddress,
  invoiceTaxCode,
  invoiceEmail,
  allowEdit,
  className = "",
}) => {
  const initFormData = new InvoinceFormData(
    bookingOrderId,
    invoiceName,
    invoiceCompanyName,
    invoiceAddress,
    invoiceTaxCode,
    invoiceEmail,
  );
  const { mutate: updateContact, isPending } = useUpdateInvoice();
  const [isEdit, setIsEdit] = useState(false);
  const router = useRouter();
  const { handleSubmit, control, reset, getValues, watch } = useForm<InvoinceFormData>({
    defaultValues: { ...initFormData },
    resolver: yupResolver(invoiceSchema),
  });

  const handleCancelEdit = () => {
    setIsEdit(false);
    reset();
  };

  const submitForm: SubmitHandler<InvoinceFormData> = (data) => {
    updateContact(
      { bookingOrder: { ...data, recId: bookingOrderId } },
      {
        onSuccess(data, variables, context) {
          setIsEdit(false);
          reset();
          router.refresh();
        },
      },
    );
  };

  const isDisabledButton = useMemo(() => {
    const formValue = getValues();
    return isEqual(
      {
        invoiceAddress: formValue.invoiceAddress,
        invoiceCompanyName: formValue.invoiceCompanyName,
        invoiceEmail: formValue.invoiceEmail,
        invoiceName: formValue.invoiceName,
        invoiceTaxCode: formValue.invoiceTaxCode,
      },
      {
        invoiceAddress,
        invoiceCompanyName,
        invoiceEmail,
        invoiceName,
        invoiceTaxCode,
      },
    );
  }, [watch()]);
  return (
    <div
      className={classNames("customer-info border-b mb-3 pb-3", {
        [className]: className,
      })}
    >
      <div className="flex gap-x-2">
        <h3 className="font-[500] text-[16px] mb-3">{title}</h3>
        {allowEdit ? (
          <Button
            type="text"
            shape="circle"
            size="small"
            icon={<EditOutlined />}
            onClick={() => setIsEdit((prev) => !prev)}
          />
        ) : null}
      </div>
      {isEdit && allowEdit ? (
        <Form layout="vertical" disabled={isPending}>
          <div className="grid grid-cols-2 gap-x-3 lg:gap-x-6">
            <Controller
              control={control}
              name="invoiceName"
              render={({ field, fieldState: { error } }) => (
                <FormItem label="Họ và tên" validateStatus={error?.message ? "error" : undefined} help={error?.message}>
                  <Input {...field} placeholder="Họ và tên" />
                </FormItem>
              )}
            />
            <Controller
              control={control}
              name="invoiceCompanyName"
              render={({ field, fieldState: { error } }) => (
                <FormItem
                  label="Tên công ty"
                  validateStatus={error?.message ? "error" : undefined}
                  help={error?.message}
                >
                  <Input {...field} placeholder="Tên công ty" />
                </FormItem>
              )}
            />
            <Controller
              control={control}
              name="invoiceTaxCode"
              render={({ field, fieldState: { error } }) => (
                <FormItem
                  label="Mã số thuế"
                  validateStatus={error?.message ? "error" : undefined}
                  help={error?.message}
                >
                  <Input {...field} placeholder="Mã số thuế" />
                </FormItem>
              )}
            />
            <Controller
              control={control}
              name="invoiceEmail"
              render={({ field, fieldState: { error } }) => (
                <FormItem label="Email" validateStatus={error?.message ? "error" : undefined} help={error?.message}>
                  <Input {...field} placeholder="Email" />
                </FormItem>
              )}
            />
            <Controller
              control={control}
              name="invoiceAddress"
              render={({ field, fieldState: { error } }) => (
                <FormItem
                  label="Địa chỉ"
                  validateStatus={error?.message ? "error" : undefined}
                  help={error?.message}
                  className="col-span-2"
                >
                  <Input.TextArea {...field} placeholder="Địa chỉ" />
                </FormItem>
              )}
            />
          </div>
          <Space>
            <Button
              type="primary"
              size="large"
              className="w-28"
              onClick={handleSubmit(submitForm)}
              disabled={isDisabledButton}
              loading={isPending}
            >
              Lưu
            </Button>
            <Button size="large" className="w-28" onClick={handleCancelEdit}>
              Huỷ
            </Button>
          </Space>
        </Form>
      ) : (
        <BoxInvoiceInfo
          invoiceName={invoiceName}
          invoiceCompanyName={invoiceCompanyName}
          invoiceAddress={invoiceAddress}
          invoiceTaxCode={invoiceTaxCode}
          invoiceEmail={invoiceEmail}
        />
      )}
    </div>
  );
};

export default InvoiceBox;

interface BoxInvoiceInfoProps {
  invoiceName: string;
  invoiceCompanyName: string;
  invoiceAddress: string;
  invoiceTaxCode: string;
  invoiceEmail: string;
}
const BoxInvoiceInfo: React.FC<BoxInvoiceInfoProps> = ({
  invoiceName,
  invoiceCompanyName,
  invoiceAddress,
  invoiceTaxCode,
  invoiceEmail,
}) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div>
        <div className="text-xs">Họ và tên</div>
        <div>{invoiceName || "--"}</div>
      </div>
      <div>
        <div className="text-xs">Tên công ty</div>
        <div>{invoiceCompanyName || "--"}</div>
      </div>
      <div>
        <div className="text-xs">Địa chỉ</div>
        <div>{invoiceAddress || "--"}</div>
      </div>
      <div>
        <div className="text-xs">Số điện thoại</div>
        <div>{invoiceTaxCode || "--"}</div>
      </div>
      <div>
        <div className="text-xs">Email</div>
        <div>{invoiceEmail || "--"}</div>
      </div>
    </div>
  );
};
