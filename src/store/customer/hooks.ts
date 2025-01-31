import { useAppSelector, useAppManager } from "../appContext";

export const useUserSelector = () => useAppSelector((state) => state.customer);

export const useUser = () => {
  const [state, dispatch] = useAppManager();

  return [state.customer, dispatch];
};
