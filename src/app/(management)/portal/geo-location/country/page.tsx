"use client";
import React, { useState } from "react";
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
import DrawlerCountry from "../_components/DrawlerCountry";
interface RegionDataType {
    key: string;
    name: string;
    countryCode: string;
    status: string;
}

const REGIONS = [
    {
        key: "VN",
        countryCode: "VN",
        name: "Việt nam",
        status: "publish",
    },
    {
        key: "TL",
        countryCode: "TL",
        name: "Thái lan",
        status: "publish",
    },
    {
        key: "HAN",
        countryCode: "HAN",
        name: "Hàn Quốc",
        status: "publish",
    },
    {
        key: "NB",
        countryCode: "NB",
        name: "Nhật Bản",
        status: "publish",
    },
];
const RegionPage = () => {
    const [form] = Form.useForm();
    const [isOpenDrawler, setOpenDrawler] = useState(false);
    const [data, setData] = useState(REGIONS);
    const [editingKey, setEditingKey] = useState("");

    const edit = (record: Partial<RegionDataType> & { key: React.Key }) => {
        form.setFieldsValue({ name: "", age: "", address: "", ...record });
        setEditingKey(record.key);
    };

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
            title: "Mã quốc gia",
            dataIndex: "countryCode",
            key: "countryCode",
            width: 150,
        },
        {
            title: "Tên Quốc gia",
            dataIndex: "name",
            key: "name",
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
                name="Quốc gia"
                modelName="quốc gia"
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

            <DrawlerCountry
                isOpen={isOpenDrawler}
                onClose={() => setOpenDrawler(false)}
            />
        </React.Fragment>
    );
};
export default RegionPage;
