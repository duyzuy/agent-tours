import { useContext } from "react";
import { ManageBookingContext } from "@/context";
import { isUndefined } from "lodash";
import { BookingDetailSSRItemType } from "../page";

const useManageBooking = () => {
    const context = useContext(ManageBookingContext);

    if (!context) {
        throw new Error("Hook must use under ManageBookingProvider parent");
    }

    return context;
};
export default useManageBooking;

export const useDispatchManageBooking = () => {
    const context = useContext(ManageBookingContext);

    if (!context) {
        throw new Error("Hook must use under ManageBookingProvider parent");
    }

    const [state, dispatch] = context;
    return dispatch;
};
