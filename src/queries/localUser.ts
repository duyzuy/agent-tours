import { useQuery } from "@tanstack/react-query";
import { GET_LOCAL_USER_PROFILE, GET_LOCAL_USER_ROLES, GET_LOCAL_USER_LIST, GET_LOCAL_AGENT_LIST } from "./var";
import { localAuthAPIs } from "@/services/management/localAuth";
import { localUserAPIs } from "@/services/management/localUser";
import { ELocalUserType } from "@/models/management/localUser.interface";
import { isUndefined } from "lodash";

export const useLocalUserGetProfileQuery = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: [GET_LOCAL_USER_PROFILE],
    queryFn: () => localAuthAPIs.getProfile(),
    select: (data) => {
      return data.result;
    },
    retry: false,
    enabled: isUndefined(options) || isUndefined(options?.enabled) ? true : options.enabled,
  });
};

export const useLocalUserGetRolesQuery = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: [GET_LOCAL_USER_ROLES],
    queryFn: () => localAuthAPIs.getRoles(),
    select(data) {
      return data.result;
    },
    enabled: isUndefined(options) || isUndefined(options?.enabled) ? true : options.enabled,
  });
};

/**
 * get list users on local
 */

export const useGetLocalUserList = (options?: { userTypeList?: ELocalUserType[] }) => {
  return useQuery({
    queryKey: [GET_LOCAL_USER_LIST],
    queryFn: () => localUserAPIs.getUserList(options?.userTypeList),
    select(data) {
      return data.result;
    },
  });
};

export const useGetUserAgentList = () => {
  return useQuery({
    queryKey: [GET_LOCAL_AGENT_LIST],
    queryFn: () => localUserAPIs.getAgentList(),
    select(data) {
      return data.result;
    },
  });
};
