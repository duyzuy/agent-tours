"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
    Form,
    Input,
    Row,
    Col,
    Button,
    Select,
    DatePickerProps,
    SelectProps,
    Radio,
    RadioChangeEvent,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import styled from "styled-components";
import classNames from "classnames";
import { useGetLocalSearchListMISCQuery } from "@/queries/misc/destination";
import { SearchBookingFormData } from "../../modules/searchBooking.interface";
import { LocalSearchDestinationListRs } from "@/models/management/localSearchDestination.interface";
import { useGetInventoryTypeListCoreQuery } from "@/queries/core/inventoryType";
import { useGetProductTypeListCoreQuery } from "@/queries/core/productType";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { searchBookingSchema } from "../../schema/searchBooking.schema";
import { isArray } from "lodash";
import { useBookingSelector } from "../../hooks/useBooking";
import { EProductType } from "@/models/management/core/productType.interface";
import { EInventoryType } from "@/models/management/core/inventoryType.interface";
import FormItem from "@/components/base/FormItem";
import { MONTH_FORMAT } from "@/constants/common";
import useSearchBookingInformation from "../../modules/useSearchBookingInformation";
import dayjs from "dayjs";

import CustomDatePicker from "@/components/admin/CustomDatePicker";
export interface BoxBookingProps {
    departLocation?: string;
    departDate?: string;
    className?: string;
}

