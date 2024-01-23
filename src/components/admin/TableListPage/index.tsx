import React, { useMemo, useState } from "react";
import { Space, Dropdown, MenuProps } from "antd";
import {
    EditOutlined,
    EllipsisOutlined,
    DeleteOutlined,
    EyeOutlined,
    CheckCircleOutlined,
} from "@ant-design/icons";
import { ColumnsType, TableProps } from "antd/es/table";
import CustomTable from "@/components/admin/CustomTable";
import ModalDeleteConfirm from "./ModalDeleteConfirm";

type ITableListPageProps<T extends object> = TableProps<T> & {
    dataSource: T[];
    isLoading?: boolean;
    onEdit?: (record: T) => void;
    columns: ColumnsType<T>;
    onDelete?: (record: T) => void;
    onView?: (record: T) => void;
    onApproval?: (record: T) => void;
    hideApproval?: (record: T) => boolean;
    modelName?: string;
};
function TableListPage<T extends object>(props: ITableListPageProps<T>) {
    const {
        dataSource,
        isLoading,
        onEdit,
        onApproval,
        onView,
        onDelete,
        columns,
        modelName = "",
        hideApproval,
        pagination,
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

    let renderDropdownItems = (record: T): MenuProps["items"] => {
        const fncList = [
            {
                fnc: onApproval,
                ishide: hideApproval?.(record),
                item: {
                    key: "approval",
                    label: (
                        <div
                            className="item text-green-600"
                            onClick={() => onApproval?.(record)}
                        >
                            <CheckCircleOutlined />
                            <span className="ml-2">Duyệt</span>
                        </div>
                    ),
                },
            },
            {
                fnc: onView,
                ishide: false,
                item: {
                    key: "view",
                    label: (
                        <div
                            className="item text-blue-600"
                            onClick={() => onView?.(record)}
                        >
                            <EyeOutlined />
                            <span className="ml-2">Xem chi tiết</span>
                        </div>
                    ),
                },
            },
            {
                fnc: onDelete,
                ishide: false,
                item: {
                    key: "delete",
                    className: "",
                    label: (
                        <div
                            className="item text-red-600"
                            onClick={() => onShowModalConfirm(record)}
                        >
                            <DeleteOutlined />
                            <span className="ml-2">Xoá</span>
                        </div>
                    ),
                },
            },
        ];

        return fncList.reduce<MenuProps["items"]>((acc, curr) => {
            if (curr.fnc && !curr.ishide) {
                acc = [...(acc || []), curr.item];
            }
            return acc;
        }, []);
    };
    const showMore = useMemo(() => {
        return Boolean(onApproval) || Boolean(onDelete) || Boolean(onView);
    }, [onApproval, onDelete, onView]);

    const mergeColumns: ColumnsType<T> = [
        ...columns,
        {
            title: "Hành động",
            dataIndex: "action",
            key: "action",
            width: 80,
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
                        {showMore ? (
                            <Dropdown
                                menu={{
                                    items: renderDropdownItems(record),
                                }}
                                placement="bottomRight"
                                arrow
                            >
                                <span className="edit-btn flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-200 cursor-pointer">
                                    <EllipsisOutlined className="p-[8px]" />
                                </span>
                            </Dropdown>
                        ) : null}
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
                pagination={{
                    hideOnSinglePage: true,
                    pageSizeOptions: [10, 20, 50, 100],
                    ...pagination,
                }}
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
