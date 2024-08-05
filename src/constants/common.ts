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
export const DATE_FORMATS = {
  "DD/MM/YYYY": "DD/MM/YYYY",
  DDMMMYYYY: "DDMMMYYYY",
};
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
export const TIME_SLOTS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
export const PASSENGER_AGES = {
  adult: { min: 12 },
  child: { min: 2, max: 11 },
  infant: { max: 2 },
};
export enum EPassengerTitle {
  MR = "mr",
  MISS = "miss",
  MRS = "mrs",
}

export enum EPassengerGender {
  FEMALE = "female",
  MALE = "male",
  UNISEX = "unisex",
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
export const PASSENGER_TITLES = [
  { label: "Ông", value: EPassengerTitle.MR },
  { label: "Bà", value: EPassengerTitle.MRS },
  { label: "Cô", value: EPassengerTitle.MISS },
];

export const PASSENGER_GENDER = [
  { label: "Nam", value: EPassengerGender.MALE },
  { label: "Nữ", value: EPassengerGender.FEMALE },
  { label: "Khác", value: EPassengerGender.OTHER },
  // { label: "Khác", value: EPassengerGender.UNISEX },
];

export const FE_PAGE_CONTENT_TYPE = ["page", "tour", "news", "information"];
