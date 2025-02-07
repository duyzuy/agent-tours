"use client";
import React, { memo, useEffect, useState } from "react";
import { Drawer, Form, Button, Space, Col, Row, Input, DatePickerProps, Select } from "antd";
import FormItem from "@/components/base/FormItem";
import { PassengerInformationFormData } from "@/modules/fe/manageBooking/manageBooking.type";
import { useForm } from "react-hook-form";
import CustomDatePicker from "@/components/admin/CustomDatePicker";
import { Controller } from "react-hook-form";
import {
  EPassengerGender,
  EPassengerTitle,
  PASSENGER_AGES,
  PASSENGER_GENDER,
  PASSENGER_TITLES,
} from "@/constants/common";
import { passengerUpdateSchema } from "@/modules/fe/manageBooking/validate.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { stringToDate } from "@/utils/date";
import { PassengerType } from "@/models/common.interface";
import { useTranslations } from "next-intl";
import dayjs from "dayjs";

export interface PassengerFormDrawerProps {
  values?: {
    recId?: number;
    paxTitle?: EPassengerTitle;
    paxLastname?: string;
    paxMiddleFirstName?: string;
    paxGender?: EPassengerGender;
    paxBirthDate?: string;
    paxBirthYear?: number;
    paxPhoneNumber?: string;
    paxAddress?: string;
    paxIdNumber?: string;
    paxNationality?: string;
    paxPassportNumber?: string;
    paxPassortExpiredDate?: string;
    paxInfoJson?: string;
  };
  passengerType?: PassengerType;
  startDate?: string;
  open?: boolean;
  isLoading?: boolean;
  onCancel?: () => void;
  onSubmit?: (formData: PassengerInformationFormData) => void;
}

