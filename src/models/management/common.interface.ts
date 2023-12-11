export interface BaseResponse<T> {
    body: string;
    status: "OK" | "XX" | "OX";
    message: string;
    jwt: string;
    result: T;
}
