import React, { useState } from "react";
import {
    Button,
    Form,
    Input,
    Radio,
    Select,
    SelectProps,
    Space,
    Spin,
} from "antd";
import { isArray } from "lodash";
import { LimitTimeBookingRuleAndPolicyFormData } from "../../modules/ruleAndPolicy.interface";
import {
    useGetRuleAndPolicyLimitTimeCatListCoreQuery,
    useGetRuleAndPolicyLimitTimeRuleListCoreQuery,
} from "@/queries/core/ruleAndPolicy";
import FormItem from "@/components/base/FormItem";
import { HandleSubmit, useFormSubmit } from "@/hooks/useFormSubmit";
import { useGetDestinationsQuery } from "@/queries/misc/destination";
import { limitBookingTimeRuleAndPolicyCreateSchema } from "../../schema/ruleAndPolicy.schema";
import {
    IRuleAndPolicyCat,
    IRuleAndPolicyRule,
    PolicyType,
} from "@/models/management/core/ruleAndPolicy.interface";
import { IDestination } from "@/models/management/region.interface";
import {
    PolicyCat,
    PolicyRule,
} from "@/models/management/core/ruleAndPolicy.interface";
export interface LimitTimeCreateFormProps {
    onSubmit?: (
        data: LimitTimeBookingRuleAndPolicyFormData,
        cb?: () => void,
    ) => void;
}

type RequiredLimitBookingTimeFormData =
    Required<LimitTimeBookingRuleAndPolicyFormData>;
const LimitTimeCreateForm: React.FC<LimitTimeCreateFormProps> = ({
    onSubmit,
}) => {
    const { data: catList, isLoading: isLoadingCat } =
        useGetRuleAndPolicyLimitTimeCatListCoreQuery({ enabled: true });
    const { data: ruleList, isLoading: isLoadingRule } =
        useGetRuleAndPolicyLimitTimeRuleListCoreQuery({ enabled: true });
    const { data: destinationList, isLoading: isLoadingDestinationList } =
        useGetDestinationsQuery();
    const initFormData = new LimitTimeBookingRuleAndPolicyFormData(
        PolicyType.BOOKING_TIMELIMIT,
        "Chính sách trả sau",
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
    );

    const { handlerSubmit, errors } =
        useFormSubmit<LimitTimeBookingRuleAndPolicyFormData>({
            schema: limitBookingTimeRuleAndPolicyCreateSchema,
        });
    const [formData, setFormData] = useState(initFormData);

    const onChange = (
        key: keyof RequiredLimitBookingTimeFormData,
        value: RequiredLimitBookingTimeFormData[keyof RequiredLimitBookingTimeFormData],
    ) => {
        setFormData((oldData) => {
            return {
                ...oldData,
                [key]: value,
            };
        });
    };
    const onChangeCat = (value: string, option: IRuleAndPolicyCat) => {
        if (!isArray(option)) {
            setFormData((oldData) => ({
                ...oldData,
                cat: value as PolicyCat,
                catName: option.name,
            }));
        }
    };
    const onChangeRule = (value: string, option: IRuleAndPolicyRule) => {
        if (!isArray(option)) {
            setFormData((oldData) => ({
                ...oldData,
                rule: value as PolicyRule,
                ruleName: option.name,
            }));
        }
    };

    const onChangeDestination: SelectProps<number, IDestination>["onChange"] = (
        value,
        option,
    ) => {
        if (!isArray(option)) {
            setFormData((oldData) => ({
                ...oldData,
                destId: option.id,
            }));
        }
    };

    const handleSubmitForm: HandleSubmit<
        LimitTimeBookingRuleAndPolicyFormData
    > = (data) => {
        onSubmit?.(data, () => {
            setFormData(initFormData);
        });
    };
    return (
        <div className="form max-w-2xl">
            <Form
                layout="horizontal"
                labelCol={{ span: 8 }}
                wrapperCol={{ flex: 1 }}
                colon={false}
                labelWrap
                className="max-w-4xl"
            >
                <FormItem
                    label="Chọn Loại"
                    required
                    validateStatus={errors?.cat ? "error" : ""}
                    help={errors?.cat || ""}
                >
                    {isLoadingCat ? (
                        <Spin />
                    ) : (
                        <Radio.Group value={formData.cat}>
                            <Space direction="vertical" className="pt-1">
                                {catList?.map((cat) => (
                                    <Radio
                                        key={cat.key}
                                        value={cat.key}
                                        onChange={(ev) =>
                                            onChangeCat(ev.target.value, cat)
                                        }
                                        title={cat.name}
                                    >
                                        {cat.name}
                                    </Radio>
                                ))}
                            </Space>
                        </Radio.Group>
                    )}
                </FormItem>
                {formData.cat === PolicyCat.BYDESTINATION ? (
                    <FormItem
                        label="Nhóm điểm đến"
                        required
                        validateStatus={errors?.destId ? "error" : ""}
                        help={errors?.destId || ""}
                    >
                        <Select<number, IDestination>
                            value={formData.destId}
                            fieldNames={{ label: "codeName", value: "id" }}
                            options={destinationList || []}
                            loading={isLoadingDestinationList}
                            placeholder="Chọn nhóm điểm đến"
                            onChange={onChangeDestination}
                        />
                    </FormItem>
                ) : null}
                {formData.cat === PolicyCat.BYTOURCODE ? (
                    <FormItem
                        label="Mã tour"
                        required
                        validateStatus={errors?.maTour ? "error" : ""}
                        help={errors?.maTour || ""}
                    >
                        <Input
                            placeholder="Nhập mã tour"
                            value={formData.maTour}
                            onChange={(evt) =>
                                onChange("maTour", evt.target.value)
                            }
                        />
                    </FormItem>
                ) : null}
                <FormItem
                    label="Chọn quy tắc"
                    required
                    validateStatus={errors?.rule ? "error" : ""}
                    help={errors?.rule || ""}
                >
                    {isLoadingRule ? (
                        <Spin />
                    ) : (
                        <Radio.Group value={formData.rule}>
                            <Space direction="vertical" className="pt-1">
                                {ruleList?.map((rule) => (
                                    <Radio
                                        key={rule.key}
                                        value={rule.key}
                                        onChange={(ev) =>
                                            onChangeRule(ev.target.value, rule)
                                        }
                                        title={rule.note}
                                    >
                                        {rule.name}
                                    </Radio>
                                ))}
                            </Space>
                        </Radio.Group>
                    )}
                </FormItem>
                <FormItem
                    label="Số giờ"
                    required
                    validateStatus={errors?.soGio ? "error" : ""}
                    help={errors?.soGio || ""}
                >
                    <Input
                        placeholder="Nhập số giờ"
                        value={formData.soGio}
                        onChange={(evt) => onChange("soGio", evt.target.value)}
                    />
                </FormItem>
                <FormItem
                    wrapperCol={{
                        span: 16,
                        offset: 8,
                    }}
                >
                    <Space>
                        <Button>Huỷ bỏ</Button>
                        <Button
                            type="primary"
                            onClick={() =>
                                handlerSubmit(formData, handleSubmitForm)
                            }
                        >
                            Tạo mới
                        </Button>
                    </Space>
                </FormItem>
            </Form>
        </div>
    );
};
export default LimitTimeCreateForm;
