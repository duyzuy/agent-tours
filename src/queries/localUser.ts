import { useQuery } from "@tanstack/react-query";
import {
    GET_LOCAL_USER_PROFILE,
    GET_LOCAL_USER_ROLES,
    GET_LOCAL_USER_LIST,
} from "./var";
import { localAuthAPIs } from "@/services/management/localAuth.service";
import { localUserAPIs } from "@/services/management/localUser.service";
import { IRolesPermissionsRs } from "@/models/management/role.interface";
import { ILocalUserList } from "@/models/management/localUser.interface";
import { getAgToken } from "@/utils/common";

export const useLocalUserGetProfileQuery = () => {
    const token = getAgToken() || "";
    return useQuery({
        queryKey: [GET_LOCAL_USER_PROFILE],
        queryFn: () => localAuthAPIs.getProfile(token),
        select: (data) => {
            return data.result;
        },
        retry: false,
        enabled: Boolean(token),
    });
};

export const useLocalUserGetRolesQuery = () => {
    const token = getAgToken() || "";
    return useQuery<IRolesPermissionsRs, any>({
        queryKey: [GET_LOCAL_USER_ROLES],
        queryFn: () => localAuthAPIs.getRoles(token),
        enabled: Boolean(token),
    });
};

/**
 * get list users on local
 */

export const useGetLocalUserList = () => {
    return useQuery<ILocalUserList, Error>({
        queryKey: [GET_LOCAL_USER_LIST],
        queryFn: () => localUserAPIs.getUserList(),
    });
};
