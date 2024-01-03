import { coreOneTimeKeys } from "./cores/oneTimeKeyAccess";
import { client } from "../api";
import { createHash256 } from "@/utils/hash";
import { coreAccountConfig } from "@/configs";
export const coreApi = {
    post: async <TSuccess, TError>(
        endpoint: string,
        queryParams: {
            requestObject: { [key: string]: any };
            localUsername?: string;
        },
    ) => {
        return await coreOneTimeKeys
            .getKey()
            .then(async (key) => {
                const hashData = createHash256(
                    JSON.stringify(queryParams.requestObject) +
                        key +
                        coreAccountConfig.privateKey,
                );
                return await client.post<TSuccess, TError>(endpoint, {
                    params: {
                        requestObject: queryParams.requestObject,
                        userId: coreAccountConfig.userId,
                        localUsername: queryParams.localUsername ?? "",
                        hashCheck: hashData,
                    },
                });
            })
            .catch((error) => {
                console.log(error);

                return Promise.reject(error as TError);
            });
    },
};
