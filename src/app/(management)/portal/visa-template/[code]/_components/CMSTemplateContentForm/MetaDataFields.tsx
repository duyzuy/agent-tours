import { useEffect, useState } from "react";
import { Space, Input, Button, Row, Col, Select } from "antd";
import FormItem from "@/components/base/FormItem";
import { DeleteOutlined } from "@ant-design/icons";
import { ICON_LIST } from "@/constants/icons.constant";
type MetaDataItemType = { key?: string; value?: string; icon?: string };
export interface MetaDataFieldsProps {
  index?: number;
  values?: MetaDataItemType;
  onChange?: (data: { [key: string]: string }, index?: number) => void;
  onRemove?: (index?: number) => void;
}
type OptionTypeIcon = (typeof ICON_LIST)[0];

const MetaDataFields: React.FC<MetaDataFieldsProps> = ({ values, onChange, index, onRemove }) => {
  return (
    <Row gutter={16}>
      <Col span={6}>
        <FormItem>
          <Select
            fieldNames={{ label: "name", value: "key" }}
            optionLabelProp="name"
            options={[{ name: "--none--", key: "", icon: "" }, ...ICON_LIST]}
            value={values?.icon}
            // optionRender={(option) => {
            //   return (
            //     <div className="flex items-center">
            //       <span className="w-4 h-4 mr-2">{<option.data.icon width={16} height={16} />}</span>
            //       <span>{option.label}</span>
            //     </div>
            //   );
            // }}
            onChange={(value) => onChange?.({ icon: value }, index)}
          />
        </FormItem>
      </Col>
      <Col span={6}>
        <FormItem>
          <Input
            placeholder="Tiêu đề"
            value={values?.key}
            onChange={(ev) => onChange?.({ key: ev.target.value }, index)}
            size="small"
          />
        </FormItem>
      </Col>
      <Col span={8}>
        <FormItem>
          <Input
            placeholder="Nội dung"
            value={values?.value}
            onChange={(ev) => onChange?.({ value: ev.target.value }, index)}
            size="small"
          />
        </FormItem>
      </Col>
      <FormItem>
        <Button shape="circle" type="text" danger icon={<DeleteOutlined />} onClick={() => onRemove?.(index)}></Button>
      </FormItem>
    </Row>
  );
};
export default MetaDataFields;
