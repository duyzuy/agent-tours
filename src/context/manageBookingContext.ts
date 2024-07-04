import { createContext } from "react";

import { ManageBookingDetail } from "@/app/(management)/portal/manage-booking/[orderId]/modules/manageBooking.interface";
import { ManageBookingAction } from "@/app/(management)/portal/manage-booking/[orderId]/actions";

export const ManageBookingDetailContext = createContext<
    [ManageBookingDetail, React.Dispatch<ManageBookingAction>] | undefined
>(undefined);
