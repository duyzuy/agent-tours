import { useCallback, useEffect, useState, memo } from "react";
import {
    Drawer,
    Space,
    Button,
    Form,
    Row,
    Col,
    Input,
    InputNumber,
    Checkbox,
    Select,
    Divider,
    CheckboxProps,
    SelectProps,
} from "antd";
import FormItem from "@/components/base/FormItem";
import { isUndefined } from "lodash";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import CustomDatePicker from "@/components/admin/CustomDatePicker";
import { DiscountType } from "@/models/management/core/discountPolicy.interface";

import { DiscountPolicyFormData } from "../../modules/discountPolicy.interface";
import { discountPolicySchema } from "../../schema/discountPolicy.schema";
import { Status } from "@/models/management/common.interface";
import { IDestination } from "@/models/management/region.interface";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { DATE_FORMAT } from "@/constants/common";
import { RangePickerProps } from "antd/es/date-picker";
import CustomRangePicker from "@/components/admin/CustomRangePicker";
import useMessage from "@/hooks/useMessage";
import InputTourCode from "./InputTourCode";
import { removeVietnameseTones } from "@/utils/helper";
import { useGetDestinationsQuery } from "@/queries/misc/destination";
import { DAYS_OF_WEEK, TIME_SLOTS } from "@/constants/common";

