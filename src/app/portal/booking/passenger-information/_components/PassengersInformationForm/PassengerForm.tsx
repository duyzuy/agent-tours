import React, { memo } from "react";
import { PassengerType } from "@/models/management/common.interface";
import { Col, Form, Input, Row, Select, DatePickerProps } from "antd";
import FormItem from "@/components/base/FormItem";
import { PassengerInformationFormData } from "../../../modules/passenger.interface";
import { DATE_FORMAT, PASSENGER_AGES } from "@/constants/common";
import { IBookingItem } from "../../../modules/bookingInformation.interface";
import { getPassengerType } from "@/utils/common";
import classNames from "classnames";
import dayjs from "dayjs";
import CustomDatePicker from "@/components/admin/CustomDatePicker";
import useMessage from "@/hooks/useMessage";

export interface PassengerFormProps {
    index: number;
    type: PassengerType;
    initialValues: IBookingItem["passengerInformation"];
    onChangeForm: ({
        index,
        data,
    }: {
        index: number;
        data: IBookingItem["passengerInformation"];
    }) => void;
    startDate?: string;
    className?: string;
}
type KeysOfValue<T, TCondition> = {
    [K in keyof T]: T[K] extends TCondition ? K : never;
}[keyof T];

type TKeysPassenger = KeysOfValue<
    Required<PassengerInformationFormData>,
    string
>;

const PassengerForm: React.FC<PassengerFormProps> = ({
    index,
    type,
    onChangeForm,
    initialValues,
    startDate,
    className = "",
}) => {
    const message = useMessage();
    const onChange = (
        key: TKeysPassenger,
        value: (typeof initialValues)[TKeysPassenger],
    ) => {
        const newPaxInfo = { ...initialValues, [key]: value };

        onChangeForm({ index, data: newPaxInfo });
    };

    const onChangeBirthDate: DatePickerProps["onChange"] = (date) => {
        const newPaxInfo = {
            ...initialValues,
            paxBirthDate: date?.format(DATE_FORMAT),
        };

        if (
            type === PassengerType.ADULT &&
            dayjs(startDate).diff(date, "years") < PASSENGER_AGES.adult.min
        ) {
            message.error("Người lớn phải từ 12 tuổi trở lên");
            return;
        }
        if (
            (type === PassengerType.CHILD &&
                dayjs(startDate).diff(date, "years") <
                    PASSENGER_AGES.child.min) ||
            (type === PassengerType.CHILD &&
                dayjs(startDate).diff(date, "years") > PASSENGER_AGES.child.max)
        ) {
            message.error("Trẻ em từ 2 đến 12 tuổi");
            return;
        }

        if (
            type === PassengerType.INFANT &&
            dayjs(startDate).diff(date, "years") > PASSENGER_AGES.infant.max
        ) {
            message.error("Em bé từ 2 tuổi trở xuống.");
            return;
        }

        onChangeForm({ index, data: newPaxInfo });
    };
    const onChangeNationalityDate: DatePickerProps["onChange"] = (date) => {
        const newPaxInfo = {
            ...initialValues,
            paxPassortExpiredDate: date?.format(DATE_FORMAT),
        };

        onChangeForm({ index, data: newPaxInfo });
    };

    return (
        <div
            className={classNames("passenger__information-box-item", {
                [className]: className,
            })}
        >
            <div className="passenger__information-box-item-head mb-3 pb-3">
                <span className="inline-block mr-2 text-[16px] font-[500]">{`Hành khách ${
                    index + 1
                }`}</span>
                <span className="text-xs">({getPassengerType(type)})</span>
            </div>
            <div className="passenger__information-box-form">
                <Form layout="vertical" component="div">
                    <Row gutter={16}>
                        <Col span={12}>
                            <FormItem label="Danh xưng">
                                <Select
                                    value={initialValues.paxTitle}
                                    placeholder="Chọn danh xưng"
                                    options={[
                                        { label: "Ông", value: "mr" },
                                        { label: "Bà", value: "mrs" },
                                        { label: "Cô", value: "miss" },
                                    ]}
                                    onChange={(value) =>
                                        onChange("paxTitle", value)
                                    }
                                />
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="Giới tính" required>
                                <Select
                                    value={initialValues.paxGender}
                                    placeholder="Chọn giới tính"
                                    options={[
                                        { label: "Nam", value: "male" },
                                        { label: "Nữ", value: "female" },
                                        { label: "Khác", value: "other" },
                                    ]}
                                    onChange={(value) =>
                                        onChange("paxGender", value)
                                    }
                                />
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="Họ" required>
                                <Input
                                    value={initialValues.paxLastname}
                                    placeholder="Họ"
                                    onChange={(ev) =>
                                        onChange("paxLastname", ev.target.value)
                                    }
                                />
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="Tên đệm và tên" required>
                                <Input
                                    value={initialValues.paxMiddleFirstName}
                                    placeholder="Tên đệm và tên"
                                    onChange={(ev) =>
                                        onChange(
                                            "paxMiddleFirstName",
                                            ev.target.value,
                                        )
                                    }
                                />
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="Ngày sinh" required>
                                <CustomDatePicker
                                    format="DD/MM/YYYY"
                                    className="w-full"
                                    value={
                                        dayjs(
                                            initialValues.paxBirthDate,
                                            DATE_FORMAT,
                                        ).isValid()
                                            ? dayjs(
                                                  initialValues.paxBirthDate,
                                                  DATE_FORMAT,
                                              )
                                            : dayjs(initialValues.paxBirthDate)
                                    }
                                    disabledDate={(date) =>
                                        date.isAfter(dayjs())
                                    }
                                    onChange={onChangeBirthDate}
                                />
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="Số điện thoại" required>
                                <Input
                                    value={initialValues.paxPhoneNumber}
                                    placeholder="Số điện thoại"
                                    onChange={(ev) =>
                                        onChange(
                                            "paxPhoneNumber",
                                            ev.target.value,
                                        )
                                    }
                                />
                            </FormItem>
                        </Col>

                        <Col span={24}>
                            <FormItem label="Địa chỉ">
                                <Input
                                    value={initialValues.paxAddress}
                                    placeholder="Nhập địa chỉ thường trú"
                                    onChange={(ev) =>
                                        onChange("paxAddress", ev.target.value)
                                    }
                                />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            <FormItem label="Số Passport/CCCD">
                                <Input
                                    value={initialValues.paxPassportNumber}
                                    placeholder="Số passport/CCCD"
                                    onChange={(ev) =>
                                        onChange(
                                            "paxPassportNumber",
                                            ev.target.value,
                                        )
                                    }
                                />
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="Ngày hết hạn">
                                <CustomDatePicker
                                    format="DD/MM/YYYY"
                                    className="w-full"
                                    value={
                                        dayjs(
                                            initialValues.paxPassortExpiredDate,
                                            DATE_FORMAT,
                                        ).isValid()
                                            ? dayjs(
                                                  initialValues.paxPassortExpiredDate,
                                                  DATE_FORMAT,
                                              )
                                            : dayjs(
                                                  initialValues.paxPassortExpiredDate,
                                              )
                                    }
                                    disabledDate={(date) =>
                                        date.isBefore(dayjs())
                                    }
                                    onChange={onChangeNationalityDate}
                                />
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="Quốc tịch">
                                <Input
                                    value={initialValues.paxNationality}
                                    placeholder="Nhập quốc tịch"
                                    onChange={(ev) =>
                                        onChange(
                                            "paxNationality",
                                            ev.target.value,
                                        )
                                    }
                                />
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    );
};
export default memo(PassengerForm);
