import React, { useState, useRef, useContext, useEffect } from "react";
import { Input, Form, InputRef, FormInstance, Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { TableProps } from "antd/es/table";
import { SellableConfirmFormData } from "@/models/management/core/sellable.interface";
import CustomTable from "@/components/admin/CustomTable";

const EditableContext = React.createContext<FormInstance<any> | null>(null);

type SellableItemType = SellableConfirmFormData["otherSellables"][0];

interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    children: React.ReactNode;
    dataIndex: keyof SellableItemType;
    record: SellableItemType;
    handleSave: (record: SellableItemType) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<InputRef>(null);
    const form = useContext(EditableContext)!;

    useEffect(() => {
        if (editing) {
            inputRef.current!.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();

            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log("Save failed:", errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{ margin: 0, padding: 0, height: 28 }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `Không bỏ trống.`,
                    },
                ]}
            >
                <Input
                    ref={inputRef}
                    size="small"
                    onPressEnter={save}
                    onBlur={save}
                    className="p-0"
                />
            </Form.Item>
        ) : (
            <div className="editable-cell-value-wrap" onClick={toggleEdit}>
                {children}
                <Button
                    icon={<EditOutlined />}
                    type="text"
                    shape="circle"
                    size="small"
                />
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

interface EditableRowProps {
    index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};
// type EditableTableProps = Parameters<typeof Table>[0];
type EditableTableProps = TableProps<SellableItemType>;
type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

export type SellableListProps = TableProps<SellableItemType> & {
    sellables: SellableItemType[];
    onSave?: (record: SellableItemType) => void;
    onDelete: (record: SellableItemType) => void;
};

function SellableList(props: SellableListProps) {
    const { sellables, onSave, onDelete, ...restProps } = props;

    const handleSave: EditableCellProps["handleSave"] = (record) => {
        onSave?.(record);
    };

    const defaultColumns: (ColumnTypes[number] & {
        editable?: boolean;
        dataIndex: string;
    })[] = [
        {
            title: "#ID",
            dataIndex: "recId",
            width: 80,
            render: (_, record) => {
                return record.sellable.recId;
            },
        },
        {
            title: "Code",
            dataIndex: "code",
            width: 250,
            render: (_, record) => {
                return record.sellable.code;
            },
        },
        {
            title: "Số lượng",
            dataIndex: "qty",
            width: 150,
            editable: true,
        },
        {
            title: "Hành động",
            dataIndex: "actions",
            fixed: "right",
            width: 100,
            render: (_, recrod) => {
                return (
                    <Button
                        icon={<DeleteOutlined />}
                        size="small"
                        danger
                        type="text"
                        onClick={() => onDelete(recrod)}
                        shape="circle"
                        className="p-2"
                    ></Button>
                );
            },
        },
    ];

    const inventoryColumns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: SellableItemType) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });
    return (
        <React.Fragment>
            <CustomTable
                rowKey={(record) => record.sellable.recId || ""}
                size="small"
                components={{
                    body: {
                        row: EditableRow,
                        cell: EditableCell,
                    },
                }}
                rowClassName={() => "editable-row"}
                pagination={{ size: "small", hideOnSinglePage: true }}
                columns={inventoryColumns as ColumnTypes}
                dataSource={sellables}
                {...restProps}
            />
        </React.Fragment>
    );
}
export default SellableList;
