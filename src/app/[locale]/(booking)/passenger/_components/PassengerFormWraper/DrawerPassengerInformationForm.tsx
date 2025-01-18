import { useEffect, useState } from "react";
import { Button, Col, DatePickerProps, Drawer, Form, Input, Row, Select, Space } from "antd";
import { PassengerType } from "@/models/common.interface";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import FormItem from "@/components/base/FormItem";
import { PASSENGER_AGES, PASSENGER_GENDER, PASSENGER_TITLES } from "@/constants/common";
import { getPassengerType } from "@/utils/common";
import CustomDatePicker from "@/components/admin/CustomDatePicker";
import dayjs, { Dayjs } from "dayjs";
import { isUndefined } from "lodash";
import { yupResolver } from "@hookform/resolvers/yup";
import { FePassengerInformationFormData } from "../../modules/passegner.interface";
import { passengerSchema } from "../../modules/passenger.schema";
import { FeBookingInformation } from "../../../modules/booking.interface";
import { useTranslations } from "next-intl";
import { stringToDate } from "@/utils/date";

export interface DrawerPassengerInformationFormProps {
  open?: boolean;
  onClose?: () => void;
  onOk?: (data: FeBookingInformation["bookingInfo"]["passengers"][number]) => void;
  data?: FePassengerInformationFormData;
  paxType?: PassengerType;
  bookingIndex?: number;
  startDate?: string;
}
const DrawerPassengerInformationForm: React.FC<DrawerPassengerInformationFormProps> = ({
  open,
  onClose,
  onOk,
  data,
  paxType,
  bookingIndex,
  startDate,
}) => {
  const initFormData = new FePassengerInformationFormData(
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
  );
  const t = useTranslations("Passenger");
  const er = useTranslations("Error");
  const { control, handleSubmit, setValue, clearErrors, getValues } = useForm<FePassengerInformationFormData>({
    defaultValues: { ...initFormData },
    resolver: yupResolver(passengerSchema),
  });
  const [errorForm, setErrorForm] = useState<{ paxBirthDate?: string; expiredPassportDate?: string } | undefined>();

  const onChangeBirthDate: DatePickerProps["onChange"] = (date: Dayjs | null) => {
    let errorMess: string | undefined = undefined;

    switch (paxType) {
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
          {paxType === PassengerType.ADULT
            ? t("input.dob.sublabel.adult")
            : paxType === PassengerType.CHILD
            ? t("input.dob.sublabel.child")
            : paxType === PassengerType.INFANT
            ? t("input.dob.sublabel.infant")
            : "--"}
          )
        </span>
      </span>
    );
  };

  const onChangeNationalityDate: DatePickerProps["onChange"] = (date) => {
    setValue("paxPassortExpiredDate", date?.toISOString());
  };

  const onSubmit: SubmitHandler<FePassengerInformationFormData> = (data) => {
    onOk && !isUndefined(bookingIndex) && paxType && onOk({ index: bookingIndex, info: data, type: paxType });
  };
  useEffect(() => {
    const passengerInfo = data
      ? new FePassengerInformationFormData(
          undefined,
          data.paxTitle,
          data.paxLastname,
          data.paxMiddleFirstName,
          data.paxGender,
          data.paxBirthDate,
          data.paxBirthYear,
          data.paxPhoneNumber,
          data.paxAddress,
          data.paxIdNumber,
          data.paxNationality,
          data.paxPassportNumber,
          data.paxPassortExpiredDate,
        )
      : initFormData;

    Object.keys(passengerInfo).forEach((key) => {
      setValue(key as keyof FePassengerInformationFormData, passengerInfo[key as keyof FePassengerInformationFormData]);
    });
    setErrorForm(undefined);
    clearErrors();
  }, [open, data]);

  return (
    <Drawer
      title={`Hành khách ${!isUndefined(bookingIndex) ? bookingIndex + 1 : "--"} - ${
        paxType ? getPassengerType(paxType) : "--"
      }`}
      width={650}
      open={open}
      destroyOnClose
      maskClosable={false}
      closeIcon={null}
      footer={
        <Space className="py-2">
          <Button type="primary" size="large" className="w-36" onClick={handleSubmit(onSubmit)}>
            Lưu
          </Button>
          <Button size="large" type="text" className="!bg-gray-200 !text-gray-600 w-36" onClick={onClose}>
            Huỷ bỏ
          </Button>
        </Space>
      }
    >
      <Form layout="vertical" component="div">
        <Row gutter={16}>
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
                  <Select
                    placeholder={t("select.title.placeholder")}
                    options={PASSENGER_TITLES}
                    value={field.value}
                    onChange={field.onChange}
                  />
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
                  <Select
                    placeholder={t("input.gender.placeholder")}
                    options={PASSENGER_GENDER}
                    value={field.value}
                    onChange={field.onChange}
                  />
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
                  <Input placeholder={t("input.lastname.placeholder")} value={field.value} onChange={field.onChange} />
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
                  <Input
                    placeholder={t("input.middleAndFirstName.placeholder")}
                    value={field.value}
                    onChange={field.onChange}
                  />
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
                    onChange={onChangeBirthDate}
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
                  <Input placeholder={t("input.address.placeholder")} value={field.value} onChange={field.onChange} />
                </FormItem>
              )}
            />
          </Col>
        </Row>
        <Row gutter={16}>
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
                  <Input
                    placeholder={t("input.passportNumber.placeholder")}
                    value={field.value}
                    onChange={field.onChange}
                  />
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
                    onChange={onChangeNationalityDate}
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
                  <Input
                    placeholder={t("input.nationality.placeholder")}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormItem>
              )}
            />
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};
export default DrawerPassengerInformationForm;
