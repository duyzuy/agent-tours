import { coreAccountConfig } from "@/configs";

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
                        username: coreAccountConfig.userName,
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
        if (data === "SERVERERROR") {
            return Promise.reject({
                code: "SERVERERROR",
                message: "Server error",
            });
        }
        return Promise.resolve(data);
    },
};
