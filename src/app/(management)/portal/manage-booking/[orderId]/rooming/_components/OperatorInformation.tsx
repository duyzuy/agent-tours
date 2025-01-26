import { CheckCircleOutlined, WarningOutlined } from "@ant-design/icons";
import { Space } from "antd";
export interface OperatorInformationProps {
  hasOperator?: boolean;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
}
const OperatorInformation: React.FC<OperatorInformationProps> = ({ hasOperator, fullName, email, phoneNumber }) => {
  return (
    <div className="box-operation border rounded-md p-4 mb-6">
      <div className="mb-3 pb-3 border-b">
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
      </div>
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
    </div>
  );
};
export default OperatorInformation;
