import { createContext } from "react";
import { MenuManagerData } from "./menuType";
import { MenuManagerActionsType } from "./actions";
import { useReducer } from "react";
import { initMenuManagerState, menuManagerReducer } from "./reducer";
import { useContext } from "react";

export const MenuManagerContext = createContext<[MenuManagerData, React.Dispatch<MenuManagerActionsType>] | []>([]);

export const MenuManagerProvider = ({ children }: { children: React.ReactNode }) => {
  const [menuManagerState, dispatch] = useReducer(menuManagerReducer, initMenuManagerState);
  return <MenuManagerContext.Provider value={[menuManagerState, dispatch]}>{children}</MenuManagerContext.Provider>;
};

export const useMenuManagerSelector = <T,>(cb: (data: MenuManagerData) => T) => {
  const [state, _] = useContext(MenuManagerContext);

  if (!state) {
    throw new Error("Hook must use in MenuManagerProvider");
  }

  return cb(state);
};

export function useMenuManager() {
  const data = useContext(MenuManagerContext);

  if (!data || !data.length) {
    throw new Error("Hook must use in MenuManagerProvider");
  }
  return data;
}
