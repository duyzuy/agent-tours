"use client";
import { useEffect, useMemo, useState } from "react";
import FormItem from "@/components/base/FormItem";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { useTranslations } from "next-intl";
import Quantity from "@/components/base/Quantity";
import { moneyFormatVND } from "@/utils/helper";
import classNames from "classnames";

const VISA_TYPES = [
  { label: "Visa du lịch", value: "DL" },
  { label: "Visa công tác", value: "DN" },
  { label: "Visa lao động", value: "LD" },
  { label: "Visa thăm thân", value: "TT" },
];

const VISA_OPTIONS = [
  { label: "30 ngày 1 lần nhập cảnh", value: "30DSINGLE" },
  { label: "30 ngày nhiều lần nhập cảnh", value: "30DMULTIPLE" },
  { label: "90 ngày 1 lần nhập cảnh", value: "90DSINGLE" },
  { label: "90 ngày nhiều lần nhập cảnh", value: "90DMULTIPLE" },
];

interface RegisterVisaFormProps {
  title?: string;
  amount?: number;
  className?: string;
}
const RegisterVisaForm: React.FC<RegisterVisaFormProps> = ({ title, amount, className = "" }) => {
  const t = useTranslations("String");
  const [form, setForm] = useState({ adult: 1, child: 0, infant: 0, title: title, amount: amount });

  const onChangeQuantity = (value: number, paxType: "adult" | "child" | "infant") => {
    setForm((oldData) => ({
      ...oldData,
      [paxType]: value,
    }));
  };
  const subTotal = useMemo(() => {
    const { adult, child, infant, amount } = form;

    if (!amount || amount === 0) {
      return 0;
    }
    return (adult + child + infant) * amount;
  }, [form]);

  useEffect(() => {
    setForm((oldData) => ({ ...oldData, amount: amount, title: title }));
  }, [amount, title]);
  return (
    <div
      className={classNames("px-6 py-4 border rounded-lg", {
        [className]: className,
      })}
    >
      <div className="py-2 mb-3">
        <h4 className="text-base text-red-600 font-[500] uppercase">{`Đăng ký tư vấn: ${title}`}</h4>
      </div>
      <Form layout="vertical">
        <div className="contact-info mb-6">
          <div className="contact-info__head mb-3">
            <span className="font-[500] text-base">Thông tin liên hệ</span>
          </div>
          <div className="contact-info__body">
            <Row gutter={16}>
              <Col span={12}>
                <FormItem label="Họ và tên" required>
                  <Input placeholder="Họ và tên" size="large" />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="Số điện thoại" required>
                  <Input placeholder="Số điện thoại" size="large" />
                </FormItem>
              </Col>
            </Row>
            <FormItem label="Email" required>
              <Input placeholder="Email" size="large" />
            </FormItem>
          </div>
        </div>
        <div className="regisster-info">
          <div className="regisster-info__title mb-3">
            <span className="font-[500] text-base">Thông tin đăng ký</span>
          </div>
          <div className="regisster-info__form">
            <div className="pax-quantity mb-6">
              <div className="mb-3">
                <span className="font-[500] block">Số lượng</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="mb-3">
                    <span>Người lớn</span>
                  </div>
                  <Quantity
                    value={form.adult}
                    size="sm"
                    onChange={(action, value) => onChangeQuantity(value, "adult")}
                    maximum={9}
                    minimum={1}
                  />
                </div>
                <div>
                  <div className="mb-3">
                    <span>Trẻ em</span>
                  </div>
                  <Quantity
                    size="sm"
                    value={form.child}
                    onChange={(action, value) => onChangeQuantity(value, "child")}
                    maximum={9}
                    minimum={0}
                  />
                </div>
                <div>
                  <div className="mb-3">
                    <span>Em bé</span>
                  </div>
                  <Quantity
                    size="sm"
                    value={form.infant}
                    onChange={(action, value) => onChangeQuantity(value, "infant")}
                    maximum={9}
                    minimum={0}
                  />
                </div>
              </div>
            </div>
            <FormItem label="Loại visa" required>
              <Select options={VISA_TYPES} placeholder="Loại visa" size="large" />
            </FormItem>
            <FormItem label="Thời gian/số lần nhập cảnh" required>
              <Select options={VISA_OPTIONS} placeholder="Thời gian/số lần nhập cảnh" size="large" />
            </FormItem>
            <FormItem label="Quốc tịch" required>
              <Input placeholder="Quốc tịch" size="large" />
            </FormItem>
            <FormItem label="Ghi chú">
              <Input.TextArea placeholder="Ghi chú" rows={3} size="large" />
            </FormItem>
          </div>
        </div>
        <div className="line h-[1px] bg-gray-200"></div>
        <div className="price flex justify-between py-4">
          <span className="text-gray-600">Tạm tính</span>
          <span className="text-red-600 font-[500]">{moneyFormatVND(subTotal)}</span>
        </div>
        <FormItem>
          <Button type="primary" className="w-full" size="large">
            Đăng ký ngay
          </Button>
        </FormItem>
      </Form>
    </div>
  );
};
export default RegisterVisaForm;
