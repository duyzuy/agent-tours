import React, { memo } from "react";
import classNames from "classnames";
import { PaymentStatus } from "@/models/management/common.interface";
import { Tag } from "antd";

interface TourBookingInfoProps {
    name?: string;
    code?: string;
    startDate?: string;
    endDate?: string;
    className?: string;
    orderId?: number;
    paymentStatus?: PaymentStatus;
    sysFstUpdate?: string;
}
const TourBookingInfo: React.FC<TourBookingInfoProps> = ({
    className = "",
    name,
    endDate,
    startDate,
    code,
    orderId,
    sysFstUpdate,
    paymentStatus,
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
            <div className="w-40 border-r mr-6 pr-6">
                <span className="block">Tên</span>
                <span className="block text-[15px] font-[500] ">{name}</span>
            </div>
            <div className="border-r mr-6 pr-6 w-fit">
                <span className="block">Mã Tour</span>
                <span className="block text-[15px] font-[500] ">{code}</span>
            </div>
            <div className="mr-6">
                <span className="block">Ngày đi</span>
                <span className="block text-[15px] font-[500] ">
                    {startDate}
                </span>
            </div>
            <div className="mr-6 pr-6 w-fit">
                <span className="block">Ngày về</span>
                <span className="block text-[15px] font-[500] ">{endDate}</span>
            </div>
        </div>
    );
};
export default memo(TourBookingInfo);
