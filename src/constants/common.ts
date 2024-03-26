export enum LOCAL_STORAGE_KEY {
    AG_AUTH_TOKEN = "_ag_auth_token",
    LOGIN_USERNAME = "_login_username",
}
/**
 * Date format when create Stock, Sellable
 */
export const DATE_FORMAT = "DDMMMYYYY";
export const MONTH_FORMAT = "MMMYYYY";
export const TIME_FORMAT = "HH:mm";
export const DATE_TIME_FORMAT = "DDMMMYYYY HH:mm";
//  Monday Tuesday Wednesday Thursday Friday Saturday
export const DAYS_OF_WEEK = [
    { label: "CN", value: "Sunday" },
    { label: "T2", value: "Monday" },
    { label: "T3", value: "Tuesday" },
    { label: "T4", value: "Wednesday" },
    { label: "T5", value: "Thursday" },
    { label: "T6", value: "Friday" },
    { label: "T7", value: "Saturday" },
];

export enum EPassengerTitle {
    MR = "mr",
    MISS = "miss",
    MRS = "mrs",
}

export enum EPassengerGender {
    FEMALE = "female",
    MALE = "male",
    OTHER = "other",
}

export const getPassengerGender = (gender: EPassengerGender) => {
    if (gender === EPassengerGender.MALE) {
        return "Nam";
    }
    if (gender === EPassengerGender.FEMALE) {
        return "Nữ";
    }
    if (gender === EPassengerGender.OTHER) {
        return "Khác";
    }
    return "--";
};

export const getPassengerTitle = (title: EPassengerTitle) => {
    if (title === EPassengerTitle.MR) {
        return "Ông";
    }
    if (title === EPassengerTitle.MISS) {
        return "Bà";
    }
    if (title === EPassengerTitle.MRS) {
        return "Cô";
    }
    return "--";
};
