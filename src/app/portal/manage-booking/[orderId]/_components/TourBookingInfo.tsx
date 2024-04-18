import React, { memo } from "react";
import classNames from "classnames";

interface TourBookingInfoProps {
    name?: string;
    code?: string;
    startDate?: string;
    endDate?: string;
    className?: string;
}
const TourBookingInfo: React.FC<TourBookingInfoProps> = ({
    className = "",
    name,
    endDate,
    startDate,
    code,
}) => {
    return (
        <div
            className={classNames(
                "flex items-center bg-slate-50 px-6 py-4 rounded-md drop-shadow-sm",
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
            <div className="">
                <span className="block">Ngày về</span>
                <span className="block text-[15px] font-[500] ">{endDate}</span>
            </div>
        </div>
    );
};
export default memo(TourBookingInfo);
