export interface BaseResponse<T> {
    body: string;
    status: "OK" | "XX" | "OX";
    message: string;
    jwt: string;
    pageCurrent: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
    result: T;
}

export enum Status {
    QQ = "QQ", //pending
    OK = "OK", // active
    XX = "XX", // delete
    OX = "OX", // deactive
}
export enum DayOfWeek {
    Sunday = "Sunday",
    Monday = "Monday",
    Tuesday = "Tuesday",
    Wednesday = "Wednesday",
    Thursday = "Thursday",
    Friday = "Friday",
    Saturday = "Saturday",
}
