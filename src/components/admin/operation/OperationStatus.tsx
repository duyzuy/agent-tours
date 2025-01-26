import { IOperationStatus } from "@/models/management/core/operation/operation.interface";
import { TagProps, Tag, Space } from "antd";

interface OperationStatusProps {
  status: IOperationStatus;
}
const OperationStatus: React.FC<OperationStatusProps> = ({ status }) => {
  const getOperationStatus = (status?: IOperationStatus) => {
    let color: TagProps["color"];
    color =
      status === "ACCEPTED"
        ? "cyan"
        : status === "CANCELED"
        ? "red"
        : status === "HANDOVERED"
        ? "magenta"
        : status === "DONE"
        ? "success"
        : status === "NEW"
        ? "blue"
        : status === "LOCKED"
        ? "default"
        : status === "PENDINGCANCELED"
        ? "gold"
        : "";

    let label: string;
    label =
      status === "ACCEPTED"
        ? "Đã chấp nhận"
        : status === "CANCELED"
        ? "Đã huỷ"
        : status === "HANDOVERED"
        ? "Đã bàn giao"
        : status === "DONE"
        ? "Đã hoàn thành"
        : status === "NEW"
        ? "Mới"
        : status === "LOCKED"
        ? "Đang khoá"
        : status === "PENDINGCANCELED"
        ? "Chờ huỷ"
        : "";
    return { label, color };
  };
  return (
    <Space>
      Trạng thái:
      <Tag color={getOperationStatus(status).color} bordered={false}>
        {getOperationStatus(status).label}
      </Tag>
    </Space>
  );
};
export default OperationStatus;
