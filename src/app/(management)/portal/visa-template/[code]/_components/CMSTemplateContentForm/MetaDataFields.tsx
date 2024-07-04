import { useEffect, useState } from "react";
import { Space, Input, Button } from "antd";
import FormItem from "@/components/base/FormItem";
import { DeleteOutlined } from "@ant-design/icons";
type MetaDataItemType = { key?: string; value?: string; icon?: string };
export interface MetaDataFieldsProps {
  index?: number;
  values?: MetaDataItemType;
  onChange?: (data: { [key: string]: string }, index?: number) => void;
  onRemove?: (index?: number) => void;
}
const MetaDataFields: React.FC<MetaDataFieldsProps> = ({ values, onChange, index, onRemove }) => {
  // const [metaData, setMetaData] = useState<{
  //     key?: string;
  //     value?: string;
  //     icon?: string;
  // }>({});
  // const onChangeForm = (key: string, value: string) => {
  //     values
  //         ? onChange?.({ [key]: value }, index)
  //         : setMetaData((oldData) => ({
  //               ...oldData,
  //               [key]: value,
  //           }));
  // };
  // useEffect(() => {
  //     values && setMetaData(() => values);
  // }, [values]);
  return (
    <Space>
      <FormItem>
        <Input
          placeholder="Icon"
          value={values?.icon}
          onChange={(ev) => onChange?.({ icon: ev.target.value }, index)}
          size="small"
        />
      </FormItem>
      <FormItem>
        <Input
          placeholder="Tiêu đề"
          value={values?.key}
          onChange={(ev) => onChange?.({ key: ev.target.value }, index)}
          size="small"
        />
      </FormItem>
      <FormItem>
        <Input
          placeholder="Nội dung"
          value={values?.value}
          onChange={(ev) => onChange?.({ value: ev.target.value }, index)}
          size="small"
        />
      </FormItem>
      <FormItem>
        <Button
          type="text"
          shape="circle"
          danger
          ghost
          icon={<DeleteOutlined />}
          onClick={() => onRemove?.(index)}
        ></Button>
      </FormItem>
    </Space>
  );
};
export default MetaDataFields;
