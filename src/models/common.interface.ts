export interface BaseResponse<T> {
  body: string;
  status: "OK" | "XX" | "OX";
  message: string;
  jwt: string;
  pageCurrent: number;
  errorCode: string;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  result: T;
}
export interface SuccessResponse<T> {
  body: string;
  status: "OK";
  message: string;
  jwt: string;
  pageCurrent: number;
  errorCode: string;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  result: T;
}

export interface ErrorResponse {
  body: string;
  status: "XX";
  message: string;
  jwt: string;
  pageCurrent: number;
  errorCode: string;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  result: null;
}

export interface BaseQueryParams<T> {
  requestObject?: T;
  orderBy?: { sortColumn?: string; direction?: "asc" | "desc" };
  pageCurrent?: number;
  pageSize?: number;
}

export enum Status {
  QQ = "QQ", //pending
  OK = "OK", // active
  XX = "XX", // delete
  OX = "OX", // deactive
  EX = "EX", // expired
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

export enum PassengerType {
  ADULT = "adult",
  CHILD = "child",
  INFANT = "infant",
}

export enum PaymentStatus {
  PAID = "PAID",
  NOTPAID = "NOTPAID",
  DEPOSITED = "DEPOSITED",
}