interface DrawerDiscountPolicyFormProps {
    isOpen?: boolean;
    onClose?: () => void;
    discountType?: DiscountType;
    initialValues?: any;
    onSubmit?: (data: DiscountPolicyFormData) => void;
}
const DrawerDiscountPolicyForm: React.FC<DrawerDiscountPolicyFormProps> = ({
    isOpen,
    onClose,
    discountType,
    onSubmit,
    initialValues,
}) => {
    const { handlerSubmit, errors } = useFormSubmit({
        schema: discountPolicySchema,
    });
    const { data: destinationList, isLoading } = useGetDestinationsQuery();
    const initFormData = new DiscountPolicyFormData(
        "",
        "",
        undefined,
        undefined,
        discountType,
        "",
        0,
        undefined,
        false,
        [],
        false,
        [],
        true,
        TIME_SLOTS,
        false,
        [],
        0,
        Status.OK,
    );
    const message = useMessage();
    const [formData, setFormData] =
        useState<DiscountPolicyFormData>(initFormData);

    const onChangeFormData = (
        key: keyof DiscountPolicyFormData,
        value: DiscountPolicyFormData[keyof DiscountPolicyFormData],
    ) => {
        if (key === "code" && typeof value === "string") {
            value = removeVietnameseTones(value).toUpperCase();
        }
        setFormData((oldData) => ({
            ...oldData,
            [key]: value,
        }));
    };

    const onChangeValidFromAndValidToDate: RangePickerProps["onChange"] = (
        dates,
    ) => {
        const [dateFrom, dateTo] = dates || [];

        setFormData((oldData) => ({
            ...oldData,
            validFrom: dateFrom
                ? dateFrom.locale("en").format(DATE_FORMAT)
                : undefined,
            validTo: dateTo
                ? dateTo.locale("en").format(DATE_FORMAT)
                : undefined,
            blackoutJson: {
                ...oldData.blackoutJson,
                byDate: [],
                byDaterange: [],
            },
        }));
    };
    const onChangeApplyDestination: CheckboxProps["onChange"] = (ev) => {
        setFormData((oldData) => ({
            ...oldData,
            isValidbyDest: ev.target.checked ?? false,
            destJson: [],
        }));
    };
    const onChangeApplyTourCode: CheckboxProps["onChange"] = (ev) => {
        setFormData((oldData) => ({
            ...oldData,
            isValidbyTourCode: ev.target.checked ?? false,
        }));
    };

    const hasTimeSlotSelected = (time: number) => {
        return (formData.timeJson || []).includes(time);
    };
    const onSelectTimeSlots = (timeSlot: number) => {
        setFormData((oldData) => {
            let newTimes = [...(oldData.timeJson || [])];
            const timeIndex = newTimes?.findIndex((item) => item === timeSlot);

            if (timeIndex === -1 || !newTimes || isUndefined(timeIndex)) {
                newTimes = [...newTimes, timeSlot];
            }

            if (!isUndefined(timeIndex) && timeIndex !== -1) {
                newTimes?.splice(timeIndex, 1);
            }

            return {
                ...oldData,
                timeJson: newTimes,
            };
        });
    };

    const onAddBlackOutDate = () => {
        if (!formData.validTo || !formData.validFrom) {
            message.error("Vui lòng chọn ngày áp dụng trước.");
            return;
        }
        setFormData((oldData) => ({
            ...oldData,
            blackoutJson: {
                ...oldData.blackoutJson,
                byDate: [...(oldData.blackoutJson?.byDate || []), undefined],
            },
        }));
    };
    const onChangeBlackDate = (index: number, date: dayjs.Dayjs | null) => {
        if (date) {
            setFormData((oldData) => {
                let { blackoutJson } = oldData;
                let { byDate } = blackoutJson || {};

                if (byDate) {
                    byDate[index] = date.locale("en").format(DATE_FORMAT);
                } else {
                    byDate = [date.locale("en").format(DATE_FORMAT)];
                }

                return {
                    ...oldData,
                    blackoutJson: { ...blackoutJson, byDate: byDate },
                };
            });
        }
    };

    const onRemoveOneBlackDate = (index: number) => {
        setFormData((oldData) => {
            let { blackoutJson } = oldData;
            let { byDate } = blackoutJson || {};

            if (!byDate || !byDate.length) {
                throw new Error("Invalid index item");
            }
            byDate?.splice(index, 1);

            return {
                ...oldData,
                blackoutJson: { ...blackoutJson, byDate: byDate },
            };
        });
    };
    const getDisabledDatesInValidToAndValidFrom = useCallback(
        (date: dayjs.Dayjs) => {
            let isDisabled = false;
            const { validFrom, validTo, blackoutJson } = formData;
            const { byDate } = blackoutJson || {};

            if (date.isBefore(dayjs()) && !date.isSame(dayjs(), "date")) {
                isDisabled = true;
            }

            if (
                validTo &&
                date.isAfter(
                    dayjs(validTo, {
                        format: DATE_FORMAT,
                    }),
                ) &&
                !date.isSame(
                    dayjs(validTo, {
                        format: DATE_FORMAT,
                    }),
                    "date",
                )
            ) {
                isDisabled = true;
            }

            if (
                validFrom &&
                date.isBefore(
                    dayjs(validFrom, {
                        format: DATE_FORMAT,
                    }),
                ) &&
                !date.isSame(
                    dayjs(validFrom, {
                        format: DATE_FORMAT,
                    }),
                    "date",
                )
            ) {
                isDisabled = true;
            }

            if (byDate) {
                byDate.forEach((byDateItem) => {
                    if (
                        date.isSame(
                            dayjs(byDateItem, {
                                format: DATE_FORMAT,
                            }),
                            "date",
                        )
                    ) {
                        isDisabled = true;
                    }
                });
            }
            return isDisabled;
        },
        [formData.validFrom, formData.validTo, formData.blackoutJson],
    );
    const onSelectDestinations: SelectProps<
        string | string[],
        IDestination
    >["onChange"] = (value, destinations) => {
        setFormData((oldData) => ({
            ...oldData,
            destJson: Array.isArray(destinations)
                ? [...destinations]
                : [destinations],
        }));
    };
    const onChangeTourCode = useCallback((codes: string[]) => {
        setFormData((oldData) => ({
            ...oldData,
            tourCodeJson: [...codes],
        }));
    }, []);
    const changeValidByDayOfWeek: CheckboxProps["onChange"] = (ev) => {
        setFormData((oldData) => ({
            ...oldData,
            isValidByDayofweek: ev.target.checked ?? false,
            dayOfWeek: [],
        }));
    };
    const selectDayOfWeek = (dayStr: string) => {
        setFormData((oldData) => {
            let newDaysOfWeek = [...(oldData.dayOfWeek || [])];
            const dayIndex = newDaysOfWeek?.findIndex(
                (item) => item === dayStr,
            );

            if (dayIndex === -1 || !dayIndex || isUndefined(dayIndex)) {
                newDaysOfWeek = [...newDaysOfWeek, dayStr];
            }

            if (!isUndefined(dayIndex) && dayIndex !== -1) {
                newDaysOfWeek?.splice(dayIndex, 1);
            }

            return {
                ...oldData,
                dayOfWeek: newDaysOfWeek,
            };
        });
    };
    const hasSelectedDayOfWeek = (dayStr: string) => {
        return formData.dayOfWeek?.includes(dayStr);
    };
    console.log(formData);
    /*
     * INITIAL FORM Data
     */
    useEffect(() => {
        if (isOpen) {
            setFormData(initFormData);
        }
    }, [discountType, isOpen]);

    return (
        <Drawer
            title={
                discountType === DiscountType.COUPON
                    ? "Coupon"
                    : "Chính sách giá giảm"
            }
            width={550}
            onClose={onClose}
            open={isOpen}
            styles={{
                body: {
                    paddingBottom: 80,
                },
            }}
        >
            <Form layout="vertical" labelWrap>
                <FormItem
                    label="Tên"
                    required
                    validateStatus={errors?.name ? "error" : ""}
                    help={errors?.name || ""}
                >
                    <Input
                        placeholder="Tên"
                        value={formData.name}
                        onChange={(ev) =>
                            onChangeFormData("name", ev.target.value)
                        }
                    />
                </FormItem>
                <FormItem
                    label="Mô tả"
                    validateStatus={errors?.descriptions ? "error" : ""}
                    help={errors?.descriptions || ""}
                >
                    <Input.TextArea
                        placeholder="Mô tả"
                        value={formData.descriptions}
                        onChange={(ev) =>
                            onChangeFormData("descriptions", ev.target.value)
                        }
                    />
                </FormItem>
                <Row gutter={16}>
                    <Col span={12}>
                        <FormItem
                            label="Mã giảm giá"
                            required
                            validateStatus={errors?.code ? "error" : ""}
                            help={errors?.code || ""}
                        >
                            <Input
                                placeholder="Mã giảm giá"
                                value={formData.code}
                                onChange={(ev) =>
                                    onChangeFormData("code", ev.target.value)
                                }
                            />
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            label="Số tiền sẽ giảm"
                            required
                            validateStatus={
                                errors?.discountAmount ? "error" : ""
                            }
                            help={errors?.discountAmount || ""}
                        >
                            <Input
                                placeholder="Số tiền giảm"
                                value={formData.discountAmount}
                                onChange={(ev) =>
                                    onChangeFormData(
                                        "discountAmount",
                                        ev.target.value,
                                    )
                                }
                                maxLength={8}
                            />
                        </FormItem>
                    </Col>
                </Row>
                {discountType === DiscountType.COUPON ? (
                    <FormItem
                        label="Số lần sử dụng"
                        tooltip="Số lần sử dụng tối đa của voucher"
                        validateStatus={errors?.maxUseTimes ? "error" : ""}
                        help={errors?.maxUseTimes || ""}
                    >
                        <InputNumber
                            placeholder="Số lần sử dụng"
                            width={100}
                            min={0}
                            value={formData.maxUseTimes}
                            onChange={(numb) =>
                                numb &&
                                Number(numb) &&
                                numb > 0 &&
                                onChangeFormData("maxUseTimes", numb)
                            }
                            style={{ width: "100%" }}
                        />
                    </FormItem>
                ) : null}
                <FormItem
                    label="Ngày áp dụng"
                    required
                    validateStatus={errors?.validFrom ? "error" : ""}
                    help={errors?.validFrom || ""}
                >
                    <CustomRangePicker
                        value={[
                            formData.validFrom
                                ? dayjs(formData.validFrom, {
                                      format: DATE_FORMAT,
                                  })
                                : null,
                            formData.validTo
                                ? dayjs(formData.validTo, {
                                      format: DATE_FORMAT,
                                  })
                                : null,
                        ]}
                        disabledDate={(date) =>
                            getDisabledDatesInValidToAndValidFrom(date)
                        }
                        onChange={onChangeValidFromAndValidToDate}
                        style={{ width: "100%" }}
                        format={"DD/MM/YYYY"}
                    />
                </FormItem>
                <FormItem label="Loại trừ các ngày">
                    <Row gutter={[24, 24]} className="mb-6">
                        {formData.blackoutJson?.byDate?.map(
                            (dateStr, _index) => (
                                <Col span={12} key={_index}>
                                    <div className="flex align-baseline items-baseline">
                                        <div className="mr-2 flex-1">
                                            <CustomDatePicker
                                                value={
                                                    dateStr
                                                        ? dayjs(dateStr, {
                                                              format: DATE_FORMAT,
                                                          })
                                                        : null
                                                }
                                                disabledDate={(date) =>
                                                    getDisabledDatesInValidToAndValidFrom(
                                                        date,
                                                    )
                                                }
                                                placeholder="Chọn ngày"
                                                style={{ width: "100%" }}
                                                onChange={(date) =>
                                                    onChangeBlackDate(
                                                        _index,
                                                        date,
                                                    )
                                                }
                                            />
                                        </div>
                                        <span className="text-red-500">
                                            <MinusCircleOutlined
                                                onClick={() =>
                                                    onRemoveOneBlackDate(_index)
                                                }
                                            />
                                        </span>
                                    </div>
                                </Col>
                            ),
                        )}
                    </Row>
                    <Button
                        type="dashed"
                        block
                        icon={<PlusOutlined />}
                        onClick={onAddBlackOutDate}
                    >
                        Thêm
                    </Button>
                </FormItem>
                <Divider />
                <FormItem
                    label="Khung giờ áp dụng"
                    tooltip="Khung giờ áp dụng sẽ từ 0-59 phút"
                    validateStatus={errors?.timeJson ? "error" : ""}
                    help={errors?.timeJson || ""}
                >
                    {formData.isValidByTime ? (
                        <>
                            <div className="mb-6">
                                <p className="text-xs text-gray-600">
                                    {`Khung giờ áp dụng sẽ từ 0-59 phút trong một giờ. không bỏ trống khi áp dụng theo khung giờ.`}
                                </p>
                            </div>
                            <Space wrap>
                                {TIME_SLOTS.map((timeSlot) => (
                                    <Checkbox
                                        checked={hasTimeSlotSelected(timeSlot)}
                                        onChange={() =>
                                            onSelectTimeSlots(timeSlot)
                                        }
                                        key={timeSlot}
                                        className="w-20"
                                    >
                                        {`${timeSlot}h`}
                                    </Checkbox>
                                ))}
                            </Space>
                        </>
                    ) : null}
                </FormItem>
                <Divider />
                <FormItem>
                    <Checkbox
                        checked={formData.isValidByDayofweek}
                        onChange={changeValidByDayOfWeek}
                    >
                        Chỉ áp dụng theo ngày trong tuần
                    </Checkbox>
                </FormItem>
                {formData.isValidByDayofweek ? (
                    <FormItem
                        validateStatus={errors?.dayOfWeek ? "error" : ""}
                        help={errors?.dayOfWeek || ""}
                    >
                        {DAYS_OF_WEEK.map((day) => (
                            <Checkbox
                                key={day.value}
                                checked={hasSelectedDayOfWeek(day.value)}
                                onChange={() => selectDayOfWeek(day.value)}
                            >
                                {day.label}
                            </Checkbox>
                        ))}
                    </FormItem>
                ) : null}
                <Divider />
                <FormItem>
                    <Checkbox
                        checked={formData.isValidbyDest}
                        onChange={onChangeApplyDestination}
                    >
                        Chỉ áp dụng theo nhóm điểm đến
                    </Checkbox>
                </FormItem>
                {formData.isValidbyDest ? (
                    <FormItem
                        label="Chọn nhóm điểm đến"
                        validateStatus={errors?.destJson ? "error" : ""}
                        help={errors?.destJson || ""}
                    >
                        <Select<string[], IDestination>
                            value={formData.destJson?.map(
                                (item) => item.codeKey,
                            )}
                            fieldNames={{
                                label: "codeName",
                                value: "codeKey",
                            }}
                            mode="multiple"
                            placeholder="Chọn điểm đến"
                            options={destinationList}
                            loading={isLoading}
                            onChange={onSelectDestinations}
                        />
                    </FormItem>
                ) : null}
                <Divider />
                <FormItem>
                    <Checkbox
                        checked={formData.isValidbyTourCode}
                        onChange={onChangeApplyTourCode}
                    >
                        Chỉ áp dụng cho code tour cụ thể
                    </Checkbox>
                </FormItem>
                {formData.isValidbyTourCode ? (
                    <>
                        {errors?.tourCodeJson ? (
                            <p className="text-red-600">
                                {errors.tourCodeJson}
                            </p>
                        ) : null}
                        <InputTourCode
                            value={formData.tourCodeJson || []}
                            onChange={onChangeTourCode}
                        />
                    </>
                ) : null}
                <Divider />
            </Form>
            <Space>
                <Button onClick={onClose} className="w-32">
                    Huỷ
                </Button>
                <Button
                    onClick={() =>
                        handlerSubmit(
                            { ...formData, status: Status.QQ },
                            onSubmit,
                        )
                    }
                    type="primary"
                    ghost
                    className="w-36"
                >
                    Lưu và chờ duyệt
                </Button>
                <Button
                    onClick={() =>
                        handlerSubmit(
                            { ...formData, status: Status.OK },
                            onSubmit,
                        )
                    }
                    type="primary"
                    className="w-32"
                >
                    Lưu và duyệt
                </Button>
            </Space>
        </Drawer>
    );
};
export default memo(DrawerDiscountPolicyForm);
