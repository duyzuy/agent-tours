import { ModalsManagerContext } from "../store/context";
import { FeBookingInformation } from "../(booking)/modules/booking.interface";
import { useContext } from "react";
import { IModalManagers } from "../store/type/modal.type";

export const useModalManager = () => {
    const modals = useContext(ModalsManagerContext);

    if (!modals) {
        throw new Error("Hook must use under Modal manager provider");
    }

    return modals;
};

export const useModalManagerSelector = <T>(
    selector: (state: IModalManagers) => T,
) => {
    const booking = useContext(ModalsManagerContext);

    if (!booking) {
        throw new Error("Hook must use under Booking provider");
    }
    const [state, _] = booking;

    return selector(state);
};
