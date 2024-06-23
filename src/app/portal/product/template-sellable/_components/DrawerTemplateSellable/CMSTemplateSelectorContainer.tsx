import { useState } from "react";
import { useGetCMSTemplateListQuery } from "@/queries/cms/cmsTemplate";
import { CMSTemplateQueryParams } from "@/models/management/cms/cmsTemplate.interface";
import FormItem from "@/components/base/FormItem";
import { Select, SelectProps } from "antd";

export type CMSTemplateSelectorContainerProps = SelectProps & {
    errors?: string;
    label?: string;
    onChange?: (value: string) => void;
    value?: string;
};
const CMSTemplateSelectorContainer: React.FC<
    CMSTemplateSelectorContainerProps
> = ({ errors, label = "Mẫu nội dung", disabled, onChange, value }) => {
    const [queryParams, setQueryParams] = useState(
        () => new CMSTemplateQueryParams(undefined, 1, 99),
    );

    const { data: templateData, isLoading } =
        useGetCMSTemplateListQuery(queryParams);

    return (
        <FormItem
            label={label}
            required
            validateStatus={errors ? "error" : ""}
            help={errors || ""}
        >
            <Select
                placeholder="Bản mẫu nội dung"
                value={value}
                disabled={disabled}
                onChange={onChange}
                options={templateData?.list.reduce<
                    { value: string; label: string }[]
                >(
                    (acc, item) => [
                        ...acc,
                        { label: item.codeName, value: item.code },
                    ],
                    [],
                )}
                loading={isLoading}
            />
        </FormItem>
    );
};
export default CMSTemplateSelectorContainer;
