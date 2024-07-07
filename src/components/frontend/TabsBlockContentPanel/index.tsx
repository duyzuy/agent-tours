"use client";
import CustomTabs from "@/components/frontend/CustomTabs";
import BlockPanels from "./BlockPanels";
import { TabsProps } from "antd";
interface TabsBlockContentPanelProps {
  items: {
    tabName?: string;
    tabKey?: string;
    content?: string;
    panelItems: { content: string; key: string; name: string }[];
  }[];
}
const TabsBlockContentPanel: React.FC<TabsBlockContentPanelProps> = ({ items }) => {
  const tabPanels = items.reduce<TabsProps["items"]>((acc, item) => {
    return [
      ...(acc || []),
      {
        label: item.tabName || "",
        key: item.tabKey || "",
        icon: null,
        children: <BlockPanels descriptions={item?.content} items={item.panelItems ?? []} />,
      },
    ];
  }, []);

  return <CustomTabs defaultActiveKey="tourInformation" tabBarGutter={60} items={tabPanels} />;
};
export default TabsBlockContentPanel;
