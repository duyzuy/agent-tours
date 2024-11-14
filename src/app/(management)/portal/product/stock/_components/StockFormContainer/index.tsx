"use client";
import React, { useState, useMemo, useEffect } from "react";
import { Form, Input, Row, Col, Checkbox, Space, Button, Radio, DatePickerProps, CheckboxProps, message } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import { CheckboxGroupProps } from "antd/es/checkbox";
import { useGetStockInventoryTypeCoreQuery } from "@/queries/core/stockInventory";
import { vietnameseTonesToUnderscoreKeyname } from "@/utils/helper";
import { isEmpty, isUndefined } from "lodash";
import { useFormSubmit, HandleSubmit } from "@/hooks/useFormSubmit";
import { stockSchema } from "../../schema/stock.schema";
import { DATE_TIME_FORMAT, TIME_FORMAT, DAYS_OF_WEEK } from "@/constants/common";
import CustomRangePicker from "@/components/admin/CustomRangePicker";
import CustomDatePicker from "@/components/admin/CustomDatePicker";
import InventorySelector, { InventorySelectorProps } from "./InventorySelector";
import FormItem from "@/components/base/FormItem";
import { EInventoryType } from "@/models/management/core/inventoryType.interface";
import { StockFormData } from "../../modules/stock.interface";
import dayjs from "dayjs";
interface StockFormContainerProps {
  inventoryId?: number;
  inventoryType?: EInventoryType;
  onSubmit?: ({ data }: { data: StockFormData }, cb?: () => void) => void;
  onCancel: () => void;
  loading?: boolean;
}
type TRepeatType = "day" | "week";

