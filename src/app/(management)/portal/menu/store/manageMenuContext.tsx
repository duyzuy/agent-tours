import { createContext } from "react";
import { MenuManagerData } from "./menuType";
import { MenuManagerActionsType } from "./actions";

export const MenuManagerContext = createContext<[MenuManagerData, React.Dispatch<MenuManagerActionsType>] | []>([]);
