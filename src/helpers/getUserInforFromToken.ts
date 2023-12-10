import { getAgToken } from "@/utils/common";

const decode = (token: string) =>
    decodeURIComponent(
        atob(token.split(".")[1].replace("-", "+").replace("_", "/"))
            .split("")
            .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
            .join(""),
    );

export interface IUserInfo {
    Descriptions: string;
    Fullname: string;
    Password: string;
    RecId: number;
    Role: string;
    UserId: string;
    Username: string;
}

export interface ICurrentToken {
    CorePrivateKey: string;
    CoreToken: string;
    LocalPrivateKey: string;
    LocalToken: string;
    ValidateMessage: string;
}

export const getUserInfoFromToken = (): {
    LocalUser: IUserInfo;
    CoreUser: IUserInfo;
    CurrentToken: ICurrentToken;
} | null => {
    const token = getAgToken();

    if (!token) return null;

    const { exp, iat, nbf, result } = JSON.parse(decode(token));

    return JSON.parse(result);
};
