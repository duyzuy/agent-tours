import { useAppSelector, useAppManager } from "../appContext";

export const useLanguageSelector = () => useAppSelector((state) => state.language);

export const useLanguageContent = () => {
  const [state, dispatch] = useAppManager();

  return [state.language, dispatch];
};
