import React, { memo } from "react";
import { Form, Row, Col, Input } from "antd";
import FormItem from "@/components/base/FormItem";
import { CustomerInformation } from "@/models/management/booking/customer.interface";
import classNames from "classnames";

export interface CustomerInformationFormProps {
  className?: string;
  customerInformation: CustomerInformation;
  setCustomerInformation: React.Dispatch<React.SetStateAction<CustomerInformation>>;
  errors?: Partial<Record<keyof CustomerInformation, string>> | undefined;
}
const CustomerInformationForm: React.FC<CustomerInformationFormProps> = ({
  className = "",
  customerInformation,
  setCustomerInformation,
  errors,
}) => {
  const onChangeCustomerInformation = (
    key: keyof CustomerInformation,
    value: CustomerInformation[keyof CustomerInformation],
  ) => {
    setCustomerInformation((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const onCustomerNote = (value: string) => {
    setCustomerInformation((prev) => ({ ...prev, rmk: value }));
  };

  return (
    <div
      className={classNames("customer__information", {
        [className]: className,
      })}
    >
      <div className="customer__information-head mb-3">
        <h3 className="font-[500] text-lg">Thông tin người đặt</h3>
      </div>
      <Form layout="vertical" component="div">
        <Row gutter={16}>
          <Col span={12}>
            <FormItem
              required
              label="Họ và tên"
              validateStatus={errors?.custName ? "error" : ""}
              help={errors?.custName || ""}
            >
              <Input
                placeholder="Họ và tên"
                value={customerInformation.custName}
                onChange={(ev) => onChangeCustomerInformation("custName", ev.target.value)}
              />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              required
              label="Email"
              validateStatus={errors?.custEmail ? "error" : ""}
              help={errors?.custEmail || ""}
            >
              <Input
                placeholder="Email"
                value={customerInformation.custEmail}
                onChange={(ev) => onChangeCustomerInformation("custEmail", ev.target.value)}
              />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              required
              label="Số điện thoại"
              validateStatus={errors?.custPhoneNumber ? "error" : ""}
              help={errors?.custPhoneNumber || ""}
            >
              <Input
                placeholder="Số điện thoại"
                maxLength={11}
                value={customerInformation.custPhoneNumber}
                onChange={(ev) => onChangeCustomerInformation("custPhoneNumber", ev.target.value)}
              />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="Địa chỉ">
              <Input
                placeholder="Địa chỉ"
                value={customerInformation.custAddress}
                onChange={(ev) => onChangeCustomerInformation("custAddress", ev.target.value)}
              />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem label="Ghi chú">
              <Input.TextArea
                value={customerInformation.rmk}
                onChange={(ev) => onCustomerNote(ev.target.value)}
              ></Input.TextArea>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem label="Người giới thiệu">
              <Input
                placeholder="Nhập mã người giới thiệu nếu có"
                value={customerInformation.referenceId}
                onChange={(ev) => onChangeCustomerInformation("referenceId", ev.target.value)}
              />
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default memo(CustomerInformationForm);
