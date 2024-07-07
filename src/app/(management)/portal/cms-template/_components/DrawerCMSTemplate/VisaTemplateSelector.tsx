import { Select, SelectProps } from "antd";
import { useGetVisaTemplateKeyMinimalListQuery } from "@/queries/cms/visaTemplate";
import { IVisaTemplateKeyMinimalItem, VisaTemplateQueryParams } from "@/models/management/cms/visaTemplate.interface";

export interface VisaTemplateSelectorProps {
  value?: string;
  onChange?: SelectProps<string, IVisaTemplateKeyMinimalItem>["onChange"];
}
const VisaTemplateSelector: React.FC<VisaTemplateSelectorProps> = ({ value, onChange }) => {
  const initParams = new VisaTemplateQueryParams(undefined, 1, 100);
  const { data, isLoading } = useGetVisaTemplateKeyMinimalListQuery(initParams);

  return (
    <Select
      value={value}
      fieldNames={{ label: "codeName", value: "code" }}
      options={[
        { codeName: "none", code: "", codeImage: "", visaTemplates: [], visaTemplatesMinimal: [] },
        ...(data?.list || []),
      ]}
      placeholder="Chọn visa template"
      loading={isLoading}
      onChange={onChange}
    ></Select>
  );
};
export default VisaTemplateSelector;
