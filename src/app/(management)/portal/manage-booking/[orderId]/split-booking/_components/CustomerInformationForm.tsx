import React, { useEffect, useMemo, useState, memo, useCallback } from "react";
import { Form, Row, Col, Input } from "antd";
import FormItem from "@/components/base/FormItem";
import { SplitBookingFormData } from "../modules/splitBooking.interface";
import { isUndefined } from "lodash";
import classNames from "classnames";

type TCustomerInfoType = Required<Required<SplitBookingFormData>["customerInfo"]>;

type KeysOfValue<T, TCondition> = {
  [K in keyof T]: T[K] extends TCondition ? K : never;
}[keyof T];

type TKeysCustomerInfo = KeysOfValue<TCustomerInfoType, string>;

export interface CustomerInformationFormProps {
  value?: SplitBookingFormData["customerInfo"];
  onChangeForm?: (key: keyof TCustomerInfoType, value: TCustomerInfoType[TKeysCustomerInfo]) => void;
  errors?: Partial<Record<TKeysCustomerInfo, string>>;
  className?: string;
}
const CustomerInformationForm: React.FC<CustomerInformationFormProps> = ({
  onChangeForm,
  value,
  errors,
  className = "",
}) => {
  return (
    <div
      className={classNames("contact-form", {
        [className]: className,
      })}
    >
      <h3 className="font-[500] text-[16px] mb-6">Thông tin người đặt mới</h3>
      <Form layout="vertical" component="div">
        <Row gutter={16}>
          <Col span={12}>
            <FormItem
              label="Họ và tên"
              validateStatus={errors?.custName ? "error" : ""}
              help={errors?.custName || ""}
              required
            >
              <Input
                value={value?.custName}
                placeholder="Họ"
                onChange={(ev) => onChangeForm?.("custName", ev.target.value)}
              />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label="Email"
              validateStatus={errors?.custEmail ? "error" : ""}
              help={errors?.custEmail || ""}
              required
            >
              <Input
                value={value?.custEmail}
                placeholder="Email"
                onChange={(ev) => onChangeForm?.("custEmail", ev.target.value)}
              />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label="Số điện thoại"
              validateStatus={errors?.custPhoneNumber ? "error" : ""}
              help={errors?.custPhoneNumber || ""}
              required
            >
              <Input
                value={value?.custPhoneNumber}
                placeholder="Số điện thoại"
                onChange={(ev) => onChangeForm?.("custPhoneNumber", ev.target.value)}
              />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label="Địa chỉ"
              validateStatus={errors?.custAddress ? "error" : ""}
              help={errors?.custAddress || ""}
            >
              <Input
                value={value?.custAddress}
                placeholder="Nhập địa chỉ thường trú"
                onChange={(ev) => onChangeForm?.("custAddress", ev.target.value)}
              />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem label="Ghi chú" validateStatus={errors?.rmk ? "error" : ""} help={errors?.rmk || ""}>
              <Input.TextArea
                value={value?.rmk}
                placeholder="Ghi chú"
                onChange={(ev) => onChangeForm?.("rmk", ev.target.value)}
              />
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default memo(CustomerInformationForm);
