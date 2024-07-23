import React, { useCallback, useMemo, useState } from "react";
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
import styles from "./dateRange.module.scss";
import DateItem from "./DateItem";
import classNames from "classnames";

const NUMBER_OF_WEEK = 7;
const DAYS_OF_WEEK = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export type OnUpdateCalendarType = (
  date: dayjs.Dayjs,
  updateCalendar: ({ key, date }: { key: "start" | "end"; date: dayjs.Dayjs | null }) => void,
) => void;
type DatePickerProps = {
  lang?: "vi" | "en";
  numberOfMonth: number;
  onUpdateCalendar?: OnUpdateCalendarType;
  startOfDate?: dayjs.Dayjs;
  endOfDate?: dayjs.Dayjs;
  currentDate?: dayjs.Dayjs;
  minDate?: dayjs.Dayjs;
  maxDate?: dayjs.Dayjs;
  onReset?: () => void;
  onConfirm?: () => void;
  onStartDate?: () => void;
  onEndDate?: () => void;
  dateRangeType?: "single" | "range";
  layout?: "horizontal" | "vertical";
  disabledDate?: (date: dayjs.Dayjs) => boolean;
};
const DateRangPicker: React.FC<DatePickerProps> = ({
  numberOfMonth = 2,
  lang = "vi",
  onUpdateCalendar,
  endOfDate = null,
  startOfDate = null,
  onReset,
  onConfirm,
  minDate = null,
  maxDate = null,
  dateRangeType = "range",
  layout = "horizontal",
  disabledDate,
}) => {
  // let today = startOfToday();
  // let locale = lang === "vi" ? vi : en;

  const locale = lang === "vi" ? vi : en;
  const today = dayjs();

  const [calendarInfor, setCalendarInfor] = useState<{
    today: dayjs.Dayjs;
    numberMonthViews: number;
    selecting: {
      start: typeof endOfDate;
      end: typeof startOfDate;
    };
    minDate: typeof minDate;
    maxDate: typeof maxDate;
    dateRangeType: typeof dateRangeType;
    currentMonth: dayjs.Dayjs;
  }>(() => {
    return {
      today: dayjs(),
      currentMonth: (startOfDate !== null && dayjs(startOfDate).startOf("months")) || dayjs().startOf("months"),
      numberMonthViews: numberOfMonth,
      minDate: (minDate && minDate) || null,
      maxDate: (maxDate && maxDate) || null,
      dateRangeType: dateRangeType,
      selecting: {
        start: (startOfDate && startOfDate) || null,
        end: (endOfDate && endOfDate) || null,
      },
    };
  });

  const getWeeksInDatesArr = (start: number, dates: dayjs.Dayjs[]) => {
    return dates.slice().splice(start, NUMBER_OF_WEEK);
  };
  const calendars = useMemo(() => {
    let output: {
      month: dayjs.Dayjs;
      dates: (dayjs.Dayjs | null)[];
      totalWeeks: number;
      weeks: { week: number; dates: (dayjs.Dayjs | null)[] }[];
    }[] = [];

    Array.from({ length: calendarInfor.numberMonthViews }, (_, i) => {
      let _month = dayjs(calendarInfor.currentMonth).add(i, "month");

      const startDayOfMonth = _month.startOf("day").day();

      const datesInMonth = Array.from({ length: dayjs(_month).daysInMonth() }, (v, k) => {
        return dayjs(_month).add(k, "day");
      });

      const weeksInMonth = Math.ceil(dayjs(_month).daysInMonth() / 7);

      let datesInWeekInMonth: { week: number; dates: (dayjs.Dayjs | null)[] }[] = [];

      /**
       * begin from 1 // MON
       * 0 is SUN
       */
      Array.from({ length: weeksInMonth }, (_, w) => {
        /**
         * First week of month
         */

        let datesInWeek: (dayjs.Dayjs | null)[] = [];
        if (w === 0) {
          /** get null for start of week */
          const length = startDayOfMonth === 0 ? NUMBER_OF_WEEK - 1 : startDayOfMonth - 1;
          datesInWeek = Array.from({ length: length }, (v, k) => {
            return null;
          });
          // 0,1,2,3,4,5,6
          // 6,0,1,2,3,4,5
          /**
           * get date for rest
           */
          datesInWeek = [...datesInWeek, ...[...datesInMonth].splice(0, NUMBER_OF_WEEK - length)];
        } else {
          const startPosition = NUMBER_OF_WEEK * (w - 1) + (NUMBER_OF_WEEK - startDayOfMonth + 1);
          datesInWeek = [...datesInMonth].splice(startPosition, NUMBER_OF_WEEK);
        }

        datesInWeekInMonth[w] = { week: w + 1, dates: datesInWeek };
      });

      // if (weeksInMonth < 6) {
      //   datesInWeekInMonth[6] = {
      //     week: 6,
      //     dates: [null, null, null, null, null, null],
      //   };
      // }
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

    return output;
  }, [calendarInfor.numberMonthViews, calendarInfor.currentMonth]);
  console.log(calendars);

  const onNextAndPrevByMonth = (action: "next" | "prev") => {
    let newMonthUpdate = calendarInfor.currentMonth;

    if (calendarInfor.minDate !== null) {
      const isDifferenceMMonth = calendarInfor.currentMonth.isSame(calendarInfor.minDate, "month");

      if (action === "prev" && isDifferenceMMonth) return;
    }

    // if (calendarInfor.maxDate !== null) {
    //   const differenceCurrentMonthFromToday = calendarInfor.currentMonth.isSame(today, 'month');

    //   const differenceMaxDateMonthFromToday = calendarInfor.maxDate.isSame(today, 'month')

    //   if (
    //     action === "next" &&
    //     differenceCurrentMonthFromToday + calendarInfor.numberMonthViews > differenceMaxDateMonthFromToday
    //   )
    //     return;
    // }

    newMonthUpdate = action === "next" ? newMonthUpdate.add(1, "month") : newMonthUpdate.subtract(1, "month");

    setCalendarInfor((prev) => ({
      ...prev,
      currentMonth: newMonthUpdate,
    }));
  };

  // const handleSelectDate = (selectedDate: Date) => {
  //   if (onUpdateCalendar) {
  //     if (calendarInfor.maxDate !== null && isAfter(selectedDate, endOfMonth(calendarInfor.maxDate))) {
  //       console.warn(`date update is larger than maxDate`);
  //       return;
  //     }

  //     if (calendarInfor.minDate !== null && isBefore(selectedDate, calendarInfor.minDate)) {
  //       console.warn(`date update is less than minDate`);

  //       return;
  //     }

  //     onUpdateCalendar(selectedDate, ({ key, date }) => {
  //       if (dateRangeType === "single" && key === "end") {
  //         console.warn(`key only accept start with dateType single`);
  //         return;
  //       }
  //       return setCalendarInfor((prev) => ({
  //         ...prev,
  //         selecting: {
  //           ...prev.selecting,
  //           [key]: date,
  //         },
  //       }));
  //     });
  //   } else {
  //     let startDate: Date | null = calendarInfor.selecting.start;
  //     let endDate: Date | null = calendarInfor.selecting.end;

  //     if (calendarInfor.minDate !== null && isBefore(selectedDate, startOfDay(calendarInfor.minDate))) {
  //       return;
  //     }
  //     if (calendarInfor.selecting.start === null) {
  //       startDate = selectedDate;
  //     }
  //     if (calendarInfor.selecting.start !== null && calendarInfor.selecting.end === null) {
  //       if (isBefore(selectedDate, startOfDay(calendarInfor.selecting.start))) {
  //         startDate = selectedDate;
  //       } else {
  //         endDate = selectedDate;
  //       }
  //     }

  //     if (calendarInfor.selecting.start !== null && calendarInfor.selecting.end !== null) {
  //       startDate = selectedDate;
  //       endDate = null;
  //     }

  //     setCalendarInfor((prev) => ({
  //       ...prev,
  //       selecting: {
  //         start: startDate,
  //         end: endDate,
  //       },
  //     }));
  //   }
  // };
  // const isSelected = useCallback(
  //   (date: Date, compare: "startDate" | "endDate") => {
  //     if (compare === "startDate") {
  //       if (calendarInfor.selecting.start === null) {
  //         return false;
  //       }
  //       return isSameDay(calendarInfor.selecting.start, date);
  //     }

  //     if (dateRangeType === "single") return false;

  //     if (compare === "endDate") {
  //       if (calendarInfor.selecting.end === null) {
  //         return false;
  //       }
  //       return isSameDay(calendarInfor.selecting.end, date);
  //     }
  //     return false;
  //   },
  //   [calendarInfor.selecting, dateRangeType],
  // );
  // const isInRangeDate = useCallback(
  //   (date: Date) => {
  //     if (dateRangeType === "single") return false;
  //     if (calendarInfor.selecting.start === null || calendarInfor.selecting.end === null) {
  //       return false;
  //     }
  //     const output = isBefore(date, calendarInfor.selecting.end) && isAfter(date, calendarInfor.selecting.start);

  //     return output;
  //   },
  //   [calendarInfor.selecting, dateRangeType],
  // );
  // const onResetDate = () => {
  //   onReset && onReset();

  //   setCalendarInfor((prev) => ({
  //     ...prev,
  //     selecting: {
  //       start: null,
  //       end: null,
  //     },
  //   }));
  // };
  const isDisableDate = useCallback(
    (compare: "min" | "max", date: dayjs.Dayjs) => {
      if (compare === "min") {
        if (calendarInfor.minDate === null) return false;

        return date.isAfter(calendarInfor.minDate);
      }

      if (compare === "max") {
        if (calendarInfor.maxDate === null) return false;

        return date.isBefore(calendarInfor.maxDate);
      }

      return false;
    },
    [disabledDate, calendarInfor],
  );

  return (
    <div className={styles.dateRangeWrapper + " date-range-picker"}>
      <div className="date-range-container">
        <div className="date-rang-head"></div>
        <div className="date-rang-body relative">
          <div className="calendar-actions">
            <PrevCalendarButton onClick={onNextAndPrevByMonth} />
            <NextCalendarButton onClick={onNextAndPrevByMonth} />
          </div>
          <div
            className={classNames("calendar-months", {
              [layout]: layout,
            })}
          >
            {calendars.map((dateRangeItem, monthIndx) => (
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
                      {week.dates.map(
                        (date, dateInd) =>
                          (date !== null && (
                            <DateItem
                              key={dayjs(date).format("YYYY-MM-DD")}
                              date={date}
                              //isSelectedEnd={isSelected(date, "endDate")}
                              // isSelectedStart={isSelected(date, "startDate")}
                              // isNotSameMonth={!isSameMonth(date, dateRangeItem.month)}
                              isDisable={
                                isDisableDate("min", date) || isDisableDate("max", date) || disabledDate?.(date)
                              }
                              // isInRange={isInRangeDate(date)}
                              // onClick={handleSelectDate}
                            />
                          )) || <li className="date invalid faker" key={`faker-${dateInd}`}></li>,
                      )}
                    </ul>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="calendar-bottom">
          <ButtonReset
            // onClick={onResetDate}
            isDisable={calendarInfor.selecting.start === null || calendarInfor.selecting.end === null}
          />
          <ButtonConfirm
            onClick={onConfirm}
            isDisable={calendarInfor.selecting.start === null || calendarInfor.selecting.end === null}
          />
        </div>
      </div>
    </div>
  );
};
export default DateRangPicker;
