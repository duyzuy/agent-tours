import React, { useMemo } from "react";
import { Steps, StepProps, Tag } from "antd";
import { IDepositTimelimit } from "@/models/management/core/bookingTimeLimit.interface";
import { formatDate } from "@/utils/date";
import { moneyFormatVND } from "@/utils/helper";
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import { PaymentStatus } from "@/models/common.interface";
interface DepositTimelineProps {
  depositTimelimits?: IDepositTimelimit[];
  paymentStatus?: PaymentStatus;
}
const DepositTimeline: React.FC<DepositTimelineProps> = ({ depositTimelimits, paymentStatus }) => {
  const currentStep = useMemo(() => {
    let current = 0;
    if (!depositTimelimits) return current;

    if (paymentStatus === PaymentStatus.PAID) {
      return depositTimelimits.length - 1;
    }
    const depositTimelimitsSorted = depositTimelimits.sort((a, b) => {
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    });
    for (const timeline in depositTimelimitsSorted) {
      current = Number(timeline);
      if (depositTimelimits[timeline].isExpired === false) {
        break;
      }
    }
    return current;
  }, [depositTimelimits]);

  if (!depositTimelimits || !depositTimelimits.length) {
    return null;
  }
  return (
    <div className="mb-6">
      <div className="mb-3">
        <p className="font-[500] text-[16px]">Tiền Cọc và thanh toán theo giai đoạn</p>
      </div>
      <Steps
        status="process"
        current={currentStep}
        labelPlacement="vertical"
        size="small"
        items={depositTimelimits
          .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
          .map<StepProps>((item, _index) => {
            return {
              title: (
                <>
                  <span className="block">{`Đợt: ${_index + 1}`}</span>
                  <span>{`${moneyFormatVND(item.minimumAmount)}`}</span>
                  <span className="block text-xs">
                    {item.isCompleted ? (
                      <span className=" text-emerald-500">Đã thanh toán</span>
                    ) : (
                      <span>Chưa thanh toán</span>
                    )}
                  </span>
                </>
              ),
              subTitle: <span className="text-xs">{`${formatDate(item.deadline, "DD/MM/YYYY")}`}</span>,
              // description: item.isCompleted
              //     ? "Đã thanh toán"
              //     : "Chưa thanh toán",
              icon:
                item.isExpired && !item.isCompleted ? (
                  <CloseCircleOutlined />
                ) : (item.isExpired && item.isCompleted) || paymentStatus === PaymentStatus.PAID ? (
                  <CheckCircleOutlined />
                ) : _index === currentStep ? (
                  <LoadingOutlined />
                ) : (
                  <ClockCircleOutlined />
                ),
            };
          })}
      />
    </div>
  );
};
export default DepositTimeline;
