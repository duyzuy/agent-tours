import React, { useEffect, useState } from "react";
import { Form, Input, DatePicker, Space, Button } from "antd";
import FormItem from "@/components/base/FormItem";

import { TInventoryErrorsField } from "../../hooks/useCRUDInventory";
import {
    IStockListOfInventoryRs,
    IStockConfirmPayload,
    StockInventoryConfirmFormData,
} from "@/models/management/core/stockInventory.interface";
import dayjs from "dayjs";

export enum EActionType {
    VIEW = "view",
    CONFIRM = "confirm",
}

export type TDrawlerStockDetailAction = {
    type: EActionType;
    record: IStockListOfInventoryRs["result"][0];
};

export const DATE_FORMAT = "DDMMMYY HH:mm";
export const TIME_FORMAT = "HH:mm";
import { RangePickerProps } from "antd/es/date-picker";
const RangePicker = DatePicker.RangePicker;

interface StockConfirmationFormProps {
    initialValues: IStockListOfInventoryRs["result"][0];
    hasApproval: boolean;
    errors?: TInventoryErrorsField;
    onSubmit?: (formData: StockInventoryConfirmFormData) => void;
}
const StockConfirmationForm: React.FC<StockConfirmationFormProps> = ({
    initialValues,
    hasApproval,
    errors,
    onSubmit,
}) => {
    const initStockConfirmFormdata = new StockInventoryConfirmFormData(
        0,
        "",
        0,
        undefined,
        undefined,
        undefined,
        undefined,
    );
    const [stockConfirmFormData, setStockConfirmFormData] = useState(
        initStockConfirmFormdata,
    );

    const onChangeFormData = (
        key: keyof IStockConfirmPayload,
        value: string | number,
    ) => {
        if (key === "cap" && typeof value === "string") {
            value = Number(value);
        }
        setStockConfirmFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const onChangeValidDateRange: RangePickerProps["onChange"] = (
        date,
        dateStr,
    ) => {
        setStockConfirmFormData((prev) => ({
            ...prev,
            valid: dateStr[0],
            validTo: dateStr[1],
        }));
    };
    const onChangeUsedDateRange: RangePickerProps["onChange"] = (
        date,
        dateStr,
    ) => {
        setStockConfirmFormData((prev) => ({
            ...prev,
            start: dateStr[0],
            end: dateStr[1],
        }));
    };

    useEffect(() => {
        if (initialValues) {
            setStockConfirmFormData(() => ({
                recId: initialValues.recId,
                cap: initialValues.cap,
                description: initialValues.description,
                start: dayjs(initialValues.startDate).format(DATE_FORMAT),
                end: dayjs(initialValues.endDate).format(DATE_FORMAT),
                valid: dayjs(initialValues.validFrom).format(DATE_FORMAT),
                validTo: dayjs(initialValues.validTo).format(DATE_FORMAT),
            }));
        }
    }, [initialValues]);

    return (
        <>
            <Form layout="vertical">
                <FormItem label="Inventory Type">
                    <Input
                        placeholder="Inventory Type"
                        disabled
                        value={initialValues?.inventoryType}
                    />
                </FormItem>
                <FormItem label="Stock Type">
                    <Input
                        placeholder="Inventory Type"
                        disabled
                        value={initialValues?.type}
                    />
                </FormItem>
                <FormItem label="Ngày mở bán (valid date)" required>
                    <RangePicker
                        showTime={{ format: "HH:mm" }}
                        placeholder={["Date from", "Date to"]}
                        format={DATE_FORMAT}
                        disabled={hasApproval}
                        value={[
                            stockConfirmFormData.valid
                                ? dayjs(stockConfirmFormData.valid, DATE_FORMAT)
                                : null,
                            stockConfirmFormData.validTo
                                ? dayjs(
                                      stockConfirmFormData.validTo,
                                      DATE_FORMAT,
                                  )
                                : null,
                        ]}
                        disabledDate={(date) => {
                            return dayjs().isAfter(date);
                        }}
                        onChange={onChangeValidDateRange}
                        className="w-full "
                    />
                </FormItem>
                <FormItem label="Ngày áp dụng (used)" required>
                    <RangePicker
                        showTime={{ format: "HH:mm" }}
                        placeholder={["Date from", "Date to"]}
                        format={DATE_FORMAT}
                        disabled={hasApproval}
                        value={[
                            stockConfirmFormData.start
                                ? dayjs(stockConfirmFormData.start, DATE_FORMAT)
                                : null,
                            stockConfirmFormData.end
                                ? dayjs(stockConfirmFormData.end, DATE_FORMAT)
                                : null,
                        ]}
                        disabledDate={(date) => {
                            return dayjs().isAfter(date);
                        }}
                        onChange={onChangeUsedDateRange}
                        className="w-full "
                    />
                </FormItem>

                <FormItem
                    label="Số lượng (cap)"
                    required
                    validateStatus={errors?.name ? "error" : ""}
                    help={errors?.name || ""}
                >
                    <Input
                        placeholder="Số lượng"
                        value={stockConfirmFormData?.cap}
                        disabled={hasApproval}
                        onChange={(ev) =>
                            onChangeFormData("cap", ev.target.value)
                        }
                    />
                </FormItem>
                <FormItem label="Khả dụng">
                    <Input
                        placeholder="Số lượng"
                        disabled
                        value={initialValues?.avaiable}
                    />
                </FormItem>
                <FormItem label="Đã sử dụng">
                    <Input
                        placeholder="Đã sử dụng"
                        disabled
                        value={initialValues?.used}
                    />
                </FormItem>
                <FormItem
                    label="Mô tả"
                    required
                    validateStatus={errors?.name ? "error" : ""}
                    help={errors?.name || ""}
                >
                    <Input.TextArea
                        placeholder="Mô tả"
                        value={stockConfirmFormData?.description}
                        disabled={hasApproval}
                        onChange={(ev) =>
                            onChangeFormData("description", ev.target.value)
                        }
                    />
                </FormItem>
            </Form>

            {!hasApproval ? (
                <div className="bottom py-4 absolute bottom-0 left-0 right-0 border-t px-6 bg-white">
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => onSubmit?.(stockConfirmFormData)}
                            disabled={false}
                        >
                            Duyệt stock
                        </Button>
                    </Space>
                </div>
            ) : null}
        </>
    );
};
export default StockConfirmationForm;
