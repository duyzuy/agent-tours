"use client";
import React, { useState, useMemo, useEffect } from "react";
import {
  Form,
  Input,
  Select,
  Row,
  Col,
  Checkbox,
  Space,
  Button,
  Radio,
  DatePickerProps,
  CheckboxProps,
  message,
  SelectProps,
  InputNumber,
  Divider,
} from "antd";
import dayjs from "dayjs";
import { isArray, isEmpty, isUndefined } from "lodash";
import FormItem from "@/components/base/FormItem";
import { vietnameseTonesToUnderscoreKeyname } from "@/utils/helper";
import { RangePickerProps } from "antd/es/date-picker";
import { CheckboxGroupProps } from "antd/es/checkbox";
import { useFormSubmit, HandleSubmit } from "@/hooks/useFormSubmit";
import { SellableFormData } from "@/models/management/core/sellable.interface";
import { sellableSchema } from "../../schema/sellable.schema";
import { DATE_TIME_FORMAT, TIME_FORMAT, DAYS_OF_WEEK } from "@/constants/common";
import { ITemplateSaleableListRs } from "@/models/management/core/templateSellable.interface";
import CustomRangePicker from "@/components/admin/CustomRangePicker";
import CustomDatePicker from "@/components/admin/CustomDatePicker";
import { isEqualObject } from "@/utils/compare";

interface SellableFormContainerProps {
  template?: ITemplateSaleableListRs["result"][0];
  templateList?: ITemplateSaleableListRs["result"];
  onSubmit?: (data: SellableFormData, cb?: () => void) => void;
  onCancel: () => void;
  onWatch?: ({ isChanged }: { isChanged: boolean }) => void;
}
type TRepeatType = "day" | "week";

