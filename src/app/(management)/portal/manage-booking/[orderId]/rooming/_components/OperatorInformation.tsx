import { CheckCircleOutlined, WarningOutlined } from "@ant-design/icons";
import { Card, Divider, Space } from "antd";
export interface OperatorInformationProps {
  hasOperator?: boolean;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
}
const OperatorInformation: React.FC<OperatorInformationProps> = ({ hasOperator, fullName, email, phoneNumber }) => {
  return (
    <Card size="small">
      <h3 className="font-semibold">
        {hasOperator ? (
          <Space>
            <CheckCircleOutlined color="green" className="!text-emerald-600" />
            Thông tin điều hành
          </Space>
        ) : (
          <Space>
            <WarningOutlined color="red" className="!text-amber-600" />
            Chờ phân công điều hành
          </Space>
        )}
      </h3>
      <Divider style={{ margin: "12px 0" }} />
      <div className="flex flex-col gap-3">
        <div className="flex">
          <div className="w-[100px]">Họ tên</div>
          <span>: {fullName || "--"}</span>
        </div>
        <div className="flex">
          <div className="w-[100px]">Email</div>
          <span>: {email || "--"}</span>
        </div>
        <div className="flex">
          <div className="w-[100px]">Số điện thoại</div>
          <span>: {phoneNumber || "--"}</span>
        </div>
      </div>
    </Card>
  );
};
export default OperatorInformation;
