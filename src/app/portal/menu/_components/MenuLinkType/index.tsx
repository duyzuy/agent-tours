"use client";
import React, { useState } from "react";
import { Collapse, CollapseProps, Checkbox, Button } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import styled from "styled-components";
const MENUS_DATA = [
    {
        id: 1,
        name: "New York No. 1 Lake Park",
        description: "New York No. 1 Lake Park",
        index: 0,
    },
    {
        id: 2,
        name: "London No. 1 Lake Park",
        description: "London No. 1 Lake Park",
        index: 1,
    },
    {
        id: 3,
        name: "London No. 5 Lake Park",
        description: "London No. 1 Lake Park",
        index: 2,
    },
    {
        id: 4,
        name: "New York No. 6 Lake Park",
        description: "New York No. 1 Lake Park",
        index: 3,
    },
    {
        id: 5,
        name: "New York No. 1 Lake Park",
        description: "London No. 1 Lake Park",
        index: 4,
    },
    {
        id: 6,
        name: "Sidney No. 1 Lake Park",
        description: "Sidney No. 1 Lake Park",
        index: 5,
    },
    {
        id: 7,
        name: "Sidney No. 1 Lake Park",
        description: "Sidney No. 1 Lake Park",
        index: 5,
    },
    {
        id: 8,
        name: "Sidney No. 1 Lake Park",
        description: "Sidney No. 1 Lake Park",
        index: 5,
    },
    {
        id: 9,
        name: "Sidney No. 1 Lake Park",
        description: "Sidney No. 1 Lake Park",
        index: 5,
    },
    {
        id: 10,
        name: "Sidney No. 1 Lake Park",
        description: "Sidney No. 1 Lake Park",
        index: 5,
    },
];

const MenuLinkType = () => {
    const onChange = (key: string | string[]) => {
        console.log(key);
    };
    const [itemSelected, setSelectItems] = useState<number[]>([]);
    const text = MENUS_DATA.map((item) => {
        const onSelectItem = (itemId: number) => {
            let items = [...itemSelected];
            if (itemSelected.includes(itemId)) {
                const indexItem = itemSelected.indexOf(itemId);
                items.splice(indexItem, 1);
            } else {
                items = [...items, itemId];
            }
            setSelectItems(() => [...items]);
        };
        return (
            <React.Fragment key={item.id}>
                <div className="items">
                    <p className="mb-3">
                        <Checkbox checked={isItemSelected(item.id, itemSelected)} onChange={() => onSelectItem(item.id)}>
                            {item.name}
                        </Checkbox>
                    </p>
                </div>
            </React.Fragment>
        );
    });

    const items: CollapseProps["items"] = [
        {
            key: "page",
            label: "Trang",
            children: (
                <div className="type-page">
                    <div className="items h-60 overflow-y-auto">{text}</div>
                    <div className="actions py-4 -ml-4 -mr-4 px-4">
                        <Button type="primary" size="small" ghost>
                            Thêm vào menu
                        </Button>
                    </div>
                </div>
            ),
        },
        {
            key: "category",
            label: "Danh mục bài viết",
            children: <div>{text}</div>,
        },
        {
            key: "post",
            label: "Bài viết",
            children: <div>{text}</div>,
        },
        {
            key: "custom",
            label: "Liên kết tự tạo",
            children: <div></div>,
        },
    ];
    return (
        <div className="col-left links-type w-80">
            <div className="box-title">
                <div className="py-2 mb-4">
                    <p className="font-bold">Loại liên kết</p>
                </div>
                <CollapseStyled
                    expandIconPosition="end"
                    expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                    items={items}
                    defaultActiveKey={["page"]}
                    onChange={onChange}
                />
            </div>
        </div>
    );
};
export default MenuLinkType;

const CollapseStyled = styled(Collapse)`
    && {
        border-radius: 0;
    }
    .ant-collapse-header-text {
        font-weight: bold;
    }
    .ant-collapse-item:last-child,
    .ant-collapse-item:last-child > .ant-collapse-header {
        border-radius: 0;
    }
    .ant-collapse-content > .ant-collapse-content-box {
        padding-bottom: 0;
    }
`;

const isItemSelected = (target: number, items: number[]) => {
    return items.includes(target);
};
