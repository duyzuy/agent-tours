import { useEffect, useState } from "react";
import { Input, Button, Row, Col } from "antd";
import FormItem from "@/components/base/FormItem";
import { DeleteOutlined } from "@ant-design/icons";
import IconSelector from "@/components/base/IconSelector";
type MetaDataItemType = { key?: string; value?: string; icon?: string };
export interface MetaDataFieldsProps {
  index?: number;
  values?: MetaDataItemType;
  onChange?: (data: { [key: string]: string }, index?: number) => void;
  onRemove?: (index?: number) => void;
}

const MetaDataFields: React.FC<MetaDataFieldsProps> = ({ values, onChange, index, onRemove }) => {
  return (
    <Row gutter={16}>
      <Col span={6}>
        <FormItem>
          <IconSelector value={values?.icon} onChange={(value) => onChange?.({ icon: value }, index)} />
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
