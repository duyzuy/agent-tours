"use client";
import { useMemo, useState } from "react";
import { Form, Select, SelectProps, Row, Col, PaginationProps } from "antd";
import FormItem from "@/components/base/FormItem";
import PageContainer from "@/components/admin/PageContainer";
import {
    IInventoryListRs,
    IInventoryQueryParams,
} from "@/models/management/core/inventory.interface";
import { useGetInventoryListCoreQuery } from "@/queries/core/inventory";

import TableListPage from "@/components/admin/TableListPage";
import { inventoryColumns } from "./columns";
import DrawerInventory, {
    DrawerInventoryProps,
    EActionType,
    TDrawlerAction,
} from "./_components/DrawerInventory";
import useCRUDInventory from "../hooks/useCRUDInventory";
import { Status } from "@/models/management/common.interface";
import { isUndefined } from "lodash";

import { useGetInventoryTypeListCoreQuery } from "@/queries/core/inventoryType";
import { EInventoryType } from "@/models/management/core/inventoryType.interface";
const InventoryPage = () => {
    const initInventoryQueryParams = new IInventoryQueryParams(
        `${EInventoryType.AIR}||${EInventoryType.HOTEL}||${EInventoryType.VISA}`,
        undefined,
        1,
        10,
        undefined,
    );
    const [queryParams, setQueryParams] = useState(initInventoryQueryParams);
    const { data: inventoryResponse, isLoading } = useGetInventoryListCoreQuery(
        {
            queryParams: queryParams,
            enabled: !isUndefined(queryParams.type),
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
        errors,
    } = useCRUDInventory();

    const handleDrawlerInventory = (drawler: TDrawlerAction) => {
        if (drawler.type === EActionType.EDIT) {
            setEditRecord(drawler.record);
        }

        if (drawler.type === EActionType.CREATE) {
        }
        setOpenDrawler(true);
    };
    const onCancelDrawler = () => {
        setOpenDrawler(false);
        setEditRecord(undefined);
    };
    const handleCreateInventory: DrawerInventoryProps["onSubmit"] = (
        action,
        formData,
    ) => {
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
    };
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
            type: inventoryTypeQueryString,
        }));
    };
    const onChangePagination: PaginationProps["onChange"] = (
        page,
        pageSize,
    ) => {
        console.log(page, pageSize);
        setQueryParams((prev) => ({ ...prev, pageCurrent: page }));
    };
    return (
        <PageContainer
            name="Inventory"
            modelName="Inventory"
            breadCrumItems={[{ title: "Inventory" }]}
            onClick={() => handleDrawlerInventory({ type: EActionType.CREATE })}
        >
            <div className="search-bar">
                <Form>
                    <Row gutter={16}>
                        <Col span={8}>
                            <FormItem>
                                <Select
                                    value={queryParams.type?.split("||")}
                                    mode="tags"
                                    style={{ width: "100%" }}
                                    placeholder="Loại inventory"
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
                modelName="Inventory"
                columns={inventoryColumns}
                rowKey={"recId"}
                dataSource={inventoryList || []}
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
                pagination={{
                    total: totalItems,
                    pageSize: pageSize,
                    current: pageCurrent,
                    onChange: onChangePagination,
                }}
            />
            <DrawerInventory
                isOpen={isOpenDrawler}
                onCancel={onCancelDrawler}
                actionType={editRecord ? EActionType.EDIT : EActionType.CREATE}
                initialValues={editRecord}
                onSubmit={handleCreateInventory}
                errors={errors}
            />
        </PageContainer>
    );
};
export default InventoryPage;
