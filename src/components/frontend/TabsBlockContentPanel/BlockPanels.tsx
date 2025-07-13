"use client";
import CustomCollapse from "@/components/frontend/CustomCollapse";
import { CollapseProps } from "antd";
import AreaContentHtml from "../AreaContentHtml";

export interface BlockPanelsProps {
  items?: { key: string; name: string; content: string }[];
  descriptions?: string;
}
const BlockPanels: React.FC<BlockPanelsProps> = ({ items = [], descriptions }) => {
  const panelItems = items.reduce<CollapseProps["items"]>(
    (acc, item) => [
      ...(acc || []),
      {
        label: item.name,
        key: item.key,
        children: <div className="panel-content" dangerouslySetInnerHTML={{ __html: item.content }}></div>,
      },
    ],
    [],
  );
  return (
    <div className="panel-wrappers">
      {descriptions ? <AreaContentHtml className="descriptions" content={descriptions} /> : null}
      {items.length ? <CustomCollapse defaultActiveKey={["1", "2"]} ghost bordered={false} items={panelItems} /> : null}
    </div>
  );
};
export default BlockPanels;
