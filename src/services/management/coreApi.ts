import { client } from "../api";
import { createHash256 } from "@/utils/hash";
import { coreAccountConfig } from "@/configs";
import { getAdminUserName, getAdminUserInformationStorage } from "@/utils/common";
import { BaseResponse } from "@/models/common.interface";

export const coreApi = {
  post: async <TSuccess, TError extends object = BaseResponse<null>>(
    endpoint: string,
    queryParams: {
      requestObject: { [key: string]: any };
      pageCurrent?: number;
      pageSize?: number;
      orderBy?: { sortColumn?: string; direction?: "asc" | "desc" };
    },
  ) => {
    return await getOneTimeAccessKey(coreAccountConfig.userId, coreAccountConfig.userName, coreAccountConfig.password)
      .then(async (key) => {
        const soredRequestObject = Object.keys(queryParams.requestObject)
          .sort()
          .reduce<{ [key: string]: any }>((acc, key) => ({ ...acc, [key]: queryParams.requestObject[key] }), {});

        const hasCheck = createHash256(JSON.stringify(soredRequestObject) + key + coreAccountConfig.privateKey);
        const userInfo = getAdminUserInformationStorage();

        const localUserInfo = userInfo
          ? (JSON.parse(userInfo) as {
              localUserType: "ADMIN" | "AGENT" | "STAFF" | "AGENT_STAFF";
              localChildrendUsername: string[];
            })
          : undefined;

        const bodyParams = {
          requestObject: soredRequestObject,
          orderby: queryParams?.orderBy,
          pageCurrent: queryParams?.pageCurrent,
          pageSize: queryParams?.pageSize,
          userId: coreAccountConfig.userId,
          userName: coreAccountConfig.userName,
          localUsername: getAdminUserName(),
          localChildrendUsername: localUserInfo?.localChildrendUsername,
          localUserType: localUserInfo?.localUserType,
          hashCheck: hasCheck,
        };
        return await client.post<TSuccess>(endpoint, {
          body: bodyParams,
        });
      })
      .catch((error) => {
        console.table({ error });
        return Promise.reject(error as TError);
      });
  },
};

const getOneTimeAccessKey = async (userId: string, username: string, password: string) => {
  const response = await fetch(`${process.env.API_ROOT}/core/getOneTimeAccesskey`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      requestObject: {
        userId: userId,
        username: username,
        password: password,
      },
    }),
  });

  const data = (await response.json()) as string;

  if (!response.ok) {
    return Promise.reject({
      code: "ONE_TIME_KEY_FAIL",
      message: "Không lấy được oneTimeKey",
    });
  }
  if (data === "SERVERERROR") {
    return Promise.reject({
      code: "SERVERERROR",
      message: "Server error",
    });
  }
  return Promise.resolve(data);
};
