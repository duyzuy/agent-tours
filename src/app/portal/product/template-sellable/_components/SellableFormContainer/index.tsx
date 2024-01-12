"use client";
import React, { useState, useMemo } from "react";
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

import { vietnameseTonesToUnderscoreKeyname } from "@/utils/helper";

import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import { CheckboxGroupProps } from "antd/es/checkbox";
import { isEmpty, isUndefined } from "lodash";
import { useFormSubmit, HandleSubmit } from "@/hooks/useFormSubmit";
import { SellableFormData } from "@/models/management/core/sellable.interface";
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.locale("en");
dayjs.locale("vi");

const { RangePicker } = DatePicker;
interface SellableFormContainerProps {
    templateSellableId: number;
    inventoryType: string;
    onSubmit?: ({ data }: { data: SellableFormData }, cb?: () => void) => void;
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
const SellableFormContainer: React.FC<SellableFormContainerProps> = ({
    templateSellableId,
    inventoryType,
    onSubmit,
    // errors,
}) => {
    const initSellableFormdata = new SellableFormData(
        templateSellableId,
        "",
        "",
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

    const [sellableFormData, setSellableFormData] =
        useState(initSellableFormdata);
    const [repeatType, setRepeatType] = useState<TRepeatType>("week");
    const [showCreateSeries, setCreateSeries] = useState(false);

    const { handlerSubmit, errors } = useFormSubmit<
        SellableFormData & { isCreateSeries?: boolean }
    >({
        // schema: stockSchema,
    });
    const [stockFieldErrors, setStockFieldErrors] =
        useState<Partial<Record<keyof SellableFormData, string>>>();
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
        key: keyof SellableFormData,
        value: SellableFormData[keyof SellableFormData],
    ) => {
        if (key === "codeAffix" && typeof value === "string") {
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
        setSellableFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const onChangeValidDateRange: RangePickerProps["onChange"] = (
        date,
        dateStr,
    ) => {
        setSellableFormData((prev) => ({
            ...prev,
            valid: dateStr[0],
            validTo: dateStr[1],
        }));
    };

    const onChangeUsedDateRange: RangePickerProps["onChange"] = (
        date,
        dateStr,
    ) => {
        if (
            isUndefined(sellableFormData.valid) ||
            isUndefined(sellableFormData.validTo)
        ) {
            message.error("Vui lòng Chọn ngày mở bán.");
            return;
        }
        setSellableFormData((prev) => ({
            ...prev,
            start: dateStr[0],
            end: dateStr[1],
        }));
    };
    const onChangeValidFromTo: DatePickerProps["onChange"] = (
        date,
        dateStr,
    ) => {
        setSellableFormData((prev) => ({
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
        setSellableFormData((prev) => ({
            ...prev,
            everyDayofweek: [...(values as string[])],
        }));
    };
    const indeterminate = useMemo(() => {
        return (
            sellableFormData.everyDayofweek.length > 0 &&
            sellableFormData.everyDayofweek.length < DAYS_OF_WEEK.length
        );
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
        setSellableFormData((prev) => ({
            ...prev,
            exclusives: [
                ...prev.exclusives,
                { from: undefined, to: undefined },
            ],
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
    const onChangeExclusiveDates = (
        exclIndx: number,
        dateStr: [string, string],
    ) => {
        const exclusiveDates = [...sellableFormData.exclusives];
        exclusiveDates.splice(exclIndx, 1, {
            from: dateStr[0],
            to: dateStr[1],
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
                date.isAfter(dayjs(exclDate.from, DATE_FORMAT)) &&
                date.isBefore(dayjs(exclDate.to, DATE_FORMAT))
            ) {
                isDisabled = true;
            }
        });

        return isDisabled;
    };

    const onSubmitFormData: HandleSubmit<SellableFormData> = (data) => {
        // onSubmit?.({ data }, () => {
        //     setSellableFormData(initStockFormData);
        //     setStockFieldErrors(undefined);
        // });
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
                    defaultValue={sellableFormData.type}
                    onChange={(value) => onChangeStockFormData("type", value)}
                    value={sellableFormData.type}
                    options={stockInventoryTypeOptions}
                />
            </FormItem>
            <FormItem
                label="Code"
                required
                validateStatus={errors?.codeAffix ? "error" : ""}
                help={errors?.codeAffix || ""}
            >
                <Input
                    placeholder="Stock code"
                    value={sellableFormData.codeAffix}
                    onChange={(ev) =>
                        onChangeStockFormData("codeAffix", ev.target.value)
                    }
                />
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
                    min={0}
                    name="cap"
                    value={sellableFormData.cap}
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
                        sellableFormData.valid
                            ? dayjs(sellableFormData.valid, DATE_FORMAT)
                            : null,
                        sellableFormData.validTo
                            ? dayjs(sellableFormData.validTo, DATE_FORMAT)
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
                tooltip="Thời gian hiệu lực của Stock, Ngày sử dụng phải nằm trong khoảng ngày mở bán"
                validateStatus={errors?.start || errors?.end ? "error" : ""}
                help={errors?.start || errors?.end || ""}
            >
                <RangePicker
                    showTime={{ format: "HH:mm" }}
                    placeholder={["Start date", "End date"]}
                    format={DATE_FORMAT}
                    value={[
                        sellableFormData.start
                            ? dayjs(sellableFormData.start, DATE_FORMAT)
                            : null,
                        sellableFormData.end
                            ? dayjs(sellableFormData.end, DATE_FORMAT)
                            : null,
                    ]}
                    disabledDate={(date) => {
                        return (
                            dayjs().isAfter(date) ||
                            dayjs(sellableFormData.valid, DATE_FORMAT).isAfter(
                                date,
                            ) ||
                            dayjs(
                                sellableFormData.validTo,
                                DATE_FORMAT,
                            ).isBefore(date)
                        );
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
                                        sellableFormData.valid
                                            ? dayjs(
                                                  sellableFormData.valid,
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
                                        return sellableFormData.valid
                                            ? dayjs(
                                                  sellableFormData.valid,
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
                        {sellableFormData.exclusives.map((exclDate, indx) => (
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
                                                    sellableFormData.valid,
                                                    DATE_FORMAT,
                                                ).isAfter(date) ||
                                                dayjs(
                                                    sellableFormData.fromValidTo,
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
                    <Button type="primary" onClick={() => {}}>
                        Tạo Stock
                    </Button>
                </Space>
            </FormItem>
        </Form>
    );
};
export default SellableFormContainer;
