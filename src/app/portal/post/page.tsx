"use client";

import TitleRow from "@/components/backOffice/TitleRow";

import { Avatar, Button, List, Skeleton, Switch, Table } from "antd";
import React, { useState, useEffect } from "react";
import type { ColumnsType } from "antd/es/table";
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
        title: "Action",
        key: "operation",
        fixed: "right",
        width: 100,
        render: () => <a>action</a>,
    },
];

const PostPage = () => {
    const data: DataType[] = [];
    for (let i = 0; i < 100; i++) {
        data.push({
            key: i,
            name: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. ${i}`,
            category: "Kinh nghiệm du lịch",
            tag: "kinh nghiệm hay, châu á, châu úc",
            status: "publish",
        });
    }

    const [fixedTop, setFixedTop] = useState(false);
    return (
        <div className="post-page">
            <TitleRow title="Danh sách bài viết" modelName="Bài viết" />
            <div className="space h-6"></div>
            <Table
                columns={columns}
                dataSource={data}
                scroll={{ x: 1000 }}
                // summary={() => (
                //     <Table.Summary fixed={fixedTop ? "top" : "bottom"}>
                //         <Table.Summary.Row>
                //             <Table.Summary.Cell index={0} colSpan={2}>
                //                 <Switch
                //                     checkedChildren="Fixed Top"
                //                     unCheckedChildren="Fixed Top"
                //                     checked={fixedTop}
                //                     onChange={() => {
                //                         setFixedTop(!fixedTop);
                //                     }}
                //                 />
                //             </Table.Summary.Cell>
                //         </Table.Summary.Row>
                //     </Table.Summary>
                // )}
                // antd site header height
            />
        </div>
    );
};
export default PostPage;
