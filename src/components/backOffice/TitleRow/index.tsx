import { Button, Space } from "@/components/base";
import { PlusOutlined } from "@ant-design/icons";

interface Props {
    modelName?: string;
    hideAddButton?: boolean;
    onClickAdd?: () => any;
    title?: string;
    between?: boolean;
}
const TitleRow: React.FC<Props> = ({ title, modelName, hideAddButton, onClickAdd }) => {
    return (
        <Space className={"w-full justify-between"}>
            <div className="title font-semibold text-lg">{title}</div>
            {!hideAddButton && (
                <Space>
                    <Button type="primary" icon={<PlusOutlined />} onClick={onClickAdd}>
                        {`Thêm ${modelName}`}
                    </Button>
                </Space>
            )}
        </Space>
    );
};

export default TitleRow;

// const StyledButton = styled(Button)`
//     && {
//         padding-top: 6px;
//         padding-bottom: 6px;
//         height: auto;
//     }
// `;
