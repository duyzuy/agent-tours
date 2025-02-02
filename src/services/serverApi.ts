import { objectToQueryString } from "@/utils/helper";
import { isUndefined } from "lodash";
type Options = RequestInit & {
  params?: { [key: string]: any };
  next?: NextFetchRequestConfig;
  headers?: HeadersInit;
};

const request = async <TSuccess, TError>(
  url: string,
  method: "POST" | "GET" | "PUT" | "PATCH",
  options?: Options,
): Promise<TSuccess | undefined> => {
  const { headers, next, params, ...rest } = options || {};

  let baseUrl = `${process.env.API_ROOT}`;
  url = url.startsWith("/") ? url.replace("/", "") : url;

  let requestUrl = `${baseUrl}/${url}`;

  let configs: RequestInit = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...(headers || {}),
    },
  };

  configs.next = next ?? undefined;

  if (method === "GET" && params) {
    const queryString = objectToQueryString(params);
    requestUrl = `${requestUrl}?${queryString}`;
  }
  if (method === "POST" && params) {
    configs = {
      ...configs,
      body: JSON.stringify(params),
    };
  }

  // console.log({ params, requestUrl });
  try {
    const response = await fetch(requestUrl, { ...configs, ...rest });
    const data = await response.json();

    // console.log({ data, configs });
    if (response.ok && data.status === "OK") {
      return Promise.resolve(data as TSuccess);
    }
    // if (response.ok && data.status === "XX") {
    //     return Promise.reject(data as TError);
    // }
  } catch (error) {
    console.log({ error: JSON.stringify(error), url: requestUrl, configs }, "fetching error");
    //return "fetching error";
    // throw new Error("error fetching");
  }
};

export const serverRequest = {
  get: <TSuccess, TError extends object = {}>(url: string, options?: Options) => {
    return request<TSuccess, TError>(url, "GET", options);
  },
  post: <TSuccess, TError extends object = {}>(url: string, options?: Options) => {
    return request<TSuccess, TError>(url, "POST", options);
  },
};
