import React, { useState } from "react";
import classNames from "classnames";
import { Divider, Form, Row, Col, Input } from "antd";
import FormItem from "@/components/base/FormItem";
import { InvoiceFormData } from "@/models/management/booking/invoice.interface";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

interface InvoiceFormProps {
  className?: string;
  values: InvoiceFormData;
  onSetValues: React.Dispatch<React.SetStateAction<InvoiceFormData>>;
}
const InvoiceForm: React.FC<InvoiceFormProps> = ({ className = "", values, onSetValues }) => {
  const [showLess, setShowLess] = useState(true);
  const onChange = (key: keyof InvoiceFormData, value: InvoiceFormData[keyof InvoiceFormData]) => {
    onSetValues((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <div
      className={classNames("customer__information", {
        [className]: className,
      })}
    >
      <div className="customer__information-head px-6 py-6">
        <div className="flex justify-between items-center">
          <h3 className="font-[500] text-lg">Thông tin xuất hoá đơn</h3>
          <span
            className="cursor-pointer hover:bg-gray-50 hover:shadow-inner rounded-full w-8 h-8 flex items-center justify-center "
            onClick={() => setShowLess((prev) => !prev)}
          >
            {showLess ? <PlusOutlined /> : <MinusOutlined />}
          </span>
        </div>
      </div>
      {showLess ? null : (
        <div className="customer__information-body px-6 pb-6 border-t pt-6">
          <div className="note mb-3">
            <p className="text-gray-500">Lưu ý thông tin xuất hoá đơn phải được điền chính xác.</p>
          </div>
          <Form layout="vertical" component="div">
            <Row gutter={16}>
              <Col span={12}>
                <FormItem label="Thông tin người nhận">
                  <Input
                    placeholder="Thông tin người nhận"
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
      )}
    </div>
  );
};
export default InvoiceForm;
