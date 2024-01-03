import { BaseResponse } from "@/models/management/common.interface";

import { coreAccountConfig } from "@/configs";
import { error } from "console";

export const coreOneTimeKeys = {
    getKey: async () => {
        const response = await fetch(
            `${process.env.API_ROOT}/core/getOneTimeAccesskey`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    requestObject: {
                        userId: coreAccountConfig.userId,
                        username: coreAccountConfig.username,
                        password: coreAccountConfig.password,
                    },
                }),
            },
        );

        const data = (await response.json()) as string;

        if (!response.ok) {
            return Promise.reject({
                code: "ONE_TIME_KEY_FAIL",
                message: "Không lấy được oneTimeKey",
            });
        }
        return Promise.resolve(data);
    },
};