const PassengerFormDrawer: React.FC<PassengerFormDrawerProps> = ({
  values,
  onCancel,
  onSubmit,
  isLoading,
  open,
  passengerType,
  startDate,
}) => {
  const initFormData = new PassengerInformationFormData(
    undefined,
    undefined,
    "",
    "",
    undefined,
    undefined,
    undefined,
    "",
    "",
    "",
    "",
    "",
    undefined,
    "",
  );
  const [errorForm, setErrorForm] = useState<{ paxBirthDate?: string; expiredPassportDate?: string } | undefined>();
  const { control, handleSubmit, setValue, reset } = useForm<PassengerInformationFormData>({
    defaultValues: { ...initFormData },
    resolver: yupResolver(passengerUpdateSchema),
  });

  const t = useTranslations("Passenger");
  const er = useTranslations("Error");

  const handleChangeNationalityDate: DatePickerProps["onChange"] = (date) => {
    setValue("paxPassortExpiredDate", date?.toISOString());
  };

  const handleChangeDOB: DatePickerProps["onChange"] = (date) => {
    let errorMess: string | undefined = undefined;

    switch (passengerType) {
      case PassengerType.ADULT: {
        if (dayjs(stringToDate(startDate)).diff(date, "years") < PASSENGER_AGES.adult.min) {
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
          dayjs(stringToDate(startDate)).diff(date, "years") < PASSENGER_AGES.child.min ||
          dayjs(stringToDate(startDate)).diff(date, "years") > PASSENGER_AGES.child.max
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
        if (dayjs(stringToDate(startDate)).diff(date, "years") + 1 > PASSENGER_AGES.infant.max) {
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

    setValue("paxBirthDate", date?.toISOString());
  };

  const renderLabelDOBPax = () => {
    return (
      <span className="flex items-center">
        <span className="mr-2">{t("input.dob.label")}</span>
        <span className="text-xs text-red-600">
          (
          {passengerType === PassengerType.ADULT
            ? t("input.dob.sublabel.adult")
            : passengerType === PassengerType.CHILD
            ? t("input.dob.sublabel.child")
            : passengerType === PassengerType.INFANT
            ? t("input.dob.sublabel.infant")
            : "--"}
          )
        </span>
      </span>
    );
  };

  useEffect(() => {
    const formData = values
      ? new PassengerInformationFormData(
          values.recId,
          values.paxTitle,
          values.paxLastname,
          values.paxMiddleFirstName,
          values.paxGender,
          values.paxBirthDate,
          values.paxBirthYear,
          values.paxPhoneNumber,
          values.paxAddress,
          values.paxIdNumber,
          values.paxNationality,
          values.paxPassportNumber,
          values.paxPassortExpiredDate,
          values.paxInfoJson,
        )
      : initFormData;
    Object.keys(formData).forEach((key) => {
      setValue(key as keyof PassengerInformationFormData, formData[key as keyof PassengerInformationFormData]);
    });
  }, [values]);

  return (
    <Drawer
      title="Cập nhật thông tin hành khách"
      width={550}
      open={open}
      closeIcon={null}
      maskClosable={false}
      destroyOnClose={true}
      footer={
        <Space className="py-3">
          <Button
            type="primary"
            size="large"
            className="w-40"
            onClick={onSubmit && handleSubmit(onSubmit)}
            loading={isLoading}
          >
            Lưu
          </Button>
          <Button size="large" className="w-40" onClick={onCancel}>
            Huỷ bỏ
          </Button>
        </Space>
      }
    >
      <Form layout="vertical" disabled={isLoading}>
        <Row gutter={24}>
          <Col span={12}>
            <Controller
              control={control}
              name="paxTitle"
              render={({ field, fieldState: { error } }) => (
                <FormItem
                  label={t("select.title.label")}
                  required
                  validateStatus={error ? "error" : undefined}
                  help={error?.message ? t(error.message) : undefined}
                >
                  <Select {...field} placeholder={t("select.title.placeholder")} options={PASSENGER_TITLES} />
                </FormItem>
              )}
            />
          </Col>
          <Col span={12}>
            <Controller
              control={control}
              name="paxGender"
              render={({ field, fieldState: { error } }) => (
                <FormItem
                  label={t("input.gender.label")}
                  required
                  validateStatus={error ? "error" : undefined}
                  help={error?.message ? t(error.message) : undefined}
                >
                  <Select {...field} placeholder={t("input.gender.placeholder")} options={PASSENGER_GENDER} />
                </FormItem>
              )}
            />
          </Col>
          <Col span={12}>
            <Controller
              control={control}
              name="paxLastname"
              render={({ field, fieldState: { error } }) => (
                <FormItem
                  label={t("input.lastname.label")}
                  required
                  validateStatus={error ? "error" : undefined}
                  help={error?.message ? t(error.message) : undefined}
                >
                  <Input {...field} placeholder={t("input.lastname.placeholder")} />
                </FormItem>
              )}
            />
          </Col>
          <Col span={12}>
            <Controller
              control={control}
              name="paxMiddleFirstName"
              render={({ field, fieldState: { error } }) => (
                <FormItem
                  label={t("input.middleAndFirstName.label")}
                  required
                  validateStatus={error ? "error" : undefined}
                  help={error?.message}
                >
                  <Input {...field} placeholder={t("input.middleAndFirstName.placeholder")} />
                </FormItem>
              )}
            />
          </Col>
          <Col span={24} lg={12}>
            <Controller
              control={control}
              name="paxBirthDate"
              render={({ field, fieldState: { error } }) => (
                <FormItem
                  label={renderLabelDOBPax()}
                  required
                  validateStatus={error ? "error" : errorForm?.paxBirthDate ? "error" : undefined}
                  help={error?.message || errorForm?.paxBirthDate}
                >
                  <CustomDatePicker
                    format="DD/MM/YYYY"
                    placeholder={t("input.dob.placeholder")}
                    className="w-full"
                    value={field.value ? dayjs(field.value) : undefined}
                    disabledDate={(date) => date.isAfter(dayjs())}
                    onChange={handleChangeDOB}
                  />
                </FormItem>
              )}
            />
          </Col>
          <Col span={24} lg={12}>
            <Controller
              control={control}
              name="paxPhoneNumber"
              render={({ field, fieldState: { error } }) => (
                <FormItem
                  label={t("input.phoneNumber.label")}
                  validateStatus={error ? "error" : undefined}
                  help={error?.message}
                >
                  <Input
                    placeholder={t("input.phoneNumber.placeholder")}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormItem>
              )}
            />
          </Col>

          <Col span={24}>
            <Controller
              control={control}
              name="paxAddress"
              render={({ field, fieldState: { error } }) => (
                <FormItem
                  label={t("input.address.label")}
                  validateStatus={error ? "error" : undefined}
                  help={error?.message}
                >
                  <Input {...field} placeholder={t("input.address.placeholder")} />
                </FormItem>
              )}
            />
          </Col>
          <Col span={24} lg={8}>
            <Controller
              control={control}
              name="paxPassportNumber"
              render={({ field, fieldState: { error } }) => (
                <FormItem
                  label={t("input.passportNumber.label")}
                  validateStatus={error ? "error" : undefined}
                  help={error?.message}
                >
                  <Input {...field} placeholder={t("input.passportNumber.placeholder")} />
                </FormItem>
              )}
            />
          </Col>
          <Col span={24} lg={8}>
            <Controller
              control={control}
              name="paxPassortExpiredDate"
              render={({ field, fieldState: { error } }) => (
                <FormItem
                  label={t("input.passportExpiredDate.label")}
                  validateStatus={error ? "error" : errorForm?.expiredPassportDate ? "error" : undefined}
                  help={error?.message || errorForm?.expiredPassportDate}
                >
                  <CustomDatePicker
                    allowClear={false}
                    format="DD/MM/YYYY"
                    className="w-full"
                    placeholder={t("input.passportExpiredDate.placeholder")}
                    value={field.value ? dayjs(field.value) : undefined}
                    disabledDate={(date) => date.isBefore(dayjs())}
                    onChange={handleChangeNationalityDate}
                  />
                </FormItem>
              )}
            />
          </Col>
          <Col span={24} lg={8}>
            <Controller
              control={control}
              name="paxNationality"
              render={({ field, fieldState: { error } }) => (
                <FormItem
                  label={t("input.nationality.label")}
                  required
                  validateStatus={error ? "error" : undefined}
                  help={error?.message}
                >
                  <Input {...field} placeholder={t("input.nationality.placeholder")} />
                </FormItem>
              )}
            />
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};
export default memo(PassengerFormDrawer);
