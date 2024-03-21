import { SearchBookingFormData } from "./searchBooking.interface";
import { useSearchBookingMutation } from "@/mutations/managements/booking";
import useBooking from "../hooks/useBooking";
import { useState } from "react";
import { initBookingInfo } from "../layout";
const useSearchBookingInformation = () => {
    const { mutate: makeSearchBooking } = useSearchBookingMutation();
    const [_, setBookingInformation] = useBooking();
    const [isLoading, setLoading] = useState(false);
    const onSearchBooking = (formData: SearchBookingFormData) => {
        setLoading(true);
        makeSearchBooking(formData, {
            onSuccess: (response, variables) => {
                setBookingInformation((prev) => ({
                    ...prev,
                    bookingInfo: { ...initBookingInfo },
                    productList: response.result,
                    searchBooking: variables,
                }));
                setLoading(false);
            },
            onError: (err) => {
                console.log(err);
                setLoading(false);
            },
        });
    };

    return {
        onSearchBooking,
        isLoading,
    };
};
export default useSearchBookingInformation;
