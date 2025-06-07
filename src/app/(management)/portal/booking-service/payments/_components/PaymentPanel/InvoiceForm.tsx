import React, { useState } from "react";
import classNames from "classnames";
import { Form, Row, Col, Input } from "antd";
import FormItem from "@/components/base/FormItem";
import { InvoiceFormData } from "@/models/management/booking/invoice.interface";

interface InvoiceFormProps {
  className?: string;
  values: InvoiceFormData;
  onSetValues: React.Dispatch<React.SetStateAction<InvoiceFormData>>;
}
const InvoiceForm: React.FC<InvoiceFormProps> = ({ className = "", values, onSetValues }) => {
  const onChange = (key: keyof InvoiceFormData, value: InvoiceFormData[keyof InvoiceFormData]) => {
    onSetValues((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <div
      className={classNames("invoice", {
        [className]: className,
      })}
    >
      <div className="invoice-head mb-3">
        <h3 className="font-[500] text-lg mb-2">Xuất hoá đơn</h3>
        <p className="text-gray-500">Lưu ý thông tin xuất hoá đơn phải được điền chính xác.</p>
      </div>
      <Form layout="vertical" component="div">
        <Row gutter={16}>
          <Col span={12}>
            <FormItem label="Họ và tên">
              <Input
                placeholder="Họ và tên"
                name="invoiceName"
                value={values.invoiceName}
                onChange={(ev) => onChange("invoiceName", ev.target.value)}
              />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem required label="Email">
              <Input
                placeholder="Email"
                value={values.invoiceEmail}
                onChange={(ev) => onChange("invoiceEmail", ev.target.value)}
              />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="Tên công ty">
              <Input
                placeholder="Tên công ty"
                name="invoiceCompanyName"
                value={values.invoiceCompanyName}
                onChange={(ev) => onChange("invoiceCompanyName", ev.target.value)}
              />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="Mã số thuế">
              <Input
                placeholder="Mã số thuế"
                name="invoiceTaxCode"
                value={values.invoiceTaxCode}
                onChange={(ev) => onChange("invoiceTaxCode", ev.target.value)}
              />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem label="Địa chỉ">
              <Input
                placeholder="Địa chỉ"
                value={values.invoiceAddress}
                name="invoiceAddress"
                onChange={(ev) => onChange("invoiceAddress", ev.target.value)}
              />
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default InvoiceForm;
