"use client";
import { objectToQueryString } from "@/utils/helper";
import { getAgToken } from "@/utils/common";
import { ErrorResponse } from "@/models/common.interface";
type Methods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type Options = Omit<RequestInit, "body"> & {
  params?: { [key: string]: any };
  headers?: HeadersInit;
  isAuth?: boolean;
  body?: RequestInit["body"] | { [key: string]: any };
};

const buildConfig = (method: Methods, options: Options): RequestInit => {
  const { headers, params, isAuth = false, body } = options;

  let config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (isAuth) {
    const token = getAgToken();
    config.headers = {
      ...config.headers,
      Authorization: token ? `Bearer ${encodeURIComponent(token)}` : "",
    };
  }

  if (["POST", "PUT", "PATCH"].includes(method)) {
    config.body = JSON.stringify(body || {});
  }
  return config;
};

const buildUrl = (url: string, method: Methods, body?: Record<string, any>): string => {
  let baseUrl = `${process.env.API_ROOT}/${url}`;
  if (body && method === "GET") {
    const queryString = objectToQueryString(body);
    baseUrl = `${baseUrl}?${queryString}`;
  }
  return baseUrl;
};

const request = async <TSuccess, TError>(url: string, method: Methods, options: Options) => {
  const config = buildConfig(method, options);
  const baseUrl = buildUrl(url, method, options.params);

  try {
    const response = await fetch(baseUrl, config);

    const data = await response.json();

    if (!response.ok || data.status !== "OK") {
      return Promise.reject(data as TError);
    }
    return data as TSuccess;
  } catch (error) {
    let message = "Fetching failed, please try again later.";
    if (error instanceof Error) message = error.message;
    throw new Error(message) as TError;
  }
};

export const client = {
  get: <Success, Error extends ErrorResponse = ErrorResponse>(url: string, options?: Options) => {
    return request<Success, Error>(url, "GET", {
      ...(options || {}),
    });
  },
  post: <Success, Error extends ErrorResponse = ErrorResponse>(url: string, options?: Options) => {
    return request<Success, Error>(url, "POST", {
      ...(options || {}),
    });
  },
  put: <Success, Error extends ErrorResponse = ErrorResponse>(url: string, options?: Options) => {
    return request<Success, Error>(url, "PUT", {
      ...(options || {}),
    });
  },
};
