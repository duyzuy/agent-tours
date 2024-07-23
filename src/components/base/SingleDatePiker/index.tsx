"use client";

import React, { useMemo, memo, useState, useRef, useEffect, useCallback } from "react";
import { add, startOfToday, format, getDay, sub, isSameDay, isBefore, isAfter, startOfDay } from "date-fns";
import useDetectWidth from "@/hooks/useDetectWidth";
import styles from "./date-single.module.scss";
import vi from "date-fns/locale/vi";
import DateSkeleton from "./DateSkeleton";
import SingleDateItem from "./SingleDateItem";
import classNames from "classnames";
// import useDeviceDetect from "@/hooks/useDeviceDetect";
enum BUTTON_ACTION {
  NEXT = "next",
  PREV = "prev",
}

const DATE_VIEWS = 7;
const DATE_VIEWS_TABLET = 5;
const DATE_VIEWS_MOBILE = 3;

interface Props {
  isSingle?: boolean;
  maxDate?: Date | null;
  minDate?: Date | null;
  selectedDate?: Date;
  isSlider?: boolean;
  locale?: Locale;
  dateViews?: {
    computer: number;
    tablet: number;
    mobile: number;
  };
}
const SingleDatePiker = ({
  isSingle,
  maxDate = add(new Date(), { days: 12 }),
  minDate = sub(new Date(), { days: 12 }),
  selectedDate = startOfToday(),
  isSlider,
  locale = vi,
  dateViews = {
    computer: 7,
    tablet: 5,
    mobile: 3,
  },
}: Props) => {
  const [dateSingleData, setSingleDateData] = useState<{
    maxDate: Date | null;
    minDate: Date | null;
    selectedDate: Date;
    numberViews: number;
    today: Date;
    dateItems: Date[];
  }>(() => {
    const prevDateBefore = Math.floor(DATE_VIEWS / 2);
    let initialselectedDate = selectedDate === null ? startOfToday() : selectedDate;

    initialselectedDate = sub(initialselectedDate, { days: prevDateBefore });
    const date = Array.from({ length: DATE_VIEWS }, (_, ind) => {
      const date = add(initialselectedDate, { days: ind });
      return date;
    });
    return {
      maxDate: null,
      minDate: null,
      selectedDate: selectedDate,
      numberViews: DATE_VIEWS,
      today: startOfToday(),
      dateItems: date,
    };
  });
  const [transitionX, setTransitionX] = useState<{
    width: number;
    action: BUTTON_ACTION | null;
  }>({ width: 0, action: null });

  const [isSliding, setSliding] = useState(false);
  const singleDateRef = useRef<HTMLDivElement>(null);

  const containerWidth = useDetectWidth(singleDateRef);
  // const device = useDeviceDetect();
  const handlePrevAndNextDate = useCallback(
    (action: BUTTON_ACTION) => {
      //get last of item in array

      if (isSliding) return;

      if (action === null) return;

      //init new Array items
      let newDateItems: Date[] = [];
      const currentDateItems = dateSingleData.dateItems;
      const lastItemDate = currentDateItems[currentDateItems.length - 1];
      const firstItemDate = currentDateItems[0];
      let allDates: Date[] = [];

      if (
        (minDate !== null && action === BUTTON_ACTION.PREV && isBefore(firstItemDate, minDate)) ||
        (minDate !== null && action === BUTTON_ACTION.PREV && isSameDay(firstItemDate, minDate))
      ) {
        return;
      }

      if (
        (maxDate !== null && action === BUTTON_ACTION.NEXT && isAfter(lastItemDate, maxDate)) ||
        (maxDate !== null && action === "next" && isSameDay(lastItemDate, maxDate))
      ) {
        return;
      }

      let widthTransitionX = 0;
      if (action === BUTTON_ACTION.NEXT) {
        Array.from({ length: dateSingleData.numberViews }, (_, indx) => {
          const date = add(lastItemDate, { days: indx + 1 });

          if (maxDate !== null) {
            isBefore(date, maxDate) && newDateItems.push(date);
          } else {
            newDateItems.push(date);
          }
        });

        allDates = [...currentDateItems, ...newDateItems];
        widthTransitionX = ((containerWidth - 60) / dateSingleData.numberViews) * newDateItems.length;
        if (newDateItems.length < dateSingleData.numberViews) {
          newDateItems = allDates.slice(-dateSingleData.numberViews);
        }
      }

      if (action === BUTTON_ACTION.PREV) {
        Array.from({ length: dateSingleData.numberViews }, (_, indx) => {
          const date = sub(firstItemDate, { days: indx + 1 });

          if (minDate !== null) {
            (isBefore(startOfDay(minDate), date) || isSameDay(startOfDay(minDate), date)) && newDateItems.push(date);
          } else {
            newDateItems.push(date);
          }
        });
        widthTransitionX = ((containerWidth - 60) / dateSingleData.numberViews) * newDateItems.length;
        allDates = [...newDateItems.reverse(), ...currentDateItems];

        if (newDateItems.length < dateSingleData.numberViews) {
          newDateItems = allDates.slice(0, dateSingleData.numberViews);
        }
      }
      setSliding(true);
      setSingleDateData((prev) => ({
        ...prev,
        dateItems: [...allDates],
      }));

      setTransitionX(() => {
        return {
          width: widthTransitionX,
          action,
        };
      });

      action === BUTTON_ACTION.PREV &&
        setTimeout(() => {
          setTransitionX({
            width: 0,
            action,
          });
        });

      setTimeout(() => {
        setSingleDateData((prev) => ({
          ...prev,
          dateItems: [...newDateItems],
        }));
        setTransitionX({
          width: 0,
          action: null,
        });
        setSliding(false);
      }, 700);
    },
    [dateSingleData.dateItems],
  );
  const handleSelectDate = useCallback((date: Date) => {
    setSingleDateData((prev) => ({
      ...prev,
      selectedDate: date,
    }));
  }, []);

  useEffect(() => {
    let dateView = DATE_VIEWS;

    // if (device.isTablet) {
    //   dateView = DATE_VIEWS_TABLET;
    // }
    // if (device.isMobile) {
    //   dateView = DATE_VIEWS_MOBILE;
    // }

    const prevDateBefore = Math.floor(dateView / 2);
    let initialselectedDate = selectedDate === null ? startOfToday() : selectedDate;

    initialselectedDate = sub(initialselectedDate, { days: prevDateBefore });

    const date = Array.from({ length: dateView }, (_, ind) => {
      const date = add(initialselectedDate, { days: ind });
      return date;
    });

    setSingleDateData((prev) => ({
      ...prev,
      dateItems: date,
      numberViews: dateView,
    }));
  }, []);
  return (
    <div className={`${styles.wrapper} date-single`} ref={singleDateRef}>
      {(containerWidth === 0 && <DateSkeleton />) || (
        <div className="date-container relative shadow-sm bg-white rounded-sm flex items-center">
          <SingleDatePiker.ButtonPrev onClick={handlePrevAndNextDate} />
          <div className="date-single-wrapper py-2 overflow-hidden flex-1">
            <ul
              className={classNames({
                "date-items flex flex-nowrap whitespace-nowrap w-full": true,
                "transition-transform duration-700":
                  (transitionX.width !== 0 && transitionX.action === BUTTON_ACTION.NEXT) ||
                  (transitionX.width === 0 && transitionX.action === BUTTON_ACTION.PREV),
              })}
              style={{
                transform: `translateX(${-transitionX.width}px)`,
              }}
            >
              {dateSingleData.dateItems.map((date, index) => (
                <SingleDateItem
                  key={format(date, "yyyy-MM-dd")}
                  date={date}
                  isSelected={isSameDay(dateSingleData.selectedDate, date)}
                  isDisabled={isBefore(date, startOfToday())}
                  width={(containerWidth - 60) / dateSingleData.numberViews}
                  onClick={handleSelectDate}
                  locale={locale}
                />
              ))}
            </ul>
          </div>
          <SingleDatePiker.ButtonNext onClick={handlePrevAndNextDate} />
        </div>
      )}
    </div>
  );
};
export default memo(SingleDatePiker);

interface IButtonAction {
  onClick: (action: BUTTON_ACTION) => void;
}

SingleDatePiker.ButtonNext = function SingleDatePikerButtonNext({ onClick }: IButtonAction) {
  return (
    <button
      type="button"
      className="next single-date-btn cursor-pointer hover:bg-emerald-500 rounded-tl-full rounded-bl-full hover:text-white transition-colors bg-slate-100"
      onClick={() => onClick(BUTTON_ACTION.NEXT)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </button>
  );
};

SingleDatePiker.ButtonPrev = function SingleDatePikerButtonPrev({ onClick }: IButtonAction) {
  return (
    <button
      type="button"
      className="prev single-date-btn cursor-pointer hover:bg-emerald-500 rounded-tr-full rounded-br-full hover:text-white transition-colors bg-slate-100"
      onClick={() => onClick(BUTTON_ACTION.PREV)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </button>
  );
};
