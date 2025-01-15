"use client";
import IconPaylater from "@/assets/icons/IconPaylater";
import IconCreditCard from "@/assets/icons/IconCreditCard";
import { Col, Radio, Row, Space } from "antd";
import { useState } from "react";
import classNames from "classnames";
import { IconCash } from "@/assets/icons";

const PaymentMethod = () => {
  const [paymentTab, setPaymentTab] = useState<"CASHCHECK" | "BANKTRANSFER" | "CASHCHECK2">("CASHCHECK");
  return (
    <div>
      <div className="payment__methods-head px-6 py-3">
        <span className="font-[500] text-base">Phương thức thanh toán</span>
      </div>
      <div className="px-6 pb-6">
        <PaymentMethodItem
          isActive={paymentTab === "CASHCHECK"}
          label="Thanh toán tại Anthai Travel"
          icon={<IconCash className="w-6 h-6" stroke="none" />}
          onClick={() => setPaymentTab("CASHCHECK")}
          bodyContent={
            <>
              <p className="mb-3">Quý khách vui lòng đến trụ sở chính của AnThai Travel để thực hiện thanh toán.</p>
              <div>Địa chỉ 1:</div>
              <ul>
                <li>TP.HCM Tầng 1, 82 Võ Văn Tần, Phường Võ Thị Sáu, Quận 3</li>
                <li className="text-blue-600">xem bản đồ</li>
              </ul>
              <div>Địa chỉ 2:</div>
              <ul>
                <li>Hà Nội Tầng 4, 9 Đào Duy Anh, Quận Đống Đa, Hà Nội</li>
                <li className="text-blue-600">xem bản đồ</li>
              </ul>
            </>
          }
        />
        <PaymentMethodItem
          isActive={paymentTab === "BANKTRANSFER"}
          label="Chuyển khoản thanh toán"
          icon={<IconPaylater className="w-6 h-6" stroke="none" />}
          onClick={() => setPaymentTab("BANKTRANSFER")}
          bodyContent={
            <>
              <p className="mb-3">
                Quý khách vui lòng thực hiện chuyển khoản với nội dung kèm họ, tên, mã đơn hàng, chúng tôi sẽ kiểm tra
                và tiến hành xác nhận đơn hàng sau khi nhận thành công.
              </p>
              <p className="text-primary-default font-[500] mb-3">Thông tin tài khoản:</p>
              <div className="grid grid-cols-2 gap-3">
                <ul className="list-disc pl-5">
                  <li>Công Ty TNHH Du Lịch ABC</li>
                  <li>Số tài khoản VND: 106 1060 8888 888</li>
                  <li>Ngân hàng Techcombank - Chi nhánh Tân Bình</li>
                </ul>
                <ul className="list-disc pl-5">
                  <li>Công Ty TNHH Du Lịch ABC</li>
                  <li>Số tài khoản VND: 007 100 888 8888</li>
                  <li>Ngân hàng Vietcombank Tp. Hồ Chí Minh</li>
                </ul>
              </div>
            </>
          }
        />
        <PaymentMethodItem
          isActive={paymentTab === "CASHCHECK2"}
          label="Thanh toán tại địa chỉ liên hệ"
          icon={<IconCreditCard className="w-6 h-6" stroke="none" />}
          onClick={() => setPaymentTab("CASHCHECK2")}
          bodyContent={
            <p className="font-[500]">Anthai Travel sẽ xác nhận và đến thu tiền trực tiếp tại địa chỉ của Quý khách.</p>
          }
        />
      </div>
    </div>
  );
};
export default PaymentMethod;

interface PaymentMethodItemProps {
  isActive?: boolean;
  onClick?: () => void;
  bodyContent: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  label?: string;
}
const PaymentMethodItem = ({
  isActive = false,
  onClick,
  bodyContent,
  className = "",
  icon,
  label,
}: PaymentMethodItemProps) => {
  return (
    <div className={classNames("method-item", { [className]: className })}>
      <div className="method-item__head py-3 flex items-center">
        <Radio checked={isActive} onChange={onClick} className="mr-0">
          <Space>
            <span className="block text-[16px] font-[500]">{label}</span>
            {icon}
          </Space>
        </Radio>
      </div>
      {isActive ? <div className="panel pl-8 bg-gray-100 p-6 rounded-xl">{bodyContent}</div> : null}
    </div>
  );
};
