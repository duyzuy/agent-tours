import React from "react";
import classNames from "classnames";
import { Card, Divider } from "antd";
interface OperationPersonInformationProps {
  fullName: string;
  email: string;
  phoneNumber: string;
  className?: string;
}
const OperationPersonInformation: React.FC<OperationPersonInformationProps> = ({
  fullName,
  email,
  phoneNumber,
  className = "",
}) => {
  return (
    <Card
      size="small"
      className={classNames("person-information", {
        [className]: className,
      })}
    >
      <h3 className="text-[16px]">Người phụ trách</h3>
      <Divider style={{ margin: "12px 0" }} />
      <div>
        <span className="w-28 inline-block">Họ và tên</span>
        <span>{fullName}</span>
      </div>
      <div>
        <span className="w-28 inline-block">Email</span>
        <span>{email}</span>
      </div>
      <div>
        <span className="w-28 inline-block">Điện thoại</span>
        <span>{phoneNumber}</span>
      </div>
    </Card>
  );
};
export default OperationPersonInformation;
