"use client";
import { useTranslations } from "next-intl";
import { TourCardCompound } from ".";
import { useTourCardContext } from "./TourCard.context";
import { useMemo } from "react";
import { stringToDate } from "@/utils/date";
import classNames from "classnames";
import { Space } from "antd";
import { IconCalendarRange, IconPlane } from "@/assets/icons";
const TourCardDurationDays: TourCardCompound["Days"] = ({ className = "" }) => {
  const { startDate, endDate, departLocation } = useTourCardContext();
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
          {departLocation}
        </Space>
      ) : null}
      {durationDays ? (
        <Space>
          <IconCalendarRange className="w-4 h-4" />
          {t("card.durationDayValues", { day: durationDays, night: durationDays - 1 })}
        </Space>
      ) : null}
    </div>
  );
};
export default TourCardDurationDays;
