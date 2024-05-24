import React, { memo } from "react";
import classNames from "classnames";
import { PaymentStatus } from "@/models/management/common.interface";
import { Tag } from "antd";
import { isEmpty } from "lodash";

interface OrderInformationProps {
    name?: string;
    code?: string;
    className?: string;
    orderId?: number;
    paymentStatus?: PaymentStatus;
    sysFstUpdate?: string;
    referenceId?: string;
}
const OrderInformation: React.FC<OrderInformationProps> = ({
    className = "",
    name,
    code,
    orderId,
    sysFstUpdate,
    paymentStatus,
    referenceId,
}) => {
    return (
        <div
            className={classNames(
                "flex items-center bg-white border border-slate-100 px-6 py-4 rounded-md flex-wrap gap-y-4",
                {
                    [className]: className,
                },
            )}
        >
            <div className="w-20 border-r mr-6 pr-6">
                <span className="block">ID</span>
                <span className="block text-[15px] font-[500] ">{`#${orderId}`}</span>
            </div>
            {name ? (
                <div className="w-40 border-r mr-6 pr-6">
                    <span className="block">Tên</span>
                    <span className="block text-[15px] font-[500] ">
                        {name}
                    </span>
                </div>
            ) : null}
            {code ? (
                <div className="border-r mr-6 pr-6 w-fit">
                    <span className="block">Mã Tour</span>
                    <span className="block text-[15px] font-[500] ">
                        {code}
                    </span>
                </div>
            ) : null}

            <div className="border-r mr-6 pr-6 w-fit">
                <span className="block">Ngày đặt</span>
                <span className="block text-[15px] font-[500] ">
                    {sysFstUpdate}
                </span>
            </div>
            <div className="border-r mr-6 pr-6 w-fit">
                <span className="block">Mã giới thiệu</span>
                <span className="block text-[15px] font-[500] ">
                    {referenceId && isEmpty(referenceId) ? referenceId : "--"}
                </span>
            </div>
            <div className="">
                <span className="block">Trạng thái</span>
                <span className="block text-[15px] font-[500] ">
                    {(paymentStatus === PaymentStatus.PAID && (
                        <Tag color="green">Đã thanh toán</Tag>
                    )) ||
                        (paymentStatus === PaymentStatus.DEPOSITED && (
                            <Tag color="blue">Thanh toán 1 phần</Tag>
                        )) || <Tag color="red">Chưa thanh toán</Tag>}
                </span>
            </div>
        </div>
    );
};
export default memo(OrderInformation);
