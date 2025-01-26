import React from "react";
import classNames from "classnames";
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
    <div
      className={classNames("info border rounded-md p-4 w-full", {
        [className]: className,
      })}
    >
      <div className="box-head mb-3 pb-3 border-b">
        <h3 className="font-semibold text-lg">Người phụ trách</h3>
      </div>
      <div className="box-content">
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
      </div>
    </div>
  );
};
export default OperationPersonInformation;
