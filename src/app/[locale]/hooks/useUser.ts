import { useContext } from "react";
import { UserManagerContext } from "../store/context";
import { IUserManager } from "../store/type/user.type";

export const useUser = () => {
  const languages = useContext(UserManagerContext);

  if (!languages) {
    throw new Error("Hook must use under language provider");
  }

  return languages;
};

export const useUserSelector = <T>(selector: (state: IUserManager) => T) => {
  const userData = useContext(UserManagerContext);

  if (!userData) {
    throw new Error("Hook must use under user provider");
  }
  const [state, _] = userData;

  return selector(state);
};
