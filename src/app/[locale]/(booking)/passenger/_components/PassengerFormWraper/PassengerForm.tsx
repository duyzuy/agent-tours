import React, { memo, useState } from "react";
import { Col, Form, Input, Row, Select, DatePickerProps } from "antd";
import classNames from "classnames";
import dayjs, { Dayjs } from "dayjs";
import { isUndefined } from "lodash";
import { useTranslations } from "next-intl";
import { PassengerType } from "@/models/common.interface";
import { getPassengerType } from "@/utils/common";
import { getPassengerGenderList } from "@/utils/passenger";
import { DATE_FORMAT, DATE_FORMATS, PASSENGER_AGES } from "@/constants/common";
import CustomDatePicker from "@/components/admin/CustomDatePicker";
import FormItem from "@/components/base/FormItem";

import {
  Control,
  Controller,
  FieldArrayWithId,
  FieldErrors,
  UseFormSetValue,
  UseFormClearErrors,
} from "react-hook-form";
import { FeBookingInformation } from "../../../modules/booking.interface";
export type PassengerItemType = FeBookingInformation["bookingInfo"]["passengers"][number];

export type PassengerFormValues = {
  passengerItem: PassengerItemType[];
};

export interface PassengerFormProps {
  index: number;
  type: PassengerType;
  control?: Control<PassengerFormValues>;
  field?: FieldArrayWithId<PassengerFormValues, "passengerItem", "id">;
  clearErrors?: UseFormClearErrors<PassengerFormValues>;
  setValue?: UseFormSetValue<PassengerFormValues>;
  startDate?: string;
  className?: string;
}

