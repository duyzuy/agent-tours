import { EModalManagerActions } from "@/store/actions/modalActions";
import { useModalManager } from "@/store/hooks";
const useAuthModal = () => {
  const [_, dispatch] = useModalManager();
  const showAuthModal = () => {
    dispatch({ type: EModalManagerActions.SHOW_AUTH_MODAL });
  };

  const hideAuthModal = () => {
    dispatch({ type: EModalManagerActions.HIDE_AUTH_MODAL });
  };
  return {
    showAuthModal,
    hideAuthModal,
  };
};
export default useAuthModal;
