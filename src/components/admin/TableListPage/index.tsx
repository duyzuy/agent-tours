import React, { memo, useState } from "react";
import { Space, Dropdown, Popconfirm } from "antd";
import {
    EditOutlined,
    EllipsisOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import { ColumnsType, TableProps } from "antd/es/table";
import CustomTable from "@/components/admin/CustomTable";
import ModalDeleteConfirm from "./ModalDeleteConfirm";

type ITableListPage<T extends object> = TableProps<T> & {
    dataSource: T[];
    isLoading?: boolean;
    onEdit?: (record: T) => void;
    columns: ColumnsType<T>;
    onDelete?: (record: T) => void;
    modelName?: string;
};
function TableListPage<T extends object>(props: ITableListPage<T>) {
    const {
        dataSource,
        isLoading,
        onEdit,
        columns,
        onDelete,
        modelName = "",
        ...restProps
    } = props;
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [record, setRecord] = useState<T>();

    const onShowModalConfirm = (record: T) => {
        setShowModalDelete((prev) => !prev);
        setRecord(() => record);
    };
    const onCancelDelete = () => {
        setShowModalDelete(false);
        setRecord(() => undefined);
    };
    const onConfirmDelete = () => {
        if (!record) return;
        onDelete?.(record);
        setShowModalDelete(false);
    };
    const mergeColumns: ColumnsType<T> = [
        ...columns,
        {
            title: "Actions",
            dataIndex: "action",
            key: "action",
            width: 100,
            fixed: "right",
            render: (_, record) => {
                return (
                    <Space>
                        <span
                            className="edit-btn flex items-center text-primary-default justify-center rounded-full  hover:bg-gray-100 cursor-pointer mr-1"
                            onClick={() => onEdit?.(record)}
                        >
                            <EditOutlined className="p-[8px] block" />
                        </span>
                        <Dropdown
                            menu={{
                                items: [
                                    {
                                        key: "delete",
                                        label: (
                                            <div
                                                className="item text-red-600"
                                                onClick={() =>
                                                    onShowModalConfirm(record)
                                                }
                                            >
                                                <DeleteOutlined />
                                                <span className="ml-2">
                                                    Xoá
                                                </span>
                                            </div>
                                        ),
                                    },
                                ],
                            }}
                            placement="bottomRight"
                            arrow
                        >
                            <span className="edit-btn flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-200 cursor-pointer">
                                <EllipsisOutlined className="p-[8px]" />
                            </span>
                        </Dropdown>
                    </Space>
                );
            },
        },
    ];

    return (
        <React.Fragment>
            <CustomTable
                columns={mergeColumns}
                dataSource={dataSource}
                loading={isLoading}
                {...restProps}
            />
            <ModalDeleteConfirm
                isShowModal={showModalDelete}
                title={`Xoá ${modelName}`}
                descriptions={`Bạn có chắc chắn muốn xoá ${modelName}!`}
                onCancel={onCancelDelete}
                onConfirm={onConfirmDelete}
            />
        </React.Fragment>
    );
}
export default TableListPage;
