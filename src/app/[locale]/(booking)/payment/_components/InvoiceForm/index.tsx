import React, { useState } from "react";
import classNames from "classnames";
import { Form, Row, Col, Input } from "antd";
import FormItem from "@/components/base/FormItem";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Control, Controller } from "react-hook-form";
import { FeCustomerInformationFormData, FeInvoiceFormData } from "../../modules/payment.interface";

interface InvoiceFormProps {
  className?: string;
  control: Control<
    {
      customerInformation: FeCustomerInformationFormData;
      invoice: FeInvoiceFormData;
    },
    any
  >;
}
const InvoiceForm: React.FC<InvoiceFormProps> = ({ className = "", control }) => {
  const [isShowForm, setShowForm] = useState(true);
  return (
    <div
      className={classNames("invoice", {
        [className]: className,
      })}
    >
      <div className="invoice-head">
        <div
          className="flex justify-between items-center py-3 cursor-pointer"
          onClick={() => setShowForm((prev) => !prev)}
        >
          <h3 className="font-[500] text-base">Thông tin xuất hoá đơn</h3>
          {isShowForm ? <MinusOutlined /> : <PlusOutlined />}
        </div>
      </div>
      {isShowForm ? (
        <div className="invoice-body">
          <p className="text-gray-500 mb-3">Vui lòng nhập đầy đủ và chính xác các thông tin bên dưới.</p>
          <Form layout="vertical" component="div">
            <Row gutter={16}>
              <Col span={12}>
                <Controller
                  key="invoice.invoiceName"
                  name="invoice.invoiceName"
                  control={control}
                  render={({ field, formState: { errors } }) => (
                    <FormItem
                      label="Thông tin người nhận"
                      validateStatus={errors?.invoice?.invoiceName ? "error" : ""}
                      help={errors?.invoice?.invoiceName?.message || ""}
                    >
                      <Input {...field} placeholder="Thông tin người nhận" />
                    </FormItem>
                  )}
                />
              </Col>
              <Col span={12}>
                <Controller
                  key="invoice.invoiceEmail"
                  name="invoice.invoiceEmail"
                  control={control}
                  render={({ field, formState: { errors } }) => (
                    <FormItem
                      label="Email"
                      validateStatus={errors?.invoice?.invoiceEmail ? "error" : ""}
                      help={errors?.invoice?.invoiceEmail?.message || ""}
                    >
                      <Input {...field} placeholder="Email" />
                    </FormItem>
                  )}
                />
              </Col>
              <Col span={12}>
                <Controller
                  key="invoice.invoiceCompanyName"
                  name="invoice.invoiceCompanyName"
                  control={control}
                  render={({ field, formState: { errors } }) => (
                    <FormItem
                      label="Tên công ty"
                      validateStatus={errors?.invoice?.invoiceCompanyName ? "error" : ""}
                      help={errors?.invoice?.invoiceCompanyName?.message || ""}
                    >
                      <Input {...field} placeholder="Tên công ty" />
                    </FormItem>
                  )}
                />
              </Col>
              <Col span={12}>
                <Controller
                  key="invoice.invoiceTaxCode"
                  name="invoice.invoiceTaxCode"
                  control={control}
                  render={({ field, formState: { errors } }) => (
                    <FormItem
                      label="Mã số thuế"
                      validateStatus={errors?.invoice?.invoiceTaxCode ? "error" : ""}
                      help={errors?.invoice?.invoiceTaxCode?.message || ""}
                    >
                      <Input {...field} placeholder="Mã số thuế" />
                    </FormItem>
                  )}
                />
              </Col>
              <Col span={24}>
                <Controller
                  key="invoice.invoiceAddress"
                  name="invoice.invoiceAddress"
                  control={control}
                  render={({ field, formState: { errors } }) => (
                    <FormItem
                      label="Địa chỉ"
                      validateStatus={errors?.invoice?.invoiceAddress ? "error" : ""}
                      help={errors?.invoice?.invoiceAddress?.message || ""}
                    >
                      <Input {...field} placeholder="Địa chỉ" />
                    </FormItem>
                  )}
                />
              </Col>
            </Row>
          </Form>
        </div>
      ) : null}
    </div>
  );
};
export default InvoiceForm;
