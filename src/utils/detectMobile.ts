import { headers } from "next/headers";

import getDeviceInfo from "./getDeviceInfo";
export const isMobile = () => {
  if (typeof process === "undefined") {
    throw new Error("[Server method] you are importing a server-only module outside of server");
  }

  const { get } = headers();
  const ua = get("user-agent");

  const type = getDeviceInfo(ua);

  return type?.device === "mobile";
};
