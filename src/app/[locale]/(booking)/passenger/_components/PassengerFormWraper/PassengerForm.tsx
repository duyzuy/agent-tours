import React, { memo, useState } from "react";
import { PassengerType } from "@/models/common.interface";
import { Col, Form, Input, Row, Select, DatePickerProps } from "antd";
import FormItem from "@/components/base/FormItem";

import { DATE_FORMAT, PASSENGER_AGES } from "@/constants/common";
import { FePassengerInformationFormData } from "../../modules/passegner.interface";
import { getPassengerType } from "@/utils/common";
import classNames from "classnames";
import dayjs, { Dayjs } from "dayjs";
import CustomDatePicker from "@/components/admin/CustomDatePicker";
import { getPassengerGenderList } from "@/utils/passenger";
import { isUndefined } from "lodash";
import { useTranslations } from "next-intl";
import {
    Control,
    Controller,
    FieldArrayWithId,
    FieldErrors,
    UseFormSetValue,
    UseFormClearErrors,
} from "react-hook-form";
import { PassengerFormValues } from ".";
import { removeVietnameseTones } from "@/utils/helper";

export interface PassengerFormProps {
    index: number;
    type: PassengerType;
    control?: Control<PassengerFormValues>;
    field?: FieldArrayWithId<PassengerFormValues, "passengerItem", "id">;
    clearErrors?: UseFormClearErrors<PassengerFormValues>;
    setValue?: UseFormSetValue<PassengerFormValues>;
    errors?: FieldErrors<PassengerFormValues>;
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
    errors,
}) => {
    const t = useTranslations("Passenger");
    const er = useTranslations("Error");
    const [errorForm, setErrorForm] = useState<
        { paxBirthDate?: string; expiredPassportDate?: string } | undefined
    >();

    const passengerGenderList = getPassengerGenderList(type);

    console.log(errors, index);
    const onChangeBirthDate: DatePickerProps["onChange"] = (
        date: Dayjs | null,
    ) => {
        let errorMess: string | undefined = undefined;
        let paxDOB = date ? date.locale("en").format(DATE_FORMAT) : null;

        switch (type) {
            case PassengerType.ADULT: {
                if (
                    dayjs(startDate).diff(date, "years") <
                    PASSENGER_AGES.adult.min
                ) {
                    errorMess = er("passenger.age.adult.invalidLess");
                    paxDOB = null;
                }

                break;
            }
            case PassengerType.CHILD: {
                if (
                    dayjs(startDate).diff(date, "years") <
                        PASSENGER_AGES.child.min ||
                    dayjs(startDate).diff(date, "years") >
                        PASSENGER_AGES.child.max
                ) {
                    errorMess = er("passenger.age.child.invalid");
                    paxDOB = null;
                }

                break;
            }
            case PassengerType.INFANT: {
                if (
                    dayjs(startDate).diff(date, "years") >
                    PASSENGER_AGES.infant.max
                ) {
                    errorMess = er("passenger.age.infant.invalid");
                    paxDOB = null;
                }
                break;
            }
        }
        setErrorForm((prev) => ({ ...prev, paxBirthDate: errorMess }));
        paxDOB &&
            setValue?.(
                `passengerItem.${index}.passengerinfo.paxBirthDate`,
                paxDOB,
            ),
            clearErrors?.(`passengerItem.${index}.passengerinfo.paxBirthDate`);
    };

    const hasError = (
        key: keyof FieldArrayWithId<
            PassengerFormValues,
            "passengerItem",
            "id"
        >["passengerinfo"],
        _index: number,
    ) => {
        return (
            errors?.passengerItem &&
            errors?.passengerItem[_index]?.passengerinfo &&
            errors?.passengerItem[_index]?.passengerinfo?.[key]
        );
    };
    const getErrorMesssage = (
        key: keyof FieldArrayWithId<
            PassengerFormValues,
            "passengerItem",
            "id"
        >["passengerinfo"],
    ) => {
        return errors?.passengerItem &&
            errors?.passengerItem[index]?.passengerinfo &&
            errors?.passengerItem[index]?.passengerinfo?.[key]
            ? t(errors?.passengerItem[index]?.passengerinfo?.[key]?.message)
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
                <span className="inline-block mr-2 text-[16px] font-[500]">{`${t(
                    "form.label",
                )} ${!isUndefined(index) ? index + 1 : 0}`}</span>
                <span className="text-xs">{getPassengerType(type)}</span>
            </div>
            <div className="passenger__information-box-form">
                <Form layout="vertical" component="div">
                    <Row gutter={16}>
                        <Col span={24} md={6}>
                            <Controller
                                key={field?.passengerinfo?.paxGender}
                                control={control}
                                name={`passengerItem.${index}.passengerinfo.paxGender`}
                                render={({ field }) => (
                                    <FormItem
                                        label={t("input.gender.label")}
                                        required
                                        validateStatus={
                                            hasError("paxGender", index)
                                                ? "error"
                                                : undefined
                                        }
                                        help={
                                            getErrorMesssage("paxGender") ?? ""
                                        }
                                    >
                                        <Select
                                            {...field}
                                            placeholder={t(
                                                "input.gender.placeholder",
                                            )}
                                            options={passengerGenderList}
                                        />
                                    </FormItem>
                                )}
                            />
                        </Col>
                        <Col span={24} md={9}>
                            <Controller
                                key={field?.passengerinfo?.paxLastname}
                                control={control}
                                name={`passengerItem.${index}.passengerinfo.paxLastname`}
                                render={({ field }) => (
                                    <FormItem
                                        label={t("input.lastname.label")}
                                        required
                                        validateStatus={
                                            hasError("paxLastname", index)
                                                ? "error"
                                                : undefined
                                        }
                                        help={
                                            getErrorMesssage("paxLastname") ??
                                            ""
                                        }
                                    >
                                        <Input
                                            {...field}
                                            autoFocus
                                            placeholder={t(
                                                "input.lastname.placeholder",
                                            )}
                                        />
                                    </FormItem>
                                )}
                            />
                        </Col>
                        <Col span={24} md={9}>
                            <Controller
                                key={field?.passengerinfo?.paxMiddleFirstName}
                                control={control}
                                name={`passengerItem.${index}.passengerinfo.paxMiddleFirstName`}
                                render={({
                                    field: { value, onChange, onBlur },
                                }) => (
                                    <FormItem
                                        label={t(
                                            "input.middleAndFirstName.label",
                                        )}
                                        required
                                        validateStatus={
                                            hasError(
                                                "paxMiddleFirstName",
                                                index,
                                            )
                                                ? "error"
                                                : undefined
                                        }
                                        help={
                                            getErrorMesssage(
                                                "paxMiddleFirstName",
                                            ) ?? ""
                                        }
                                    >
                                        <Input
                                            {...field}
                                            value={value}
                                            onChange={(ev) =>
                                                onChange(
                                                    removeVietnameseTones(
                                                        ev.target.value,
                                                    ),
                                                )
                                            }
                                            autoFocus
                                            placeholder={t(
                                                "input.middleAndFirstName.placeholder",
                                            )}
                                        />
                                    </FormItem>
                                )}
                            />
                        </Col>
                        <Col span={24} md={12}>
                            <Controller
                                key={field?.passengerinfo?.paxBirthDate}
                                control={control}
                                name={`passengerItem.${index}.passengerinfo.paxBirthDate`}
                                render={({ field: { value: birthDate } }) => (
                                    <FormItem
                                        label={renderLabelDOBPax()}
                                        required
                                        validateStatus={
                                            errorForm?.paxBirthDate ||
                                            hasError("paxBirthDate", index)
                                                ? "error"
                                                : undefined
                                        }
                                        help={
                                            errorForm?.paxBirthDate ||
                                            getErrorMesssage("paxBirthDate") ||
                                            ""
                                        }
                                    >
                                        <CustomDatePicker
                                            format="DD/MM/YYYY"
                                            className="w-full"
                                            showToday={false}
                                            placeholder={t(
                                                "input.dob.placeholder",
                                            )}
                                            value={
                                                birthDate
                                                    ? dayjs(birthDate, {
                                                          format: DATE_FORMAT,
                                                      })
                                                    : null
                                            }
                                            allowClear={false}
                                            disabledDate={(date) =>
                                                date.isAfter(dayjs())
                                            }
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
