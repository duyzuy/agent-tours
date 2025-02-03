import { useRouter } from "next/navigation";
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
  const isAuth = !!getAgToken();

  const onLogout = () => {
    removeAdminUserToken();
    removeAdminUsername();
    removeAdminUserInformationStorage();
    router.push("/admin-auth/login");
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
