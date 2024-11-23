import { client } from "../api";

export const agAuthAPIs = {
  login: async <T>(userId: string, username: string, password: string) => {
    return await client.post<T, any>("local/getLocalToken", {
      params: {
        requestObject: {
          localUser: {
            userId,
            username,
            password,
          },
        },
      },
    });
  },

  getProfileUser: async <T>(token: string) => {
    return await client.post<T, any>("local/getLocalProfile", {
      headers: {
        Authorization: `Bearer ${encodeURIComponent(token)}`,
      },
    });
  },
};
