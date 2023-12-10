import { format, compareAsc } from "date-fns";

export const formatDate = (d: Date, strFm = "HH:mm - MM/dd/yyyy") => {
    return format(new Date(d), strFm);
};