const BoxBooking: React.FC<BoxBookingProps> = ({
    className = "searchbox px-4 py-2 bg-white shadow-lg rounded-lg",
}) => {
    const { data: destinationList, isLoading: isLoadingDestinationList } =
        useGetLocalSearchListMISCQuery();

    const { data: inventoryType, isLoading: isLoadingInventoryType } =
        useGetInventoryTypeListCoreQuery({
            enabled: true,
        });
    const { data: productType, isLoading: isLoadingProductType } =
        useGetProductTypeListCoreQuery({
            enabled: true,
        });

    const [formData, setFormData] = useState(
        () =>
            new SearchBookingFormData(
                undefined,
                "",
                [],
                [EProductType.TOUR],
                [],
            ),
    );
    const { onSearchBooking, isLoading } = useSearchBookingInformation();
    const { handlerSubmit, errors } = useFormSubmit({
        schema: searchBookingSchema,
    });
    const bookingInfo = useBookingSelector();

    const searchInfo = useMemo(() => {
        return bookingInfo?.searchBooking;
    }, [bookingInfo]);

    const handleSelectDate: DatePickerProps["onChange"] = (date, dateStr) => {
        setFormData((prev) => ({
            ...prev,
            byMonth: date?.locale("en").format(MONTH_FORMAT),
        }));
    };

    const onChangeCode = (code: string) => {
        setFormData((prev) => ({
            ...prev,
            byCode: code,
        }));
    };

    const onChangeInventoryType: SelectProps<EInventoryType[]>["onChange"] = (
        values,
    ) => {
        setFormData((prev) => ({
            ...prev,
            byInventoryType: [...values],
        }));
    };

    const onChangeDestination: SelectProps<
        number,
        LocalSearchDestinationListRs["result"][0]
    >["onChange"] = (value, options) => {
        setFormData((prev) => ({
            ...prev,
            byDest: isArray(options) ? options : [options],
        }));
    };

    const onChangeTabs = (e: RadioChangeEvent) => {
        setFormData((prev) => ({ ...prev, byProductType: [e.target.value] }));
    };

    useEffect(() => {
        setFormData((oldData) => {
            if (searchInfo.byCode) {
            }

            return {
                ...oldData,
                byMonth: searchInfo.byMonth,
            };
        });
    }, []);
    return (
        <SearchBookingWrapper
            className={classNames({ [className]: className })}
        >
            <div className="form-inner">
                <div className="booking-tab bg-white px-3 py-3 rounded-tr-md rounded-tl-md border-b">
                    {isLoadingProductType ? (
                        <div className="flex items-center gap-x-3 animate-pulse">
                            <div className="w-12 h-4 bg-slate-100"></div>
                            <div className="w-12 h-4 bg-slate-100"></div>
                        </div>
                    ) : (
                        <Radio.Group
                            value={
                                formData.byProductType
                                    ? formData.byProductType[0]
                                    : undefined
                            }
                            onChange={onChangeTabs}
                        >
                            {productType?.map((type) => (
                                <React.Fragment key={type}>
                                    <Radio value={type}>
                                        <span className="font-[500] mr-3">
                                            {getProductTypeName(type)}
                                        </span>
                                    </Radio>
                                </React.Fragment>
                            ))}
                        </Radio.Group>
                    )}
                </div>
                <div className="booking-form px-6 py-4 bg-white shadow-lg rounded-br-md rounded-bl-md">
                    <Form layout="vertical" size="large">
                        <Row align="bottom" gutter={16}>
                            <Col span={6}>
                                <FormItem
                                    label="Điểm đến"
                                    className="departure-location"
                                    validateStatus={
                                        errors?.byDest ? "error" : ""
                                    }
                                    help={errors?.byDest || ""}
                                >
                                    <Select<
                                        number,
                                        LocalSearchDestinationListRs["result"][0]
                                    >
                                        placeholder="Chọn điểm đến"
                                        bordered={false}
                                        loading={isLoadingDestinationList}
                                        style={{ padding: 0 }}
                                        showSearch={true}
                                        fieldNames={{
                                            label: "name",
                                            value: "id",
                                        }}
                                        value={
                                            formData.byDest
                                                ? formData.byDest[0]?.id
                                                : undefined
                                        }
                                        options={destinationList || []}
                                        onChange={onChangeDestination}
                                        getPopupContainer={(triggerNode) =>
                                            triggerNode.parentElement
                                                .parentElement
                                        }
                                        suffixIcon={null}
                                    />
                                </FormItem>
                            </Col>
                            <Col span={4}>
                                <FormItem
                                    label="Thời gian đi"
                                    validateStatus={
                                        errors?.byMonth ? "error" : ""
                                    }
                                    help={errors?.byMonth || ""}
                                >
                                    <CustomDatePicker
                                        placeholder="Thời gian đi"
                                        value={
                                            formData.byMonth
                                                ? dayjs(formData.byMonth, {
                                                      format: MONTH_FORMAT,
                                                  })
                                                : undefined
                                        }
                                        format={"MMMM/YYYY"}
                                        picker="month"
                                        className="w-full"
                                        bordered={false}
                                        style={{ padding: 0 }}
                                        onChange={handleSelectDate}
                                    />
                                </FormItem>
                            </Col>
                            <Col span={4}>
                                <FormItem label="Code">
                                    <Input
                                        placeholder="Nhập code"
                                        value={formData.byCode}
                                        bordered={false}
                                        style={{ padding: 0 }}
                                        onChange={(ev) =>
                                            onChangeCode(ev.target.value)
                                        }
                                    />
                                </FormItem>
                            </Col>
                            <Col span={3}>
                                <FormItem label="Loại Inventory">
                                    <Select
                                        mode="multiple"
                                        maxTagCount="responsive"
                                        placeholder="Chọn loại inventory"
                                        bordered={false}
                                        loading={isLoadingInventoryType}
                                        style={{ padding: 0 }}
                                        showSearch={true}
                                        options={
                                            inventoryType?.map((type) => ({
                                                label: type,
                                                value: type,
                                            })) || []
                                        }
                                        onChange={onChangeInventoryType}
                                        getPopupContainer={(triggerNode) =>
                                            triggerNode.parentElement
                                                .parentElement
                                        }
                                        suffixIcon={null}
                                    />
                                </FormItem>
                            </Col>
                            <Col flex={1} className="text-right">
                                <FormItem>
                                    <Button
                                        type="primary"
                                        icon={<SearchOutlined />}
                                        loading={isLoading}
                                        onClick={() =>
                                            handlerSubmit(
                                                formData,
                                                onSearchBooking,
                                            )
                                        }
                                    >
                                        Tìm kiếm
                                    </Button>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        </SearchBookingWrapper>
    );
};
export default BoxBooking;

const SearchBookingWrapper = styled(`div`)`
    .travel-form-large,
    .travel-form {
        .travel-form-item {
            margin-bottom: 0;

            .travel-form-item-label > label {
                height: auto;
                font-size: 13px;
                color: gray;
            }
            .travel-form-item-explain-error {
                font-size: 12px;
            }
        }
    }
    .travel-select-single.travel-select-lg:not(.travel-select-customize-input),
    .travel-select-single.travel-select-lg:not(.travel-select-customize-input) {
        .travel-select-selector {
            padding-left: 0;
            padding-right: 0;
            .travel-select-selection-search {
                inset-inline-start: 0px;
                inset-inline-end: 0px;
            }
        }
    }

    .travel-select-multiple.travel-select-lg {
        .travel-select-selection-placeholder {
            inset-inline-start: 0px;
            inset-inline-end: 0px;
        }
        .travel-select-selection-search {
            margin-inline-start: -4px;
        }
    }
`;

const getProductTypeName = (type: EProductType) => {
    if (type === EProductType.EXTRA) {
        return "Dịch vụ";
    }
    return "Tour";
};
