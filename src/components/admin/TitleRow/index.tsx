import { Button, Space } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useThemeMode } from "@/context";
import classnames from "classnames";
interface Props {
  title?: string;
  between?: boolean;
  className?: string;
  onBack?: () => void;
  actions?: React.ReactNode;
}
const TitleRow: React.FC<Props> = ({ title, actions, between = false, className = "", onBack }) => {
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
            className={classnames("mr-2", {
              "text-gray-900 !bg-gray-100": mode === "light",
              "text-gray-400 !bg-gray-800": mode !== "light",
            })}
          />
        )}
        <div
          className={classnames("font-semibold text-lg", {
            "text-gray-900": mode === "light",
            "text-gray-300": mode !== "light",
          })}
        >
          {title}
        </div>
      </div>
      {actions}
    </Space>
  );
};

export default TitleRow;
