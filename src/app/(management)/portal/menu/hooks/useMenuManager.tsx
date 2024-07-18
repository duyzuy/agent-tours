import { useContext } from "react";
import { MenuManagerContext } from "../store/manageMenuContext";
import { MenuManagerData } from "../store/menuType";
export const useMenuManagerSelector = <T,>(cb: (data: MenuManagerData) => T) => {
  const [state, _] = useContext(MenuManagerContext);

  if (!state) {
    throw new Error("Hook must use in MenuManagerProvider");
  }

  return cb(state);
};

export default function useMenuManager() {
  const data = useContext(MenuManagerContext);

  if (!data || !data.length) {
    throw new Error("Hook must use in MenuManagerProvider");
  }
  return data;
}
