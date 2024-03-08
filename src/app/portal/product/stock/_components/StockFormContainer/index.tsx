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
import { StockInventoryFormData } from "@/models/management/core/stockInventory.interface";
import { vietnameseTonesToUnderscoreKeyname } from "@/utils/helper";

import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import { CheckboxGroupProps } from "antd/es/checkbox";
import { isArray, isEmpty, isUndefined } from "lodash";
import { useFormSubmit, HandleSubmit } from "@/hooks/useFormSubmit";
import { stockSchema } from "../../../hooks/validation";
import {
    DATE_TIME_FORMAT,
    TIME_FORMAT,
    DAYS_OF_WEEK,
} from "@/constants/common";
import { IInventoryListRs } from "@/models/management/core/inventory.interface";
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.locale("en");
dayjs.locale("vi");

const { RangePicker } = DatePicker;
interface StockFormContainerProps {
    inventoryList?: IInventoryListRs["result"];
    onSubmit?: (
        { data }: { data: StockInventoryFormData },
        cb?: () => void,
    ) => void;
}
type TRepeatType = "day" | "week";

const StockFormContainer: React.FC<StockFormContainerProps> = ({
    inventoryList,
    onSubmit,
}) => {
    const initStockFormData = new StockInventoryFormData(
        0,
        "",
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
    const [inventory, setInventory] = useState<IInventoryListRs["result"][0]>();
    const [stockFormData, setStockFormData] = useState(initStockFormData);
    const [repeatType, setRepeatType] = useState<TRepeatType>("week");
    const [showCreateSeries, setCreateSeries] = useState(false);

    const { handlerSubmit, errors } = useFormSubmit<
        StockInventoryFormData & { isCreateSeries?: boolean }
    >({
        schema: stockSchema,
    });
    const [stockFieldErrors, setStockFieldErrors] =
        useState<Partial<Record<keyof StockInventoryFormData, string>>>();

    const { data: stockInventoryType, isLoading: isLoadingStockType } =
        useGetStockInventoryTypeCoreQuery(inventory?.type || "");

    const inventoryOptions = useMemo(() => {
        return inventoryList?.reduce<
            {
                value: number;
                label: string;
                data: IInventoryListRs["result"][0];
            }[]
        >((acc, inv) => {
            return [...acc, { value: inv.recId, label: inv.name, data: inv }];
        }, []);
    }, [inventoryList]);

    const stockInventoryTypeOptions = useMemo(() => {
        return (
            stockInventoryType?.reduce<{ label: string; value: string }[]>(
                (acc, type) => {
                    return [...acc, { label: type, value: type }];
                },
                [],
            ) || []
        );
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

    const onChangeInventory: SelectProps<
        number,
        { label: string; value: number; data: IInventoryListRs["result"][0] }
    >["onChange"] = (value, options) => {
        if (!isArray(options)) {
            setInventory(() => options.data);
            setStockFormData((prev) => ({
                ...prev,
                inventoryId: value,
                type: undefined,
            }));
        }
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
        if (
            isUndefined(stockFormData.valid) ||
            isUndefined(stockFormData.validTo)
        ) {
            message.error("Vui lòng Chọn ngày mở bán.");
            return;
        }
        if (date && date[1]?.isBefore(dayjs(stockFormData.validTo))) {
            message.error("Ngày kết thúc phải lớn hơn ngày kết thúc mở bán.");
            return;
        }
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

        stockFormData.exclusives.forEach((exclDate) => {
            if (
                exclDate.from &&
                exclDate.to &&
                date.isAfter(dayjs(exclDate.from, DATE_TIME_FORMAT)) &&
                date.isBefore(dayjs(exclDate.to, DATE_TIME_FORMAT))
            ) {
                isDisabled = true;
            }
        });

        return isDisabled;
    };

    const onSubmitFormData: HandleSubmit<StockInventoryFormData> = (data) => {
        onSubmit?.({ data }, () => {
            setStockFormData(initStockFormData);
            setStockFieldErrors(undefined);
            setCreateSeries(false);
        });
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
                label="Inventory"
                required
                validateStatus={errors?.inventoryId ? "error" : ""}
                help={errors?.inventoryId || ""}
            >
                <Select
                    onChange={onChangeInventory}
                    value={inventory?.recId}
                    options={inventoryOptions}
                    placeholder="Chọn inventory"
                />
            </FormItem>
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
                    placeholder="Chọn loại stock"
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
                    min={0}
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
                    showTime={{
                        format: TIME_FORMAT,
                        defaultValue: [
                            dayjs("00:00:00", "HH:mm:ss"),
                            dayjs("23:59:59", "HH:mm:ss"),
                        ],
                    }}
                    placeholder={["Từ ngày", "Đến ngày"]}
                    format={DATE_TIME_FORMAT}
                    value={[
                        stockFormData.valid
                            ? dayjs(stockFormData.valid, DATE_TIME_FORMAT)
                            : null,
                        stockFormData.validTo
                            ? dayjs(stockFormData.validTo, DATE_TIME_FORMAT)
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
                label="Ngày sử dụng (used)"
                required
                tooltip="Thời gian sử dụng (Checkin/Checkout || Depart date, return date) của Stock phải nằm sau ngày kết thúc mở bán."
                validateStatus={errors?.start || errors?.end ? "error" : ""}
                help={errors?.start || errors?.end || ""}
            >
                <RangePicker
                    showTime={{
                        format: TIME_FORMAT,
                        defaultValue: [
                            dayjs("00:00:00", "HH:mm:ss"),
                            dayjs("23:59:59", "HH:mm:ss"),
                        ],
                    }}
                    placeholder={["Từ ngày", "Đến ngày"]}
                    format={DATE_TIME_FORMAT}
                    value={[
                        stockFormData.start
                            ? dayjs(stockFormData.start, DATE_TIME_FORMAT)
                            : null,
                        stockFormData.end
                            ? dayjs(stockFormData.end, DATE_TIME_FORMAT)
                            : null,
                    ]}
                    disabledDate={(date) => {
                        return (
                            dayjs().isAfter(date) ||
                            dayjs(
                                stockFormData.validTo,
                                DATE_TIME_FORMAT,
                            ).isAfter(date)
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
                        label="Tạo series"
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
                                    showTime={{
                                        format: TIME_FORMAT,
                                        defaultValue: dayjs(
                                            "00:00:00",
                                            "HH:mm:ss",
                                        ),
                                    }}
                                    placeholder="Từ ngày"
                                    disabled
                                    value={
                                        stockFormData.valid
                                            ? dayjs(
                                                  stockFormData.valid,
                                                  DATE_TIME_FORMAT,
                                              )
                                            : null
                                    }
                                    format={DATE_TIME_FORMAT}
                                    className="w-full"
                                />
                            </Col>
                            <Col span={12}>
                                <DatePicker
                                    placeholder="Đến ngày"
                                    showTime={{
                                        format: TIME_FORMAT,
                                        defaultValue: dayjs(
                                            "23:59:59",
                                            "HH:mm:ss",
                                        ),
                                    }}
                                    disabledDate={(date) => {
                                        return stockFormData.valid
                                            ? dayjs(
                                                  stockFormData.valid,
                                              ).isAfter(date)
                                            : dayjs().isAfter(date);
                                    }}
                                    format={DATE_TIME_FORMAT}
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
                    <FormItem label="Trừ các ngày" tooltip="Trừ các ngày">
                        {stockFormData.exclusives.map((exclDate, indx) => (
                            <Row className="mb-3" key={indx}>
                                <Col span={12}>
                                    <RangePicker
                                        showTime={{
                                            format: TIME_FORMAT,
                                            defaultValue: [
                                                dayjs("00:00:00", "HH:mm:ss"),
                                                dayjs("23:59:59", "HH:mm:ss"),
                                            ],
                                        }}
                                        placeholder={["Từ ngày", "Đến ngày"]}
                                        format={DATE_TIME_FORMAT}
                                        value={[
                                            exclDate.from
                                                ? dayjs(
                                                      exclDate.from,
                                                      DATE_TIME_FORMAT,
                                                  )
                                                : null,
                                            exclDate.to
                                                ? dayjs(
                                                      exclDate.to,
                                                      DATE_TIME_FORMAT,
                                                  )
                                                : null,
                                        ]}
                                        disabledDate={(date) => {
                                            return (
                                                dayjs(
                                                    stockFormData.valid,
                                                    DATE_TIME_FORMAT,
                                                ).isAfter(date) ||
                                                dayjs(
                                                    stockFormData.fromValidTo,
                                                    DATE_TIME_FORMAT,
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
                            <Button onClick={onCloneExclusiveDate}>Thêm</Button>
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
                    >
                        Tạo Stock
                    </Button>
                </Space>
            </FormItem>
        </Form>
    );
};
export default StockFormContainer;
