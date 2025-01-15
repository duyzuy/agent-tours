import React, { memo } from "react";
interface PolicyContentProps {
  className?: string;
}
const PolicyContent: React.FC<PolicyContentProps> = ({ className }) => {
  return (
    <div className="px-3 lg:px-6 py-3 bg-white rounded-md mb-6">
      <p>
        Quý khách vui lòng đọc kỹ và đồng thuận với các <span className="text-blue-600 underline">điều khoản</span>{" "}
        trước khi hoàn tất quy trình đặt chỗ và thanh toán trực tuyến.
      </p>
    </div>
  );
};
export default memo(PolicyContent);
