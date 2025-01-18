import { useCallback, useState } from "react";
import {
  getAgToken,
  removeAgToken,
  setAgToken,
  setLocalUserName,
  removeLocalUserName,
  setLocalUserInformationStorage,
} from "@/utils/common";

const useAuth = () => {
  //   const [tokenState, setStateToken] = useState(getAgToken());

  const setToken = useCallback(
    (newToken: string) => {
      setAgToken(newToken);
    },
    [setAgToken],
  );

  return {
    token: getAgToken(),
    setToken,
    isAuth: !!getAgToken(),
    clearToken: removeAgToken,
    setLocalUserName,
    setLocalInformation: setLocalUserInformationStorage,
    removeLocalUserName,
  };
};

export default useAuth;
