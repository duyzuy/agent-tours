import React, { useEffect, useState } from "react";
import { Form, Input, Space, Button, Col, Row } from "antd";
import FormItem from "@/components/base/FormItem";
import { IStockListOfInventoryRs } from "@/models/management/core/stock.interface";
import dayjs from "dayjs";

import { DATE_TIME_FORMAT, TIME_FORMAT } from "@/constants/common";
import { RangePickerProps } from "antd/es/date-picker";

import { useFormSubmit, HandleSubmit } from "@/hooks/useFormSubmit";
import CustomRangePicker from "@/components/admin/CustomRangePicker";
import { stockConfirmSchema } from "../../schema/stock.schema";
import { StockConfirmFormData } from "../../modules/stock.interface";

interface StockConfirmationFormProps {
  initialValues?: IStockListOfInventoryRs["result"][0];
  isDisabled?: boolean;
  onSubmit?: (formData: StockConfirmFormData) => void;
}
const StockConfirmationForm: React.FC<StockConfirmationFormProps> = ({
  initialValues,
  isDisabled = false,
  onSubmit,
}) => {
  const initStockConfirmFormdata = new StockConfirmFormData(0, "", 0, undefined, undefined, undefined, undefined);

  const { handlerSubmit, errors } = useFormSubmit({
    schema: stockConfirmSchema,
  });

  const [stockConfirmFormData, setStockConfirmFormData] = useState(initStockConfirmFormdata);

  const onChangeFormData = (
    key: keyof StockConfirmFormData,
    value: StockConfirmFormData[keyof StockConfirmFormData],
  ) => {
    if (key === "cap" && !isNaN(value as number)) {
      value = Number(value);
    }
    setStockConfirmFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onChangeValidDateRange: RangePickerProps["onChange"] = (date, dateStr) => {
    setStockConfirmFormData((prev) => ({
      ...prev,
      valid: date ? date[0]?.toISOString() : undefined,
      validTo: date ? date[1]?.toISOString() : undefined,
      // start: undefined,
      // end: undefined,
    }));
  };
  const onChangeUsedDateRange: RangePickerProps["onChange"] = (date, dateStr) => {
    setStockConfirmFormData((prev) => ({
      ...prev,
      start: date ? date[0]?.toISOString() : undefined,
      end: date ? date[1]?.toISOString() : undefined,
    }));
  };

  const onSubmitForm: HandleSubmit<StockConfirmFormData> = (data) => {
    onSubmit?.(data);
  };
  useEffect(() => {
    if (initialValues) {
      setStockConfirmFormData(() => ({
        recId: initialValues.recId,
        cap: initialValues.cap,
        description: initialValues.description,
        start: initialValues.startDate,
        end: initialValues.endDate,
        valid: initialValues.validFrom,
        validTo: initialValues.validTo,
      }));
    }
  }, [initialValues]);

  return (
    <>
      <Form layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <FormItem label="Loại dịch vụ">
              <Input placeholder="Loại dịch vụ" disabled value={initialValues?.inventoryType} />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="Loại kho">
              <Input placeholder="Loại kho" disabled value={initialValues?.type} />
            </FormItem>
          </Col>
        </Row>
        <FormItem
          label="Ngày mở bán (valid date)"
          required
          validateStatus={errors?.valid || errors?.validTo ? "error" : ""}
          help={errors?.valid || errors?.validTo || ""}
        >
          <CustomRangePicker
            showTime={{
              format: TIME_FORMAT,
              defaultValue: [dayjs("00:00:00", "HH:mm:ss"), dayjs("23:59:59", "HH:mm:ss")],
            }}
            placeholder={["Từ ngày", "Đến ngày"]}
            format={"DD/MM/YYYY - HH:mm"}
            disabled={isDisabled}
            value={[
              stockConfirmFormData.valid ? dayjs(stockConfirmFormData.valid) : null,
              stockConfirmFormData.validTo ? dayjs(stockConfirmFormData.validTo) : null,
            ]}
            disabledDate={(date) => {
              return dayjs().isAfter(date) && !dayjs().isSame(date, "date");
            }}
            onChange={onChangeValidDateRange}
            className="w-full "
          />
        </FormItem>
        <FormItem
          label="Ngày áp dụng (used)"
          required
          validateStatus={errors?.start || errors?.end ? "error" : ""}
          help={errors?.start || errors?.end || ""}
        >
          <CustomRangePicker
            showTime={{
              format: TIME_FORMAT,
              defaultValue: [dayjs("00:00:00", "HH:mm:ss"), dayjs("23:59:59", "HH:mm:ss")],
            }}
            placeholder={["Từ ngày", "Đến ngày"]}
            format={"DD/MM/YYYY - HH:mm"}
            disabled={isDisabled}
            value={[
              stockConfirmFormData.start ? dayjs(stockConfirmFormData.start) : null,
              stockConfirmFormData.end ? dayjs(stockConfirmFormData.end) : null,
            ]}
            disabledDate={(date) => {
              return stockConfirmFormData.validTo
                ? dayjs(stockConfirmFormData.validTo).isAfter(date)
                : dayjs().isAfter(date);
            }}
            onChange={onChangeUsedDateRange}
            className="w-full"
          />
        </FormItem>

        <Row gutter={16}>
          <Col span={8}>
            <FormItem
              label="Số lượng (cap)"
              required
              validateStatus={errors?.cap ? "error" : ""}
              help={errors?.cap || ""}
            >
              <Input
                placeholder="Số lượng"
                value={stockConfirmFormData?.cap}
                disabled={isDisabled}
                onChange={(ev) => onChangeFormData("cap", ev.target.value)}
              />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="Khả dụng">
              <Input placeholder="Số lượng" disabled value={initialValues?.available} />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="Đã sử dụng">
              <Input placeholder="Đã sử dụng" disabled value={initialValues?.used} />
            </FormItem>
          </Col>
        </Row>
        <FormItem
          label="Mô tả"
          required
          validateStatus={errors?.description ? "error" : ""}
          help={errors?.description || ""}
        >
          <Input.TextArea
            placeholder="Mô tả"
            value={stockConfirmFormData?.description}
            disabled={isDisabled}
            onChange={(ev) => onChangeFormData("description", ev.target.value)}
          />
        </FormItem>
      </Form>

      {!isDisabled ? (
        <Space>
          <Button type="primary" onClick={() => handlerSubmit(stockConfirmFormData, onSubmitForm)} disabled={false}>
            Duyệt
          </Button>
        </Space>
      ) : null}
    </>
  );
};
export default StockConfirmationForm;
