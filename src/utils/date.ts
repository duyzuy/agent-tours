import { format, compareAsc } from "date-fns";

export const formatDate = (d: Date | string, strFm = "dd/MM/yyyy - HH:mm") => {
    return format(new Date(d), strFm);
};
