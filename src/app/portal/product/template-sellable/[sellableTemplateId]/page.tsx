"use client";
import React, { useEffect } from "react";
import PageContainer from "@/components/admin/PageContainer";
import { Space, Spin, Tabs, TabsProps, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { LINKS } from "@/constants/links.constant";
import { useRouter } from "next/navigation";
import useMessage from "@/hooks/useMessage";
import { useGetOneTemplateSellableCoreQuery } from "@/queries/core/templateSellable";
import useCRUDSellable from "../../hooks/useCRUDSellable";
import SellableListContainer from "../_components/SellableListContainer";
import SellableFormContainer from "../_components/SellableFormContainer";
import { Status } from "@/models/management/common.interface";
import { IDestination } from "@/models/management/region.interface";
import { formatDate } from "@/utils/date";

const Sellablepage = ({
    params,
}: {
    params: { sellableTemplateId: number };
}) => {
    const router = useRouter();
    const message = useMessage();
    const { data: templateDetail, isLoading } =
        useGetOneTemplateSellableCoreQuery({
            recId: params.sellableTemplateId,
            enabled: true,
        });

    const { onCreate, onApproval } = useCRUDSellable();

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
            label: "Danh sách Sellable",
            children:
                (templateDetail && (
                    <SellableListContainer
                        sellableTemplateId={templateDetail.recId}
                        inventoryType={templateDetail.inventoryTypeList}
                        onApproval={onApproval}
                    />
                )) ||
                null,
        },
        {
            key: "sellAbleForm",
            label: "Tạo Sellable",
            children: (
                <React.Fragment>
                    {(templateDetail && (
                        <SellableFormContainer
                            templateSellableId={templateDetail.recId}
                            templateCode={templateDetail.code}
                            type={templateDetail.type}
                            onSubmit={onCreate}
                        />
                    )) ||
                        null}
                </React.Fragment>
            ),
            icon: <PlusOutlined />,
        },
    ];

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
            modelName="Quản lý Sellable"
            breadCrumItems={[
                { title: "Template sellable", href: LINKS.TemplateSellable },
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
                    <p className="mr-2 w-40">Name:</p>
                    <p className="flex-1">{name}</p>
                </li>
                <li className="flex py-2">
                    <p className="mr-2 w-40">Code:</p>
                    <p className="flex-1">{code}</p>
                </li>
                <li className="flex py-2">
                    <p className="mr-2 w-40">Ngày tạo:</p>
                    <p className="flex-1">{firstUpdate}</p>
                </li>
                <li className="flex py-2">
                    <p className="mr-2 w-40">Nhóm điểm đến:</p>
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
                                        {des.listStateProvince.map((item) => (
                                            <Tag key={item.id}>
                                                {item.stateProvinceKey ||
                                                    item.countryName ||
                                                    item.subRegionKey ||
                                                    item.regionKey}
                                            </Tag>
                                        ))}
                                    </Space>
                                </div>
                            </div>
                        ))}
                    </div>
                </li>
                <li className="flex py-2">
                    <p className="mr-2 w-40">Loại Inventory:</p>
                    <p className="flex-1">
                        {inventoryTypeList.map((item) => (
                            <Tag color="blue" key={item}>
                                {item}
                            </Tag>
                        ))}
                    </p>
                </li>

                <li className="flex py-2">
                    <p className="mr-2 w-40">Air Itinerary:</p>
                    <p className="flex-1">{airItinerary}</p>
                </li>
            </ul>
        </div>
    );
};
