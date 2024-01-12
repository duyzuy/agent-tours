"use client";
import React, { useState } from "react";
import PageContainer from "@/components/admin/PageContainer";
import {
    ITemplateSaleableListRs,
    TemplateSellableQueryParams,
} from "@/models/management/core/templateSellable.interface";
import useCRUDTemplateSellable from "../hooks/useCRUDTemplateSellable";
import TableListPage from "@/components/admin/TableListPage";
import DrawerTemplateSellable, {
    DrawerTemplateSellableProps,
    EActionType,
} from "./_components/DrawerTemplateSellable";
import { templateSellableColums } from "./templateSellableColums";
import { useGetTemplateSellableListCoreQuery } from "@/queries/core/templateSellable";
import { IDestination } from "@/models/management/region.interface";
import { Divider, Space, Tag, Form, Radio, TablePaginationConfig } from "antd";
import FormItem from "@/components/base/FormItem";
import { useGetProductTypeListCoreQuery } from "@/queries/core/productType";
import { FilterValue } from "antd/es/table/interface";

const SellTemplatePage = () => {
    const [isOpen, setOpenDrawer] = useState(false);
    const { onCreate, onApproval, onDelete, onUpdate } =
        useCRUDTemplateSellable();
    const [actionType, setActionType] = useState<EActionType>();
    const [editRecord, setEditRecord] =
        useState<ITemplateSaleableListRs["result"][0]>();
    const templateQueryParams = new TemplateSellableQueryParams(
        // 0,
        "EXTRA",
        "",
        "",
        1,
        20,
    );
    const [queryFilter, setQueryFilter] = useState({
        ...templateQueryParams,
        total: 200,
    });
    const { data: templateList, isLoading } =
        useGetTemplateSellableListCoreQuery(queryFilter);

    const { data: productTypeList, isLoading: isLoadingProductType } =
        useGetProductTypeListCoreQuery({ enabled: true });
    const handleOpenDrawer = ({
        type,
        record,
    }: {
        type: EActionType;
        record?: ITemplateSaleableListRs["result"][0];
    }) => {
        console.log(type);

        if (type === EActionType.EDIT) {
            setEditRecord(record);
        }
        setActionType(() => type);
        setOpenDrawer(true);
    };
    const onCloseDrawerAndResetFormInit = () => {
        setOpenDrawer(false);
        setEditRecord(undefined);
    };

    const onFilterProductType = (type: string) => {
        setQueryFilter((prev) => ({ ...prev, andType: type }));
    };
    const handleTableChange = (
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        // sorter: SorterResult<ITemplateSaleableListRs["result"][0]>,
    ) => {
        const { current, pageSize } = pagination;
        if (current && current !== queryFilter.pageCurrent) {
            setQueryFilter((prev) => ({
                ...prev,
                pageCurrent: current,
            }));
        }
    };

    const onSubmitTemplateSellable: DrawerTemplateSellableProps["onSubmit"] = (
        actionType,
        payload,
    ) => {
        if (actionType === EActionType.CREATE) {
            onCreate(payload, () => {
                onCloseDrawerAndResetFormInit();
            });
        }

        if (actionType === EActionType.EDIT && editRecord) {
            onUpdate(editRecord.recId, payload, () => {
                onCloseDrawerAndResetFormInit();
            });
        }
    };
    return (
        <PageContainer
            name="Template Sell able"
            modelName="Template"
            breadCrumItems={[{ title: "Template Sell able" }]}
            onClick={() => handleOpenDrawer({ type: EActionType.CREATE })}
        >
            <div className="search-bar">
                <Form>
                    {productTypeList && (
                        <FormItem label="Product type">
                            {productTypeList.map((type) => (
                                <Radio
                                    key={type}
                                    value={type}
                                    checked={queryFilter.andType === type}
                                    onChange={() => onFilterProductType(type)}
                                >
                                    {type}
                                </Radio>
                            ))}
                        </FormItem>
                    )}
                </Form>
            </div>
            <Divider />
            <TableListPage<ITemplateSaleableListRs["result"][0]>
                modelName="Template"
                dataSource={templateList || []}
                scroll={{ x: 1200 }}
                rowKey={"recId"}
                isLoading={isLoading}
                columns={templateSellableColums}
                onChange={handleTableChange}
                pagination={{
                    current: queryFilter.pageCurrent,
                    pageSize: queryFilter.pageSize,
                }}
                expandable={{
                    expandedRowRender: ({ destListJson }) => {
                        const destinationList: IDestination[] =
                            JSON.parse(destListJson);

                        return destinationList.map((destination) => (
                            <div className="mb-4">
                                <div className="py-2">
                                    <p className="font-bold">
                                        {destination.codeName}
                                    </p>
                                </div>
                                <Space wrap>
                                    {destination.listStateProvince.map(
                                        (state) => (
                                            <>
                                                {(state.stateProvinceKey && (
                                                    <Tag key={state.id}>
                                                        {state.stateProvinceKey}
                                                    </Tag>
                                                )) ||
                                                    (state.countryKey && (
                                                        <Tag
                                                            color="red"
                                                            key={state.id}
                                                        >
                                                            {state.countryKey}
                                                        </Tag>
                                                    )) ||
                                                    (state.subRegionKey && (
                                                        <Tag
                                                            color="green"
                                                            key={state.id}
                                                        >
                                                            {state.subRegionKey}
                                                        </Tag>
                                                    )) ||
                                                    (state.regionKey && (
                                                        <Tag
                                                            color="black"
                                                            key={state.id}
                                                        >
                                                            {state.regionKey}
                                                        </Tag>
                                                    ))}
                                            </>
                                        ),
                                    )}
                                </Space>
                            </div>
                        ));
                    },
                }}
                onEdit={(record) =>
                    handleOpenDrawer({ type: EActionType.EDIT, record })
                }
                onDelete={(record) => onDelete(record.recId)}
                onApproval={(record) => onApproval(record.recId)}
            />
            <DrawerTemplateSellable
                onSubmit={onSubmitTemplateSellable}
                initialValues={editRecord}
                isOpen={isOpen}
                onCancel={onCloseDrawerAndResetFormInit}
                actionType={actionType}
            />
        </PageContainer>
    );
};
export default SellTemplatePage;
