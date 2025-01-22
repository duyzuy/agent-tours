"use client";
import { getAgToken } from "@/utils/common";

type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"; // HTTP methods
  headers?: HeadersInit; // Request headers
  body?: any; // Request body for POST/PUT
  queryParams?: Record<string, string | number>;
  isAuth?: boolean; // Include Authorization header
};

export async function request<T>(
  url: string, // API endpoint
  options: FetchOptions = {}, // Options object
): Promise<T> {
  const {
    method = "GET", // Default method is GET
    headers = {}, // Default headers
    body, // Request body
    queryParams, // Query parameters
    isAuth = false, // Include Authorization header
  } = options;

  let baseUrl = `${process.env.API_ROOT}/${url}`;
  const defaultHeaders = new Headers({ "Content-Type": "application/json", ...headers });
  if (method === "GET") {
    // Add query parameters to the URL
    const queryString = queryParams
      ? "?" +
        Object.entries(queryParams)
          .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
          .join("&")
      : "";
    baseUrl = baseUrl + queryString;
  }

  if (isAuth) {
    const token = getAgToken();
    defaultHeaders.set("Authorization", token ? `Bearer ${encodeURIComponent(token)}` : "");
  }
  try {
    const response = await fetch(baseUrl, {
      method,
      headers: {
        ...defaultHeaders,
      },
      body: body ? JSON.stringify(body) : undefined, // Stringify the body if provided
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${response.status} - ${errorData.message || response.statusText}`);
    }

    // Return JSON response
    return (await response.json()) as T;
  } catch (error: any) {
    console.error("API Fetch Error:", error.message);
    throw new Error(error.message || "Something went wrong");
  }
}

export const client = {
  get: <Success>(url: string, options?: FetchOptions) => {
    return request<Success>(url, {
      ...options,
      method: "GET",
    });
  },
  post: <Success>(url: string, options?: FetchOptions) => {
    return request<Success>(url, {
      ...options,
      method: "POST",
    });
  },
};
