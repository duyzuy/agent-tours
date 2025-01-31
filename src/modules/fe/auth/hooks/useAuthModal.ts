import { useAppManager } from "@/store";
const useAuthModal = () => {
  const [_, dispatch] = useAppManager();

  const showAuthModal = () => {
    dispatch({ type: "SHOW_AUTH_MODAL" });
  };

  const hideAuthModal = () => {
    dispatch({ type: "HIDE_AUTH_MODAL" });
  };
  return {
    showAuthModal,
    hideAuthModal,
  };
};
export default useAuthModal;
