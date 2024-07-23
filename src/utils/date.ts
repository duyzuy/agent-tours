import { format, compareAsc } from "date-fns";

export const formatDate = (d: Date | string, strFm = "dd/MM/yyyy - HH:mm") => {
  return format(new Date(d), strFm);
};

import { eachDayOfInterval, endOfWeek, startOfWeek, startOfToday } from "date-fns";

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
