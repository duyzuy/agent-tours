import { format, compareAsc } from "date-fns";

export const formatDate = (d: Date | string, strFm = "MM/dd/yyyy - HH:mm") => {
    return format(new Date(d), strFm);
};
