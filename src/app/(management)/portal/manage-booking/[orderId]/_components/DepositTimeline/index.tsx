import React, { useMemo } from "react";
import { Steps, StepProps, Tag } from "antd";
import { IDepositTimelimit } from "@/models/management/core/bookingTimeLimit.interface";
import { formatDate } from "@/utils/date";
import { moneyFormatVND } from "@/utils/helper";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { PaymentStatus } from "@/models/common.interface";
import classNames from "classnames";
interface DepositTimelineProps {
  depositTimelimits?: IDepositTimelimit[];
  paymentStatus?: PaymentStatus;
  className?: string;
}
const DepositTimeline: React.FC<DepositTimelineProps> = ({ depositTimelimits, paymentStatus, className = "" }) => {
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
    <div
      className={classNames("deposit-timeline", {
        [className]: className,
      })}
    >
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
                  <div className="block">{`Đợt: ${_index + 1}`}</div>
                  <div>{formatDate(item.deadline, "DD/MM/YYYY")}</div>
                  <div>{`${moneyFormatVND(item.minimumAmount)}`}</div>
                </>
              ),
              subTitle: (
                <div className="text-xs pt-2">
                  {item.isCompleted ? (
                    <span className="text-emerald-600">Đã thanh toán</span>
                  ) : (
                    <span>Chưa thanh toán</span>
                  )}
                </div>
              ),
              //description: item.isCompleted ? "Đã thanh toán" : "Chưa thanh toán",
              icon:
                item.isExpired && !item.isCompleted ? (
                  <CloseCircleOutlined className="!text-red-600" />
                ) : item.isCompleted || paymentStatus === PaymentStatus.PAID ? (
                  <CheckCircleOutlined className="!text-emerald-600" />
                ) : _index === currentStep ? (
                  <ExclamationCircleOutlined className="!text-amber-600" />
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
