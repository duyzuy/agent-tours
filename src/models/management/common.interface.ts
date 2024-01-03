export interface BaseResponse<T> {
    body: string;
    status: "OK" | "XX" | "OX";
    message: string;
    jwt: string;
    result: T;
}

export enum Status {
    QQ = "QQ", //pending
    OK = "OK", // active
    XX = "XX", // delete
    OX = "OX", // deactive
}
