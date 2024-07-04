import { ManageBookingDetail } from "./modules/manageBooking.interface";

export const initManageBookingState = new ManageBookingDetail(undefined, {
    bookingDetails: undefined,
    bookingSsrDelete: [],
});
