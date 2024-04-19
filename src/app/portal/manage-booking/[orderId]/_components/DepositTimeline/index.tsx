import React from "react";
import { Steps, StepProps } from "antd";
import { IDepositTimelimit } from "@/models/management/core/bookingTimeLimit.interface";
import { formatDate } from "@/utils/date";
import { moneyFormatVND } from "@/utils/helper";
interface DepositTimelineProps {
    depositTimelimits?: IDepositTimelimit[];
}
const DepositTimeline: React.FC<DepositTimelineProps> = ({
    depositTimelimits,
}) => {
    if (!depositTimelimits || !depositTimelimits.length) {
        return null;
    }
    return (
        <div className="mb-6">
            <div className="mb-3">
                <p className="font-[500] text-[16px]">
                    Tiền Cọc và thanh toán theo giai đoạn
                </p>
            </div>
            <Steps
                current={depositTimelimits.length}
                labelPlacement="vertical"
                size="small"
                items={depositTimelimits
                    .sort((a, b) => b.recId - a.recId)
                    .map<StepProps>((item, _index) => {
                        return {
                            title: `Đợt: ${_index + 1} - ${formatDate(
                                item.deadline,
                            )}`,
                            subTitle: `${moneyFormatVND(item.minimumAmount)}`,
                            description: item.isCompleted
                                ? "Đã thanh toán"
                                : "Chưa thanh toán",
                        };
                    })}
            />
        </div>
    );
};
export default DepositTimeline;
