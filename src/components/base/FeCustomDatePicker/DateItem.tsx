"use client";
import React, { memo, useMemo } from "react";
import classNames from "classnames";
import { convertSolar2Lunar } from "@/utils/convertSolartoLunarYear";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
dayjs.extend(isToday);

const DateItem: React.FC<{
  date: dayjs.Dayjs | null;
  isDisable?: boolean;
  isSelected?: boolean;
  isInRange?: boolean;
  onClick?: (date: dayjs.Dayjs | null) => void;
  isNotSameMonth?: boolean;
}> = ({ date, isDisable = false, isSelected = false, onClick, isInRange = false, isNotSameMonth = false }) => {
  const lunaDate = useMemo(() => {
    const [day, month, year] = convertSolar2Lunar(
      Number(dayjs(date).format("D")),
      Number(dayjs(date).format("MM")),
      Number(dayjs(date).format("YYYY")),
      7.0,
    );

    return day === 1 ? `${day}/${month}` : day;
  }, [date]);

  return (
    <li
      className={classNames("date relative", {
        "last-day-of-week": dayjs(date).day() === 0,
        "start-of-week": dayjs(date).day() === 1,
        weekend: dayjs(date).day() === 0,
        "is-today": dayjs(date).isToday(),
        "other-month": isNotSameMonth,
        disable: isDisable,
        "is-selected start": isSelected,
        "in-date-range": isInRange,
      })}
      key={dayjs(date).format("yyyy-MM-dd")}
      onClick={() => (isDisable ? undefined : onClick?.(date))}
    >
      {date ? (
        <>
          <span className="date-item-inner">
            <time dateTime={dayjs(date).format("yyyy-MM-dd")} className="date-item__value relative z-20">
              {dayjs(date).format("D")}
            </time>
          </span>
          <span className="luna-date text-xs text-gray-500 block text-center top-[2px] right-[2px] luna-date z-20">
            {lunaDate}
          </span>
        </>
      ) : null}
    </li>
  );
};
export default memo(DateItem);
