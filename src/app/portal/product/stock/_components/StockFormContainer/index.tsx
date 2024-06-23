"use client";
import React, { useState, useMemo } from "react";
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
    SelectProps,
    DatePickerProps,
    CheckboxProps,
    message,
} from "antd";
import FormItem from "@/components/base/FormItem";
import { useGetStockInventoryTypeCoreQuery } from "@/queries/core/stockInventory";
import { vietnameseTonesToUnderscoreKeyname } from "@/utils/helper";
import { RangePickerProps } from "antd/es/date-picker";
import { CheckboxGroupProps } from "antd/es/checkbox";
import { isArray, isEmpty, isUndefined } from "lodash";
import { useFormSubmit, HandleSubmit } from "@/hooks/useFormSubmit";
import { StockFormData } from "../../modules/stock.interface";
import { stockSchema } from "../../schema/stock.schema";
import {
    DATE_TIME_FORMAT,
    TIME_FORMAT,
    DAYS_OF_WEEK,
} from "@/constants/common";
import { IInventoryListRs } from "@/models/management/core/inventory.interface";
import CustomRangePicker from "@/components/admin/CustomRangePicker";
import dayjs from "dayjs";
import CustomDatePicker from "@/components/admin/CustomDatePicker";

interface StockFormContainerProps {
    curInventory?: IInventoryListRs["result"][0]; // Handle when in single of inventory page.
    inventoryList?: IInventoryListRs["result"];
    onSubmit?: ({ data }: { data: StockFormData }, cb?: () => void) => void;
    onCancel: () => void;
    loading?: boolean;
}
type TRepeatType = "day" | "week";

