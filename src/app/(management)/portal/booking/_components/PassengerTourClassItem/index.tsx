import React from "react";
import Quantity from "@/components/admin/Quantity";
import { PassengerType } from "@/models/common.interface";

export interface PassengerTourClassItemProps {
  channel: string;
  classChannel: string;
  open: number;
  onSelectPassenger: (type: PassengerType, value: number, action: "plus" | "minus") => void;
  adultPricing: string;
  childPricing: string;
  infantPricing: string;
  adultAmount: number;
  childAmount: number;
  infantAmount: number;
}
const PassengerTourClassItem: React.FC<PassengerTourClassItemProps> = ({
  adultAmount,
  childAmount,
  infantAmount,
  channel,
  classChannel,
  adultPricing,
  childPricing,
  infantPricing,
  open,
  onSelectPassenger,
}) => {
  return (
    <div className="tour__class-item border rounded-sm mb-4 drop-shadow-sm bg-white overflow-hidden">
      <div className="flex items-center">
        <div className="tour__item-info flex items-center pl-6 py-4 bg-slate-100 mr-6">
          <span className="tour__item-class w-16">
            <span className="block text-xs text-gray-600">Class</span>
            <span className="font-[500]">{classChannel}</span>
          </span>
          <span className="tour__item-class w-16">
            <span className="block text-xs text-gray-600">Đang còn</span>
            <span className="font-[500]">{open}</span>
          </span>
        </div>
        <div className="tour__item-passenger-types flex items-center">
          <div className="flex justify-between border-r mr-6 pr-6 w-64 items-center">
            <div className="tour__item-passenger-adult">
              <span className="font-[500] block leading-none">Người lớn</span>

              <span className="text-xs text-primary-default">{adultPricing}</span>
            </div>
            <div>
              {open !== 0 ? (
                <Quantity
                  size="sm"
                  value={adultAmount}
                  onChange={(action, value) => onSelectPassenger(PassengerType.ADULT, value, action)}
                />
              ) : (
                <span className="text-gray-600">Đã hết</span>
              )}
            </div>
          </div>
          <div className="flex justify-between border-r mr-6 pr-6 w-64 items-center">
            <div>
              <span className="font-[500] block leading-none">Trẻ em</span>
              <span className="text-primary-default text-xs">{childPricing}</span>
            </div>
            <div>
              {open !== 0 ? (
                <Quantity
                  size="sm"
                  value={childAmount}
                  onChange={(action, value) => onSelectPassenger(PassengerType.CHILD, value, action)}
                />
              ) : (
                <span className="text-gray-600">Đã hết</span>
              )}
            </div>
          </div>
          <div className="flex justify-between w-64 items-center">
            <div>
              <span className="font-[500] block leading-none">Em bé</span>
              <span className="text-xs text-primary-default">{infantPricing}</span>
            </div>
            <div>
              {open !== 0 ? (
                <Quantity
                  size="sm"
                  value={infantAmount}
                  onChange={(action, value) => onSelectPassenger(PassengerType.INFANT, value, action)}
                />
              ) : (
                <span className="text-gray-600">Đã hết</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PassengerTourClassItem;
