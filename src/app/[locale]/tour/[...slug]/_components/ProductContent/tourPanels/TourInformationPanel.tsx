import CustomCollapse from "@/components/frontend/CustomCollapse";
import { CollapseProps } from "antd";
import { isEmpty } from "lodash";

interface TourInformationPanelProps {
    items: { key: string; name: string; content: string }[];
    descriptions?: string;
}
const TourInformationPanel: React.FC<TourInformationPanelProps> = ({
    items = [],
    descriptions,
}) => {
    const panelItems = items.reduce<CollapseProps["items"]>(
        (acc, item) => [
            ...(acc || []),
            {
                label: item.name,
                key: item.key,
                children: (
                    <div
                        className="panel-content"
                        dangerouslySetInnerHTML={{ __html: item.content }}
                    ></div>
                ),
            },
        ],
        [],
    );
    return (
        <div className="panel-wrappers">
            {descriptions && !isEmpty(descriptions) ? (
                <div
                    className="descriptions py-4"
                    dangerouslySetInnerHTML={{ __html: descriptions }}
                ></div>
            ) : null}
            <div className="block-content">
                <CustomCollapse
                    defaultActiveKey={["1", "2"]}
                    ghost
                    bordered={false}
                    items={panelItems}
                />
            </div>
        </div>
    );
};
export default TourInformationPanel;
