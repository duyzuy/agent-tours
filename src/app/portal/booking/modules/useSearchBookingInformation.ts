import { SearchBookingFormData } from "./searchBooking.interface";
import { useSearchBookingMutation } from "@/mutations/managements/booking";
import useBooking from "../hooks/useBooking";
import { useRouter } from "next/navigation";
const useSearchBookingInformation = () => {
    const { mutate: makeSearchBooking } = useSearchBookingMutation();
    const [_, setBookingInformation] = useBooking();

    const onSearchBooking = (formData: SearchBookingFormData) => {
        makeSearchBooking(formData, {
            onSuccess: (response, variables) => {
                setBookingInformation((prev) => ({
                    ...prev,
                    productList: response.result,
                    searchBooking: variables,
                }));
            },
            onError: (err) => {
                console.log(err);
            },
        });
    };

    return {
        onSearchBooking,
    };
};
export default useSearchBookingInformation;
