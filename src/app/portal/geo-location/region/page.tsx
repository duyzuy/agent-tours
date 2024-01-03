"use client";
import React, { useMemo, useState } from "react";
import PageContainer from "@/components/admin/PageContainer";
import DrawlerRegion from "../_components/DrawlerRegion";
import CustomTable from "@/components/admin/CustomTable";
import { ColumnsType } from "antd/es/table";
import {
    GlobalOutlined,
    EditOutlined,
    EllipsisOutlined,
} from "@ant-design/icons";
import { Tag, Form, Space, Dropdown } from "antd";
import { MenuProps } from "antd";
import { useGetRegionList } from "@/queries/core/region";
import { ICountryListRs } from "@/models/management/country.interface";
interface RegionDataType {
    key: string;
    name: string;
    regionCode: string;
    status: string;
}

const REGIONS = [
    {
        key: "CHAU_A",
        regionCode: "CHAU_A",
        name: "Châu Á",
        status: "publish",
    },
    {
        key: "CHAU_AU",
        regionCode: "CHAU_AU",
        name: "Châu Âu",
        status: "publish",
    },
    {
        key: "CHAU_DAI_DUONG",
        regionCode: "CHAU_DAI_DUONG",
        name: "Châu Đại Dương",
        status: "publish",
    },
    {
        key: "CHAU_MY",
        regionCode: "CHAU_MY",
        name: "Châu Mỹ",
        status: "unpublish",
    },
    {
        key: "CHAU_NAM_CUC",
        regionCode: "CHAU_NAM_CUC",
        name: "Châu Nam Cực",
        status: "publish",
    },
    {
        key: "CHAU_PHI",
        regionCode: "CHAU_PHI",
        name: "Châu Phi",
        status: "publish",
    },
    {
        key: "THAI_BINH_DUONG",
        regionCode: "THAI_BINH_DUONG",
        name: "Thái Bình Dương",
        status: "publish",
    },
    {
        key: "DAI_TAY_DUONG",
        regionCode: "DAI_TAY_DUONG",
        name: "Đại Tây Dương",
        status: "publish",
    },
    {
        key: "BAC_BANG_DUONG",
        regionCode: "BAC_BANG_DUONG",
        name: "Bắc Băng Dương",
        status: "publish",
    },
    {
        key: "AN_DO_DUONG",
        regionCode: "AN_DO_DUONG",
        name: "Ấn Độ Dương",
        status: "publish",
    },
    {
        key: "NAM_DAI_DUONG",
        regionCode: "NAM_DAI_DUONG",
        name: "Nam Đại Dương",
        status: "publish",
    },
];
const RegionPage = () => {
    const [form] = Form.useForm();
    const [isOpenDrawler, setOpenDrawler] = useState(false);
    const [data, setData] = useState(REGIONS);
    const [editingKey, setEditingKey] = useState("");

    const { data: countryList, isLoading } = useGetRegionList();
    const edit = (record: Partial<RegionDataType> & { key: React.Key }) => {
        form.setFieldsValue({ name: "", age: "", address: "", ...record });
        setEditingKey(record.key);
    };

    // console.log(countryList);
    // const countryListFormat: ICountryListRs["result"] = useMemo(() => {
    //     if (!countryList) return [];
    //     return countryList.map((country) => {});
    // }, [countryList]);
    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields()) as RegionDataType;

            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey("");
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey("");
            }
        } catch (errInfo) {
            console.log("Validate Failed:", errInfo);
        }
    };

    const cancel = () => {
        setEditingKey("");
    };

    const isEditing = (record: RegionDataType) => record.key === editingKey;

    const items: MenuProps["items"] = [
        {
            key: "1",
            label: (
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.antgroup.com"
                >
                    1st menu item
                </a>
            ),
        },
    ];
    const columns: ColumnsType<RegionDataType> = [
        {
            title: "Tên",
            dataIndex: "name",
            key: "name",
            width: 150,
        },
        {
            title: "Mã khu vực",
            dataIndex: "regionCode",
            key: "regionCode",
            width: 150,
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            width: 150,
            render: (_, record) => (
                <Tag
                    color={record.status === "publish" ? "green" : "volcano"}
                    key={record.status}
                >
                    {record.status.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: () => (
                <div className="flex items-center">
                    <span className=" w-12">VI</span>
                    <span className="w-12">EN</span>
                </div>
            ),
            key: "operation",
            width: 100,
            render: () => (
                <div className="flex items-center">
                    <span className="w-12">
                        <GlobalOutlined />
                    </span>
                    <span className="w-12">-</span>
                </div>
            ),
        },
        {
            title: "Actions",
            dataIndex: "action",
            key: "action",
            width: 100,
            fixed: "right",
            render: (_, record) => {
                const editable = isEditing(record);
                return (
                    <Space>
                        <span
                            className="edit-btn flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-200 cursor-pointer mr-2"
                            onClick={() => edit(record)}
                        >
                            <EditOutlined className="hover:stroke-primary-default hover:fill-primary-default p-[8px] block text-primary-light" />
                        </span>
                        <Dropdown
                            menu={{ items }}
                            placement="bottomRight"
                            arrow
                        >
                            <span className="edit-btn flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-200 cursor-pointer">
                                <EllipsisOutlined className="p-[8px] fill-primary-default" />
                            </span>
                        </Dropdown>
                    </Space>
                );
            },
        },
    ];
    return (
        <React.Fragment>
            <PageContainer
                name="Khu vực"
                modelName="khu vực"
                onClick={() => setOpenDrawler(true)}
            >
                <div className="region-list">
                    <CustomTable
                        columns={columns}
                        dataSource={REGIONS}
                        scroll={{ x: 1000 }}
                    />
                </div>
            </PageContainer>

            <DrawlerRegion
                isOpen={isOpenDrawler}
                onClose={() => setOpenDrawler(false)}
            />
        </React.Fragment>
    );
};
export default RegionPage;
