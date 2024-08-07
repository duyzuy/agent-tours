"use client";
import styled from "styled-components";
import { Tabs, TabsProps } from "antd";

const CustomTabs: React.FC<TabsProps> = (props) => {
  return <StyledTabs {...props} />;
};
export default CustomTabs;

const StyledTabs = styled(Tabs)`
  .travel-tabs-tab-icon svg {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 8px;
  }
  &&&.travel-tabs .travel-tabs-tab-btn .travel-tabs-tab-icon:not(:last-child) {
    margin-inline-end: 0;
  }
`;
