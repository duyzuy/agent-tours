"use client";
import styled from "styled-components";
import { Tabs, TabsProps } from "antd";

const CustomTabs: React.FC<TabsProps> = (props) => {
  return <StyledTabs {...props} />;
};
export default CustomTabs;

const StyledTabs = styled(Tabs)`
  &&&.travel-tabs {
    .travel-tabs-nav {
      padding-left: 10px;
      padding-right: 10px;
      border-radius: 8px;
      background-color: #e8f1ff;
      overflow: hidden;
    }
  }
  .travel-tabs-tab-icon svg {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 6px;
  }
  &&&.travel-tabs .travel-tabs-tab-btn .travel-tabs-tab-icon:not(:last-child) {
    margin-inline-end: 0;
  }
`;
