import styled from "styled-components";
import { Collapse, CollapseProps } from "antd";
import React from "react";
import { DownCircleOutlined } from "@ant-design/icons";

interface CustomCollapseProps extends CollapseProps {}
const CustomCollapse: React.FC<CollapseProps> = (props) => {
    const expandIcon: CollapseProps["expandIcon"] = ({ isActive }) => (
        <span className="text-primary-default">
            <DownCircleOutlined
                rotate={isActive ? -180 : 0}
                style={{ fontSize: 18 }}
                className="text-primary-default fill-primary-default stroke-primary-default"
            />
        </span>
    );

    return (
        <StyledCollapse
            {...props}
            expandIcon={expandIcon}
            expandIconPosition="end"
        />
    );
};
export default CustomCollapse;

const StyledCollapse = styled(Collapse)`
    .travel-collapse-content-box {
        margin-left: 24px;
    }
    .travel-collapse-header {
        position: relative;
    }
    .travel-collapse-item {
        position: relative;
    }
    .travel-collapse-item:before {
        content: "";
        display: block;
        width: 1px;
        background-color: #d3d3d3;
        left: 8px;
        top: 60px;
        bottom: 0;
        position: absolute;
    }
    .travel-collapse-header:after {
        content: "";
        display: block;
        width: 16px;
        height: 16px;
        background: #db2728;
        border-radius: 16px;
        position: absolute;
        left: 0;
        top: calc(50% - 8px);
    }
    .travel-collapse-header:before {
        content: "";
        display: block;
        height: 1px;
        right: 40px;
        left: 80px;
        background: #d3d3d3;
        position: absolute;
        top: calc(50% - 0.5px);
    }
    .travel-collapse-header-text {
        padding-left: 16px;
        font-size: 16px;
        font-weight: bold;
        color: #db2728;
        display: inline-block;
        background-color: #fff;
        max-width: fit-content;
        position: relative;
        z-index: 2;
        padding-right: 10px;
    }
`;
