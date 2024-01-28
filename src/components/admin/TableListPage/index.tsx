import React, { useCallback, useMemo, useState } from "react";
import { Space, Dropdown, MenuProps } from "antd";
import {
    EditOutlined,
    EllipsisOutlined,
    DeleteOutlined,
    EyeOutlined,
    CheckCircleOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import Table, { ColumnsType, TableProps } from "antd/es/table";
import CustomTable from "@/components/admin/CustomTable";
import ModalDeleteConfirm from "./ModalDeleteConfirm";
import styled from "styled-components";

type ITableListPageProps<T extends object> = TableProps<T> & {
    dataSource: T[];
    isLoading?: boolean;
    columns: ColumnsType<T>;
    showActionsLess?: boolean;
    modelName?: string;
    onEdit?: (record: T) => void;
    onDelete?: (record: T) => void;
    onView?: (record: T) => void;
    onSetting?: (record: T) => void;
    onApproval?: (record: T) => void;
    hideApproval?: (record: T) => boolean;
    hideEdit?: (record: T) => boolean;
    hideDelete?: (record: T) => boolean;
};

type TablePageActionItemType<T extends object> = {
    hide?: boolean;
    item?: {
        key: string;
        className?: string;
        label: React.ReactNode;
    };
};
function TableListPage<T extends object>(props: ITableListPageProps<T>) {
    const {
        dataSource,
        isLoading,
        columns,
        modelName = "",
        showActionsLess = false,
        pagination,
        onEdit,
        onApproval,
        onView,
        onDelete,
        onSetting,
        hideApproval,
        hideEdit,
        hideDelete,
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

    let renderDropdownItems = (record: T) => {
        const fncList = [
            {
                hide: hideApproval?.(record),
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
                hide: false,
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
                hide: hideDelete?.(record),
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
            if (curr.hide === false) {
                acc = [...(acc || []), curr.item];
            }
            return acc;
        }, []);
    };

    const hasShowMore = useCallback(
        (record: T) => {
            return (renderDropdownItems(record) || [])?.length > 0;
        },
        [renderDropdownItems],
    );

    const mergeColumns: ColumnsType<T> = [
        ...columns,
        {
            title: "Hành động",
            dataIndex: "action",
            key: "action",
            width: 160,
            fixed: "right",
            render: (_, record) => {
                return (
                    <Space>
                        {hideEdit?.(record) ? null : (
                            <span
                                className="edit-btn flex items-center text-primary-default justify-center rounded-full  hover:bg-gray-100 cursor-pointer mr-1"
                                onClick={() => onEdit?.(record)}
                                title="Sửa"
                            >
                                <EditOutlined className="p-[8px] block" />
                            </span>
                        )}
                        {onSetting ? (
                            <span
                                className="edit-btn flex items-center text-primary-default justify-center rounded-full  hover:bg-gray-100 cursor-pointer mr-1"
                                title="Thiết lập"
                                onClick={() => onSetting?.(record)}
                            >
                                <SettingOutlined className="p-[8px] block" />
                            </span>
                        ) : null}
                        {/* <TableListPage.Actions
                            actions={() => renderDropdownItems(record)}
                        /> */}
                        {hasShowMore(record) ? (
                            <Dropdown
                                menu={{
                                    items: renderDropdownItems(
                                        record,
                                    ) as MenuProps["items"],
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
                    showTotal: (total, range) =>
                        `${range[0]}-${range[1]} of ${total} items`,
                    showQuickJumper: true,
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

// interface TableListPageActionsProps<T extends object> {
//     actions?: TablePageActionItemType<T>[];
//     showLess?: boolean;
// }

// TableListPage.Actions = function <T extends object>({
//     actions,
//     showLess = false,
// }: TableListPageActionsProps<T>) {
//     let renderDropdownItems = () => {
//         return actions?.reduce<MenuProps["items"]>((acc, curr) => {
//             if (curr?.hide === false && curr.item) {
//                 acc = [...(acc || []), curr?.item];
//             }
//             return acc;
//         }, []);
//     };

//     return (
//         <>
//             {showLess ? (
//                 <Dropdown
//                     menu={{
//                         items: renderDropdownItems() as MenuProps["items"],
//                     }}
//                     placement="bottomRight"
//                     arrow
//                 >
//                     <span className="edit-btn flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-200 cursor-pointer">
//                         <EllipsisOutlined className="p-[8px]" />
//                     </span>
//                 </Dropdown>
//             ) : (
//                 <>
//                     {actions?.map((action) => (
//                         <>{action.hide === false && action.item?.label}</>
//                     ))}
//                 </>
//             )}
//         </>
//     );
// };
