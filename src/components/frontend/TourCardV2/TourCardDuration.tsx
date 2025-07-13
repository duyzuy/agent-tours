"use client";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { stringToDate } from "@/utils/date";
import classNames from "classnames";
import { Space } from "antd";
import { IconCalendarRange, IconPlane } from "@/assets/icons";

export type TourCardDurationDaysProps = {
  className?: string;
  startDate: string | undefined;
  endDate: string | undefined;
  departLocation: string | undefined;
};

const TourCardDurationDays: React.FC<TourCardDurationDaysProps> = ({
  className = "",
  startDate,
  endDate,
  departLocation,
}) => {
  const t = useTranslations("String");

  const durationDays = useMemo(() => {
    if (!startDate || !endDate) return;
    return stringToDate(endDate)?.diff(stringToDate(startDate), "day");
  }, [startDate, endDate]);

  return (
    <div
      className={classNames("flex flex-wrap gap-x-3 gap-y-1", {
        [className]: className,
      })}
    >
      {departLocation ? (
        <Space>
          <IconPlane className="w-4 h-4" />
          <span className="leading-none text-[13px]">{departLocation}</span>
        </Space>
      ) : null}
      {durationDays ? (
        <Space>
          <IconCalendarRange className="w-4 h-4" />
          <span className="leading-none text-[13px]">
            {t("card.durationDayValues", { day: durationDays, night: durationDays - 1 })}
          </span>
        </Space>
      ) : null}
    </div>
  );
};
export default TourCardDurationDays;
