"use client";
import { Button, Form, Input, Space } from "antd";
import classNames from "classnames";
import React, { useEffect, useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { CustomerContactInformationFormData } from "@/modules/fe/manageBooking/manageBooking.type";
import FormItem from "antd/es/form/FormItem";
import { EditOutlined } from "@ant-design/icons";
import { contactInformationSchema } from "@/modules/fe/manageBooking/validate.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { isEqual } from "lodash";
import { useUpdateContactInformation } from "@/modules/fe/manageBooking/hooks/useUpdateContactInformation";
import { useRouter } from "next/navigation";
export interface ContactInformationBoxProps {
  bookingOrderId: number;
  custName: BoxContactInformationProps["custAddress"];
  custEmail: BoxContactInformationProps["custEmail"];
  custPhoneNumber: BoxContactInformationProps["custPhoneNumber"];
  custAddress: BoxContactInformationProps["custAddress"];
  rmk: BoxContactInformationProps["rmk"];
  className?: string;
  allowEdit?: boolean;
}

const ContactInformationBox: React.FC<ContactInformationBoxProps> = ({
  bookingOrderId,
  custName,
  custEmail,
  custPhoneNumber,
  custAddress,
  rmk,
  allowEdit,
  className = "",
}) => {
  const initFormData = new CustomerContactInformationFormData(
    bookingOrderId,
    custName,
    custPhoneNumber,
    custEmail,
    custAddress,
    rmk,
  );
  const { mutate: updateContact, isPending } = useUpdateContactInformation();
  const [isEdit, setIsEdit] = useState(false);
  const router = useRouter();
  const { handleSubmit, control, reset, getValues, watch } = useForm<CustomerContactInformationFormData>({
    defaultValues: { ...initFormData },
    resolver: yupResolver(contactInformationSchema),
  });

  const handleCancelEdit = () => {
    setIsEdit(false);
    reset();
  };

  const submitForm: SubmitHandler<CustomerContactInformationFormData> = (data) => {
    updateContact(
      {
        bookingOrder: { ...data, recId: bookingOrderId },
      },
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
        custName: formValue.custName,
        custEmail: formValue.custEmail,
        custAddress: formValue.custAddress,
        custPhoneNumber: formValue.custPhoneNumber,
        rmk: formValue.rmk,
      },
      {
        custName,
        custEmail,
        custAddress,
        custPhoneNumber,
        rmk: rmk,
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
        <h3 className="font-[500] text-[16px] mb-3">Thông tin người đặt</h3>
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
              name="custName"
              render={({ field, fieldState: { error } }) => (
                <FormItem label="Họ và tên" validateStatus={error?.message ? "error" : undefined} help={error?.message}>
                  <Input {...field} placeholder="Họ và tên" />
                </FormItem>
              )}
            />
            <Controller
              control={control}
              name="custEmail"
              render={({ field, fieldState: { error } }) => (
                <FormItem
                  label="Địa chỉ email"
                  validateStatus={error?.message ? "error" : undefined}
                  help={error?.message}
                >
                  <Input {...field} placeholder="Địa chỉ email" />
                </FormItem>
              )}
            />
            <Controller
              control={control}
              name="custPhoneNumber"
              render={({ field, fieldState: { error } }) => (
                <FormItem
                  label="Số điện thoại"
                  validateStatus={error?.message ? "error" : undefined}
                  help={error?.message}
                >
                  <Input {...field} placeholder="Số điện thoại" />
                </FormItem>
              )}
            />
            <Controller
              control={control}
              name="custAddress"
              render={({ field, fieldState: { error } }) => (
                <FormItem
                  label="Địa chỉ liên hệ"
                  validateStatus={error?.message ? "error" : undefined}
                  help={error?.message}
                >
                  <Input {...field} placeholder="Địa chỉ liên hệ" />
                </FormItem>
              )}
            />
            <Controller
              control={control}
              name="rmk"
              render={({ field, fieldState: { error } }) => (
                <FormItem
                  label="Ghi chú"
                  validateStatus={error?.message ? "error" : undefined}
                  help={error?.message}
                  className="col-span-2"
                >
                  <Input.TextArea {...field} placeholder="Ghi chú" />
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
        <BoxContactInformation
          custName={custName}
          custPhoneNumber={custPhoneNumber}
          custEmail={custEmail}
          custAddress={custAddress}
          rmk={rmk}
        />
      )}
    </div>
  );
};

export default ContactInformationBox;

interface BoxContactInformationProps {
  custName: string;
  custEmail: string;
  custPhoneNumber: string;
  custAddress: string;
  rmk: string;
}
const BoxContactInformation: React.FC<BoxContactInformationProps> = ({
  custAddress,
  custEmail,
  custName,
  custPhoneNumber,
  rmk,
}) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div>
        <div className="text-xs">Họ và tên</div>
        <div>{custName}</div>
      </div>
      <div>
        <div className="text-xs">Email</div>
        <div>{custEmail}</div>
      </div>
      <div>
        <div className="text-xs">Số điện thoại</div>
        <div>{custPhoneNumber}</div>
      </div>
      <div>
        <div className="text-xs">Địa chỉ liên hệ</div>
        <div>{custAddress || "--"}</div>
      </div>
      <div>
        <div className="text-xs">Ghi chú</div>
        <div>{rmk || "--"}</div>
      </div>
    </div>
  );
};
