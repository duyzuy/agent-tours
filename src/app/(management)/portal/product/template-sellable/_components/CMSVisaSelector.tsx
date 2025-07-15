import { useState } from "react";
import { useGetCMSTemplateListQuery } from "@/queries/cms/cmsTemplate";
import { CMSTemplateQueryParams } from "@/models/management/cms/cmsTemplate.interface";
import FormItem from "@/components/base/FormItem";
import { Select, SelectProps } from "antd";
import { useGetVisaTemplateKeyMinimalListQuery } from "@/queries/cms/visaTemplate";
import { VisaTemplateQueryParams } from "@/models/management/cms/visaTemplate.interface";

export type CMSVisaSelectorProps = SelectProps & {
  errors?: string;
  label?: string;
  onChange?: (value: string) => void;
  value?: string;
};
const CMSVisaSelector: React.FC<CMSVisaSelectorProps> = ({
  errors,
  label = "Chi tiết nội dung",
  disabled,
  onChange,
  value,
}) => {
  const [queryParams, setQueryParams] = useState(() => new VisaTemplateQueryParams(undefined, 1, 99));
  const { data: templateData, isLoading } = useGetVisaTemplateKeyMinimalListQuery(queryParams);

  return (
    <FormItem label={label} validateStatus={errors ? "error" : ""} help={errors || ""}>
      <Select
        placeholder="Chi tiết nội dung"
        value={value}
        disabled={disabled}
        onChange={onChange}
        options={templateData?.list.reduce<{ value: string; label: string }[]>(
          (acc, item) => [...acc, { label: item.codeName, value: item.code }],
          [],
        )}
        loading={isLoading}
      />
    </FormItem>
  );
};
export default CMSVisaSelector;
