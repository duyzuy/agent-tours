"use client";
import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Select, SelectProps, Row, Col } from "antd";
import FormItem from "@/components/base/FormItem";
import PageContainer from "@/components/admin/PageContainer";
import {
    IInventoryListRs,
    InventoryQueryParams,
} from "@/models/management/core/inventory.interface";
import { useGetInventoryListCoreQuery } from "@/queries/core/inventory";

import TableListPage from "@/components/admin/TableListPage";
import { inventoryColumns } from "./columns";
import DrawerInventory, {
    DrawerInventoryProps,
    EActionType,
    TDrawlerAction,
} from "./_components/DrawerInventory";
import useCRUDInventory from "./modules/useCRUDInventory";
import { Status } from "@/models/common.interface";
import { isUndefined } from "lodash";
import { useGetInventoryTypeListCoreQuery } from "@/queries/core/inventoryType";
import { EInventoryType } from "@/models/management/core/inventoryType.interface";

const InventoryPage = () => {
    const router = useRouter();

    const [queryParams, setQueryParams] = useState(
        () =>
            new InventoryQueryParams(
                {
                    type: `${EInventoryType.AIR}||${EInventoryType.HOTEL}||${EInventoryType.VISA}||${EInventoryType.TRANSPORT}||${EInventoryType.INSURANCE}||${EInventoryType.LANDPACKAGE}||${EInventoryType.RESTAURANT}`,
                },
                1,
                10,
            ),
    );
    const { data: inventoryResponse, isLoading } = useGetInventoryListCoreQuery(
        {
            queryParams: queryParams,
            enabled: !isUndefined(queryParams.requestObject?.type),
        },
    );
    const {
        list: inventoryList,
        pageCurrent,
        pageSize,
        totalItems,
    } = inventoryResponse || {};
    const { data: inventoryTypeList, isLoading: isLoadingInventoryType } =
        useGetInventoryTypeListCoreQuery({ enabled: true });
    const inventoryTypeOptions = useMemo(() => {
        return inventoryTypeList?.reduce<{ label: string; value: string }[]>(
            (acc, type) => {
                return [...acc, { label: type, value: type }];
            },
            [],
        );
    }, [inventoryTypeList]);
    const [isOpenDrawler, setOpenDrawler] = useState(false);
    const [editRecord, setEditRecord] =
        useState<IInventoryListRs["result"][0]>();

    const {
        onCreateInventory,
        onUpdateInventory,
        onApprovalInventory,
        onDeleteInventory,
    } = useCRUDInventory();

    const handleDrawlerInventory = useCallback((drawler: TDrawlerAction) => {
        if (drawler.type === EActionType.EDIT) {
            setEditRecord(drawler.record);
        }

        if (drawler.type === EActionType.CREATE) {
        }
        setOpenDrawler(true);
    }, []);

    const onCancelDrawler = useCallback(() => {
        setOpenDrawler(false);
        setEditRecord(undefined);
    }, []);

    const handleCreateInventory = useCallback<DrawerInventoryProps["onSubmit"]>(
        (action, formData) => {
            if (action === EActionType.CREATE) {
                onCreateInventory(formData, () => {
                    setOpenDrawler(false);
                });
            }
            if (action === EActionType.EDIT && editRecord) {
                onUpdateInventory(editRecord.recId, formData, () => {
                    setOpenDrawler(false);
                    setEditRecord(undefined);
                });
            }
        },
        [],
    );
    const onChangeInventoryTypeQueryParams: SelectProps<
        string[],
        { label: string; value: string }
    >["onChange"] = (types, options) => {
        if (types.length === 0) {
            return;
        }

        let sortedTypes = types.sort();
        const inventoryTypeQueryString = sortedTypes.reduce(
            (acc, type, _index) => {
                return acc.concat(_index === 0 ? "" : "||", type);
            },
            "",
        );
        setQueryParams((prev) => ({
            ...prev,
            requestObject: {
                type: inventoryTypeQueryString,
            },
        }));
    };

    return (
        <PageContainer
            name="Quản lý nhóm kho sản phẩm"
            modelName="nhóm"
            breadCrumItems={[{ title: "Quản lý nhóm kho sản phẩm" }]}
            onClick={() => handleDrawlerInventory({ type: EActionType.CREATE })}
        >
            <div className="search-bar">
                <Form>
                    <Row gutter={16}>
                        <Col span={8}>
                            <FormItem>
                                <Select
                                    value={queryParams?.requestObject?.type?.split(
                                        "||",
                                    )}
                                    mode="tags"
                                    style={{ width: "100%" }}
                                    placeholder="Loại kho"
                                    onChange={onChangeInventoryTypeQueryParams}
                                    options={inventoryTypeOptions}
                                    loading={isLoadingInventoryType}
                                    maxTagCount="responsive"
                                />
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>

            <TableListPage<IInventoryListRs["result"][0]>
                scroll={{ x: 1400 }}
                modelName="Nhóm kho sản phẩm"
                columns={inventoryColumns}
                rowKey={"recId"}
                dataSource={inventoryList || []}
                fixedActionsColumn={false}
                showActionsLess={false}
                isLoading={isLoading}
                onEdit={(record) =>
                    handleDrawlerInventory({ type: EActionType.EDIT, record })
                }
                onDelete={(record) => onDeleteInventory(record.recId)}
                onApproval={(record) =>
                    record.status === Status.QQ &&
                    onApprovalInventory(record.recId)
                }
                hideApproval={(record) => record.status === Status.OK}
                onView={(record) =>
                    router.push(`./portal/product/inventory/${record.recId}`)
                }
                hideView={(record) =>
                    !record.isStock || record.status !== Status.OK
                }
                pagination={{
                    total: totalItems,
                    pageSize: pageSize,
                    current: pageCurrent,
                    onChange: (page, pageSize) =>
                        setQueryParams((prev) => ({
                            ...prev,
                            pageCurrent: page,
                        })),
                }}
            />
            <DrawerInventory
                isOpen={isOpenDrawler}
                initialValues={editRecord}
                onCancel={onCancelDrawler}
                actionType={editRecord ? EActionType.EDIT : EActionType.CREATE}
                onSubmit={handleCreateInventory}
            />
        </PageContainer>
    );
};
export default InventoryPage;
