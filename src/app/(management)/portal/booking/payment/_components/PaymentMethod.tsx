import React, { memo } from "react";
import { Divider } from "antd";
import IconPaylater from "@/assets/icons/IconPaylater";
import IconCreditCard from "@/assets/icons/IconCreditCard";

const PaymentMethods = () => {
  return (
    <div className="payment__methods bg-white drop-shadow-sm mb-6 rounded-md">
      <div className="payment__methods-head pt-6 px-6">
        <div>
          <span className="font-[500] text-lg">Phương thức thanh toán</span>
        </div>
      </div>
      <Divider />
      <div className="payment__methods-body px-6 pb-6">
        <div className="flex items-center gap-4">
          <div className="method-item border w-1/4 text-center px-3 py-3 rounded-md bg-slate-50 border-primary-default drop-shadow-sm">
            <div className="method-item-inner">
              <div className="icon mx-auto mb-2 inline-block">
                <IconPaylater width={36} height={36} stroke="none" />
              </div>
              <div>
                <span className="block">Thanh toán sau</span>
              </div>
            </div>
          </div>
          <div className="method-item border w-1/4 text-center px-3 py-3 rounded-md drop-shadow-sm">
            <div className="method-item-inner">
              <div className="icon mx-auto mb-2 inline-block">
                <IconCreditCard width={36} height={36} stroke="none" />
              </div>
              <div>
                <span className="block">Visa/master</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(PaymentMethods);
