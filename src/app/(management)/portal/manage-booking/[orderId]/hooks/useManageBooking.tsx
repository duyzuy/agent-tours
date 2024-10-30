import { useContext, useReducer } from "react";
import { ManageBookingDetailContext } from "@/context";
import { ManageBookingDetail } from "../modules/manageBooking.interface";

const useManageBooking = () => {
  const context = useContext(ManageBookingDetailContext);

  if (!context) {
    throw new Error("Hook must use under ManageBookingProvider parent");
  }

  return context;
};
export default useManageBooking;

export const useDispatchManageBooking = () => {
  const context = useContext(ManageBookingDetailContext);

  if (!context) {
    throw new Error("Hook must use under ManageBookingProvider parent");
  }

  const [state, dispatch] = context;
  return dispatch;
};

export const useSelectorManageBooking = <T,>(selector: (state: ManageBookingDetail) => T) => {
  const context = useContext(ManageBookingDetailContext);

  if (!context) {
    throw new Error("Hook must use under ManageBookingProvider parent");
  }

  const [state, _] = context;

  return selector(state);
};
