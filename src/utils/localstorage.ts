// import { STORAGE_KEYS } from "@/constants/enum";

// export const getToken = () => {
//     if (typeof window === "undefined") return undefined;
//     return localStorage.getItem(STORAGE_KEYS.token) || undefined;
// };

// export const clearToken = () => localStorage.removeItem(STORAGE_KEYS.token);

// export const setToken = (token: string) =>
//     localStorage.setItem(STORAGE_KEYS.token, token);

// export const setCookie = (cname: string, cvalue: string, exdays: number) => {
//     const d = new Date();
//     d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
//     let expires = "expires=" + d.toUTCString();
//     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
// };

// export const getCookie = (cname: string) => {
//     let name = cname + "=";
//     let ca = document.cookie.split(";");
//     for (let i = 0; i < ca.length; i++) {
//         let c = ca[i];
//         while (c.charAt(0) == " ") {
//             c = c.substring(1);
//         }
//         if (c.indexOf(name) == 0) {
//             return c.substring(name.length, c.length);
//         }
//     }
//     return "";
// };
