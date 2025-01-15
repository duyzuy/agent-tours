import React, { memo } from "react";
import { Form, Row, Col, Input, Space, Button, Divider } from "antd";
import FormItem from "@/components/base/FormItem";
import classNames from "classnames";
import { Controller, Control } from "react-hook-form";
import { FeCustomerInformationFormData, FeInvoiceFormData } from "../modules/payment.interface";

export interface CustomerInformationFormProps {
  className?: string;
  control: Control<
    {
      customerInformation: FeCustomerInformationFormData;
      invoice: FeInvoiceFormData;
    },
    any
  >;
  disabled?: boolean;
}
const CustomerInformationForm: React.FC<CustomerInformationFormProps> = ({ className = "", control, disabled }) => {
  return (
    <div
      className={classNames("customer__information", {
        [className]: className,
      })}
    >
      <div className="customer__information-head relative mb-3">
        <span className="w-1 h-4 block rounded-full bg-primary-default absolute -left-3 lg:-left-6 top-1"></span>
        <h3 className="font-[500] text-base">Thông tin người đặt</h3>
      </div>
      <div className="customer__information-body">
        <Form layout="vertical" component="div">
          <Row gutter={16}>
            <Col span={12}>
              <Controller
                key="customerInformation.custName"
                name="customerInformation.custName"
                control={control}
                render={({ field, formState: { errors } }) => (
                  <FormItem
                    required
                    label="Họ và tên"
                    validateStatus={errors?.customerInformation?.custName ? "error" : ""}
                    help={errors?.customerInformation?.custName?.message || ""}
                  >
                    <Input {...field} placeholder="Họ và tên" disabled={disabled} />
                  </FormItem>
                )}
              />
            </Col>
            <Col span={12}>
              <Controller
                key="customerInformation.custEmail"
                control={control}
                name="customerInformation.custEmail"
                render={({ field, formState: { errors } }) => (
                  <FormItem
                    required
                    label="Email"
                    validateStatus={errors?.customerInformation?.custEmail ? "error" : ""}
                    help={errors?.customerInformation?.custEmail?.message || ""}
                  >
                    <Input {...field} placeholder="Email" disabled={disabled} />
                  </FormItem>
                )}
              />
            </Col>
            <Col span={12}>
              <Controller
                key="customerInformation.custPhoneNumber"
                control={control}
                name="customerInformation.custPhoneNumber"
                render={({ field, formState: { errors } }) => (
                  <FormItem
                    required
                    label="Số điện thoại"
                    validateStatus={errors?.customerInformation?.custPhoneNumber ? "error" : ""}
                    help={errors?.customerInformation?.custPhoneNumber?.message || ""}
                  >
                    <Input {...field} placeholder="Số điện thoại" maxLength={11} disabled={disabled} />
                  </FormItem>
                )}
              />
            </Col>
            <Col span={12}>
              <Controller
                key="customerInformation.custAddress"
                control={control}
                name="customerInformation.custAddress"
                render={({ field, formState: { errors } }) => (
                  <FormItem
                    label="Địa chỉ"
                    validateStatus={errors?.customerInformation?.custAddress ? "error" : ""}
                    help={errors?.customerInformation?.custAddress?.message || ""}
                  >
                    <Input {...field} placeholder="Địa chỉ" disabled={disabled} />
                  </FormItem>
                )}
              />
            </Col>
            <Col span={24}>
              <Controller
                key="cus"
                control={control}
                name="customerInformation.referenceId"
                render={({ field, formState: { errors } }) => (
                  <FormItem
                    label="Người giới thiệu"
                    validateStatus={errors?.customerInformation?.referenceId ? "error" : ""}
                    help={errors?.customerInformation?.referenceId?.message || ""}
                  >
                    <Input {...field} placeholder="Nhập mã người giới thiệu nếu có" disabled={disabled} />
                  </FormItem>
                )}
              />
            </Col>
            <Col span={24}>
              <Controller
                key="cus"
                control={control}
                name="customerInformation.rmk"
                render={({ field, formState: { errors } }) => (
                  <FormItem
                    label="Ghi chú"
                    validateStatus={errors?.customerInformation?.rmk ? "error" : ""}
                    help={errors?.customerInformation?.rmk?.message || ""}
                  >
                    <Input.TextArea {...field} disabled={disabled}></Input.TextArea>
                  </FormItem>
                )}
              />
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};
export default memo(CustomerInformationForm);
