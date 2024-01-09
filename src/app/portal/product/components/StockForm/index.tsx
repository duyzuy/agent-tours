"use client";
import React, { useState, useMemo, useCallback } from "react";
import {
    Form,
    Input,
    Select,
    Row,
    Col,
    DatePicker,
    Checkbox,
    Space,
    Button,
    Radio,
    SelectProps,
    DatePickerProps,
    CheckboxProps,
    message,
} from "antd";
import FormItem from "@/components/base/FormItem";
import { useGetStockInventoryTypeCoreQuery } from "@/queries/core/stockInventory";
import { StockInventoryFormData } from "@/models/management/core/stockInventory.interface";
import { vietnameseTonesToUnderscoreKeyname } from "@/utils/helper";

import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import { CheckboxGroupProps } from "antd/es/checkbox";
import { isEmpty } from "lodash";
import { TStockErrorsField } from "../../hooks/useCRUDStockInventory";
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.locale("en");
dayjs.locale("vi");

const { RangePicker } = DatePicker;
interface StockFormProps {
    inventoryId: number;
    inventoryType: string;
    onSubmit?: (
        {
            data,
            isCreateSeries,
        }: { data: StockInventoryFormData; isCreateSeries: boolean },
        cb?: () => void,
    ) => void;
    errors?: TStockErrorsField;
}
type TRepeatType = "day" | "week";
export const DATE_FORMAT = "DDMMMYY HH:mm";
export const TIME_FORMAT = "HH:mm";
//  Monday Tuesday Wednesday Thursday Friday Saturday
const DAYS_OF_WEEK = [
    { label: "CN", value: "Sunday" },
    { label: "T2", value: "Monday" },
    { label: "T3", value: "Tuesday" },
    { label: "T4", value: "Wednesday" },
    { label: "T5", value: "Thursday" },
    { label: "T6", value: "Friday" },
    { label: "T7", value: "Saturday" },
];
const StockForm: React.FC<StockFormProps> = ({
    inventoryId,
    inventoryType,
    onSubmit,
    errors,
}) => {
    const initStockFormData = new StockInventoryFormData(
        inventoryId,
        "",
        "",
        "",
        0,
        undefined,
        undefined,
        undefined,
        undefined,
        "",
        [],
        0,
        [],
    );

    const [stockFormData, setStockFormData] = useState(initStockFormData);
    const [repeatType, setRepeatType] = useState<TRepeatType>("week");
    const [showCreateSeries, setCreateSeries] = useState(false);

    const [stockFieldErrors, setStockFieldErrors] =
        useState<TStockErrorsField>();
    const { data: stockInventoryType, isLoading: isLoadingStockType } =
        useGetStockInventoryTypeCoreQuery(inventoryType);

    const stockInventoryTypeOptions = useMemo(() => {
        let options: SelectProps["options"] = [
            { label: "Chọn loại Stock", value: "" },
        ];

        if (stockInventoryType) {
            stockInventoryType.forEach((item) => {
                options = [...(options || []), { value: item, label: item }];
            });
        }
        return options;
    }, [stockInventoryType]);

    /**
     *
     * @param key
     * @param value
     *
     * Handle Stock form data
     */
    const onChangeStockFormData = (
        key: keyof StockInventoryFormData,
        value: StockInventoryFormData[keyof StockInventoryFormData],
    ) => {
        if (key === "code" && typeof value === "string") {
            value =
                vietnameseTonesToUnderscoreKeyname(value).toLocaleUpperCase();
        }

        if (
            (key === "repeatAfter" &&
                !isEmpty(value) &&
                !isNaN(value as number)) ||
            (key === "cap" && !isEmpty(value) && !isNaN(value as number))
        ) {
            value = Number(value);
        }
        setStockFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const onChangeValidDateRange: RangePickerProps["onChange"] = (
        date,
        dateStr,
    ) => {
        setStockFormData((prev) => ({
            ...prev,
            valid: dateStr[0],
            validTo: dateStr[1],
        }));
    };

    const onChangeUsedDateRange: RangePickerProps["onChange"] = (
        date,
        dateStr,
    ) => {
        setStockFormData((prev) => ({
            ...prev,
            start: dateStr[0],
            end: dateStr[1],
        }));
    };
    const onChangeValidFromTo: DatePickerProps["onChange"] = (
        date,
        dateStr,
    ) => {
        setStockFormData((prev) => ({
            ...prev,
            fromValidTo: dateStr,
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
        setStockFormData((prev) => ({
            ...prev,
            everyDayofweek: [...(values as string[])],
        }));
    };
    const indeterminate = useMemo(() => {
        return (
            stockFormData.everyDayofweek.length > 0 &&
            stockFormData.everyDayofweek.length < DAYS_OF_WEEK.length
        );
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
            exclusives: [
                ...prev.exclusives,
                { from: undefined, to: undefined },
            ],
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
    const onChangeExclusiveDates = (
        exclIndx: number,
        dateStr: [string, string],
    ) => {
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
        //if (!stockFormData.exclusives.length) return isDisable;

        stockFormData.exclusives.forEach((exclDate) => {
            if (
                exclDate.from &&
                exclDate.to &&
                date.isAfter(dayjs(exclDate.from, DATE_FORMAT)) &&
                date.isBefore(dayjs(exclDate.to, DATE_FORMAT))
            ) {
                isDisabled = true;
            }
        });

        return isDisabled;
    };

    const onSubmitFormData = () => {
        onSubmit?.(
            { data: stockFormData, isCreateSeries: showCreateSeries },
            () => {
                setStockFormData(initStockFormData);
                setStockFieldErrors(undefined);
            },
        );
    };
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
                label="Type"
                required
                validateStatus={errors?.type ? "error" : ""}
                help={errors?.type || ""}
            >
                <Select
                    loading={isLoadingStockType}
                    defaultValue={stockFormData.type}
                    onChange={(value) => onChangeStockFormData("type", value)}
                    value={stockFormData.type}
                    options={stockInventoryTypeOptions}
                />
            </FormItem>
            <FormItem
                label="Code"
                required
                validateStatus={errors?.code ? "error" : ""}
                help={errors?.code || ""}
            >
                <Input
                    placeholder="Stock code"
                    value={stockFormData.code}
                    onChange={(ev) =>
                        onChangeStockFormData("code", ev.target.value)
                    }
                />
            </FormItem>
            <FormItem
                label="Mô tả"
                required
                validateStatus={errors?.description ? "error" : ""}
                help={errors?.description || ""}
            >
                <Input.TextArea
                    rows={4}
                    value={stockFormData.description}
                    onChange={(ev) =>
                        onChangeStockFormData("description", ev.target.value)
                    }
                ></Input.TextArea>
            </FormItem>
            <FormItem
                label="Số lượng"
                required
                validateStatus={errors?.cap ? "error" : ""}
                help={errors?.cap || ""}
            >
                <Input
                    placeholder="Số lượng"
                    type="number"
                    name="cap"
                    value={stockFormData.cap}
                    onChange={(ev) =>
                        onChangeStockFormData("cap", ev.target.value)
                    }
                />
            </FormItem>

            <FormItem
                label="Ngày mở bán (valid date)"
                required
                tooltip="Là ngày được phép mở bán"
                validateStatus={errors?.valid || errors?.validTo ? "error" : ""}
                help={errors?.valid || errors?.validTo || ""}
            >
                <RangePicker
                    showTime={{ format: "HH:mm" }}
                    placeholder={["Date from", "Date to"]}
                    format={DATE_FORMAT}
                    value={[
                        stockFormData.valid
                            ? dayjs(stockFormData.valid, DATE_FORMAT)
                            : null,
                        stockFormData.validTo
                            ? dayjs(stockFormData.validTo, DATE_FORMAT)
                            : null,
                    ]}
                    disabledDate={(date) => {
                        return dayjs().isAfter(date);
                    }}
                    onChange={onChangeValidDateRange}
                    className="w-full max-w-[320px]"
                />
            </FormItem>
            <FormItem
                label="Ngày áp dụng (used)"
                required
                tooltip="Thời gian hiệu lực của Stock"
                validateStatus={errors?.start || errors?.end ? "error" : ""}
                help={errors?.start || errors?.end || ""}
            >
                <RangePicker
                    showTime={{ format: "HH:mm" }}
                    placeholder={["Date from", "Date to"]}
                    format={DATE_FORMAT}
                    value={[
                        stockFormData.start
                            ? dayjs(stockFormData.start, DATE_FORMAT)
                            : null,
                        stockFormData.end
                            ? dayjs(stockFormData.end, DATE_FORMAT)
                            : null,
                    ]}
                    disabledDate={(date) => {
                        return dayjs().isAfter(date);
                    }}
                    onChange={onChangeUsedDateRange}
                    className="w-full max-w-[320px]"
                />
            </FormItem>

            <hr className="mb-6" />
            <FormItem label="Tuỳ chọn nâng cao">
                <Space>
                    <Checkbox
                        checked={showCreateSeries}
                        onChange={() => setCreateSeries((show) => !show)}
                    >
                        Hiển thị các tuỳ chọn nâng cao và khởi tạo series stocks
                        theo ngày mở bán (Valid date).
                    </Checkbox>
                </Space>
            </FormItem>
            {showCreateSeries ? (
                <>
                    <FormItem
                        label="Tạo series ngày mở bán"
                        tooltip="Tạo nhiều ngày mở bán ngày mở bán (Valid date)"
                        validateStatus={
                            stockFieldErrors?.fromValidTo || errors?.fromValidTo
                                ? "error"
                                : ""
                        }
                    >
                        <Row gutter={16}>
                            <Col span={12}>
                                <DatePicker
                                    showTime={{ format: "HH:mm" }}
                                    placeholder="Start date"
                                    disabled
                                    value={
                                        stockFormData.valid
                                            ? dayjs(
                                                  stockFormData.valid,
                                                  DATE_FORMAT,
                                              )
                                            : null
                                    }
                                    format={DATE_FORMAT}
                                    className="w-full"
                                />
                            </Col>
                            <Col span={12}>
                                <DatePicker
                                    placeholder="End date"
                                    showTime={{ format: "HH:mm" }}
                                    disabledDate={(date) => {
                                        return stockFormData.valid
                                            ? dayjs(
                                                  stockFormData.valid,
                                              ).isAfter(date)
                                            : dayjs().isAfter(date);
                                    }}
                                    format={DATE_FORMAT}
                                    onChange={onChangeValidFromTo}
                                    className="w-full"
                                />
                                {stockFieldErrors?.fromValidTo ? (
                                    <p className="text-red-500">
                                        {stockFieldErrors?.fromValidTo}
                                    </p>
                                ) : null}
                                {errors?.fromValidTo ? (
                                    <p className="text-red-500">
                                        {errors?.fromValidTo}
                                    </p>
                                ) : null}
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="Lặp lại theo">
                        <Radio
                            value="week"
                            checked={repeatType === "week"}
                            onChange={() => onChangeRepeatType("week")}
                        >
                            Các ngày trong tuần
                        </Radio>
                        <Radio
                            value="day"
                            checked={repeatType === "day"}
                            onChange={() => onChangeRepeatType("day")}
                        >
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
                                <Checkbox
                                    onChange={onCheckAllDaysOfWeek}
                                    indeterminate={indeterminate}
                                    checked={checkAllDayOfWeek}
                                >
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
                                onChange={(e) =>
                                    onChangeStockFormData(
                                        "repeatAfter",
                                        e.target.value,
                                    )
                                }
                            />
                        </FormItem>
                    )}
                    <FormItem label="Exclusive" tooltip="Trừ các ngày">
                        {stockFormData.exclusives.map((exclDate, indx) => (
                            <Row className="mb-3" key={indx}>
                                <Col span={12}>
                                    <RangePicker
                                        showTime={{ format: "HH:mm" }}
                                        placeholder={["Date from", "Date to"]}
                                        format={DATE_FORMAT}
                                        value={[
                                            exclDate.from
                                                ? dayjs(
                                                      exclDate.from,
                                                      DATE_FORMAT,
                                                  )
                                                : null,
                                            exclDate.to
                                                ? dayjs(
                                                      exclDate.to,
                                                      DATE_FORMAT,
                                                  )
                                                : null,
                                        ]}
                                        disabledDate={(date) => {
                                            return (
                                                dayjs(
                                                    stockFormData.valid,
                                                    DATE_FORMAT,
                                                ).isAfter(date) ||
                                                dayjs(
                                                    stockFormData.fromValidTo,
                                                    DATE_FORMAT,
                                                ).isBefore(date) ||
                                                getDisableExclusiveDate(date)
                                            );
                                        }}
                                        onChange={(date, dateStr) =>
                                            onChangeExclusiveDates(
                                                indx,
                                                dateStr,
                                            )
                                        }
                                        className="w-full"
                                    />
                                </Col>
                                <Col flex={1}>
                                    <Button
                                        type="text"
                                        className="leading-none"
                                        danger
                                        onClick={() =>
                                            onRemoveOneExclusiveDate(indx)
                                        }
                                    >
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
                            <Button onClick={onCloneExclusiveDate}>
                                Thêm exclusive date
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
                    <Button>Huỷ bỏ</Button>
                    <Button type="primary" onClick={onSubmitFormData}>
                        Tạo Stock
                    </Button>
                </Space>
            </FormItem>
        </Form>
    );
};
export default StockForm;
