import { getAgToken } from "@/utils/common";
import { client } from "../api";
import {
    ILocalUserChangePasswordPayLoad,
    ILocalUserList,
    ILocalUserPayload,
} from "@/model/LocalUser.interface";
export const localUserAPIs = {
    getUserList: async <T>() => {
        const token = getAgToken() || "";
        return await client.post<ILocalUserList, any>("local/LocalUserList", {
            headers: {
                Authorization: `Bearer ${encodeURIComponent(token)}`,
            },
        });
    },
    createLocalUser: async <T>(payload: ILocalUserPayload) => {
        const token = getAgToken() || "";
        return await client.post<T, any>("local/LocalUser_Addnew", {
            headers: {
                Authorization: `Bearer ${encodeURIComponent(token)}`,
            },
            params: {
                requestObject: { ...payload },
            },
        });
    },
    updateLocalUser: async <T>(recId: number, payload: ILocalUserPayload) => {
        const token = getAgToken() || "";
        return await client.post<T, any>("local/LocalUser_Edit", {
            headers: {
                Authorization: `Bearer ${encodeURIComponent(token)}`,
            },
            params: {
                requestObject: { recId, ...payload },
            },
        });
    },
    updateStatusLocalUser: async <T>(
        recId: number,
        payload: ILocalUserPayload["status"],
    ) => {
        const token = getAgToken() || "";
        return await client.post<T, any>("local/LocalUser_Edit", {
            headers: {
                Authorization: `Bearer ${encodeURIComponent(token)}`,
            },
            params: {
                requestObject: { recId, status: payload },
            },
        });
    },
    changePassword: async <T>(payload: ILocalUserChangePasswordPayLoad) => {
        const token = getAgToken() || "";
        return await client.post<T, any>("local/LocalUser_SetnewPassword", {
            headers: {
                Authorization: `Bearer ${encodeURIComponent(token)}`,
            },
            params: {
                requestObject: { ...payload },
            },
        });
    },
};
