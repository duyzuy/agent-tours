import { Button, Space } from "antd";
import { LeftOutlined, PlusOutlined } from "@ant-design/icons";
import classnames from "classnames";
import styled from "styled-components";
interface Props {
    modelName?: string;
    hideAddButton?: boolean;
    onClickAdd?: () => any;
    title?: string;
    between?: boolean;
    className?: string;
    onCanel?: () => void;
}
const TitleRow: React.FC<Props> = ({
    title,
    modelName,
    hideAddButton,
    onClickAdd,
    between = false,
    className = "",
    onCanel,
}) => {
    return (
        <Space
            className={classnames("w-full", {
                "justify-between": between,
                [className]: className,
            })}
        >
            <div className="title flex items-center">
                {onCanel && (
                    <CancelButton
                        type="default"
                        size="small"
                        className="mr-2"
                        icon={<LeftOutlined />}
                        onClick={onCanel}
                    />
                )}
                <p className="font-semibold text-lg">{title}</p>
            </div>
            {!hideAddButton && (
                <Button
                    type="primary"
                    size="small"
                    ghost
                    icon={<PlusOutlined />}
                    onClick={onClickAdd}
                >
                    {`Thêm ${modelName}`}
                </Button>
            )}
        </Space>
    );
};

export default TitleRow;

const CancelButton = styled(Button)`
    && {
        border: none;
        box-shadow: none;
        font-size: 12px;
    }
    svg {
        font-size: 12px;
    }
    &&:hover {
        background-color: #f1f1f1;
    }
`;
