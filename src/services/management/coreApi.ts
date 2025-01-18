import { coreOneTimeKeys } from "./cores/oneTimeKeyAccess";
import { client } from "../api";
import { createHash256 } from "@/utils/hash";
import { coreAccountConfig } from "@/configs";
import { getLocalUserName, getLocalUserInformationStorage } from "@/utils/common";
import { BaseResponse } from "@/models/common.interface";
export const coreApi = {
  post: async <TSuccess, TError extends object = BaseResponse<null>>(
    endpoint: string,
    queryParams: {
      requestObject: { [key: string]: any };
      pageCurrent?: number;
      pageSize?: number;
      orderBy?: { sortColumn?: string; direction?: "asc" | "desc" };
      localUsername?: string;
    },
  ) => {
    const localUsername = getLocalUserName();
    const userInfo = getLocalUserInformationStorage();
    const localUserInfo = userInfo
      ? (JSON.parse(userInfo) as {
          localUserType: "ADMIN" | "AGENT" | "STAFF" | "AGENT_STAFF";
          localChildrendUsername: string[];
        })
      : undefined;

    return await coreOneTimeKeys
      .getKey()
      .then(async (key) => {
        const soredQueryObject = Object.keys(queryParams.requestObject)
          .sort()
          .reduce<{ [key: string]: any }>((acc, key) => {
            acc[key] = queryParams.requestObject[key];

            return acc;
          }, {});

        const hashData = createHash256(JSON.stringify(soredQueryObject) + key + coreAccountConfig.privateKey);
        return await client.post<TSuccess>(endpoint, {
          params: {
            requestObject: soredQueryObject,
            orderby: queryParams?.orderBy,
            pageCurrent: queryParams?.pageCurrent,
            pageSize: queryParams?.pageSize,
            userId: coreAccountConfig.userId,
            userName: coreAccountConfig.userName,
            localUsername: localUsername,
            localChildrendUsername: localUserInfo?.localChildrendUsername,
            localUserType: localUserInfo?.localUserType,
            hashCheck: hashData,
          },
        });
      })
      .catch((error) => {
        console.table(endpoint);
        console.table({ queryParams });
        console.table({ error });

        return Promise.reject(error as TError);
      });
  },
};