const SellableFormContainer: React.FC<SellableFormContainerProps> = ({
  template,
  templateList,
  onSubmit,
  onCancel,
  onWatch,
}) => {
  const initSellableFormData = useMemo(() => {
    return new SellableFormData(
      template?.recId,
      template?.type,
      undefined,
      0,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      [],
      0,
      [],
    );
  }, [template]);

  const [sellableFormData, setSellableFormData] = useState(initSellableFormData);
  const [repeatType, setRepeatType] = useState<TRepeatType>("week");
  const [showCreateSeries, setCreateSeries] = useState(false);

  const { handlerSubmit, errors } = useFormSubmit<SellableFormData & { isCreateSeries?: boolean }>({
    schema: sellableSchema,
  });
  const [sellableErrors, setSellableErrors] = useState<Partial<Record<keyof SellableFormData, string>>>();

  /**
   *
   * @param key
   * @param value
   *
   * Handle Stock form data
   */
  const onChangeSellableForm = (key: keyof SellableFormData, value: SellableFormData[keyof SellableFormData]) => {
    if (key === "codeAffix" && typeof value === "string") {
      value = vietnameseTonesToUnderscoreKeyname(value).toLocaleUpperCase();
    }

    if (
      (key === "repeatAfter" && !isEmpty(value) && !isNaN(value as number)) ||
      (key === "cap" && !isEmpty(value) && !isNaN(value as number))
    ) {
      value = Number(value);
    }
    setSellableFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onChangeValidDateRange: RangePickerProps["onChange"] = (date, dateStr) => {
    setSellableFormData((prev) => ({
      ...prev,
      valid: date ? date[0]?.toISOString() : undefined,
      validTo: date ? date[1]?.toISOString() : undefined,
      closeDate: date ? date[1]?.toISOString() : undefined, // default when create closeDate equal ValidTo date
      fromValidTo: undefined,
    }));
  };

  const onChangeUsedDateRange: RangePickerProps["onChange"] = (date) => {
    if (isUndefined(sellableFormData.valid) || isUndefined(sellableFormData.validTo)) {
      message.error("Vui lòng Chọn ngày mở bán trước.");
      return;
    }

    if (date && date[1] && date[1].isBefore(dayjs(sellableFormData.validTo))) {
      message.error("Ngày kết thúc sử dụng phải sau ngày kết thúc mở bán.");
      return;
    }
    setSellableFormData((prev) => ({
      ...prev,
      start: date ? date[0]?.toISOString() : undefined,
      end: date ? date[1]?.toISOString() : undefined,
    }));
  };
  const onChangeValidFromTo: DatePickerProps["onChange"] = (date, dateStr) => {
    if (isUndefined(sellableFormData.valid) || isUndefined(sellableFormData.validTo)) {
      message.error("Vui lòng Chọn ngày mở bán trước.");
      return;
    }

    setSellableFormData((prev) => ({
      ...prev,
      fromValidTo: date?.toISOString(),
    }));
  };

  const onChangeRepeatType = (type: "week" | "day") => {
    setRepeatType(type);
  };
  const onCheckAllDaysOfWeek: CheckboxProps["onChange"] = (e) => {
    let values: string[] = [];
    if (e.target.checked) {
      values = DAYS_OF_WEEK.reduce<string[]>((acc, day) => {
        return [...acc, day.value];
      }, []);
    }
    setSellableFormData((prev) => ({
      ...prev,
      everyDayofweek: [...(values as string[])],
    }));
  };
  const indeterminate = useMemo(() => {
    return sellableFormData.everyDayofweek.length > 0 && sellableFormData.everyDayofweek.length < DAYS_OF_WEEK.length;
  }, [sellableFormData.everyDayofweek]);

  const checkAllDayOfWeek = useMemo(() => {
    return sellableFormData.everyDayofweek.length === DAYS_OF_WEEK.length;
  }, [sellableFormData.everyDayofweek]);

  const onCheckDayInWeek: CheckboxGroupProps["onChange"] = (values) => {
    setSellableFormData((prev) => ({
      ...prev,
      everyDayofweek: [...(values as string[])],
    }));
  };

  const onCloneExclusiveDate = () => {
    if (isEmpty(sellableFormData.fromValidTo)) {
      message.info("Chọn ngày kết thúc khởi tạo series.");
      setSellableErrors((prev) => ({
        ...prev,
        fromValidTo: "Chọn ngày kết thúc.",
      }));
      return;
    } else {
      let errors = { ...sellableErrors };
      delete errors.fromValidTo;
      setSellableErrors(() => errors);
    }
    setSellableFormData((prev) => ({
      ...prev,
      exclusives: [...prev.exclusives, { from: undefined, to: undefined }],
    }));
  };
  const onRemoveOneExclusiveDate = (index: number) => {
    const cloneExclusiveDates = [...sellableFormData.exclusives];
    cloneExclusiveDates.splice(index, 1);
    setSellableFormData((prev) => ({
      ...prev,
      exclusives: [...cloneExclusiveDates],
    }));
  };
  const onChangeExclusiveDates = (exclIndx: number, dates: (string | undefined)[]) => {
    const exclusiveDates = [...sellableFormData.exclusives];
    exclusiveDates.splice(exclIndx, 1, {
      from: dates[0],
      to: dates[1],
    });

    setSellableFormData((prev) => ({
      ...prev,
      exclusives: [...exclusiveDates],
    }));
  };

  const getDisableExclusiveDate = (date: dayjs.Dayjs) => {
    let isDisabled = false;

    sellableFormData.exclusives.forEach((exclDate) => {
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
  const onChangeTempleateSellable: SelectProps<number, ITemplateSaleableListRs["result"][0]>["onChange"] = (
    value,
    option,
  ) => {
    setSellableFormData((prev) => ({
      ...prev,
      sellableTemplateId: value,
      type: isArray(option) ? option[0].type : option.type,
    }));
  };
  const onSubmitFormData: HandleSubmit<SellableFormData> = (data) => {
    onSubmit?.(data, () => {
      setSellableFormData(initSellableFormData);
      setSellableErrors(undefined);
      setCreateSeries(false);
    });
  };

  useEffect(() => {
    onWatch?.({
      isChanged: isEqualObject(
        ["validTo", "valid", "sellableTemplateId", "cap"],
        initSellableFormData,
        sellableFormData,
      ),
    });
  }, [sellableFormData]);

  return (
    <Form
      layout="horizontal"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      colon={false}
      labelWrap
      className="max-w-4xl"
    >
      <FormItem
        label="Sản phẩm"
        required
        validateStatus={errors?.sellableTemplateId ? "error" : ""}
        help={errors?.sellableTemplateId || ""}
      >
        <Select<number, ITemplateSaleableListRs["result"][0]>
          fieldNames={{ value: "recId", label: "name" }}
          placeholder="Chọn nhóm sản phẩm"
          defaultValue={sellableFormData.sellableTemplateId}
          value={sellableFormData.sellableTemplateId}
          onChange={onChangeTempleateSellable}
          options={template ? [template] : templateList}
          disabled={!isUndefined(template)}
          className="flex-1"
        />
      </FormItem>
      <FormItem label="Affix Code" validateStatus={errors?.codeAffix ? "error" : ""} help={errors?.codeAffix || ""}>
        <Input
          placeholder="Affix code"
          value={sellableFormData.codeAffix}
          onChange={(ev) => onChangeSellableForm("codeAffix", ev.target.value)}
        />
      </FormItem>
      <FormItem label="Số lượng" required validateStatus={errors?.cap ? "error" : ""} help={errors?.cap || ""}>
        <InputNumber
          placeholder="Số lượng"
          type="number"
          min={0}
          name="cap"
          value={sellableFormData.cap}
          onChange={(value) => onChangeSellableForm("cap", value || 0)}
          className="!w-full max-w-[380px]"
        />
      </FormItem>

      <FormItem
        label="Ngày mở bán (valid date)"
        required
        tooltip="Là Hiển thị và mở bán trên website."
        validateStatus={errors?.valid || errors?.validTo ? "error" : ""}
        help={errors?.valid || errors?.validTo || ""}
      >
        <CustomRangePicker
          showTime={{
            format: TIME_FORMAT,
            hideDisabledOptions: true,
            defaultValue: [dayjs("00:00:00", "HH:mm:ss"), dayjs("23:59:59", "HH:mm:ss")],
          }}
          placeholder={["Từ ngày", "Đến ngày"]}
          format={"DD/MM/YYYY - HH:mm"}
          value={[
            sellableFormData.valid ? dayjs(sellableFormData.valid) : null,
            sellableFormData.validTo ? dayjs(sellableFormData.validTo) : null,
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
        tooltip="Thời gian hiệu lực của Stock, Ngày sử dụng phải nằm trong khoảng ngày mở bán"
        validateStatus={errors?.start || errors?.end ? "error" : ""}
        help={errors?.start || errors?.end || ""}
      >
        <CustomRangePicker
          showTime={{
            format: TIME_FORMAT,
            hideDisabledOptions: true,
            defaultValue: [dayjs("00:00:00", "HH:mm:ss"), dayjs("23:59:59", "HH:mm:ss")],
          }}
          placeholder={["Từ ngày", "Đến ngày"]}
          format={"DD/MM/YYYY - HH:mm"}
          value={[
            sellableFormData.start ? dayjs(sellableFormData.start) : null,
            sellableFormData.end ? dayjs(sellableFormData.end) : null,
          ]}
          disabledDate={(date) => {
            return sellableFormData.validTo ? dayjs(sellableFormData.validTo).isAfter(date) : dayjs().isAfter(date);
          }}
          onChange={onChangeUsedDateRange}
          className="w-full max-w-[380px]"
        />
      </FormItem>
      <Divider />
      <FormItem label="Tuỳ chọn nâng cao">
        <Checkbox checked={showCreateSeries} onChange={() => setCreateSeries((show) => !show)}>
          Hiển thị các tuỳ chọn nâng cao và khởi tạo series.
        </Checkbox>
      </FormItem>
      {showCreateSeries ? (
        <>
          <FormItem
            label="Tạo series"
            tooltip="Tạo nhiều ngày mở bán ngày mở bán (Valid date)"
            validateStatus={sellableErrors?.fromValidTo || errors?.fromValidTo ? "error" : ""}
          >
            <Row gutter={16}>
              <Col span={12}>
                <CustomDatePicker
                  showTime={{ format: TIME_FORMAT }}
                  placeholder="Từ ngày"
                  disabled
                  value={
                    sellableFormData.valid
                      ? dayjs(sellableFormData.valid, {
                          format: DATE_TIME_FORMAT,
                        })
                      : null
                  }
                  format={"DD/MM/YYYY - HH:mm"}
                  className="w-full"
                />
              </Col>
              <Col span={12}>
                <CustomDatePicker
                  placeholder="Đến ngày"
                  showTime={{
                    format: TIME_FORMAT,
                    hideDisabledOptions: true,
                    defaultValue: dayjs("23:59:59", "HH:mm:ss"),
                  }}
                  value={
                    sellableFormData.fromValidTo
                      ? dayjs(sellableFormData.fromValidTo, { format: DATE_TIME_FORMAT })
                      : null
                  }
                  disabledDate={(date) => {
                    return sellableFormData.valid ? dayjs(sellableFormData.valid).isAfter(date) : dayjs().isAfter(date);
                  }}
                  format={"DD/MM/YYYY - HH:mm"}
                  onChange={onChangeValidFromTo}
                  className="w-full"
                />
                {sellableErrors?.fromValidTo ? <p className="text-red-500">{sellableErrors?.fromValidTo}</p> : null}
                {errors?.fromValidTo ? <p className="text-red-500">{errors?.fromValidTo}</p> : null}
              </Col>
            </Row>
          </FormItem>
          <FormItem label="Lặp lại theo">
            <Radio value="week" checked={repeatType === "week"} onChange={() => onChangeRepeatType("week")}>
              Các ngày trong tuần
            </Radio>
            <Radio value="day" checked={repeatType === "day"} onChange={() => onChangeRepeatType("day")}>
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
                  value={sellableFormData.everyDayofweek}
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
                value={sellableFormData.repeatAfter}
                onChange={(e) => onChangeSellableForm("repeatAfter", e.target.value)}
              />
            </FormItem>
          )}
          <FormItem label="Trừ các ngày" tooltip="Trừ các ngày trong khoảng tạo series.">
            {sellableFormData.exclusives.map((exclDate, indx) => (
              <Row className="mb-3" key={indx}>
                <Col span={12}>
                  <CustomRangePicker
                    showTime={{
                      format: TIME_FORMAT,
                      hideDisabledOptions: true,
                      defaultValue: [dayjs("00:00:00", "HH:mm:ss"), dayjs("23:59:59", "HH:mm:ss")],
                    }}
                    placeholder={["Từ ngày", "Đến ngày"]}
                    format={"DD/MM/YYYY - HH:mm"}
                    value={[exclDate.from ? dayjs(exclDate.from) : null, exclDate.to ? dayjs(exclDate.to) : null]}
                    disabledDate={(date) => {
                      return (
                        dayjs(sellableFormData.valid).isAfter(date) ||
                        dayjs(sellableFormData.fromValidTo).isBefore(date) ||
                        getDisableExclusiveDate(date)
                      );
                    }}
                    onChange={(date, dateStr) =>
                      onChangeExclusiveDates(indx, (date && [date[0]?.toISOString(), date[1]?.toISOString()]) || [])
                    }
                    className="w-full"
                  />
                </Col>
                <Col flex={1}>
                  <Button type="text" className="leading-none" danger onClick={() => onRemoveOneExclusiveDate(indx)}>
                    Xoá
                  </Button>
                </Col>
              </Row>
            ))}
            <Button onClick={onCloneExclusiveDate} type="dashed">
              Thêm
            </Button>
          </FormItem>
        </>
      ) : null}
      <Divider />
      <FormItem
        wrapperCol={{
          span: 18,
          offset: 6,
        }}
      >
        <Space>
          <Button onClick={onCancel} className="w-[120px]">
            Huỷ bỏ
          </Button>
          <Button
            type="primary"
            onClick={() =>
              handlerSubmit(
                {
                  ...sellableFormData,
                  isCreateSeries: showCreateSeries,
                },
                onSubmitFormData,
              )
            }
            className="w-[120px]"
          >
            Lưu
          </Button>
        </Space>
      </FormItem>
    </Form>
  );
};
export default SellableFormContainer;
