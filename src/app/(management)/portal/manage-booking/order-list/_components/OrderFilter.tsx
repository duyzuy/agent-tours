import FormItem from "@/components/base/FormItem";
import { Col, DatePickerProps, Form, Row, Select } from "antd";
import { Status } from "@/models/common.interface";
import { EProductType } from "@/models/management/core/productType.interface";
import CustomDatePicker from "@/components/admin/CustomDatePicker";
import { DATE_FORMAT } from "@/constants/common";
import dayjs, { Dayjs } from "dayjs";
import { memo } from "react";

type OrderFilterValues = {
  type?: EProductType;
  channel?: string;
  paymentStatus?: string;
  createdFrom?: string;
  createdTo?: string;
  status?: Status;
};
export interface OrderFilterProps {
  onFilter?: (
    key: keyof OrderFilterValues,
    value: OrderFilterValues[keyof OrderFilterValues],
    data: OrderFilterValues,
  ) => void;
  value?: OrderFilterValues;
}
const OrderFilter: React.FC<OrderFilterProps> = ({ onFilter, value }) => {
  const { createdFrom, createdTo, channel, paymentStatus, status } = value || {};
  const onChangeCreatedTo: DatePickerProps["onChange"] = (date: Dayjs | null) => {
    const newValues = { ...value, createdTo: date?.format(DATE_FORMAT) };
    onFilter?.("createdTo", date?.format(DATE_FORMAT), newValues);
  };

  const onChangeCreatedFrom: DatePickerProps["onChange"] = (date: Dayjs | null) => {
    const newValues = { ...value, createdFrom: date?.format(DATE_FORMAT) };
    onFilter?.("createdFrom", date?.format(DATE_FORMAT), newValues);
  };

  const onChangeStatus = (status: Status) => {
    const newValues = { ...value, status: status };
    onFilter?.("status", status, newValues);
  };

  return (
    <Form layout="vertical">
      <Row gutter={16}>
        <Col lg={3}>
          <FormItem>
            <Select
              options={[
                {
                  value: Status.OK,
                  label: "Đã duyệt",
                },
                {
                  value: Status.QQ,
                  label: "Chờ duyệt",
                },
                { value: Status.XX, label: "Đã huỷ" },
              ]}
              onChange={onChangeStatus}
              placeholder="Trạng thái"
            />
          </FormItem>
        </Col>
        <Col lg={4}>
          <FormItem>
            <CustomDatePicker
              placeholder="Từ ngày"
              className="w-full"
              disabledDate={(date) => {
                return createdTo ? date.isAfter(dayjs(createdTo, DATE_FORMAT)) : false;
              }}
              onChange={onChangeCreatedFrom}
            />
          </FormItem>
        </Col>
        <Col span={6} lg={4}>
          <FormItem>
            <CustomDatePicker
              placeholder="Đến ngày"
              className="w-full"
              disabledDate={(date) => {
                return createdFrom ? date.isBefore(dayjs(createdFrom, DATE_FORMAT)) : false;
              }}
              onChange={onChangeCreatedTo}
            />
          </FormItem>
        </Col>
      </Row>
    </Form>
  );
};
export default memo(OrderFilter);
