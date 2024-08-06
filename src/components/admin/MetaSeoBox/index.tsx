import FormItem from "@/components/base/FormItem";
import { Input } from "antd";
import classNames from "classnames";
import { memo } from "react";

export interface MetaSeoBoxProps {
  onChange?: (data: {
    key: string;
    value: string;
    data?: {
      metaDescription?: string;
      metaTitle?: string;
      metaKeyword?: string;
    };
  }) => void;
  errors?: any;
  values?: {
    metaDescription?: string;
    metaTitle?: string;
    metaKeyword?: string;
  };
  className?: string;
}
const MetaSeoBox: React.FC<MetaSeoBoxProps> = ({ onChange, errors, values, className = "" }) => {
  return (
    <div
      className={classNames("box border rounded-md px-4 pt-6 mb-6", {
        [className]: className,
      })}
    >
      <FormItem label="Meta title" help={errors?.metaTitle || ""} validateStatus={errors?.metaTitle ? "error" : ""}>
        <Input
          placeholder="Meta title"
          value={values?.metaTitle}
          onChange={(ev) => onChange?.({ key: "metaTitle", value: ev.target.value, data: values })}
        />
      </FormItem>
      <FormItem
        label="Meta description"
        help={errors?.metaDescription || ""}
        validateStatus={errors?.metaDescription ? "error" : ""}
      >
        <Input.TextArea
          rows={2}
          value={values?.metaDescription}
          onChange={(ev) => onChange?.({ key: "metaDescription", value: ev.target.value, data: values })}
        ></Input.TextArea>
      </FormItem>
      <FormItem
        label="Meta keywords"
        help={errors?.metaKeyword || ""}
        validateStatus={errors?.metaKeyword ? "error" : ""}
      >
        <Input
          placeholder="Keywords"
          value={values?.metaKeyword}
          onChange={(ev) => onChange?.({ key: "metaKeyword", value: ev.target.value, data: values })}
        />
      </FormItem>
    </div>
  );
};
export default memo(MetaSeoBox);
