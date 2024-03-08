import { useContext } from "react";

import { BookingContext } from "@/context/bookingContext";
import { BookingInformation } from "../modules/bookingInformation.interface";

const useBooking = () => {
    const context = useContext(BookingContext);

    if (!context) {
        throw new Error("useBooking must be used inside the BookingProvider");
    }
    return context;
};
export default useBooking;

export const useBookingSelector = (
    selector?: (state: BookingInformation) => BookingInformation,
) => {
    const context = useContext(BookingContext);

    if (!context) {
        throw new Error("useBooking must be used inside the BookingProvider");
    }
    const [booingInfo, _] = context;
    if (selector) {
        return selector(booingInfo);
    }
    return booingInfo;
};

// type UseBoookingSelectorDefault  = () => BookingInformation
// type UseBoookingSelectorWithCallBack  = (cb?: (state: BookingInformation) => void) => void  ;

// type UseBookingSelector = UseBoookingSelectorDefault | UseBoookingSelectorWithCallBack

// export const useBookingSelector2: UseBookingSelector = (
//     cb
// ) => {
//     const context = useContext(BookingContext);

//     if (!context) {
//         throw new Error("useBooking must be used inside the BookingProvider");
//     }
//     const [booingInfo, _] = context;
//     if (cb) {
//         const data =  cb(booingInfo);
//         return data
//     }
//     return booingInfo;
// };

// const data = useBookingSelector2()

// const functionA = (cb: (state: BookingInformation) => a ) => {
//     return 1
// }

// const a = functionA()
