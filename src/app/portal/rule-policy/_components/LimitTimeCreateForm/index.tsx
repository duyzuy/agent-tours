import React, { useState } from "react";
import { Button, Form, Input, Select, SelectProps, Space } from "antd";
import { isArray } from "lodash";
import { RuleAndPolicyFormData } from "../../modules/ruleAndPolicy.interface";
import {
    useGetRuleAndPolicyLimitTimeCatListCoreQuery,
    useGetRuleAndPolicyLimitTimeRuleListCoreQuery,
} from "@/queries/core/ruleAndPolicy";
import FormItem from "@/components/base/FormItem";
import { HandleSubmit, useFormSubmit } from "@/hooks/useFormSubmit";
import { useGetDestinationsQuery } from "@/queries/misc/destination";
import { ruleAndPolicyCreateSchema } from "../../schema/ruleAndPolicy.schema";
import {
    IRuleAndPolicyCat,
    IRuleAndPolicyRule,
} from "@/models/management/core/ruleAndPolicy.interface";
import { IDestination } from "@/models/management/region.interface";
export interface LimitTimeCreateFormProps {
    onSubmit?: (data: RuleAndPolicyFormData, cb?: () => void) => void;
}

type TDepositFormData = Required<RuleAndPolicyFormData>;
const LimitTimeCreateForm: React.FC<LimitTimeCreateFormProps> = ({
    onSubmit,
}) => {
    const { data: catList, isLoading: isLoadingCat } =
        useGetRuleAndPolicyLimitTimeCatListCoreQuery({ enabled: true });
    const { data: ruleList, isLoading: isLoadingRule } =
        useGetRuleAndPolicyLimitTimeRuleListCoreQuery({ enabled: true });
    const { data: destinationList, isLoading: isLoadingDestinationList } =
        useGetDestinationsQuery();
    const initFormData = new RuleAndPolicyFormData(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
    );

    const { handlerSubmit, errors } = useFormSubmit<RuleAndPolicyFormData>({
        schema: ruleAndPolicyCreateSchema,
    });
    const [formData, setFormData] = useState(initFormData);

    const onChange = (
        key: keyof TDepositFormData,
        value: TDepositFormData[keyof TDepositFormData],
    ) => {
        setFormData((oldData) => {
            return {
                ...oldData,
                [key]: value,
            };
        });
    };
    const onChangeCat: SelectProps<string, IRuleAndPolicyCat>["onChange"] = (
        value,
        option,
    ) => {
        if (!isArray(option)) {
            setFormData((oldData) => ({
                ...oldData,
                cat: option.cat,
                catName: option.name,
            }));
        }
    };
    const onChangeRule: SelectProps<string, IRuleAndPolicyRule>["onChange"] = (
        value,
        option,
    ) => {
        if (!isArray(option)) {
            setFormData((oldData) => ({
                ...oldData,
                rule: option.cat,
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

    const handleSubmitForm: HandleSubmit<RuleAndPolicyFormData> = (data) => {
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
                    <Select<string, IRuleAndPolicyCat>
                        value={formData.cat}
                        fieldNames={{ label: "name", value: "key" }}
                        options={catList || []}
                        loading={isLoadingCat}
                        placeholder="Chọn loại mục"
                        onChange={onChangeCat}
                    />
                </FormItem>
                <FormItem
                    label="Chọn quy tắc"
                    required
                    validateStatus={errors?.rule ? "error" : ""}
                    help={errors?.rule || ""}
                >
                    <Select<string, IRuleAndPolicyRule>
                        value={formData.rule}
                        fieldNames={{ label: "name", value: "key" }}
                        options={ruleList || []}
                        loading={isLoadingRule}
                        placeholder="Chọn quy tắc áp dụng"
                        onChange={onChangeRule}
                    />
                </FormItem>
                <FormItem
                    label="Nhóm điểm đến"
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
                <FormItem
                    label="Mã tour"
                    required
                    validateStatus={errors?.maTour ? "error" : ""}
                    help={errors?.maTour || ""}
                >
                    <Input
                        placeholder="Nhập mã tour"
                        value={formData.maTour}
                        onChange={(evt) => onChange("maTour", evt.target.value)}
                    />
                </FormItem>
                <FormItem
                    label="Số ngày"
                    validateStatus={errors?.soNgay ? "error" : ""}
                    help={errors?.soNgay || ""}
                >
                    <Input
                        placeholder="Nhập số ngày"
                        value={formData.soNgay}
                        onChange={(evt) => onChange("soNgay", evt.target.value)}
                    />
                </FormItem>
                <FormItem
                    label="Số tiền"
                    validateStatus={errors?.soTien ? "error" : ""}
                    help={errors?.soTien || ""}
                >
                    <Input
                        placeholder="Nhập số tiền"
                        value={formData.soTien}
                        onChange={(evt) => onChange("soTien", evt.target.value)}
                    />
                </FormItem>
                <FormItem
                    label="Số giờ"
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
