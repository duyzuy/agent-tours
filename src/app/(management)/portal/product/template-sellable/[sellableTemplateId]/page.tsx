"use client";
import React, { useEffect, useState } from "react";
import { Space, Spin, Tabs, TabsProps, Tag, Form, Row, Col, Input } from "antd";
import FormItem from "@/components/base/FormItem";
import { PlusOutlined } from "@ant-design/icons";
import { LINKS } from "@/constants/links.constant";
import { useRouter } from "next/navigation";
import { useGetOneTemplateSellableCoreQuery } from "@/queries/core/templateSellable";
import { useGetSellableListCoreQuery } from "@/queries/core/Sellable";
import useCRUDSellable from "../../sellable/modules/useCRUDSellable";
import PageContainer from "@/components/admin/PageContainer";
import SellableListContainer from "../../sellable/_components/SellableListContainer";
import SellableFormContainer from "../../sellable/_components/SellableFormContainer";
import { Status } from "@/models/common.interface";
import { IDestination } from "@/models/management/region.interface";
import { formatDate } from "@/utils/date";
import { SellableQueryParams } from "@/models/management/core/sellable.interface";
import { isUndefined } from "lodash";

const Sellablepage = ({
    params,
}: {
    params: { sellableTemplateId: number };
}) => {
    const router = useRouter();
    const { data: templateDetail, isLoading } =
        useGetOneTemplateSellableCoreQuery({
            recId: params.sellableTemplateId,
            enabled: true,
        });

    const [sellableQueryParams, setSellableQueryParams] = useState(
        new SellableQueryParams(
            { sellableTemplateId: templateDetail?.recId },
            1,
            20,
        ),
    );

    const { data: sellableResponse, isLoading: isLoadingSellable } =
        useGetSellableListCoreQuery({
            queryParams: sellableQueryParams,
            enabled: !isUndefined(
                sellableQueryParams.requestObject?.sellableTemplateId,
            ),
        });

    const {
        list: sellableList,
        pageCurrent,
        pageSize,
        totalItems,
    } = sellableResponse || {};

    const { onCreate, onApproval } = useCRUDSellable();
    const onSearchSellableCode = (code: string) => {
        setSellableQueryParams((prev) => ({
            ...prev,
            requestObject: { ...prev.requestObject, andCodeLike: code },
        }));
    };
    const onCancelCreate = () => {};
    const tabItems: TabsProps["items"] = [
        {
            key: "templateDetail",
            label: "Chi tiết",
            children:
                (templateDetail && (
                    <TemplateDetailcontent
                        name={templateDetail.name}
                        code={templateDetail.code}
                        destinations={
                            JSON.parse(
                                templateDetail.destListJson,
                            ) as IDestination[]
                        }
                        inventoryTypeList={
                            templateDetail.inventoryTypeList.split(
                                "||",
                            ) as string[]
                        }
                        firstUpdate={formatDate(templateDetail.sysFstUpdate)}
                        airItinerary={templateDetail.airItinerary}
                    />
                )) ||
                null,
        },
        {
            key: "sellableList",
            label: "Danh sách sản phẩm",
            children: (
                <SellableListContainer
                    templateSellable={templateDetail}
                    dataSource={sellableList}
                    pageSize={pageSize}
                    pageCurrent={pageCurrent}
                    totalItems={totalItems}
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
                                <Form layout="horizontal">
                                    <Row gutter={12}>
                                        <Col span={8} offset={16}>
                                            <FormItem label="Tìm kiếm">
                                                <Input.Search
                                                    placeholder="Nhập mã cần tìm"
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
            label: "Thêm sản phẩm",
            children: (
                <SellableFormContainer
                    template={templateDetail}
                    onSubmit={onCreate}
                    onCancel={onCancelCreate}
                />
            ),
            icon: <PlusOutlined />,
        },
    ];

    useEffect(() => {
        if (!isUndefined(templateDetail) && !isLoading) {
            setSellableQueryParams((prev) => ({
                ...prev,
                requestObject: {
                    ...prev.requestObject,
                    sellableTemplateId: templateDetail.recId,
                },
            }));
        }
    }, [templateDetail, isLoading]);
    useEffect(() => {
        if (
            (!templateDetail && !isLoading) ||
            (templateDetail && templateDetail.status === Status.QQ)
        ) {
            router.push(LINKS.TemplateSellable);
        }
    }, [templateDetail, isLoading]);

    if (isLoading) {
        return <Spin size="large" />;
    }
    if (
        !templateDetail ||
        (templateDetail && templateDetail.status === Status.QQ)
    ) {
        return null;
    }
    return (
        <PageContainer
            name={`${templateDetail.name} - ${templateDetail.code}`}
            onBack={() => router.push(LINKS.TemplateSellable)}
            modelName="Nhóm sản phẩm"
            breadCrumItems={[
                { title: "Nhóm sản phẩm", href: LINKS.TemplateSellable },
                { title: templateDetail.name },
            ]}
            hideAddButton
        >
            <Tabs items={tabItems} />
        </PageContainer>
    );
};
export default Sellablepage;

interface TemplateDetailContentProps {
    name: string;
    code: string;
    destinations: IDestination[];
    inventoryTypeList: string[];
    firstUpdate: string;
    airItinerary: string;
}
const TemplateDetailcontent: React.FC<TemplateDetailContentProps> = ({
    name,
    code,
    destinations,
    inventoryTypeList,
    firstUpdate,
    airItinerary,
}) => {
    return (
        <div className="detail">
            <ul>
                <li className="flex py-2">
                    <p className="mr-2 w-40">Tên nhóm:</p>
                    <p className="flex-1">{name}</p>
                </li>
                <li className="flex py-2">
                    <p className="mr-2 w-40">Mã nhóm:</p>
                    <p className="flex-1">{code}</p>
                </li>
                <li className="flex py-2">
                    <p className="mr-2 w-40">Ngày tạo:</p>
                    <p className="flex-1">{firstUpdate}</p>
                </li>
                <li className="flex py-2">
                    <p className="mr-2 w-40">Điểm đến:</p>
                    <div className="flex-1">
                        {destinations.map((des) => (
                            <div key={des.id} className="mb-2">
                                <div className="mb-2">
                                    <p className="font-semibold">
                                        {des.codeName}
                                    </p>
                                </div>
                                <div className="list-state">
                                    <Space wrap>
                                        {des.listStateProvince.map(
                                            (item, _index) => (
                                                <Tag key={_index}>
                                                    {item.stateProvinceKey ||
                                                        item.countryName ||
                                                        item.subRegionKey ||
                                                        item.regionKey}
                                                </Tag>
                                            ),
                                        )}
                                    </Space>
                                </div>
                            </div>
                        ))}
                    </div>
                </li>
                <li className="flex py-2">
                    <p className="mr-2 w-40">Loại nhóm kho:</p>
                    <p className="flex-1">
                        {inventoryTypeList.map((item) => (
                            <Tag color="blue" key={item}>
                                {item}
                            </Tag>
                        ))}
                    </p>
                </li>
            </ul>
        </div>
    );
};
