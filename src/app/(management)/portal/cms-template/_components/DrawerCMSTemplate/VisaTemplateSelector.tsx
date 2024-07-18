import { Select, SelectProps } from "antd";
import { useGetVisaTemplateKeyMinimalListQuery } from "@/queries/cms/visaTemplate";
import { VisaTemplateQueryParams } from "@/models/management/cms/visaTemplate.interface";
import { useMemo } from "react";

export interface VisaTemplateSelectorProps {
  value?: string;
  onChange?: SelectProps<string, { codeName: string; code: string }>["onChange"];
}
const VisaTemplateSelector: React.FC<VisaTemplateSelectorProps> = ({ value, onChange }) => {
  const initParams = new VisaTemplateQueryParams(undefined, 1, 100);
  const { data, isLoading } = useGetVisaTemplateKeyMinimalListQuery(initParams);

  const optionsSelect = useMemo(() => {
    return data?.list.map((item) => ({ codeName: item.codeName, code: item.code }));
  }, [data]);
  return (
    <Select
      value={value}
      fieldNames={{ label: "codeName", value: "code" }}
      options={[{ codeName: "none", code: "" }, ...(optionsSelect || [])]}
      placeholder="Chọn visa template"
      loading={isLoading}
      onChange={onChange}
    ></Select>
  );
};
export default VisaTemplateSelector;
