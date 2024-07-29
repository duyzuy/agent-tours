"use client";
import classNames from "classnames";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import "dayjs/locale/vi";
dayjs.extend(updateLocale);

dayjs.updateLocale("vi", {
  weekdays: ["CN", "Thu 2", "Thu 3", "Thu 4", "Thu 5", "Thu 6", "Thu 7"],
});

const DayNameOfWeek: React.FC<{ locale?: "vi" | "en" }> = ({ locale = "vi" }) => {
  /**
   * First of week (Mon) start with index is 1
   */
  const daysName = Array.from({ length: 7 }, (v, k) => {
    return dayjs()
      .day(k + 1)
      .locale(locale)
      .format("ddd");
  });

  return (
    <ul className="calendar-weeks-name">
      {daysName.map((dayName, _index) => (
        <li
          className={classNames({
            "day-name": true,
            "last-of-week": _index === 6,
          })}
          key={_index}
        >
          <span className="calendar-weeks-name-inner">{dayName}</span>
        </li>
      ))}
    </ul>
  );
};
export default DayNameOfWeek;
