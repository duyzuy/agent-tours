import { coreOneTimeKeys } from "./cores/oneTimeKeyAccess";
import { client } from "../api";
import { createHash256 } from "@/utils/hash";
import { coreAccountConfig } from "@/configs";
import { getLocalUserName } from "@/utils/common";
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

    return await coreOneTimeKeys
      .getKey()
      .then(async (key) => {
        //Sort object

        const soredQueryObject = Object.keys(queryParams.requestObject)
          .sort()
          .reduce<{ [key: string]: any }>((acc, key) => {
            acc[key] = queryParams.requestObject[key];

            return acc;
          }, {});

        const hashData = createHash256(JSON.stringify(soredQueryObject) + key + coreAccountConfig.privateKey);
        // console.log({
        //     key,
        //     queryParams,
        //     endpoint,
        //     hashData,
        //     objstr: JSON.stringify(soredQueryObject),
        // });

        return await client.post<TSuccess>(endpoint, {
          params: {
            requestObject: soredQueryObject,
            orderby: queryParams?.orderBy,
            pageCurrent: queryParams?.pageCurrent,
            pageSize: queryParams?.pageSize,
            userId: coreAccountConfig.userId,
            userName: coreAccountConfig.userName,
            localUsername: localUsername ?? "",
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
