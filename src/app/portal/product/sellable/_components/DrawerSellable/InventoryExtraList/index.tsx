import React, { useState, useContext } from "react";
import { Table, Form, FormInstance, Button, InputNumber } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { TableProps } from "antd/es/table";
import { SellableConfirmFormData } from "@/models/management/core/sellable.interface";
import CustomTable from "@/components/admin/CustomTable";

const EditableContext = React.createContext<FormInstance<any> | null>(null);

type InventoryItemType = SellableConfirmFormData["inventories"][0];

interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    children: React.ReactNode;
    dataIndex: keyof InventoryItemType;
    record: InventoryItemType;
    handleSave: (record: InventoryItemType) => void;
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

    const form = useContext(EditableContext)!;

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
                    {
                        type: "number",
                        min: 1,
                        max: 99,
                        message: "Số lượng không hợp lệ.",
                    },
                ]}
            >
                <InputNumber
                    autoFocus={true}
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
type EditableTableProps = TableProps<InventoryItemType>;
type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

export type InventoryExtraListProps = TableProps<InventoryItemType> & {
    inventories: InventoryItemType[];
    onSave: (record: InventoryItemType) => void;
    onDelete: (record: InventoryItemType) => void;
};

function InventoryExtraList(props: InventoryExtraListProps) {
    const { inventories, onSave, onDelete, ...restProps } = props;

    const handleSave: EditableCellProps["handleSave"] = (record) => {
        onSave(record);
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
                return record.inventory.recId;
            },
        },
        {
            title: "Tên",
            dataIndex: "code",
            width: 250,
            render: (_, record) => {
                return (
                    <>
                        <p>{record.inventory.name}</p>
                        <p className="text-xs text-primary-default">
                            {record.inventory.code}
                        </p>
                    </>
                );
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
            onCell: (record: InventoryItemType) => ({
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
                rowKey={(record) => record.inventory?.recId || ""}
                size="small"
                components={{
                    body: {
                        row: EditableRow,
                        cell: EditableCell,
                    },
                }}
                rowClassName={() => "editable-row"}
                columns={inventoryColumns as ColumnTypes}
                dataSource={inventories}
                pagination={{
                    hideOnSinglePage: true,
                    size: "small",
                }}
                {...restProps}
            />
        </React.Fragment>
    );
}
export default InventoryExtraList;
