import { removeAccessToken } from "@/utils/common";
import { signOut } from "next-auth/react";
export const useSignOut = () => {
  const onSignOut = () => {
    removeAccessToken();
    signOut();
  };

  return { signOut: onSignOut };
};
