import { client } from "@/services/api";
import { getAgToken } from "@/utils/common";
export const productAPIs = {
    login: async <T>(userId: string, username: string, password: string) => {
        return await client.post<T, any>("local/getLocalLoginToken", {
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
