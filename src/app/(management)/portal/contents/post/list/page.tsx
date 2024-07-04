"use client";

import TitleRow from "@/components/admin/TitleRow";

import {
    Avatar,
    Button,
    Form,
    Input,
    List,
    Skeleton,
    Space,
    Switch,
    Table,
} from "antd";
import React, { useState, useEffect } from "react";
import type { ColumnsType } from "antd/es/table";
import styled from "styled-components";
import { GlobalOutlined } from "@ant-design/icons";
import { Select } from "antd";
interface DataType {
    key: React.Key;
    name: string;
    category: string;
    tag: string;
    status: "publish" | "unpublish";
}

const columns: ColumnsType<DataType> = [
    {
        title: "Tên bài viết",
        dataIndex: "name",
        key: "1",
        width: 350,
    },
    {
        title: "Chuyên mục",
        dataIndex: "category",
        key: "2",
        width: 150,
    },
    {
        title: "Thẻ",
        dataIndex: "tag",
        key: "3",
        width: 150,
    },
    {
        title: "Trạng thái",
        dataIndex: "status",
        key: "4",
        width: 150,
    },
    {
        title: () => (
            <div className="flex items-center">
                <span className=" w-12">VI</span>
                <span className="w-12">EN</span>
            </div>
        ),
        key: "operation",
        fixed: "right",
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
];

const PostPage = () => {
    const data: DataType[] = [];

    const categories = [
        { value: "all", label: "Tất cả chuyên mục" },
        { value: "jack", label: "Jack" },
        { value: "lucy", label: "Lucy" },
        { value: "Yiminghe", label: "yiminghe" },
        { value: "disabled", label: "Disabled", disabled: true },
    ];

    for (let i = 0; i < 100; i++) {
        data.push({
            key: i,
            name: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. ${i}`,
            category: "Kinh nghiệm du lịch",
            tag: "kinh nghiệm hay, châu á, châu úc",
            status: "publish",
        });
    }

    return (
        <div className="post-page">
            <TitleRow title="Danh sách bài viết" modelName="Bài viết" />
            <div className="space h-6"></div>
            <div className="post-tool py-4 flex justify-between">
                <div className="filter">
                    <Space>
                        <Select
                            defaultValue="all"
                            style={{ width: 180 }}
                            onChange={() => {}}
                            options={categories}
                        />
                        <Button type="primary" ghost>
                            Lọc
                        </Button>
                    </Space>
                </div>
                <div className="search">
                    <Form layout="inline">
                        <Form.Item name="searchPost">
                            <Input placeholder="Nhập tên bài viết..." />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" ghost>
                                Tìm kiếm
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
            <StyledTable
                columns={columns}
                dataSource={data}
                scroll={{ x: 1000 }}
                className=""
            />
        </div>
    );
};
export default PostPage;

const StyledTable = styled(Table)`
    & table {
        border-spacing: 0 10px !important;
    }
    & .ant-table-row {
        .ant-table-cell {
            border-top: 1px solid var(--neutrals-07);

            &:first-child {
                border-left: 1px solid var(--neutrals-07);
                border-top-left-radius: 8px;
                border-bottom-left-radius: 8px;
            }
            &:last-child {
                border-right: 1px solid var(--neutrals-07);
                border-top-right-radius: 8px;
                border-bottom-right-radius: 8px;
            }
        }
        
        
    }
    & .ant-table-thead {
        .ant-table-cell {
            border-bottom-width: 0; border;
            &:first-child {
                
                border-top-left-radius: 8px;
                border-bottom-left-radius: 8px;
            }
            &:last-child {
                
                border-top-right-radius: 8px;
                border-bottom-right-radius: 8px;
            }
        }
    }
`;