const PassengerForm: React.FC<PassengerFormProps> = ({
  index,
  type,
  clearErrors,
  setValue,
  field,
  control,
  startDate,
  className = "",
}) => {
  const t = useTranslations("Passenger");
  const er = useTranslations("Error");
  const [errorForm, setErrorForm] = useState<{ paxBirthDate?: string; expiredPassportDate?: string } | undefined>();

  const passengerGenderList = getPassengerGenderList(type);

  const onChangeBirthDate: DatePickerProps["onChange"] = (date: Dayjs | null) => {
    let errorMess: string | undefined = undefined;

    switch (type) {
      case PassengerType.ADULT: {
        if (dayjs(startDate).diff(date, "years") < PASSENGER_AGES.adult.min) {
          errorMess = er("passenger.age.adult.invalidLess");
          setErrorForm((prev) => ({
            ...prev,
            paxBirthDate: errorMess,
          }));
          return;
        }
        break;
      }
      case PassengerType.CHILD: {
        if (
          dayjs(startDate).diff(date, "years") < PASSENGER_AGES.child.min ||
          dayjs(startDate).diff(date, "years") > PASSENGER_AGES.child.max
        ) {
          errorMess = er("passenger.age.child.invalid");
          setErrorForm((prev) => ({
            ...prev,
            paxBirthDate: errorMess,
          }));
          return;
        }
        break;
      }
      case PassengerType.INFANT: {
        if (dayjs(startDate).diff(date, "years") + 1 > PASSENGER_AGES.infant.max) {
          errorMess = er("passenger.age.infant.invalid");
          setErrorForm((prev) => ({
            ...prev,
            paxBirthDate: errorMess,
          }));
          return;
        }
        break;
      }
    }
    setErrorForm((prev) => ({
      ...prev,
      paxBirthDate: undefined,
    }));

    date && setValue?.(`passengerItem.${index}.info.paxBirthDate`, date.toDate().toDateString()),
      clearErrors?.(`passengerItem.${index}.info.paxBirthDate`);
  };

  const hasError = (
    key: keyof FieldArrayWithId<PassengerFormValues, "passengerItem", "id">["info"],

    errors: FieldErrors<PassengerFormValues>,
  ) => {
    return errors?.passengerItem && errors?.passengerItem[index]?.info && errors?.passengerItem[index]?.info?.[key];
  };
  const getErrorMesssage = (
    key: keyof FieldArrayWithId<PassengerFormValues, "passengerItem", "id">["info"],

    errors: FieldErrors<PassengerFormValues>,
  ) => {
    return errors?.passengerItem && errors?.passengerItem[index]?.info && errors?.passengerItem[index]?.info?.[key]
      ? t(errors?.passengerItem[index]?.info?.[key]?.message)
      : "";
  };
  const renderLabelDOBPax = () => {
    return (
      <span className="flex items-center">
        <span className="mr-2">{t("input.dob.label")}</span>
        <span className="text-xs text-red-600">
          (
          {type === PassengerType.ADULT
            ? t("input.dob.sublabel.adult")
            : type === PassengerType.CHILD
            ? t("input.dob.sublabel.child")
            : type === PassengerType.INFANT
            ? t("input.dob.sublabel.infant")
            : "--"}
          )
        </span>
      </span>
    );
  };
  return (
    <div
      className={classNames("passenger__information-box-item", {
        [className]: className,
      })}
    >
      <div className="passenger__information-box-item-head mb-3 pb-3 text-primary-default">
        <span className="inline-block mr-2 text-[16px] font-[500]">{`${t("form.label")} ${
          !isUndefined(index) ? index + 1 : 0
        }`}</span>
        <span className="text-xs">{getPassengerType(type)}</span>
      </div>
      <div className="passenger__information-box-form">
        <Form layout="vertical" component="div">
          <Row gutter={16}>
            <Col span={24} md={6}>
              <Controller
                control={control}
                name={`passengerItem.${index}.info.paxGender`}
                render={({ field, formState: { errors } }) => (
                  <FormItem
                    label={t("input.gender.label")}
                    required
                    validateStatus={hasError("paxGender", errors) ? "error" : undefined}
                    help={
                      getErrorMesssage(
                        "paxGender",

                        errors,
                      ) ?? ""
                    }
                  >
                    <Select {...field} placeholder={t("input.gender.placeholder")} options={passengerGenderList} />
                  </FormItem>
                )}
              />
            </Col>
            <Col span={24} md={9}>
              <Controller
                control={control}
                name={`passengerItem.${index}.info.paxLastname`}
                render={({ field, formState: { errors } }) => (
                  <FormItem
                    label={t("input.lastname.label")}
                    required
                    validateStatus={
                      hasError(
                        "paxLastname",

                        errors,
                      )
                        ? "error"
                        : undefined
                    }
                    help={
                      getErrorMesssage(
                        "paxLastname",

                        errors,
                      ) ?? ""
                    }
                  >
                    <Input {...field} placeholder={t("input.lastname.placeholder")} />
                  </FormItem>
                )}
              />
            </Col>
            <Col span={24} md={9}>
              <Controller
                control={control}
                name={`passengerItem.${index}.info.paxMiddleFirstName`}
                render={({ field, formState: { errors } }) => (
                  <FormItem
                    label={t("input.middleAndFirstName.label")}
                    required
                    validateStatus={
                      hasError(
                        "paxMiddleFirstName",

                        errors,
                      )
                        ? "error"
                        : undefined
                    }
                    help={
                      getErrorMesssage(
                        "paxMiddleFirstName",

                        errors,
                      ) ?? ""
                    }
                  >
                    <Input {...field} placeholder={t("input.middleAndFirstName.placeholder")} />
                  </FormItem>
                )}
              />
            </Col>
            <Col span={24} md={12}>
              <Controller
                control={control}
                name={`passengerItem.${index}.info.paxBirthDate`}
                render={({ field: { value: birthDate }, formState: { errors } }) => (
                  <FormItem
                    label={renderLabelDOBPax()}
                    required
                    validateStatus={
                      errorForm?.paxBirthDate ||
                      hasError(
                        "paxBirthDate",

                        errors,
                      )
                        ? "error"
                        : undefined
                    }
                    help={
                      errorForm?.paxBirthDate ||
                      getErrorMesssage(
                        "paxBirthDate",

                        errors,
                      ) ||
                      ""
                    }
                  >
                    <CustomDatePicker
                      format="DD/MM/YYYY"
                      className="w-full"
                      showToday={false}
                      placeholder={t("input.dob.placeholder")}
                      value={
                        birthDate
                          ? dayjs(birthDate, {
                              format: DATE_FORMATS["DD/MM/YYYY"],
                            })
                          : null
                      }
                      allowClear={false}
                      disabledDate={(date) => date.isAfter(dayjs())}
                      onChange={onChangeBirthDate}
                    />
                  </FormItem>
                )}
              />
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};
export default memo(PassengerForm);
