"use client";
import React, { useEffect, useState } from "react";
import { Form, Input, Row, Col, Button, DatePickerProps } from "antd";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { SearchOutlined } from "@ant-design/icons";
import { SearchBookingFormData } from "../../modules/searchBooking.interface";
import { HandleSubmit, useFormSubmit } from "@/hooks/useFormSubmit";
import { EProductType } from "@/models/management/core/productType.interface";
import FormItem from "@/components/base/FormItem";
import { MONTH_FORMAT } from "@/constants/common";
import CustomDatePicker from "@/components/admin/CustomDatePicker";
import ProductTypeSelector, { ProductTypeSelectorProps } from "./ProductTypeSelector";
import DestinationSelector, { DestinationSelectorProps } from "./DestinationSelector";
import InventoryTypeListSelector, { InventoryTypeListSelectorProps } from "./InventoryTypeListSelector";
import { UseSearchBookingInformation } from "../../modules/useSearchBookingInformation";
import { searchPortalBookingSchema } from "../../modules/validate.schema";
import classNames from "classnames";
import styled from "styled-components";
import dayjs from "dayjs";

export interface SearchBookingBoxProps {
  departLocation?: string;
  departDate?: string;
  className?: string;
  onSubmit?: UseSearchBookingInformation["onSearch"];
  loading?: boolean;
}

const initBookingSearchForm = new SearchBookingFormData(
  dayjs().locale("en").format(MONTH_FORMAT),
  "",
  [],
  [EProductType.TOUR],
  [],
);

const SearchBookingBox: React.FC<SearchBookingBoxProps> = ({ className = "", loading, onSubmit }) => {
  const [formData, setFormData] = useState(initBookingSearchForm);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const { handlerSubmit, errors } = useFormSubmit({
    schema: searchPortalBookingSchema,
  });

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

  const onChangeInventoryType: InventoryTypeListSelectorProps["onChange"] = (values) => {
    setFormData((prev) => ({
      ...prev,
      byInventoryType: [...values],
    }));
  };

  const onChangeDestination: DestinationSelectorProps["onChange"] = (destination) => {
    setFormData((prev) => ({
      ...prev,
      byDest: [destination],
    }));
  };

  const onChangeProductType: ProductTypeSelectorProps["onChange"] = (type) => {
    setFormData((prev) => ({ ...prev, byProductType: [type] }));
  };

  const onSubmitFormData: HandleSubmit<SearchBookingFormData> = (data) => {
    let url = `${pathname}`;
    url = url.concat("?byMonth=", data.byMonth || "");

    onSubmit?.(data, {
      onSuccess: () => {
        router.push(url);
      },
    });
  };
  useEffect(() => {
    let url = `${pathname}`;
    let data = { ...formData };
    const byMonth = searchParams.get("byMonth");
    if (byMonth) {
      url = url.concat("?byMonth=", byMonth);
      data = { ...data, byMonth: byMonth };
    }
    handlerSubmit(data, onSubmit);
    setFormData(data);
  }, []);

  return (
    <SearchBookingWrapper className={classNames({ [className]: className })}>
      <div className="booking-tab bg-white px-3 py-3 rounded-tr-md rounded-tl-md border-b">
        <ProductTypeSelector
          value={formData.byProductType ? formData?.byProductType[0] : undefined}
          onChange={onChangeProductType}
        />
      </div>
      <div className="booking-form px-6 py-4 bg-white rounded-br-md rounded-bl-md">
        <Form layout="vertical" size="large">
          <Row align="bottom" gutter={16}>
            <Col span={6}>
              <FormItem
                label="Điểm đến"
                className="departure-location"
                validateStatus={errors?.byDest ? "error" : ""}
                help={errors?.byDest || ""}
              >
                <DestinationSelector
                  value={formData.byDest ? formData.byDest[0] : undefined}
                  onChange={onChangeDestination}
                />
              </FormItem>
            </Col>
            <Col span={4}>
              <FormItem
                label="Thời gian đi"
                validateStatus={errors?.byMonth ? "error" : ""}
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
                  disabledDate={(date) => {
                    return dayjs().isAfter(date, "month");
                  }}
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
                  onChange={(ev) => onChangeCode(ev.target.value)}
                />
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label="Loại Inventory">
                <InventoryTypeListSelector values={formData.byInventoryType} onChange={onChangeInventoryType} />
              </FormItem>
            </Col>
            <Col flex={1} className="text-right">
              <FormItem>
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  loading={loading}
                  onClick={() => handlerSubmit(formData, onSubmitFormData)}
                >
                  Tìm kiếm
                </Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    </SearchBookingWrapper>
  );
};
export default SearchBookingBox;

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
