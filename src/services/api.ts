import { objectToQueryString } from "@/utils/helper";
enum METHODS {
    Post = "POST",
    Get = "GET",
    Put = "PUT",
    Patch = "PATCH",
}
type Options = RequestInit & {
    params?: { [key: string]: any };
    headers?: HeadersInit;
};
const request = async <TSuccess, TError>(
    url: string,
    method: METHODS,
    options: Options,
) => {
    let config: RequestInit = {
        method: method ? method : METHODS.Post,
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
        },
    };

    const { params, next } = options;

    let baseUrl = `${process.env.API_ROOT}/${url}`;

    if (
        method === METHODS.Post ||
        method === METHODS.Put ||
        method === METHODS.Patch
    ) {
        config = {
            ...config,
            body: JSON.stringify(params || {}),
        };
    }

    if (params && method === METHODS.Get) {
        const queryString = objectToQueryString(params);
        baseUrl = `${baseUrl}?${queryString}`;
    }

    try {
        const response = await fetch(baseUrl, { ...config });

        const data = await response.json();

        if (!response.ok || data.status !== "OK") {
            return Promise.reject(data as TError);
        }

        return Promise.resolve(data as TSuccess);
    } catch (error) {
        let message = "Unknown Error";
        if (error instanceof Error) message = error.message;
        throw new Error(message);
    }
};

export const client = {
    get: <Success, Error>(
        url: string,
        options?: {
            params?: { [key: string]: any };
            headers?: HeadersInit;
        },
    ) => {
        return request<Success, Error>(url, METHODS.Get, {
            ...(options || {}),
        });
    },
    post: <Success, Error>(
        url: string,
        options?: {
            params?: { [key: string]: any };
            headers?: HeadersInit;
        },
    ) => {
        return request<Success, Error>(url, METHODS.Post, {
            ...(options || {}),
        });
    },
    put: <Success, Error>(
        url: string,
        options?: {
            params?: { [key: string]: any };
            headers?: HeadersInit;
        },
    ) => {
        return request<Success, Error>(url, METHODS.Put, {
            ...(options || {}),
        });
    },
};
