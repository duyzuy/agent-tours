import { client } from "../api";
import { ILocalUserProfileRs } from "@/Model/Management/localAuth.interface";
export const localAuthAPIs = {
    getRoles: async <T>(token: string) => {
        return await client.post<T, any>("local/CurrentUser_getRoles", {
            headers: {
                Authorization: `Bearer ${encodeURIComponent(token)}`,
            },
        });
    },
    getProfile: async (token: string) => {
        return await client.post<ILocalUserProfileRs, any>(
            "local/getLocalProfile",
            {
                headers: {
                    Authorization: `Bearer ${encodeURIComponent(token)}`,
                },
            },
        );
    },
};
