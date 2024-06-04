import { useEffect, useState } from "react";
import { Space, Input, Button } from "antd";
import FormItem from "@/components/base/FormItem";
type MetaDataItemType = { key?: string; value?: string; icon?: string };
interface MetaDataFieldsProps {
    index?: number;
    values?: MetaDataItemType;
    onChange?: (key: "icon" | "key" | "value", value: string) => void;
    onRemove?: (index?: number) => void;
}
const MetaDataFields: React.FC<MetaDataFieldsProps> = ({
    values,
    onChange,
    index,
    onRemove,
}) => {
    const [metaData, setMetaData] = useState<{
        key?: string;
        value?: string;
        icon?: string;
    }>({});
    const onChangeForm = (key: "icon" | "key" | "value", value: string) => {
        values
            ? onChange?.(key, value)
            : setMetaData((oldData) => ({
                  ...oldData,
                  [key]: value,
              }));
    };
    useEffect(() => {
        values && setMetaData(() => values);
    }, [values]);
    return (
        <Space>
            <FormItem>
                <Input
                    placeholder="Icon"
                    value={metaData.icon}
                    onChange={(ev) => onChangeForm("icon", ev.target.value)}
                />
            </FormItem>
            <FormItem>
                <Input
                    placeholder="Key"
                    value={metaData.key}
                    onChange={(ev) => onChangeForm("key", ev.target.value)}
                />
            </FormItem>
            <FormItem>
                <Input
                    placeholder="Value"
                    value={metaData.value}
                    onChange={(ev) => onChangeForm("value", ev.target.value)}
                />
            </FormItem>
            <FormItem>
                <Button
                    type="primary"
                    danger
                    ghost
                    onClick={() => onRemove?.(index)}
                >
                    Xoá
                </Button>
            </FormItem>
        </Space>
    );
};
export default MetaDataFields;
