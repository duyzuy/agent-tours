"use client";
import React, { useEffect, useState } from "react";
import { set } from "lodash";

import { Form, Input, Row, Col, Button, DatePickerProps, Card, Divider } from "antd";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { SearchOutlined } from "@ant-design/icons";
import { SearchProductExtraFormData, SearchProductTourFormData } from "../../searchProduct.interface";
import { EProductType } from "@/models/management/core/productType.interface";
import FormItem from "@/components/base/FormItem";
import { MONTH_FORMAT } from "@/constants/common";
import CustomDatePicker from "@/components/admin/CustomDatePicker";
import ProductTypeSelector, { ProductTypeSelectorProps } from "./ProductTypeSelector";
import DestinationSelector, { DestinationSelectorProps } from "./DestinationSelector";
import InventoryTypeListSelector, { InventoryTypeListSelectorProps } from "./InventoryTypeListSelector";
import { searchPortalBookingSchema } from "../../searchProduct.schema";
import classNames from "classnames";
import styled from "styled-components";
import dayjs from "dayjs";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

type BaseBoxBookingProps = {
  departLocation?: string;
  departDate?: string;
  className?: string;
  loading?: boolean;
};
export type BoxSearchProductProps = BaseBoxBookingProps &
  (
    | {
        onSubmit?: (formData: SearchProductExtraFormData) => void;
        type: EProductType.EXTRA;
      }
    | {
        onSubmit?: (formData: SearchProductTourFormData) => void;
        type: EProductType.TOUR;
      }
  );

const BoxSearchProduct: React.FC<BoxSearchProductProps> = ({ className = "", loading, onSubmit, type }) => {
  const searchParams = useSearchParams();

  const byMonth = searchParams.get("byMonth") ?? dayjs().locale("en").format(MONTH_FORMAT);
  const initBookingSearchForm =
    type === EProductType.TOUR
      ? new SearchProductTourFormData(byMonth, "", [], [])
      : new SearchProductExtraFormData(byMonth, "", [], []);

  const { handleSubmit, setValue, getValues, control } = useForm<
    SearchProductTourFormData | SearchProductExtraFormData
  >({
    defaultValues: initBookingSearchForm,
    resolver: yupResolver(searchPortalBookingSchema),
  });

  const handleSelectDate: DatePickerProps["onChange"] = (date, dateStr) => {
    setValue("byMonth", date?.locale("en").format(MONTH_FORMAT));
  };

  const onChangeCode = (code: string) => {
    setValue("byCode", code);
  };

  const onChangeInventoryType: InventoryTypeListSelectorProps["onChange"] = (values) => {
    setValue("byInventoryType", [...values]);
  };

  const onChangeDestination: DestinationSelectorProps["onChange"] = (destination) => {
    setValue("byDest", [destination]);
  };

  const onChangeProductType: ProductTypeSelectorProps["onChange"] = (type) => {
    if (type === EProductType.TOUR) {
      setValue("byProductType", [type]);
    }
  };

  const onSubmitForm: SubmitHandler<SearchProductTourFormData | SearchProductExtraFormData> = (data) => {
    if (type === EProductType.TOUR) {
      onSubmit?.(data as SearchProductTourFormData);
    }
    if (type === EProductType.EXTRA) {
      onSubmit?.(data as SearchProductExtraFormData);
    }
  };

  return (
    <SearchBookingWrapper className={classNames({ [className]: className })}>
      <Card size="small">
        <Controller
          name="byProductType"
          control={control}
          render={({ field, fieldState }) => (
            <ProductTypeSelector value={field.value?.[0]} onChange={onChangeProductType} disabled={true} />
          )}
        />

        <Divider style={{ margin: "8px 0" }} />
        <div className="booking-form pt-3 rounded-br-md rounded-bl-md">
          <Form layout="vertical" size="large" disabled={loading}>
            <Row align="bottom" gutter={16}>
              <Col span={6}>
                <Controller
                  name="byDest"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <FormItem
                      label="Điểm đến"
                      className="departure-location"
                      validateStatus={error ? "error" : ""}
                      help={error?.message}
                    >
                      <DestinationSelector
                        value={field.value ? field.value[0] : undefined}
                        onChange={onChangeDestination}
                      />
                    </FormItem>
                  )}
                />
              </Col>
              <Col span={4}>
                <Controller
                  name="byMonth"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <FormItem label="Thời gian đi" validateStatus={error ? "error" : ""} help={error?.message}>
                      <CustomDatePicker
                        placeholder="Thời gian đi"
                        value={
                          field.value
                            ? dayjs(field.value, {
                                format: MONTH_FORMAT,
                              })
                            : undefined
                        }
                        format={"MMMM/YYYY"}
                        picker="month"
                        className="w-full"
                        bordered={false}
                        disabledDate={(date) => {
                          return dayjs().isAfter(date, "month");
                        }}
                        style={{ padding: 0 }}
                        onChange={handleSelectDate}
                      />
                    </FormItem>
                  )}
                />
              </Col>
              <Col span={4}>
                <Controller
                  name="byCode"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <FormItem label="Code" validateStatus={error ? "error" : ""} help={error?.message}>
                      <Input
                        placeholder="Nhập code"
                        value={field.value}
                        bordered={false}
                        style={{ padding: 0 }}
                        onChange={(ev) => onChangeCode(ev.target.value)}
                      />
                    </FormItem>
                  )}
                />
              </Col>
              <Col span={6}>
                <Controller
                  name="byInventoryType"
                  control={control}
                  render={({ field, fieldState }) => (
                    <FormItem label="Loại Inventory">
                      <InventoryTypeListSelector values={field.value} onChange={onChangeInventoryType} />
                    </FormItem>
                  )}
                />
              </Col>
              <Col flex={1} className="text-right">
                <FormItem>
                  <Button
                    type="primary"
                    icon={<SearchOutlined />}
                    loading={loading}
                    onClick={handleSubmit(onSubmitForm)}
                  >
                    Tìm kiếm
                  </Button>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
      </Card>
    </SearchBookingWrapper>
  );
};
export default BoxSearchProduct;

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
