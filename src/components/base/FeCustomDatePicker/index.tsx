import React, { useCallback, useEffect, useMemo, useState } from "react";
// import {
//   format,
//   endOfMonth,
//   endOfWeek,
//   startOfWeek,
//   getWeeksInMonth,
//   isSameMonth,
//   isBefore,
//   sub,
//   isSameDay,
//   isAfter,
//   startOfToday,
//   add,
//   eachDayOfInterval,
//   differenceInMonths,
//   startOfMonth,
//   startOfDay,
// } from "date-fns";
import dayjs from "dayjs";
import vi from "date-fns/locale/vi";
import en from "date-fns/locale/en-US";
import { NextCalendarButton, PrevCalendarButton, ButtonConfirm, ButtonReset } from "./ButtonActions";
import DayNameOfWeek from "./DaysNameOfWeek";
import styles from "./datepicker.module.scss";
import DateItem from "./DateItem";
import classNames from "classnames";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

const NUMBER_OF_WEEK = 7;
const DAYS_OF_WEEK = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

type OnUpdateCalendarType = (date: dayjs.Dayjs, updateCalendar: (date: dayjs.Dayjs | null) => void) => void;
export type FeCustomDatePickerProps = {
  lang?: "vi" | "en";
  numberOfMonth: number;
  onUpdateCalendar?: OnUpdateCalendarType;
  value?: dayjs.Dayjs;
  startDate?: dayjs.Dayjs;
  minDate?: dayjs.Dayjs;
  maxDate?: dayjs.Dayjs;
  onChange?: (value: dayjs.Dayjs | null, dateString: string) => void;
  onStartDate?: () => void;
  onEndDate?: () => void;
  layout?: "horizontal" | "vertical";
  disabledDate?: (date: dayjs.Dayjs) => boolean;
  className?: string;
  hideNextAndPrev?: boolean;
};
const FeCustomDatePicker: React.FC<FeCustomDatePickerProps> = ({
  hideNextAndPrev = false,
  numberOfMonth = 2,
  lang = "vi",
  onUpdateCalendar,
  onChange,
  startDate,
  minDate,
  maxDate,
  layout = "horizontal",
  disabledDate,
  value,
  className = "",
}) => {
  // let today = startOfToday();
  // let locale = lang === "vi" ? vi : en;

  const locale = lang === "vi" ? vi : en;
  const today = dayjs();

  const [datePicker, setDatePicker] = useState<{
    today: dayjs.Dayjs;
    value: FeCustomDatePickerProps["value"];
    minDate: FeCustomDatePickerProps["minDate"];
    maxDate: FeCustomDatePickerProps["maxDate"];
    monthsView: {
      month: dayjs.Dayjs;
      dates: (dayjs.Dayjs | null)[];
      totalWeeks: number;
      weeks: { week: number; dates: (dayjs.Dayjs | null)[] }[];
    }[];
    startDate: Required<FeCustomDatePickerProps>["startDate"];
  }>(() => {
    return {
      today: dayjs(),
      startDate: startDate || dayjs(),
      monthsView: [],
      minDate: minDate,
      maxDate: maxDate,
      value: value,
    };
  });

  const handleNextAndPrevMonth = (action: "next" | "prev") => {
    let newMonthUpdate = datePicker.startDate;

    if (datePicker.minDate !== null) {
      const isDifferenceMMonth = datePicker.startDate.isSame(datePicker.minDate, "month");

      if (action === "prev" && isDifferenceMMonth) return;
    }

    if (datePicker.maxDate && action === "next") {
      const differenceCurrentMonthFromToday = datePicker.startDate.diff(today, "month");

      const differenceMaxDateMonthFromToday = datePicker.maxDate.diff(today, "month");

      if (action === "next" && differenceCurrentMonthFromToday + numberOfMonth > differenceMaxDateMonthFromToday)
        return;
    }

    newMonthUpdate = action === "next" ? newMonthUpdate.add(1, "month") : newMonthUpdate.subtract(1, "month");
    const monthList = getMonthListFromCurentMonth(newMonthUpdate, numberOfMonth);

    setDatePicker((prev) => ({
      ...prev,
      startDate: newMonthUpdate,
      monthsView: [...monthList],
    }));
  };

  const handleSelectDate = (selectDate: dayjs.Dayjs | null) => {
    console.log(selectDate);
    if (onUpdateCalendar) {
      selectDate &&
        onUpdateCalendar(selectDate, (date) => {
          setDatePicker((prev) => ({
            ...prev,
            value: date ?? undefined,
          }));
        });
    } else {
      onChange
        ? onChange(selectDate, selectDate?.format("DD/MM/YYYY") || "")
        : setDatePicker((prev) => ({
            ...prev,
            value: selectDate ?? undefined,
          }));
    }
  };

  const hasSelecting = useCallback(
    (date: dayjs.Dayjs) => {
      return date.isSame(value);
    },
    [value],
  );

  const isDisableDate = useCallback(
    (compare: "min" | "max", date: dayjs.Dayjs) => {
      if (compare === "min") {
        if (!datePicker.minDate) return false;

        return date.isBefore(datePicker.minDate);
      }

      if (compare === "max") {
        if (!datePicker.maxDate) return false;

        return date.isAfter(datePicker.maxDate);
      }

      return false;
    },
    [disabledDate, datePicker.maxDate, datePicker.minDate, datePicker.value],
  );
  /**
   *
   * @param date
   * @param monthLength  how many months in view
   */
  const getMonthListFromCurentMonth = (date: dayjs.Dayjs, monthLength: number) => {
    let output: (typeof datePicker)["monthsView"] = [];
    Array.from({ length: monthLength }, (_, i) => {
      let _month = date.add(i, "month");

      const startDayOfMonth = _month.startOf("month").day();

      const datesInMonth = Array.from({ length: _month.daysInMonth() }, (v, d) => {
        return _month.startOf("month").add(d, "day");
      });

      const weeksInMonth = Math.ceil(_month.daysInMonth() / 7);

      let datesInWeekInMonth: { week: number; dates: (dayjs.Dayjs | null)[] }[] = [];

      /**
       * begin from 1 // MON
       * 0 is SUN
       */
      Array.from({ length: 5 }, (_, w) => {
        /**
         * First week of month
         */

        let datesInWeek: (dayjs.Dayjs | null)[] = [];
        if (w === 0) {
          /** get null for start of week */
          const dayOfset = startDayOfMonth === 0 ? NUMBER_OF_WEEK - 1 : startDayOfMonth - 1;
          datesInWeek = Array.from({ length: dayOfset }, (v, k) => {
            return null;
          });
          // 0,1,2,3,4,5,6
          // 6,0,1,2,3,4,5
          /**
           * get date for rest
           */
          datesInWeek = [...datesInWeek, ...[...datesInMonth].splice(0, NUMBER_OF_WEEK - dayOfset)];
        } else {
          const startPosition =
            startDayOfMonth !== 0
              ? NUMBER_OF_WEEK * (w - 1) + (NUMBER_OF_WEEK - startDayOfMonth + 1)
              : NUMBER_OF_WEEK * (w - 1) + 1;
          datesInWeek = [...datesInMonth].splice(startPosition, NUMBER_OF_WEEK);

          if (w === 4 && datesInWeek.length < 7) {
            const dateFaker = Array.from({ length: NUMBER_OF_WEEK - datesInWeek.length }, (v, k) => {
              return null;
            });
            datesInWeek = [...datesInWeek, ...dateFaker];
          }
        }

        datesInWeekInMonth[w] = { week: w + 1, dates: datesInWeek };
      });

      output = [
        ...output,
        {
          month: _month,
          dates: datesInMonth,
          weeks: datesInWeekInMonth,
          totalWeeks: weeksInMonth,
        },
      ];
    });
    // console.log(output);
    return output;
  };

  /**
   * init calendar
   */
  useEffect(() => {
    const months = getMonthListFromCurentMonth(startDate || dayjs(), numberOfMonth);

    setDatePicker((prev) => ({
      ...prev,
      monthsView: [...months],
      startDate: startDate || dayjs(),
      minDate: minDate,
      maxDate: maxDate,
    }));
  }, [numberOfMonth, startDate, minDate, maxDate]);

  console.log(datePicker);
  return (
    <div
      className={classNames(`${styles["datepicker-wraper"]} py-6 rounded-lg`, {
        [className]: className,
      })}
    >
      <div className="datepicker-container">
        <div className="datepicker-body relative">
          {hideNextAndPrev ? null : (
            <div className="calendar-actions">
              <PrevCalendarButton onClick={handleNextAndPrevMonth} />
              <NextCalendarButton onClick={handleNextAndPrevMonth} />
            </div>
          )}
          <div
            className={classNames("calendar-months", {
              [layout]: layout,
            })}
          >
            {datePicker.monthsView.map((dateRangeItem, monthIndx) => (
              <div className="calendar-month" key={`month-${monthIndx}`}>
                <div className="date-range-top">
                  <span className="calendar-month-name">
                    {dayjs(dateRangeItem.month).locale("vi").format("MMMM, YYYY")}
                  </span>
                </div>
                <div className="calendar-body">
                  <DayNameOfWeek locale={locale} />
                  {dateRangeItem.weeks.map((week, weekInd) => (
                    <ul className="calendar-days" key={`week-${weekInd}`}>
                      {week.dates.map((date, dateInd) =>
                        date !== null ? (
                          <DateItem
                            key={dayjs(date).format("YYYY-MM-DD")}
                            date={date}
                            isSelected={hasSelecting(date)}
                            isDisable={isDisableDate("min", date) || isDisableDate("max", date) || disabledDate?.(date)}
                            onClick={handleSelectDate}
                          />
                        ) : (
                          <li className="date invalid faker" key={`faker-${dateInd}`}>
                            <span className="date-item-inner faker"></span>
                          </li>
                        ),
                      )}
                    </ul>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default FeCustomDatePicker;
