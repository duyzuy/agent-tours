import { useContext } from "react";
import { ManageBookingContext } from "@/context";
import { isUndefined } from "lodash";

const useManageBooking = () => {
    const constext = useContext(ManageBookingContext);

    if (!constext) {
        throw new Error("Hook must use under ManageBookingProvider parent");
    }

    return constext;
};
export default useManageBooking;
