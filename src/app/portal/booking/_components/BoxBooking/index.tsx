"use client";
import React, { useMemo, useState } from "react";
import {
    Form,
    Input,
    Row,
    Col,
    DatePicker,
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
import locale from "antd/es/date-picker/locale/vi_VN";

import FormItem from "@/components/base/FormItem";
import dayjs from "dayjs";
import { useBookingSelector } from "../../hooks/useBooking";
import { EProductType } from "@/models/management/core/productType.interface";
import { EInventoryType } from "@/models/management/core/inventoryType.interface";
export interface BoxBookingProps {
    departLocation?: string;
    departDate?: string;
    className?: string;
    onSubmit?: (data: SearchBookingFormData) => void;
}

const BoxBooking: React.FC<BoxBookingProps> = ({
    className = "searchbox px-4 py-2 bg-white shadow-lg rounded-lg",
    onSubmit,
}) => {
    const { data: destinationList, isLoading: isLoadingDestinationList } =
        useGetLocalSearchListMISCQuery();

    const { data: inventoryType, isLoading: isLoadingProductType } =
        useGetInventoryTypeListCoreQuery({
            enabled: true,
        });
    const { data: productType, isLoading: isLoadingInventoryType } =
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
    const { handlerSubmit, errors } = useFormSubmit({
        schema: searchBookingSchema,
    });
    const bookingInfo = useBookingSelector();

    const searchInfo = useMemo(() => {
        return bookingInfo?.searchBooking;
    }, [bookingInfo]);
    const onChangeDate: DatePickerProps["onChange"] = (date, dateStr) => {
        setFormData((prev) => ({
            ...prev,
            byMonth: date?.format("MMMYY"),
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
        | LocalSearchDestinationListRs["result"][0]
        | LocalSearchDestinationListRs["result"]
    >["onChange"] = (value, options) => {
        if (!isArray(options)) {
            setFormData((prev) => ({
                ...prev,
                byDest: [
                    {
                        keyType: options.keyType,
                        regionKey: options.regionKey,
                        subRegionKey: options.subRegionKey,
                        stateProvinceKey: options.stateProvinceKey,
                        countryKey: options.countryKey,
                    },
                ],
            }));
        }
    };

    const onChangeTabs = (e: RadioChangeEvent) => {
        setFormData((prev) => ({ ...prev, byProductType: [e.target.value] }));
    };
    return (
        <SearchBookingWrapper
            className={classNames({ [className]: className })}
        >
            <div className="form-inner">
                <div className="booking-tab bg-white px-3 py-3 rounded-tr-md rounded-tl-md border-b">
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
                                        options={destinationList}
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
                                    <DatePicker
                                        placeholder="Thời gian đi"
                                        locale={locale}
                                        format={"MM/YYYY"}
                                        picker="month"
                                        className="w-full"
                                        bordered={false}
                                        style={{ padding: 0 }}
                                        onChange={onChangeDate}
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
                                        onClick={() =>
                                            handlerSubmit(formData, onSubmit)
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
