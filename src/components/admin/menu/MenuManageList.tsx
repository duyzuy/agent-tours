import React from "react";
import { Form, Input, Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import { CaretDownOutlined } from "@ant-design/icons";
import MenuItem from "./MenuItem";

interface Props {
    menuItems: { key: number; name: string; description: string; index: number; parent: number }[];
}
const MenuManageList: React.FC<Props> = ({ menuItems }) => {
    return (
        <React.Fragment>
            {menuItems.map((item) => (
                <MenuItem key={item.key} name={item.name} />
            ))}
        </React.Fragment>
    );
};
export default MenuManageList;
