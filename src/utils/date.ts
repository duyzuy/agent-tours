import { format, compareAsc } from "date-fns";

export const formatDate = (d: Date | string, strFm = "dd/MM/yyyy - HH:mm") => {
  return format(new Date(d), strFm);
};

import { eachDayOfInterval, endOfWeek, startOfWeek, startOfToday } from "date-fns";
import dayjs from "dayjs";

export const getDayNameOfWeek = ({
  locale,
  dateFm = "EEEEEE",
  weekStartsOn = 0,
}: {
  locale: Locale;
  dateFm?: string;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}) => {
  const daysOfWeek = eachDayOfInterval({
    start: startOfWeek(startOfToday(), { weekStartsOn: weekStartsOn }),
    end: endOfWeek(startOfToday(), { weekStartsOn: weekStartsOn }),
  });

  let daysName: string[] = [];

  daysOfWeek.forEach((day) => {
    daysName.push(format(day, dateFm, { locale: locale }));
  });
  return daysName;
};

export const stringToDate = (dateTimeStr: string) => {
  const [dateStr, timeStr] = dateTimeStr.split(" ");

  const dStr = dateStr.slice(0, 2);
  const mStr = dateStr.slice(2, 5);
  const yStr = dateStr.slice(5);
  let newDateTimeStr = `${mStr}${dStr}${yStr}`;

  newDateTimeStr = newDateTimeStr.concat(" ", timeStr ?? "00:00");

  return dayjs(newDateTimeStr, "MMMDDYYYY HH:mm");
};
