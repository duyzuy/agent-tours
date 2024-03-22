import React, { memo, useCallback, useEffect, useState } from "react";
import { PassengerType } from "@/models/management/common.interface";
import {
    Col,
    Form,
    Input,
    Row,
    Select,
    DatePicker,
    DatePickerProps,
} from "antd";
import FormItem from "@/components/base/FormItem";
import { PassengerInformationFormData } from "../../../modules/passenger.interface";
import { DATE_FORMAT } from "@/constants/common";
import dayjs from "dayjs";
import { IBookingItem } from "../../../modules/bookingInformation.interface";
import { getPassengerType } from "@/utils/common";
import classNames from "classnames";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
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
    className = "",
}) => {
    const [paxFormData, setPaxFormData] = useState(
        () =>
            new PassengerInformationFormData(
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
            ),
    );

    const onChange = (
        key: TKeysPassenger,
        value: (typeof paxFormData)[TKeysPassenger],
    ) => {
        const newPaxInfo = { ...paxFormData, [key]: value };

        setPaxFormData(newPaxInfo);
        onChangeForm({ index, data: newPaxInfo });
    };

    const onChangeBirthDate: DatePickerProps["onChange"] = (date) => {
        const newPaxInfo = {
            ...paxFormData,
            paxBirthDate: date?.format(DATE_FORMAT),
        };

        setPaxFormData((prev) => newPaxInfo);
        onChangeForm({ index, data: newPaxInfo });
    };
    const onChangeNationalityDate: DatePickerProps["onChange"] = (date) => {
        const newPaxInfo = {
            ...paxFormData,
            paxPassortExpiredDate: date?.format(DATE_FORMAT),
        };

        setPaxFormData((prev) => newPaxInfo);
        onChangeForm({ index, data: newPaxInfo });
    };

    useEffect(() => {
        if (Object.keys(initialValues).length !== 0) {
            setPaxFormData(initialValues);
        }
    }, []);

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
                                    value={paxFormData.paxTitle}
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
                                    value={paxFormData.paxGender}
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
                                    value={paxFormData.paxLastname}
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
                                    value={paxFormData.paxMiddleFirstName}
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
                                <DatePicker
                                    format="DD/MM/YYYY"
                                    className="w-full"
                                    value={
                                        dayjs(
                                            paxFormData.paxBirthDate,
                                            DATE_FORMAT,
                                        ).isValid()
                                            ? dayjs(
                                                  paxFormData.paxBirthDate,
                                                  DATE_FORMAT,
                                              )
                                            : dayjs(paxFormData.paxBirthDate)
                                    }
                                    onChange={onChangeBirthDate}
                                />
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="Số điện thoại" required>
                                <Input
                                    value={paxFormData.paxPhoneNumber}
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
                                    value={paxFormData.paxAddress}
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
                                    value={paxFormData.paxPassportNumber}
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
                                <DatePicker
                                    format="DD/MM/YYYY"
                                    className="w-full"
                                    value={
                                        dayjs(
                                            paxFormData.paxPassortExpiredDate,
                                            DATE_FORMAT,
                                        ).isValid()
                                            ? dayjs(
                                                  paxFormData.paxPassortExpiredDate,
                                                  DATE_FORMAT,
                                              )
                                            : dayjs(
                                                  paxFormData.paxPassortExpiredDate,
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
                                    value={paxFormData.paxNationality}
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
