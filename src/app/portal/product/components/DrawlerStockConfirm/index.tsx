import React, { useEffect, useState } from "react";
import { Form, Input, Space, Button, Drawer, Tag, DatePicker } from "antd";
import FormItem from "@/components/base/FormItem";
import { IInventoryListRs } from "@/models/management/core/inventory.interface";
import { Status } from "@/models/management/common.interface";

import { TInventoryErrorsField } from "../../hooks/useCRUDInventory";
import {
    IStockListOfInventoryRs,
    IStockConfirmPayload,
    StockInventoryConfirmFormData,
} from "@/models/management/core/stockInventory.interface";
import dayjs from "dayjs";

export enum EActionType {
    CREATE = "create",
    EDIT = "edit",
}
export type TDrawlerCreateAction = {
    type: EActionType.CREATE;
};
export type TDrawlerEditAction = {
    type: EActionType.EDIT;
    record: IInventoryListRs["result"][0];
};
export type TDrawlerAction = TDrawlerCreateAction | TDrawlerEditAction;

export interface DrawlerStockConfirmProps {
    isOpen?: boolean;
    onCancel: () => void;
    actionType: EActionType;
    initialValues?: IStockListOfInventoryRs["result"][0];
    onSubmit?: (formData: StockInventoryConfirmFormData) => void;
    errors?: TInventoryErrorsField;
}
export const DATE_FORMAT = "DDMMMYY HH:mm";
export const TIME_FORMAT = "HH:mm";
import { RangePickerProps } from "antd/es/date-picker";
const RangePicker = DatePicker.RangePicker;
const DrawlerStockConfirm: React.FC<DrawlerStockConfirmProps> = ({
    actionType,
    onCancel,
    onSubmit,
    isOpen,
    errors,
    initialValues,
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
    const [formData, setFormData] = useState(initStockConfirmFormdata);

    const onChangeFormData = (
        key: keyof IStockConfirmPayload,
        value: string | number,
    ) => {
        if (key === "cap" && typeof value === "string") {
            value = Number(value);
        }
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const onChangeValidDateRange: RangePickerProps["onChange"] = (
        date,
        dateStr,
    ) => {
        setFormData((prev) => ({
            ...prev,
            valid: dateStr[0],
            validTo: dateStr[1],
        }));
    };
    const onChangeUsedDateRange: RangePickerProps["onChange"] = (
        date,
        dateStr,
    ) => {
        setFormData((prev) => ({
            ...prev,
            start: dateStr[0],
            end: dateStr[1],
        }));
    };
    const onSubmitFormData = (data: StockInventoryConfirmFormData) => {
        onSubmit?.(data);
    };

    useEffect(() => {
        if (initialValues) {
            setFormData(() => ({
                recId: initialValues.recId,
                cap: initialValues.cap,
                description: initialValues.description,
                start: dayjs(initialValues.startDate).format(DATE_FORMAT),
                end: dayjs(initialValues.endDate).format(DATE_FORMAT),
                valid: dayjs(initialValues.validFrom).format(DATE_FORMAT),
                validTo: dayjs(initialValues.validTo).format(DATE_FORMAT),
            }));
        }
    }, [initialValues, isOpen, DATE_FORMAT]);
    return (
        <Drawer
            title={initialValues?.code ?? null}
            destroyOnClose
            width={550}
            onClose={onCancel}
            open={isOpen}
            styles={{
                body: {
                    paddingBottom: 80,
                },
            }}
        >
            <Form layout="vertical" className="max-w-4xl">
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
                        disabled={initialValues?.status === Status.OK}
                        value={[
                            formData.valid
                                ? dayjs(formData.valid, DATE_FORMAT)
                                : null,
                            formData.validTo
                                ? dayjs(formData.validTo, DATE_FORMAT)
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
                        disabled={initialValues?.status === Status.OK}
                        value={[
                            formData.start
                                ? dayjs(formData.start, DATE_FORMAT)
                                : null,
                            formData.end
                                ? dayjs(formData.end, DATE_FORMAT)
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
                        value={formData?.cap}
                        disabled={initialValues?.status === Status.OK}
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
                        value={formData?.description}
                        disabled={initialValues?.status === Status.OK}
                        onChange={(ev) =>
                            onChangeFormData("description", ev.target.value)
                        }
                    />
                </FormItem>
            </Form>
            <hr className="my-6" />
            <div className="status py-2">
                <span className="mr-3">Trạng thái</span>
                <Tag
                    color={
                        (initialValues?.status === Status.QQ && "orange") ||
                        (initialValues?.status === Status.OK && "green") ||
                        "red"
                    }
                >
                    {(initialValues?.status === Status.QQ && "Chờ duyệt") ||
                        (initialValues?.status === Status.OK && "Đã duyệt") ||
                        "Đã xoá"}
                </Tag>
            </div>
            {initialValues?.status === Status.QQ ? (
                <div className="bottom py-4 absolute bottom-0 left-0 right-0 border-t px-6 bg-white">
                    <Space>
                        <Button type="default">Huỷ bỏ</Button>

                        <Button
                            type="primary"
                            onClick={() => onSubmitFormData(formData)}
                            disabled={false}
                        >
                            Duyệt stock
                        </Button>
                    </Space>
                </div>
            ) : null}
        </Drawer>
    );
};
export default DrawlerStockConfirm;

interface IListItemName {
    items: { label: string; value?: string | number }[];
}
const ListItemName: React.FC<IListItemName> = ({ items }) => {
    return (
        <ul>
            {items.map((item, _index) => (
                <li className="py-2" key={_index}>
                    <span className="w-32 inline-block">{item.label}</span>
                    <span>{`: ${item?.value || "--"}`}</span>
                </li>
            ))}
        </ul>
    );
};
