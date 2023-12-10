import { LOCAL_STORAGE_KEY } from "@/constants/common";

export const isSSR = () => typeof window === "undefined";

export const getAgToken = () => {
    if (isSSR()) return "";
    return localStorage.getItem(LOCAL_STORAGE_KEY.AG_AUTH_TOKEN);
};

export const setAgToken = (token: string) => {
    if (isSSR()) return "";
    return localStorage.setItem(LOCAL_STORAGE_KEY.AG_AUTH_TOKEN, token);
};

export const removeAgToken = () => {
    if (isSSR()) return "";
    return localStorage.removeItem(LOCAL_STORAGE_KEY.AG_AUTH_TOKEN);
};

// export const moneyFormat = (money: number) =>
//   new Intl.NumberFormat("vi", {
//     style: "currency",
//     currency: "VND",
//   }).format(money);

export const moneyFormat = (money?: number) => {
    if (typeof money === "number" && !isNaN(money)) {
        return new Intl.NumberFormat("vi", {
            style: "currency",
            currency: "VND",
        }).format(money);
    }
    return "0đ";
};

export function formatNumber(value: number): string {
    if (value >= 1000) {
        let suffix = "";
        let formattedValue = value;

        if (value >= 1000000) {
            suffix = "M";
            formattedValue = value / 1000000;
        } else if (value >= 1000) {
            suffix = "k";
            formattedValue = value / 1000;
        }

        return formattedValue.toFixed(0) + suffix;
    }

    return value.toString();
}
