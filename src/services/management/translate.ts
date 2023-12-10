import { client } from "../api";
export const agAuthApis = {
    login: async <T>(userId: string, username: string, password: string) => {
        return await client.post<T, any>("local/CmsLabel", {
            params: {
                requestObject: {
                    localUser: {
                        userId,
                        username,
                        password,
                    },
                },
            },
        });
    },
};
