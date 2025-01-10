import React from "react";
import Quantity, { QuantityProps } from "@/components/admin/Quantity";
import { PassengerType } from "@/models/common.interface";
import classNames from "classnames";

export interface PassengerTourClassItemProps {
  channel: string;
  classChannel: string;
  open: number;
  sold: number;
  onSelectPassenger: (type: PassengerType, value: number, action: "plus" | "minus") => void;
  adultPricing: string;
  childPricing: string;
  infantPricing: string;
  adultAmount: number;
  childAmount: number;
  infantAmount: number;
  variant?: "horizontal" | "vertical";
}
const PassengerTourClassItem = ({
  adultAmount,
  childAmount,
  infantAmount,
  channel,
  classChannel,
  adultPricing,
  childPricing,
  infantPricing,
  open,
  sold,
  onSelectPassenger,
  variant = "horizontal",
}: PassengerTourClassItemProps) => {
  return (
    <div className="tour__class-item border rounded-md mb-4 bg-white overflow-hidden">
      <div
        className={classNames("flex gap-6", {
          "flex-row items-center": variant === "horizontal",
          "flex-col": variant === "vertical",
        })}
      >
        <div className="tour__item-info flex items-center gap-3 pl-6 py-4 bg-slate-100">
          <span className="tour__item-class w-16">
            <span className="block text-xs text-gray-600">Class</span>
            <span className="font-[500]">{classChannel}</span>
          </span>
          <span className="tour__item-class w-16">
            <span className="block text-xs text-gray-600">Đang còn</span>
            <span className="font-[500]">{open}</span>
          </span>
          <span className="tour__item-class w-16">
            <span className="block text-xs text-gray-600">Đã bán</span>
            <span className="font-[500]">{sold}</span>
          </span>
        </div>
        <div
          className={classNames("tour__item-passenger-types flex", {
            "flex-row items-center gap-6": variant === "horizontal",
            "flex-col gap-3 px-6 pb-6": variant === "vertical",
          })}
        >
          <PassengerTourClassItem.Pax
            pricing={adultPricing}
            title="Người lớn"
            isOutOfOpenAmount={open === 0}
            onQuantity={onSelectPassenger}
            paxType={PassengerType.ADULT}
            quantity={adultAmount}
          />
          {variant === "horizontal" ? <span className="w-[1px] block bg-gray-200 h-8 mx-2"></span> : null}
          <PassengerTourClassItem.Pax
            pricing={childPricing}
            title="Trẻ em"
            isOutOfOpenAmount={open === 0}
            onQuantity={onSelectPassenger}
            paxType={PassengerType.CHILD}
            quantity={childAmount}
          />
          {variant === "horizontal" ? <span className="w-[1px] block bg-gray-200 h-8 mx-2"></span> : null}
          <PassengerTourClassItem.Pax
            pricing={infantPricing}
            title="Em bé"
            isOutOfOpenAmount={open === 0}
            onQuantity={onSelectPassenger}
            paxType={PassengerType.INFANT}
            quantity={infantAmount}
          />
        </div>
      </div>
    </div>
  );
};
export default PassengerTourClassItem;

interface PassengerTourClassItemPaxProps {
  title: string;
  pricing: string;
  paxType: PassengerType;
  onQuantity: (type: PassengerType, value: number, action: "minus" | "plus") => void;
  quantity: number;
  isOutOfOpenAmount?: boolean;
  className?: string;
}
PassengerTourClassItem.Pax = function PassengerTourClassItemPax({
  title,
  pricing,
  quantity,
  isOutOfOpenAmount,
  paxType,
  onQuantity,
  className = "",
}: PassengerTourClassItemPaxProps) {
  return (
    <div
      className={classNames("flex justify-between items-center gap-6", {
        [className]: className,
      })}
    >
      <div>
        <span className="font-[500] block leading-none">{title}</span>
        <span className="text-primary-default text-xs">{pricing}</span>
      </div>
      <div>
        {isOutOfOpenAmount ? (
          <span className="text-gray-600">Đã hết</span>
        ) : (
          <Quantity size="sm" value={quantity} onChange={(action, value) => onQuantity(paxType, value, action)} />
        )}
      </div>
    </div>
  );
};
