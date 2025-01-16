"use client";
import styled from "styled-components";
import { Button, DatePickerProps, Form, Select } from "antd";
import IconMapPin from "@/assets/icons/IconMapPin";
import IconCalendar from "@/assets/icons/IconCalendar";
import IconSearch from "@/assets/icons/IconSearch";
import CustomDatePicker from "@/components/admin/CustomDatePicker";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { useGetDestinationsSearchConfigQuery } from "@/queries/fe/searchTour";
import { FeDestinationSearchConfig } from "@/models/fe/destination.interface";
import { FeSearchProductFormData } from "@/models/fe/searchTour.interface";
import { EProductType } from "@/models/management/core/productType.interface";
import { SelectProps } from "antd";
import { MONTH_FORMAT } from "@/constants/common";
import { isArray } from "lodash";
import { useRouter } from "@/utils/navigation";
import useMessage from "@/hooks/useMessage";
import { useSearchParams } from "next/navigation";
import classNames from "classnames";

export interface ProductSearchBoxProps {
  className?: string;
  onSubmit?: (formData?: FeSearchProductFormData) => void;
  isLoading?: boolean;
}

const ProductSearchBox: React.FC<ProductSearchBoxProps> = ({ className = "", onSubmit, isLoading }) => {
  const { data: destinationsSearchConfig, isLoading: isLoadingGetList } = useGetDestinationsSearchConfigQuery();

  const initSearchFormData = new FeSearchProductFormData(
    undefined,
    undefined,
    undefined,
    undefined,
    [EProductType.TOUR],
    undefined,
    undefined,
  );
  const message = useMessage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const departDate = searchParams.get("departDate");
  const destName = searchParams.get("destination");
  const destType = searchParams.get("destinationType");

  const destination = useMemo(() => {
    return destinationsSearchConfig?.find((item) => {
      if (destType?.toLocaleLowerCase() === "STATEPROVINCELIST".toLocaleLowerCase()) {
        return item.stateProvinceKey === destName;
      }
      if (destType?.toLocaleLowerCase() === "COUNTRYLIST".toLocaleLowerCase()) {
        return item.countryKey === destName;
      }
    });
  }, [destName, destType, destinationsSearchConfig]);

  const [formData, setFormData] = useState(initSearchFormData);

  const t = useTranslations("String");

  const onChangeDestination: SelectProps<number, FeDestinationSearchConfig>["onChange"] = (value, option) => {
    setFormData((prev) => ({
      ...prev,
      byDest: isArray(option) ? option : [option],
    }));
  };

  const handleSelectDate: DatePickerProps["onChange"] = (date, dateStr) => {
    // console.log(date?.locale("en").format("MM-YYYY"));
    setFormData((prev) => ({
      ...prev,
      byMonth: date?.locale("en").format(MONTH_FORMAT),
    }));
  };
  const handleSubmit = () => {
    if (!formData.byDest || !formData.byDest.length) {
      message.info("Vui long Chon diem den");
      return;
    }
    if (!formData.byMonth) {
      message.info("Vui long chon thoi gian di");
      return;
    }
    let destinationKey = formData.byDest[0].stateProvinceKey;

    if (formData.byDest[0].keyType?.toLocaleLowerCase() === "STATEPROVINCELIST".toLocaleLowerCase()) {
      destinationKey = formData.byDest[0].stateProvinceKey;
    }
    if (formData.byDest[0].keyType?.toLocaleLowerCase() === "COUNTRYLIST".toLocaleLowerCase()) {
      destinationKey = formData.byDest[0].countryKey;
    }

    const queryString = objectToQueryString({
      departDate: formData.byMonth,
      destination: destinationKey,
      destinationType: formData.byDest[0].keyType,
    });

    router.push(`/search?${queryString}`);
    onSubmit?.(formData);
  };

  useEffect(() => {
    if (
      destination &&
      departDate &&
      dayjs(departDate.slice(0, 1).toUpperCase().concat(departDate.slice(1)), "MMMYYYY").isValid() &&
      !dayjs(departDate, "MMMYYYY").isBefore(dayjs().format("MMMYYYY"))
    ) {
      const updateFormData = {
        ...formData,
        byMonth: departDate.slice(0, 1).toUpperCase().concat(departDate.slice(1)),
        byDest: [destination],
      };
      setFormData(updateFormData);
      onSubmit?.(updateFormData);
    }
  }, [destination]);
  return (
    <div
      className={classNames("search-box container mx-auto lg:px-8 md:px-6 px-4", {
        [className]: className,
      })}
    >
      <div className="search-box-inner bg-white px-3 md:px-4 py-3 rounded-md shadow-md max-w-2xl mx-auto">
        <Form layout="vertical">
          <div className="flex flex-wrap md:flex-nowrap items-center gap-x-4">
            <div className="control mb-4 md:mb-0 w-full md:w-1/2">
              <SelectorControl className="flex items-center rounded-md relative">
                <IconMapPin className="absolute" />
                <Select<number, FeDestinationSearchConfig>
                  placeholder="Chọn điểm đến"
                  bordered={false}
                  loading={isLoadingGetList}
                  showSearch={true}
                  fieldNames={{
                    label: "name",
                    value: "id",
                  }}
                  value={formData.byDest ? formData.byDest[0].id : undefined}
                  options={destinationsSearchConfig || []}
                  onChange={onChangeDestination}
                  className="w-full"
                  getPopupContainer={(triggerNode) => triggerNode.parentElement.parentElement}
                  suffixIcon={null}
                />
              </SelectorControl>
            </div>
            <div className="control mb-4 md:mb-0 w-full md:w-1/2">
              <DatePickerControl className="flex items-center rounded-md relative custom-date-picker">
                <IconCalendar className="absolute" />
                <CustomDatePicker
                  placeholder="Thời gian đi"
                  disabledDate={(date) => {
                    return date.isBefore(dayjs());
                  }}
                  allowClear={false}
                  inputReadOnly
                  format={"MMMM/YYYY"}
                  picker="month"
                  className="w-full p-0"
                  bordered={false}
                  suffixIcon={null}
                  value={formData.byMonth ? dayjs(formData.byMonth, MONTH_FORMAT) : null}
                  onChange={handleSelectDate}
                />
              </DatePickerControl>
            </div>
            <ButtonSearch
              danger
              type="primary"
              icon={<IconSearch />}
              onClick={handleSubmit}
              loading={isLoading}
              className="w-full md:w-auto"
            >
              <span>{t("button.search")}</span>
            </ButtonSearch>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default ProductSearchBox;

const objectToQueryString = (obj: { [key: string]: string }) => {
  return Object.entries(obj).reduce<string>((acc, [key, value], _index) => {
    return acc.concat(_index === 0 ? "" : "&", `${key}=${value}`);
  }, "");
};

const BoxSearchSkeleton = () => {
  return (
    <div className="bg-white rounded-md max-w-2xl px-3 md:px-4 py-4 mx-auto">
      <div className="animate-pulse">
        <div className="lg:grid lg:grid-cols-4 gap-4 space-y-4 lg:space-y-0">
          <div className="lg:grid lg:grid-cols-2 lg:col-span-3 gap-3 space-y-3 lg:space-y-0">
            <div className="bg-slate-100 rounded-md h-10"></div>
            <div className="bg-slate-100 rounded-md h-10"></div>
          </div>
          <div className="bg-slate-100 rounded-md h-10 max-w-[180px]"></div>
        </div>
      </div>
    </div>
  );
};

const ButtonSearch = styled(Button)`
  && {
    display: flex;
    align-items: center;
    height: 48px !important;
    justify-content: center;
  }
`;

const SelectorControl = styled("div")`
  & {
    height: 48px;

    .travel-select-single:not(.travel-select-customize-input) .travel-select-selector {
      padding-left: 32px;
      .travel-select-selection-search {
        inset-inline-start: 32px;
      }
    }
  }
`;

const DatePickerControl = styled("div")`
  & {
    height: 48px;

    .travel-picker-large,
    .travel-picker {
      padding-left: 32px;
    }
  }
`;
