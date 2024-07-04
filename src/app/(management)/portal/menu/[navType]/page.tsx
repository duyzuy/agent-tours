"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import { CaretDownOutlined } from "@ant-design/icons";
import { Button, Empty, Form, Input } from "antd";
import { MENU_TYPES } from "@/constants/menu.constant";
import classNames from "classnames";
import TextArea from "antd/es/input/TextArea";
import MenuManageList from "@/components/admin/menu/MenuManageList";
const MENUS_DATA = [
    {
        key: 1,
        name: "John Brown",
        description: "New York No. 1 Lake Park",
        index: 0,
        parent: 0,
    },
    {
        key: 2,
        name: "Jim Green",
        description: "London No. 1 Lake Park",
        index: 1,
        parent: 0,
    },
    {
        key: 3,
        name: "Joe Black",
        description: "Sidney No. 1 Lake Park",
        index: 2,
        parent: 0,
    },
    {
        key: 4,
        name: "4New York No. 1 Lake Park",
        description: "New York No. 1 Lake Park",
        index: 3,
        parent: 0,
    },
    {
        key: 5,
        name: "5London No. 1 Lake Park",
        description: "London No. 1 Lake Park",
        index: 4,
        parent: 0,
    },
    {
        key: 6,
        name: "Sidney No. 1 Lake Park Sidney No. 1 Lake Park Sidney No. 1 Lake Park",
        description: "Sidney No. 1 Lake Park",
        index: 5,
        parent: 0,
    },
];

interface Props {
    params: { navType: string };
}
const MenuPageType = ({ params }: Props) => {
    const isValidNavType = useMemo(() => {
        let isValid = false;
        MENU_TYPES.forEach((item) => {
            if (item.key === params.navType) {
                isValid = true;
            }
        });
        return isValid;
    }, []);
    if (!isValidNavType) {
        return null;
    }

    return (
        <React.Fragment>
            <div className="py-2 mb-4">
                <p className="font-bold">Cấu trúc menu</p>
            </div>
            <div className="menu-items border">
                <div>
                    <div className="menu-types px-4 py-4 flex-1 bg-gray-50">
                        <div className="menu-type mb-4">
                            <p className="font-semibold">Loại menu</p>
                            <p className="text-xs text-gray-600">Vị trí hiển thị menu ngoài giao diện</p>
                        </div>
                        <div className="menu-type-list flex items-center gap-x-1">
                            {MENU_TYPES.map((type) => (
                                <div
                                    className={classNames("px-4 py-1 border bg-white", {
                                        "border-primary-default": type.key === params.navType,
                                    })}
                                    key={type.key}
                                >
                                    <Link href={`/portal/menu/${type.key}`}>{type.name}</Link>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="menu-items-container py-4 px-4">
                        <p className="font-bold py-3 mb-2">Danh sách menu Header</p>
                        <div className="menu-items mb-6">
                            {MENUS_DATA ? <MenuManageList menuItems={MENUS_DATA} /> : <Empty className="text-center" description={<span>Chưa có menu nào.</span>} />}
                        </div>
                        <div className="footer pt-4 border-t">
                            <Button type="primary" htmlType="button" className="bg-primary-default" onClick={() => {}}>
                                Lưu menu
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
export default MenuPageType;
