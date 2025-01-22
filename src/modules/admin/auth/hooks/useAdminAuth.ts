import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import {
  removeAdminUserToken,
  removeAdminUsername,
  setAdminUserInformationStorage,
  removeAdminUserInformationStorage,
  setAdminUserToken,
  setAdminUsername,
  getAgToken,
} from "@/utils/common";

const useAdminAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const isAuth = !!getAgToken();

  const onLogout = () => {
    removeAdminUserToken();
    removeAdminUsername();
    removeAdminUserInformationStorage();
    queryClient.clear();
    router.push("/ag/login");
  };

  const setToken = (newToken: string) => {
    setAdminUserToken(newToken);
  };
  return {
    isAuth,
    setToken,
    clearToken: removeAdminUserToken,
    onLogout,
    setAdminUserInformationStorage,
    setUserNameLocalStorage: setAdminUsername,
    removeUserNameLocalStorage: removeAdminUsername,
    removeUserInformationLocalStorage: removeAdminUserInformationStorage,
  };
};
export default useAdminAuth;
