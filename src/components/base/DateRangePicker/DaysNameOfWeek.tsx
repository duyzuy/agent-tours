"use client";
import classNames from "classnames";
import {
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  startOfToday,
  format,
  lastDayOfWeek,
  isSameDay,
} from "date-fns";

const DayNameOfWeek: React.FC<{ locale: Locale }> = ({ locale }) => {
  const daysOfWeek = eachDayOfInterval({
    start: startOfWeek(startOfToday(), { weekStartsOn: 1 }),
    end: endOfWeek(startOfToday(), { weekStartsOn: 1 }),
  });
  return (
    <>
      <ul className="calendar-weeks-name">
        {daysOfWeek.map((day) => (
          <li
            className={classNames({
              "day-name": true,
              "last-of-week": isSameDay(
                lastDayOfWeek(day, { weekStartsOn: 1 }),
                day
              ),
            })}
            key={format(day, "yyyy-MM-dd")}
          >
            <span>{format(day, "EEEEEE", { locale: locale })}</span>
          </li>
        ))}
      </ul>
    </>
  );
};
export default DayNameOfWeek;
