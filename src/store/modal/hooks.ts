import { useAppSelector, useAppManager } from "../appContext";

export const useModalSelector = () => useAppSelector((state) => state.modals);

export const useModals = () => {
  const [state, dispatch] = useAppManager();
  return [state.modals, dispatch];
};
