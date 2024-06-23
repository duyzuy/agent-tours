export const parseJWT = <T>(token: string) => {
    return JSON.parse(
        Buffer.from(token.split(".")[1], "base64").toString(),
    ) as T;
};
