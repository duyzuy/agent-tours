"use client";

import React, { memo } from "react";
import { getDay, format } from "date-fns";
import { getDayNameOfWeek } from "@/utils/date";
import classNames from "classnames";
const SingleDateItem: React.FC<{
  date: Date;
  locale: Locale;
  onClick?: (date: Date) => void;
  isSelected?: boolean;
  isDisabled?: boolean;
  width: number;
}> = ({
  date,
  locale,
  onClick,
  isSelected = false,
  isDisabled = false,
  width,
}) => {
  return (
    <li
      key={format(date, "mm-dd-yyyy")}
      className={classNames({
        "single-date-item block px-2 py-1 text-center relative rounded-md border cursor-pointertransition-colors":
          true,
        "is-selected bg-emerald-50 text-emerald-700 border-emerald-600":
          isSelected,
        " bg-white border-transparent hover:bg-gray-50": !isSelected,
        "disable opacity-50 pointer-events-none": isDisabled,
      })}
      style={{
        minWidth: width,
      }}
    >
      <div className="date-inner relative" style={{ lineHeight: 1.2 }}>
        <button
          type="button"
          onClick={() => {
            if (isDisabled) return;
            return onClick && onClick(date);
          }}
        >
          <span className="day block">
            {getDayNameOfWeek({ locale, dateFm: "EEEE" })[getDay(date)]}
          </span>
          <time
            className="date-month text-xs"
            dateTime={format(date, "yyyy-MM-dd")}
          >
            {format(date, "dd MMMM", { locale })}
          </time>
        </button>
      </div>
    </li>
  );
};
export default memo(SingleDateItem);