const StockFormContainer: React.FC<StockFormContainerProps> = ({
    curInventory,
    inventoryList,
    onSubmit,
    onCancel,
    loading,
}) => {
    const initStockFormData = new StockFormData(
        curInventory?.recId,
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
    const [inventory, setInventory] = useState<
        IInventoryListRs["result"][0] | undefined
    >(curInventory);

    const [stockFormData, setStockFormData] = useState(initStockFormData);
    const [repeatType, setRepeatType] = useState<TRepeatType>("week");
    const [showCreateSeries, setCreateSeries] = useState(false);

    const { handlerSubmit, errors } = useFormSubmit<
        StockFormData & { isCreateSeries?: boolean }
    >({
        schema: stockSchema,
    });
    const [stockFieldErrors, setStockFieldErrors] =
        useState<Partial<Record<keyof StockFormData, string>>>();

    const { data: stockInventoryType, isLoading: isLoadingStockType } =
        useGetStockInventoryTypeCoreQuery(inventory?.type || "");

    const stockInventoryTypeOptions = useMemo(() => {
        return (
            stockInventoryType?.reduce<{ label: string; value: string }[]>(
                (acc, type) => {
                    return [...acc, { label: type, value: type }];
                },
                [],
            ) || []
        );
    }, [stockInventoryType, curInventory]);

    /**
     *
     * @param key
     * @param value
     *
     * Handle Stock form data
     */
    const onChangeStockFormData = (
        key: keyof StockFormData,
        value: StockFormData[keyof StockFormData],
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
        IInventoryListRs["result"][0]
    >["onChange"] = (value, options) => {
        setInventory(() => (isArray(options) ? options[0] : options));
        setStockFormData((prev) => ({
            ...prev,
            inventoryId: value,
            type: undefined,
        }));
    };

    const onChangeValidDateRange: RangePickerProps["onChange"] = (date) => {
        setStockFormData((prev) => ({
            ...prev,
            valid:
                date && date[0]
                    ? date[0]?.locale("en").format(DATE_TIME_FORMAT)
                    : undefined,
            validTo:
                date && date[1]
                    ? date[1]?.locale("en").format(DATE_TIME_FORMAT)
                    : undefined,
            fromValidTo: undefined,
        }));
    };

    const onChangeUsedDateRange: RangePickerProps["onChange"] = (date) => {
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
            start:
                date && date[0]
                    ? date[0]?.locale("en").format(DATE_TIME_FORMAT)
                    : undefined,
            end:
                date && date[1]
                    ? date[1]?.locale("en").format(DATE_TIME_FORMAT)
                    : undefined,
        }));
    };
    const onChangeValidFromTo: DatePickerProps["onChange"] = (date) => {
        if (
            isUndefined(stockFormData.valid) ||
            isUndefined(stockFormData.validTo)
        ) {
            message.error("Vui lòng Chọn ngày mở bán trước.");
            return;
        }
        setStockFormData((prev) => ({
            ...prev,
            fromValidTo: date?.locale("en").format(DATE_TIME_FORMAT),
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
        dateStr: (string | undefined)[],
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
                date.isAfter(
                    dayjs(exclDate.from, { format: DATE_TIME_FORMAT }),
                ) &&
                date.isBefore(dayjs(exclDate.to, { format: DATE_TIME_FORMAT }))
            ) {
                isDisabled = true;
            }
        });

        return isDisabled;
    };

    const onSubmitFormData: HandleSubmit<StockFormData> = (data) => {
        onSubmit?.({ data }, () => {
            setStockFormData(initStockFormData);
            setInventory(undefined);
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
                label="Nhóm kho"
                required
                validateStatus={errors?.inventoryId ? "error" : ""}
                help={errors?.inventoryId || ""}
            >
                <Select<number, IInventoryListRs["result"][0]>
                    fieldNames={{ value: "recId", label: "name" }}
                    onChange={onChangeInventory}
                    value={inventory?.recId}
                    options={curInventory ? [curInventory] : inventoryList}
                    placeholder="Chọn nhóm kho"
                    disabled={!isUndefined(curInventory)}
                />
            </FormItem>
            <FormItem
                label="Loại"
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
                    placeholder="Chọn loại kho"
                />
            </FormItem>
            <FormItem
                label="Mã kho"
                required
                validateStatus={errors?.code ? "error" : ""}
                help={errors?.code || ""}
            >
                <Input
                    placeholder="Mã kho"
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
                <CustomRangePicker
                    showTime={{
                        format: TIME_FORMAT,
                        defaultValue: [
                            dayjs("00:00:00", "HH:mm:ss"),
                            dayjs("23:59:59", "HH:mm:ss"),
                        ],
                    }}
                    placeholder={["Từ ngày", "Đến ngày"]}
                    format={"DD/MM/YYYY - HH:mm"}
                    value={[
                        stockFormData.valid
                            ? dayjs(stockFormData.valid, {
                                  format: DATE_TIME_FORMAT,
                              })
                            : null,
                        stockFormData.validTo
                            ? dayjs(stockFormData.validTo, {
                                  format: DATE_TIME_FORMAT,
                              })
                            : null,
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
                        defaultValue: [
                            dayjs("00:00:00", "HH:mm:ss"),
                            dayjs("23:59:59", "HH:mm:ss"),
                        ],
                    }}
                    placeholder={["Từ ngày", "Đến ngày"]}
                    format={"DD/MM/YYYY - HH:mm"}
                    value={[
                        stockFormData.start
                            ? dayjs(stockFormData.start, {
                                  format: DATE_TIME_FORMAT,
                              })
                            : null,
                        stockFormData.end
                            ? dayjs(stockFormData.end, {
                                  format: DATE_TIME_FORMAT,
                              })
                            : null,
                    ]}
                    disabledDate={(date) => {
                        return (
                            dayjs().isAfter(date) ||
                            dayjs(stockFormData.validTo, {
                                format: DATE_TIME_FORMAT,
                            }).isAfter(date)
                        );
                    }}
                    onChange={onChangeUsedDateRange}
                    className="w-full max-w-[380px]"
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
                                <CustomDatePicker
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
                                            ? dayjs(stockFormData.valid, {
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
                                    value={
                                        stockFormData.fromValidTo
                                            ? dayjs(stockFormData.fromValidTo, {
                                                  format: DATE_TIME_FORMAT,
                                              })
                                            : null
                                    }
                                    format={"DD/MM/YYYY - HH:mm"}
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
                            onChange={() => setRepeatType("week")}
                        >
                            Các ngày trong tuần
                        </Radio>
                        <Radio
                            value="day"
                            checked={repeatType === "day"}
                            onChange={() => setRepeatType("day")}
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
                                    <CustomRangePicker
                                        showTime={{
                                            format: TIME_FORMAT,
                                            defaultValue: [
                                                dayjs("00:00:00", "HH:mm:ss"),
                                                dayjs("23:59:59", "HH:mm:ss"),
                                            ],
                                        }}
                                        placeholder={["Từ ngày", "Đến ngày"]}
                                        format={"DD/MM/YYYY - HH:mm"}
                                        value={[
                                            exclDate.from
                                                ? dayjs(exclDate.from, {
                                                      format: DATE_TIME_FORMAT,
                                                  })
                                                : null,
                                            exclDate.to
                                                ? dayjs(exclDate.to, {
                                                      format: DATE_TIME_FORMAT,
                                                  })
                                                : null,
                                        ]}
                                        disabledDate={(date) => {
                                            return (
                                                dayjs(stockFormData.valid, {
                                                    format: DATE_TIME_FORMAT,
                                                }).isAfter(date) ||
                                                dayjs(
                                                    stockFormData.fromValidTo,
                                                    {
                                                        format: DATE_TIME_FORMAT,
                                                    },
                                                ).isBefore(date) ||
                                                getDisableExclusiveDate(date)
                                            );
                                        }}
                                        onChange={(date, dateStr) =>
                                            onChangeExclusiveDates(
                                                indx,
                                                (date && [
                                                    date[0]
                                                        ?.locale("en")
                                                        .format(
                                                            DATE_TIME_FORMAT,
                                                        ),
                                                    date[1]
                                                        ?.locale("en")
                                                        .format(
                                                            DATE_TIME_FORMAT,
                                                        ),
                                                ]) ||
                                                    [],
                                            )
                                        }
                                        className="w-full max-w-[380px]"
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
