import React, { memo } from "react";
import { Form, Row, Col, Input } from "antd";
import FormItem from "@/components/base/FormItem";
import { SplitBookingFormData } from "../modules/splitBooking.interface";
import classNames from "classnames";

type TInvoiceFormData = Required<Required<SplitBookingFormData>["invoiceInfo"]>;

export interface InvoiceFormProps {
  value?: SplitBookingFormData["invoiceInfo"];
  onChangeForm?: (key: keyof TInvoiceFormData, value: TInvoiceFormData[keyof TInvoiceFormData]) => void;
  errors?: Partial<Record<keyof TInvoiceFormData, string>>;
  className?: string;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ onChangeForm, value, errors, className = "" }) => {
  return (
    <div
      className={classNames("invoice-form", {
        [className]: className,
      })}
    >
      <h3 className="font-[500] text-[16px] mb-6">Thông tin xuất hoá đơn</h3>
      <Form layout="vertical" component="div">
        <Row gutter={16}>
          <Col span={12}>
            <FormItem
              label="Tên công ty"
              validateStatus={errors?.invoiceCompanyName ? "error" : ""}
              help={errors?.invoiceCompanyName || ""}
              required
            >
              <Input
                value={value?.invoiceCompanyName}
                placeholder="Số điện thoại"
                onChange={(ev) => onChangeForm?.("invoiceCompanyName", ev.target.value)}
              />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label="Mã số thuế"
              validateStatus={errors?.invoiceTaxCode ? "error" : ""}
              help={errors?.invoiceTaxCode || ""}
              required
            >
              <Input
                value={value?.invoiceTaxCode}
                placeholder="Mã số thuế"
                onChange={(ev) => onChangeForm?.("invoiceTaxCode", ev.target.value)}
              />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label="Họ và tên"
              validateStatus={errors?.invoiceName ? "error" : ""}
              help={errors?.invoiceName || ""}
              required
            >
              <Input
                value={value?.invoiceName}
                placeholder="Họ và tên"
                onChange={(ev) => onChangeForm?.("invoiceName", ev.target.value)}
              />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label="Email"
              validateStatus={errors?.invoiceEmail ? "error" : ""}
              help={errors?.invoiceEmail || ""}
              required
            >
              <Input
                value={value?.invoiceEmail}
                placeholder="Email"
                onChange={(ev) => onChangeForm?.("invoiceEmail", ev.target.value)}
              />
            </FormItem>
          </Col>

          <Col span={24}>
            <FormItem
              label="Địa chỉ"
              validateStatus={errors?.invoiceAddress ? "error" : ""}
              help={errors?.invoiceAddress || ""}
            >
              <Input
                value={value?.invoiceAddress}
                placeholder="Địa chỉ công ty"
                onChange={(ev) => onChangeForm?.("invoiceAddress", ev.target.value)}
              />
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default memo(InvoiceForm);