const StockFormContainer: React.FC<StockFormContainerProps> = ({
  inventoryType,
  inventoryId,
  onSubmit,
  onCancel,
  loading,
}) => {
  const initStockFormData = new StockFormData(
    inventoryId,
    undefined,
    "",
    "",
    0,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    [],
    0,
    [],
  );

  const [stockFormData, setStockFormData] = useState(initStockFormData);
  const [currInventoryType, setCurrInventoryType] = useState<EInventoryType>();
  const [repeatType, setRepeatType] = useState<TRepeatType>("week");
  const [showCreateSeries, setCreateSeries] = useState(false);

  const { handlerSubmit, errors } = useFormSubmit<StockFormData & { isCreateSeries?: boolean }>({
    schema: stockSchema,
  });
  const [stockFieldErrors, setStockFieldErrors] = useState<Partial<Record<keyof StockFormData, string>>>();

  const { data: stockInventoryType, isLoading: isLoadingStockType } =
    useGetStockInventoryTypeCoreQuery(currInventoryType);
  /**
   *
   * @param key
   * @param value
   *
   * Handle Stock form data
   */
  const onChangeStockFormData = (key: keyof StockFormData, value: StockFormData[keyof StockFormData]) => {
    if (key === "code" && typeof value === "string") {
      value = vietnameseTonesToUnderscoreKeyname(value).toLocaleUpperCase();
    }

    if (
      (key === "repeatAfter" && !isEmpty(value) && !isNaN(value as number)) ||
      (key === "cap" && !isEmpty(value) && !isNaN(value as number))
    ) {
      value = Number(value);
    }
    setStockFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onChangeInventory: InventorySelectorProps["onChange"] = (value, option) => {
    setCurrInventoryType(option?.type);
    setStockFormData((prev) => ({
      ...prev,
      inventoryId: value,
      type: undefined,
    }));
  };

  const onChangeValidDateRange: RangePickerProps["onChange"] = (date) => {
    setStockFormData((prev) => ({
      ...prev,
      valid: date ? date[0]?.toISOString() : undefined,
      validTo: date ? date[1]?.toISOString() : undefined,
      fromValidTo: undefined,
    }));
  };

  const onChangeUsedDateRange: RangePickerProps["onChange"] = (date) => {
    if (isUndefined(stockFormData.valid) || isUndefined(stockFormData.validTo)) {
      message.error("Vui lòng Chọn ngày mở bán.");
      return;
    }
    if (date && date[1]?.isBefore(dayjs(stockFormData.validTo))) {
      message.error("Ngày kết thúc phải lớn hơn ngày kết thúc mở bán.");
      return;
    }

    setStockFormData((prev) => ({
      ...prev,
      start: date ? date[0]?.toISOString() : undefined,
      end: date ? date[1]?.toISOString() : undefined,
    }));
  };
  const onChangeValidFromTo: DatePickerProps["onChange"] = (date) => {
    if (isUndefined(stockFormData.valid) || isUndefined(stockFormData.validTo)) {
      message.error("Vui lòng Chọn ngày mở bán trước.");
      return;
    }
    setStockFormData((prev) => ({
      ...prev,
      fromValidTo: date?.toISOString(),
    }));
  };

  const onCheckAllDaysOfWeek: CheckboxProps["onChange"] = (e) => {
    let values: string[] = [];
    if (e.target.checked) {
      values = DAYS_OF_WEEK.reduce<string[]>((acc, day) => {
        return [...acc, day.value];
      }, []);
    }
    setStockFormData((prev) => ({
      ...prev,
      everyDayofweek: [...(values as string[])],
    }));
  };
  const indeterminate = useMemo(() => {
    return stockFormData.everyDayofweek.length > 0 && stockFormData.everyDayofweek.length < DAYS_OF_WEEK.length;
  }, [stockFormData.everyDayofweek]);
  const checkAllDayOfWeek = useMemo(() => {
    return stockFormData.everyDayofweek.length === DAYS_OF_WEEK.length;
  }, [stockFormData.everyDayofweek]);

  const onCheckDayInWeek: CheckboxGroupProps["onChange"] = (values) => {
    setStockFormData((prev) => ({
      ...prev,
      everyDayofweek: [...(values as string[])],
    }));
  };

  const onCloneExclusiveDate = () => {
    if (isEmpty(stockFormData.fromValidTo)) {
      message.info("Chọn ngày kết thúc khởi tạo series.");
      setStockFieldErrors((prev) => ({
        ...prev,
        fromValidTo: "Chọn ngày kết thúc.",
      }));
      return;
    } else {
      let errors = { ...stockFieldErrors };
      delete errors.fromValidTo;
      setStockFieldErrors(() => errors);
    }
    setStockFormData((prev) => ({
      ...prev,
      exclusives: [...prev.exclusives, { from: undefined, to: undefined }],
    }));
  };
  const onRemoveOneExclusiveDate = (index: number) => {
    const cloneExclusiveDates = [...stockFormData.exclusives];
    cloneExclusiveDates.splice(index, 1);
    setStockFormData((prev) => ({
      ...prev,
      exclusives: [...cloneExclusiveDates],
    }));
  };
  const onChangeExclusiveDates = (exclIndx: number, dateStr: (string | undefined)[]) => {
    const exclusiveDates = [...stockFormData.exclusives];
    exclusiveDates.splice(exclIndx, 1, {
      from: dateStr[0],
      to: dateStr[1],
    });

    setStockFormData((prev) => ({
      ...prev,
      exclusives: [...exclusiveDates],
    }));
  };

  const getDisableExclusiveDate = (date: dayjs.Dayjs) => {
    let isDisabled = false;

    stockFormData.exclusives.forEach((exclDate) => {
      if (
        exclDate.from &&
        exclDate.to &&
        date.isAfter(dayjs(exclDate.from, { format: DATE_TIME_FORMAT })) &&
        date.isBefore(dayjs(exclDate.to, { format: DATE_TIME_FORMAT }))
      ) {
        isDisabled = true;
      }
    });

    return isDisabled;
  };

  const onSubmitFormData: HandleSubmit<StockFormData> = (data) => {
    onSubmit?.({ data }, () => {
      setStockFormData({ ...initStockFormData, inventoryId });
      setCurrInventoryType(inventoryType);
      setStockFieldErrors(undefined);
      setCreateSeries(false);
    });
  };
  useEffect(() => {
    if (inventoryId) {
      setStockFormData((oldData) => ({ ...oldData, inventoryId }));
    }
    if (inventoryType) {
      setCurrInventoryType(inventoryType);
    }
  }, [inventoryId, inventoryType]);

  return (
    <Form
      layout="horizontal"
      labelCol={{ span: 6 }}
      wrapperCol={{ flex: 1 }}
      colon={false}
      labelWrap
      className="max-w-4xl"
    >
      <FormItem
        label="Loại dịch vụ"
        required
        validateStatus={errors?.inventoryId ? "error" : ""}
        help={errors?.inventoryId || ""}
      >
        <InventorySelector disabled={!!inventoryId} value={stockFormData?.inventoryId} onChange={onChangeInventory} />
      </FormItem>
      <FormItem label="Loại" required validateStatus={errors?.type ? "error" : ""} help={errors?.type || ""}>
        <Space>
          {stockInventoryType?.map((item) => (
            <Checkbox
              key={item}
              value={item}
              checked={item === stockFormData.type}
              onChange={() => onChangeStockFormData("type", item)}
            >
              {item}
            </Checkbox>
          ))}
        </Space>
      </FormItem>
      <FormItem label="Mã kho" required validateStatus={errors?.code ? "error" : ""} help={errors?.code || ""}>
        <Input
          placeholder="Mã kho"
          value={stockFormData.code}
          onChange={(ev) => onChangeStockFormData("code", ev.target.value)}
        />
      </FormItem>
      <FormItem label="Mô tả" validateStatus={errors?.description ? "error" : ""} help={errors?.description || ""}>
        <Input.TextArea
          rows={4}
          value={stockFormData.description}
          onChange={(ev) => onChangeStockFormData("description", ev.target.value)}
        ></Input.TextArea>
      </FormItem>
      <FormItem label="Số lượng" required validateStatus={errors?.cap ? "error" : ""} help={errors?.cap || ""}>
        <Input
          placeholder="Số lượng"
          type="number"
          min={0}
          name="cap"
          value={stockFormData.cap}
          onChange={(ev) => onChangeStockFormData("cap", ev.target.value)}
        />
      </FormItem>

      <FormItem
        label="Ngày mở bán (valid date)"
        required
        tooltip="Là ngày được phép mở bán"
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
          value={[
            stockFormData.valid ? dayjs(stockFormData.valid) : null,
            stockFormData.validTo ? dayjs(stockFormData.validTo) : null,
          ]}
          disabledDate={(date) => {
            return dayjs().isAfter(date);
          }}
          onChange={onChangeValidDateRange}
          className="w-full max-w-[380px]"
        />
      </FormItem>
      <FormItem
        label="Ngày sử dụng (used)"
        required
        tooltip="Thời gian sử dụng (Checkin/Checkout || Depart date, return date) của Stock phải nằm sau ngày kết thúc mở bán."
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
          value={[
            stockFormData.start ? dayjs(stockFormData.start) : null,
            stockFormData.end ? dayjs(stockFormData.end) : null,
          ]}
          disabledDate={(date) => {
            return dayjs().isAfter(date) || dayjs(stockFormData.validTo).isAfter(date);
          }}
          onChange={onChangeUsedDateRange}
          className="w-full max-w-[380px]"
        />
      </FormItem>

      <hr className="mb-6" />
      <FormItem label="Tuỳ chọn nâng cao">
        <Space>
          <Checkbox checked={showCreateSeries} onChange={() => setCreateSeries((show) => !show)}>
            Hiển thị các tuỳ chọn nâng cao và khởi tạo series stocks theo ngày mở bán (Valid date).
          </Checkbox>
        </Space>
      </FormItem>
      {showCreateSeries ? (
        <>
          <FormItem
            label="Tạo series"
            tooltip="Tạo nhiều ngày mở bán ngày mở bán (Valid date)"
            validateStatus={stockFieldErrors?.fromValidTo || errors?.fromValidTo ? "error" : ""}
          >
            <Row gutter={16}>
              <Col span={12}>
                <CustomDatePicker
                  showTime={{
                    format: TIME_FORMAT,
                    defaultValue: dayjs("00:00:00", "HH:mm:ss"),
                  }}
                  placeholder="Từ ngày"
                  disabled
                  value={stockFormData.valid ? dayjs(stockFormData.valid) : null}
                  format={"DD/MM/YYYY - HH:mm"}
                  className="w-full"
                />
              </Col>
              <Col span={12}>
                <CustomDatePicker
                  placeholder="Đến ngày"
                  showTime={{
                    format: TIME_FORMAT,
                    defaultValue: dayjs("23:59:59", "HH:mm:ss"),
                  }}
                  disabledDate={(date) => {
                    return stockFormData.valid ? dayjs(stockFormData.valid).isAfter(date) : dayjs().isAfter(date);
                  }}
                  value={stockFormData.fromValidTo ? dayjs(stockFormData.fromValidTo) : null}
                  format={"DD/MM/YYYY - HH:mm"}
                  onChange={onChangeValidFromTo}
                  className="w-full"
                />
                {stockFieldErrors?.fromValidTo ? <p className="text-red-500">{stockFieldErrors?.fromValidTo}</p> : null}
                {errors?.fromValidTo ? <p className="text-red-500">{errors?.fromValidTo}</p> : null}
              </Col>
            </Row>
          </FormItem>
          <FormItem label="Lặp lại theo">
            <Radio value="week" checked={repeatType === "week"} onChange={() => setRepeatType("week")}>
              Các ngày trong tuần
            </Radio>
            <Radio value="day" checked={repeatType === "day"} onChange={() => setRepeatType("day")}>
              Sau X ngày
            </Radio>
          </FormItem>
          {repeatType === "week" ? (
            <FormItem
              wrapperCol={{
                span: 18,
                offset: 6,
              }}
            >
              <Space>
                <Checkbox onChange={onCheckAllDaysOfWeek} indeterminate={indeterminate} checked={checkAllDayOfWeek}>
                  Các ngày trong tuần
                </Checkbox>
                <Checkbox.Group
                  options={DAYS_OF_WEEK}
                  value={stockFormData.everyDayofweek}
                  onChange={onCheckDayInWeek}
                />
              </Space>
            </FormItem>
          ) : (
            <FormItem label="Số ngày">
              <Input
                type="number"
                defaultValue={0}
                name="repeatAfter"
                maxLength={3}
                value={stockFormData.repeatAfter}
                onChange={(e) => onChangeStockFormData("repeatAfter", e.target.value)}
              />
            </FormItem>
          )}
          <FormItem label="Trừ các ngày" tooltip="Trừ các ngày">
            {stockFormData.exclusives.map((exclDate, indx) => (
              <Row className="mb-3" key={indx}>
                <Col span={12}>
                  <CustomRangePicker
                    showTime={{
                      format: TIME_FORMAT,
                      defaultValue: [dayjs("00:00:00", "HH:mm:ss"), dayjs("23:59:59", "HH:mm:ss")],
                    }}
                    placeholder={["Từ ngày", "Đến ngày"]}
                    format={"DD/MM/YYYY - HH:mm"}
                    value={[exclDate.from ? dayjs(exclDate.from) : null, exclDate.to ? dayjs(exclDate.to) : null]}
                    disabledDate={(date) => {
                      return (
                        dayjs(stockFormData.valid).isAfter(date) ||
                        dayjs(stockFormData.fromValidTo).isBefore(date) ||
                        getDisableExclusiveDate(date)
                      );
                    }}
                    onChange={(date, dateStr) =>
                      onChangeExclusiveDates(indx, (date && [date[0]?.toISOString(), date[1]?.toISOString()]) || [])
                    }
                    className="w-full max-w-[380px]"
                  />
                </Col>
                <Col flex={1}>
                  <Button type="text" className="leading-none" danger onClick={() => onRemoveOneExclusiveDate(indx)}>
                    Xoá
                  </Button>
                </Col>
              </Row>
            ))}
          </FormItem>
          <FormItem
            wrapperCol={{
              span: 18,
              offset: 6,
            }}
          >
            <Space>
              <Button onClick={onCloneExclusiveDate} size="small">
                Thêm
              </Button>
            </Space>
          </FormItem>
        </>
      ) : null}
      <hr className="mb-6" />
      <FormItem
        wrapperCol={{
          span: 18,
          offset: 6,
        }}
      >
        <Space>
          <Button onClick={onCancel}>Huỷ bỏ</Button>
          <Button
            type="primary"
            onClick={() =>
              handlerSubmit(
                {
                  ...stockFormData,
                  isCreateSeries: showCreateSeries,
                },
                onSubmitFormData,
              )
            }
            loading={loading}
          >
            Tạo kho
          </Button>
        </Space>
      </FormItem>
    </Form>
  );
};
export default StockFormContainer;
