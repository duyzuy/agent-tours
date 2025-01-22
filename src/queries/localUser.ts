import { useQuery } from "@tanstack/react-query";
import { GET_LOCAL_USER_LIST, GET_LOCAL_AGENT_LIST } from "./var";
import { localUserAPIs } from "@/services/management/localUser";
import { ELocalUserType } from "@/models/management/localUser.interface";

export const useGetLocalUserList = (options?: { userTypeList?: ELocalUserType[] }) => {
  return useQuery({
    queryKey: [GET_LOCAL_USER_LIST],
    queryFn: () => localUserAPIs.getUserList(options?.userTypeList),
    select: (data) => data.result,
  });
};

export const useGetUserAgentList = () => {
  return useQuery({
    queryKey: [GET_LOCAL_AGENT_LIST],
    queryFn: () => localUserAPIs.getAgentList(),
    select: (data) => data.result,
  });
};
