import React from "react";
import { Button } from "antd";
import classNames from "classnames";
import { BookingDetailSSRItemType } from "../../page";
import { moneyFormatVND } from "@/utils/helper";

export interface BookingSSRItemprops {
  data?: BookingDetailSSRItemType;
  isRemoved?: boolean;
  className?: string;
  onAdd?: (data?: BookingDetailSSRItemType) => void;
}

const BookingSSRItem: React.FC<BookingSSRItemprops> = ({ data, isRemoved = false, onAdd, className = "" }) => {
  return (
    <div className={classNames("flex justify-between border p-3 shadow-sm rounded-md", { [className]: className })}>
      <div className="flex">
        <div className="w-16">
          <span className="block text-xs text-gray-500">Class</span>
          <span>{data?.config.class}</span>
        </div>
        <div className="w-20">
          <span className="block text-xs">Số lượng</span>
          <span className="text-primary-default">1</span>
        </div>
        <div>
          <span className="block text-xs">Giá tiền</span>
          <span className="text-primary-default">
            {data?.config[data.type] ? moneyFormatVND(data?.config[data.type]) : "--"}
          </span>
        </div>
      </div>
      <Button size="small" type="primary" danger={isRemoved ? false : true} ghost onClick={() => onAdd?.(data)}>
        {isRemoved ? "Hoàn tác" : "Huỷ"}
      </Button>
    </div>
  );
};
export default BookingSSRItem;
