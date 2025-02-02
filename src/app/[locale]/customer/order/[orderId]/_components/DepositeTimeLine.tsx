import { PaymentStatus } from "@/models/common.interface";
import { IFeOrderDetail } from "@/models/fe/order.interface";
import { formatDate } from "@/utils/date";
import { moneyFormatVND } from "@/utils/helper";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { StepProps, Steps } from "antd";
import classNames from "classnames";
import React, { useMemo } from "react";

interface DepositeTimeLineProps {
  title?: string;
  items: IFeOrderDetail["rulesAndPolicies"]["depositTimelimits"];
  paymentStatus: PaymentStatus;
  className?: string;
}
const DepositeTimeLine: React.FC<DepositeTimeLineProps> = ({ items, paymentStatus, title, className = "" }) => {
  const currentStep = useMemo(() => {
    let current = 0;
    if (!items) return current;

    if (paymentStatus === PaymentStatus.PAID) {
      return items.length - 1;
    }
    const sortedItems = items.sort((a, b) => {
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    });
    for (const item in sortedItems) {
      current = Number(item);

      if (items[item].isExpired === false) {
        break;
      }
    }
    return current;
  }, [items]);

  return (
    <>
      <div
        className={classNames("deposite bg-slate-50 px-6 py-3 rounded-md mb-6", {
          [className]: className,
        })}
      >
        {title && <h3 className="font-[500] text-[16px] mb-3 lg:mb-6">{title}</h3>}
        <Steps
          status="process"
          current={currentStep}
          labelPlacement="vertical"
          size="small"
          items={items
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
                      <span className="text-emerald-600">Đã hoàn thành</span>
                    ) : (
                      <span>Chưa hoàn thành</span>
                    )}
                  </div>
                ),
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
    </>
  );
};

export default DepositeTimeLine;
