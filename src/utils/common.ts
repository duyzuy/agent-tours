import { LOCAL_STORAGE_KEY } from "@/constants/common";
import { PassengerType } from "@/models/common.interface";

export const isSSR = () => typeof window === "undefined";

export const getAgToken = () => {
  return isSSR() ? "" : localStorage.getItem(LOCAL_STORAGE_KEY.AG_AUTH_TOKEN);
};

export const setAdminUserToken = (token: string) => {
  !isSSR() && localStorage.setItem(LOCAL_STORAGE_KEY.AG_AUTH_TOKEN, token);
};

export const removeAdminUserToken = () => {
  !isSSR() && localStorage.removeItem(LOCAL_STORAGE_KEY.AG_AUTH_TOKEN);
};

export const setAdminUsername = (username?: string) => {
  !isSSR() && username && localStorage.setItem(LOCAL_STORAGE_KEY.LOGIN_USERNAME, username);
};

export const getAdminUserName = () => {
  return isSSR() ? "" : localStorage.getItem(LOCAL_STORAGE_KEY.LOGIN_USERNAME);
};

export const getAdminUserInformationStorage = () => {
  if (isSSR()) return;
  const data = localStorage.getItem(LOCAL_STORAGE_KEY.LOCAL_USER_INFORMATION);

  return data
    ? (JSON.parse(data) as {
        localUserType: "ADMIN" | "AGENT" | "STAFF" | "AGENT_STAFF";
        localChildrendUsername: string[];
      })
    : undefined;
};
export const setAdminUserInformationStorage = (userInfo: {
  localUserType: "ADMIN" | "AGENT" | "STAFF" | "AGENT_STAFF";
  localChildrendUsername: string[];
}) => {
  return isSSR() ? "" : localStorage.setItem(LOCAL_STORAGE_KEY.LOCAL_USER_INFORMATION, JSON.stringify(userInfo));
};
export const removeAdminUserInformationStorage = () => {
  !isSSR() && localStorage.removeItem(LOCAL_STORAGE_KEY.LOCAL_USER_INFORMATION);
};

export const removeAdminUsername = () => {
  !isSSR() && localStorage.removeItem(LOCAL_STORAGE_KEY.LOGIN_USERNAME);
};

export const setAccessToken = (accessToken: string) => {
  !isSSR() && localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, accessToken);
};
export const removeAccessToken = () => {
  !isSSR() && localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
};
export const getAccessToken = () => {
  return isSSR() ? "" : localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
};
export const getThemeMode = () => {
  if (!isSSR()) {
    return localStorage.getItem(LOCAL_STORAGE_KEY.THEME_MODE) as "dark" | "light" | null;
  }
};
export const setThemeMode = (mode: "dark" | "light") => {
  return !isSSR() && localStorage.setItem(LOCAL_STORAGE_KEY.THEME_MODE, mode);
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

export const getPassengerType = (type?: PassengerType) => {
  if (type === PassengerType.ADULT) {
    return "Người lớn";
  }
  if (type === PassengerType.CHILD) {
    return "Trẻ em";
  }
  if (type === PassengerType.INFANT) {
    return "Em bé";
  }
  return "Unknown";
};
