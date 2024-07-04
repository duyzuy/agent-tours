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
    hasApproval: boolean;
    onSubmit?: (formData: StockConfirmFormData) => void;
}
const StockConfirmationForm: React.FC<StockConfirmationFormProps> = ({
    initialValues,
    hasApproval,
    onSubmit,
}) => {
    const initStockConfirmFormdata = new StockConfirmFormData(
        0,
        "",
        0,
        undefined,
        undefined,
        undefined,
        undefined,
    );

    const { handlerSubmit, errors } = useFormSubmit({
        schema: stockConfirmSchema,
    });

    const [stockConfirmFormData, setStockConfirmFormData] = useState(
        initStockConfirmFormdata,
    );

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

    const onChangeValidDateRange: RangePickerProps["onChange"] = (
        date,
        dateStr,
    ) => {
        setStockConfirmFormData((prev) => ({
            ...prev,
            valid: date
                ? date[0]?.locale("en").format(DATE_TIME_FORMAT)
                : undefined,
            validTo: date
                ? date[1]?.locale("en").format(DATE_TIME_FORMAT)
                : undefined,
            // start: undefined,
            // end: undefined,
        }));
    };
    const onChangeUsedDateRange: RangePickerProps["onChange"] = (
        date,
        dateStr,
    ) => {
        setStockConfirmFormData((prev) => ({
            ...prev,
            start: date
                ? date[0]?.locale("en").format(DATE_TIME_FORMAT)
                : undefined,
            end: date
                ? date[1]?.locale("en").format(DATE_TIME_FORMAT)
                : undefined,
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
                start: dayjs(initialValues.startDate)
                    .locale("en")
                    .format(DATE_TIME_FORMAT),
                end: dayjs(initialValues.endDate)
                    .locale("en")
                    .format(DATE_TIME_FORMAT),
                valid: dayjs(initialValues.validFrom)
                    .locale("en")
                    .format(DATE_TIME_FORMAT),
                validTo: dayjs(initialValues.validTo)
                    .locale("en")
                    .format(DATE_TIME_FORMAT),
            }));
        }
    }, [initialValues]);

    return (
        <>
            <Form layout="vertical">
                <Row gutter={16}>
                    <Col span={12}>
                        <FormItem label="Loại nhóm kho">
                            <Input
                                placeholder="Loại nhóm kho"
                                disabled
                                value={initialValues?.inventoryType}
                            />
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem label="Loại kho">
                            <Input
                                placeholder="Loại nhóm kho"
                                disabled
                                value={initialValues?.type}
                            />
                        </FormItem>
                    </Col>
                </Row>
                <FormItem
                    label="Ngày mở bán (valid date)"
                    required
                    validateStatus={
                        errors?.valid || errors?.validTo ? "error" : ""
                    }
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
                        disabled={hasApproval}
                        value={[
                            stockConfirmFormData.valid
                                ? dayjs(stockConfirmFormData.valid, {
                                      format: DATE_TIME_FORMAT,
                                  })
                                : null,
                            stockConfirmFormData.validTo
                                ? dayjs(stockConfirmFormData.validTo, {
                                      format: DATE_TIME_FORMAT,
                                  })
                                : null,
                        ]}
                        disabledDate={(date) => {
                            return (
                                dayjs().isAfter(date) &&
                                !dayjs().isSame(date, "date")
                            );
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
                            defaultValue: [
                                dayjs("00:00:00", "HH:mm:ss"),
                                dayjs("23:59:59", "HH:mm:ss"),
                            ],
                        }}
                        placeholder={["Từ ngày", "Đến ngày"]}
                        format={"DD/MM/YYYY - HH:mm"}
                        disabled={hasApproval}
                        value={[
                            stockConfirmFormData.start
                                ? dayjs(stockConfirmFormData.start, {
                                      format: DATE_TIME_FORMAT,
                                  })
                                : null,
                            stockConfirmFormData.end
                                ? dayjs(stockConfirmFormData.end, {
                                      format: DATE_TIME_FORMAT,
                                  })
                                : null,
                        ]}
                        disabledDate={(date) => {
                            return stockConfirmFormData.validTo
                                ? dayjs(stockConfirmFormData.validTo, {
                                      format: DATE_TIME_FORMAT,
                                  }).isAfter(date)
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
                                disabled={hasApproval}
                                onChange={(ev) =>
                                    onChangeFormData("cap", ev.target.value)
                                }
                            />
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="Khả dụng">
                            <Input
                                placeholder="Số lượng"
                                disabled
                                value={initialValues?.avaiable}
                            />
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="Đã sử dụng">
                            <Input
                                placeholder="Đã sử dụng"
                                disabled
                                value={initialValues?.used}
                            />
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
                            onClick={() =>
                                handlerSubmit(
                                    stockConfirmFormData,
                                    onSubmitForm,
                                )
                            }
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
