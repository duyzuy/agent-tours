import { Button, Space } from "antd";
import { EditOutlined, LeftOutlined, PlusOutlined } from "@ant-design/icons";
import classnames from "classnames";
import { useThemeMode } from "@/context";
interface Props {
  modelName?: string;
  hideAddButton?: boolean;
  onClickAdd?: () => void;
  onEdit?: () => void;
  title?: string;
  between?: boolean;
  className?: string;
  onCanel?: () => void;
  onBack?: () => void;
}
const TitleRow: React.FC<Props> = ({
  title,
  modelName,
  hideAddButton,
  onClickAdd,
  onEdit,
  between = false,
  className = "",
  onCanel,
  onBack,
}) => {
  const [mode, _] = useThemeMode();
  return (
    <Space
      className={classnames("w-full", {
        "justify-between": between,
        [className]: className,
      })}
    >
      <div className="title flex items-center">
        {onBack && (
          <Button
            type="text"
            size="small"
            icon={<LeftOutlined className="!text-xs" />}
            onClick={onBack}
            className={`mr-2 ${mode === "light" ? "text-gray-900 !bg-gray-100" : "!text-gray-400 !bg-gray-800"}`}
          />
        )}
        <div className={`font-semibold text-lg ${mode === "light" ? "text-gray-900" : "text-gray-300"}`}>{title}</div>
      </div>
      {!hideAddButton && (
        <Button type="primary" size="small" ghost icon={<PlusOutlined />} onClick={onClickAdd}>
          {`Thêm ${modelName}`}
        </Button>
      )}
      {onEdit && (
        <Button type="primary" size="small" ghost icon={<EditOutlined />} onClick={onEdit}>
          {`Sửa ${modelName}`}
        </Button>
      )}
    </Space>
  );
};

export default TitleRow;
