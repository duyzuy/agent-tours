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
import classNames from "classnames";
import { isUndefined } from "lodash";

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
    hideView?: (record: T) => boolean;
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
        showActionsLess = true,
        pagination,
        onEdit,
        onApproval,
        onView,
        onDelete,
        onSetting,
        hideApproval,
        hideEdit,
        hideDelete,
        hideView,
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

    const actionList = [
        {
            hide: hideApproval,
            icon: <CheckCircleOutlined className="p-[8px]" />,
            func: onApproval,
            text: "Duyệt",
            key: "approval",
            clasName: "item text-green-600",
        },
        {
            hide: hideView,
            icon: <EyeOutlined className="p-[8px]" />,
            func: onView,
            text: "Chi tiết",
            key: "view",
            clasName: "item text-blue-600",
        },
        {
            hide: hideDelete,
            icon: <DeleteOutlined className="p-[8px]" />,
            func: onDelete,
            text: "Xoá",
            key: "delete",
            clasName: "item text-red-600",
        },
    ];

    let renderDropdownItems = (record: T) => {
        const fncList = [
            {
                hide: hideApproval?.(record),
                action: onApproval,
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
                hide: hideView?.(record),
                action: onView,
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
                action: onDelete,
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

        let actionsMerged: MenuProps["items"] = [];

        fncList.forEach((fnc) => {
            if (!isUndefined(fnc.hide) && fnc.hide === true) return;

            if (isUndefined(fnc.action)) return;

            actionsMerged = [...(actionsMerged || []), fnc.item];
        });
        return actionsMerged;
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
                        {!onEdit || hideEdit?.(record) === true ? null : (
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
                        {!showActionsLess ? (
                            actionList.map((item, _index) => (
                                <React.Fragment key={_index}>
                                    {item.func &&
                                    (isUndefined(item.hide) ||
                                        item.hide(record) === false) ? (
                                        <>
                                            <span
                                                key={item.key}
                                                className={classNames(
                                                    "flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer mr-1",
                                                    {
                                                        [item.clasName]:
                                                            item.clasName,
                                                    },
                                                )}
                                                title={item.text}
                                                onClick={() =>
                                                    item.key === "delete"
                                                        ? onShowModalConfirm(
                                                              record,
                                                          )
                                                        : item.func?.(record)
                                                }
                                            >
                                                {item.icon}
                                            </span>
                                        </>
                                    ) : null}
                                </React.Fragment>
                            ))
                        ) : hasShowMore(record) ? (
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
