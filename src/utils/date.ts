import { format } from "date-fns";
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

export const stringToDate = (dateTimeStr?: string) => {
  if (!dateTimeStr) return;
  const [dateStr, timeStr] = dateTimeStr.split(" ");
  const dayStr = dateStr.slice(0, 2);
  const monthStr = dateStr.slice(2, 5);
  const yearStr = dateStr.slice(5);
  const monthNumber = getMonthNumber(monthStr);

  let newDateTimeStr = `${monthNumber}/${dayStr}/${yearStr}`;
  newDateTimeStr = newDateTimeStr.concat(" ", timeStr ?? "00:00");

  return dayjs(newDateTimeStr, "MM/DD/YYYY HH:mm");
};

const getMonthNumber = (mStr: string) => {
  let mStrNum = "01";
  switch (mStr) {
    case "Jan":
      mStrNum = "01";
      break;
    case "Feb":
      mStrNum = "02";
      break;
    case "Mar":
      mStrNum = "03";
      break;
    case "Apr":
      mStrNum = "04";
      break;
    case "May":
      mStrNum = "05";
      break;
    case "Jun":
      mStrNum = "06";
      break;
    case "Jul":
      mStrNum = "07";
      break;
    case "Aug":
      mStrNum = "08";
      break;
    case "Sep":
      mStrNum = "09";
      break;
    case "Oct":
      mStrNum = "10";
      break;
    case "Nov":
      mStrNum = "11";
      break;
    case "Dec":
      mStrNum = "12";
      break;
  }
  return mStrNum;
};
export const formatDate = (date: Date | string, strFm = "DD/MM/YYYY - HH:mm") => {
  if (typeof date === "string") {
    return stringToDate(date)?.format(strFm);
  }
  return dayjs(new Date(date)).format(strFm);
};
