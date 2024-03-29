"use client";
import React, { useMemo, useState } from "react";
import PageContainer from "@/components/admin/PageContainer";
import { useGetSellableListCoreQuery } from "@/queries/core/Sellable";
import { SellableQueryParams } from "@/models/management/core/sellable.interface";

import { Status } from "@/models/management/common.interface";

import {
    Col,
    Form,
    Row,
    Tabs,
    TabsProps,
    Select,
    Input,
    SelectProps,
} from "antd";
import FormItem from "@/components/base/FormItem";

import SellableListContainer from "./_components/SellableListContainer";
import {
    ITemplateSellable,
    TemplateSellableQueryParams,
} from "@/models/management/core/templateSellable.interface";
import { useGetTemplateSellableListCoreQuery } from "@/queries/core/templateSellable";
import { isArray, isUndefined } from "lodash";
import { FilterOutlined, PlusOutlined } from "@ant-design/icons";
import SellableFormContainer from "./_components/SellableFormContainer";
import { useGetProductTypeListCoreQuery } from "@/queries/core/productType";
import useCRUDSellable from "../hooks/useCRUDSellable";

const SellableListPage: React.FC = () => {
    const initTemplateQueryparams = new TemplateSellableQueryParams(
        { status: Status.OK },
        1,
        100,
    );
    const { data: templateResponse, isLoading: isLoadingTemplate } =
        useGetTemplateSellableListCoreQuery({
            queryParams: initTemplateQueryparams,
            enabled: true,
        });
    const { list: templateList } = templateResponse || {};

    const [sellableQueryParams, setSellableQueryParams] = useState(
        new SellableQueryParams(undefined, 1, 20),
    );
    const [templateSellable, setTemplateSellable] =
        useState<ITemplateSellable>();
    const { data: sellableResponse, isLoading: isLoadingSellable } =
        useGetSellableListCoreQuery({
            queryParams: sellableQueryParams,
            enabled: !isUndefined(
                sellableQueryParams?.requestObject?.sellableTemplateId,
            ),
        });

    const {
        list: sellableList,
        pageCurrent,
        pageSize,
        totalItems,
    } = sellableResponse || {};

    const { data: productTypes, isLoading: isLoadingProductType } =
        useGetProductTypeListCoreQuery({ enabled: true });

    const { onCreate, onApproval } = useCRUDSellable();

    const onSearchSellableCode = (code: string) => {
        setSellableQueryParams((prev) => ({
            ...prev,
            requestObject: { ...prev.requestObject, andCodeLike: code },
        }));
    };
    const onSelectTemplate: SelectProps<
        number,
        ITemplateSellable
    >["onChange"] = (value, template) => {
        setSellableQueryParams((prev) => ({
            ...prev,
            requestObject: {
                ...prev.requestObject,
                sellableTemplateId: value,
            },
        }));

        !isArray(template) && setTemplateSellable(template);
    };
    const productTypeOption = useMemo(() => {
        return productTypes?.reduce<{ label: string; value: string }[]>(
            (acc, type) => {
                return [...acc, { label: type, value: type }];
            },
            [],
        );
    }, [productTypes]);

    const tabItems: TabsProps["items"] = [
        {
            key: "sellableList",
            label: "Danh sách Sellable",
            children: (
                <SellableListContainer
                    dataSource={sellableList || []}
                    templateSellable={templateSellable}
                    pageSize={pageSize || 10}
                    pageCurrent={pageCurrent || 1}
                    totalItems={totalItems || 0}
                    isLoading={isLoadingSellable}
                    onApproval={onApproval}
                    onChangePageSellable={(page) =>
                        setSellableQueryParams((prev) => ({
                            ...prev,
                            pageCurrent: page,
                        }))
                    }
                    render={() => {
                        return (
                            <div className="stock-list-filter pt-3">
                                <Form layout="vertical">
                                    <Row gutter={12}>
                                        <Col>
                                            <FormItem>
                                                <FilterOutlined /> Lọc
                                            </FormItem>
                                        </Col>
                                        <Col span={6}>
                                            <FormItem>
                                                <Select<
                                                    number,
                                                    ITemplateSellable
                                                >
                                                    placeholder="Chọn template"
                                                    showSearch
                                                    optionFilterProp="children"
                                                    loading={isLoadingTemplate}
                                                    value={
                                                        sellableQueryParams
                                                            ?.requestObject
                                                            ?.sellableTemplateId
                                                    }
                                                    // filterOption={(
                                                    //     input,
                                                    //     option,
                                                    // ) =>
                                                    //     (
                                                    //         option?.name ?? ""
                                                    //     ).includes(input)
                                                    // }
                                                    // filterSort={(
                                                    //     optionA,
                                                    //     optionB,
                                                    // ) =>
                                                    //     (optionA?.name ?? "")
                                                    //         .toLowerCase()
                                                    //         .localeCompare(
                                                    //             (
                                                    //                 optionB?.name ??
                                                    //                 ""
                                                    //             ).toLowerCase(),
                                                    //         )
                                                    // }
                                                    fieldNames={{
                                                        label: "code",
                                                        value: "recId",
                                                    }}
                                                    options={templateList || []}
                                                    optionRender={(option) => {
                                                        return (
                                                            <p>
                                                                <span>
                                                                    {
                                                                        option
                                                                            .data
                                                                            .name
                                                                    }
                                                                </span>
                                                                <span className="text-xs text-gray-500 ml-3">
                                                                    {
                                                                        option
                                                                            .data
                                                                            .code
                                                                    }
                                                                </span>
                                                            </p>
                                                        );
                                                    }}
                                                    onChange={onSelectTemplate}
                                                />
                                            </FormItem>
                                        </Col>
                                        <Col span={4}>
                                            <FormItem>
                                                <Select
                                                    placeholder="Chọn type"
                                                    loading={
                                                        isLoadingProductType
                                                    }
                                                    value={
                                                        sellableQueryParams
                                                            ?.requestObject
                                                            ?.andType
                                                    }
                                                    options={productTypeOption}
                                                    onChange={(value) =>
                                                        setSellableQueryParams(
                                                            (prev) => ({
                                                                ...prev,
                                                                requestObject: {
                                                                    ...prev.requestObject,
                                                                    andType:
                                                                        value,
                                                                },
                                                            }),
                                                        )
                                                    }
                                                />
                                            </FormItem>
                                        </Col>
                                        <Col span={8}>
                                            <FormItem>
                                                <Input.Search
                                                    placeholder="Nhập code cần tìm"
                                                    enterButton="Tìm kiếm"
                                                    onSearch={(value, ev) =>
                                                        onSearchSellableCode(
                                                            value,
                                                        )
                                                    }
                                                />
                                            </FormItem>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        );
                    }}
                />
            ),
        },
        {
            key: "sellableForm",
            label: "Tạo Sellable",
            children: (
                <SellableFormContainer
                    templateList={templateList || []}
                    onSubmit={onCreate}
                />
            ),
            icon: <PlusOutlined />,
        },
    ];
    return (
        <PageContainer
            name="Sellables"
            // onClick={() => onHandleDrawler({ type: EActionType.CREATE })}
            hideAddButton
            breadCrumItems={[{ title: "Sellables" }]}
            modelName="Sellables"
        >
            <Tabs items={tabItems} />
        </PageContainer>
    );
};
export default SellableListPage;
