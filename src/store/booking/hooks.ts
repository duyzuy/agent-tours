import { useAppSelector, useAppManager } from "../appContext";

export const useBookingSelector = () => useAppSelector((state) => state.booking);

export const useBookingInformation = () => {
  const [state, dispatch] = useAppManager();

  return [state.booking, dispatch];
};
