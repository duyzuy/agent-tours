import React, { memo } from "react";
import { Form, Row, Col, Input, Divider, Select, SelectProps } from "antd";
import FormItem from "@/components/base/FormItem";
import { CustomerInformation } from "@/models/management/booking/customer.interface";

import classNames from "classnames";
import Link from "next/link";
import { useGetUserAgentList } from "@/queries/localUser";
import { ILocalUserMinimal, UserAgentListResponse } from "@/models/management/localUser.interface";
export interface CustomerInformationFormProps {
  className?: string;
  customerInformation: CustomerInformation;
  setCustomerInformation: React.Dispatch<React.SetStateAction<CustomerInformation>>;
  errors?: Partial<Record<keyof CustomerInformation, string>> | undefined;
  channel?: string;
  onSelectChannel?: SelectProps<string>["onChange"];
  userAgentId?: number;
  onSelectAgent?: SelectProps<number, ILocalUserMinimal>["onChange"];
}
const CustomerInformationForm: React.FC<CustomerInformationFormProps> = ({
  className = "",
  customerInformation,
  setCustomerInformation,
  errors,
  channel,
  onSelectChannel,
  userAgentId,
  onSelectAgent,
}) => {
  const { data: agentList, isLoading } = useGetUserAgentList();
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
      <div className="customer__information-head px-6 pt-6">
        <h3 className="font-[500] text-lg">Thông tin người đặt</h3>
      </div>
      <Divider />
      <div className="customer__information-body px-6 pb-6">
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <FormItem label="Kênh bán">
                <Select
                  value={channel}
                  placeholder="Chọn kênh bán"
                  options={[
                    { label: "B2B", value: "B2B" },
                    { label: "B2C", value: "B2C" },
                  ]}
                  onChange={onSelectChannel}
                />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="Danh sách Agent">
                <Select<number, UserAgentListResponse["result"][0]>
                  value={userAgentId}
                  fieldNames={{ label: "fullname", value: "recId" }}
                  options={agentList}
                  loading={isLoading}
                  onChange={onSelectAgent}
                  placeholder="Chọn Agent"
                  disabled={channel === "B2C"}
                  //   optionRender={(opt, info) => {
                  //     console.log(info);
                  //     return <div className="1">1</div>;
                  //   }}
                />
              </FormItem>
            </Col>
          </Row>
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
          </Row>
        </Form>
        <div className="note border-b mb-3 pb-3">
          <p>
            <Link href="/portal/booking/passenger-information">Nhập thông tin hành khách?</Link>
          </p>
          <p>Thông tin hành khách vẫn có thể được nhập và thay đổi trong quản lý booking.</p>
        </div>
        <Form layout="vertical">
          <FormItem label="Người giới thiệu">
            <Input
              placeholder="Nhập mã người giới thiệu nếu có"
              value={customerInformation.referenceId}
              onChange={(ev) => onChangeCustomerInformation("referenceId", ev.target.value)}
            />
          </FormItem>
        </Form>
      </div>
    </div>
  );
};
export default memo(CustomerInformationForm);
