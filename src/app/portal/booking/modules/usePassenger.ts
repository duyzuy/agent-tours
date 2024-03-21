import useBooking from "../hooks/useBooking";
import { IBookingItem } from "./bookingInformation.interface";
const usePassenger = () => {
    const [_, setBookingInformation] = useBooking();

    const onSetPassengerInformation = ({
        index,
        data,
    }: {
        index: number;
        data: IBookingItem["passengerInformation"];
    }) => {
        setBookingInformation((prev) => {
            let newBookingItems = prev.bookingInfo?.bookingItems || [];

            const bookingIndex = newBookingItems.findIndex(
                (item) => item.index === index,
            );

            if (bookingIndex !== -1) {
                newBookingItems.splice(bookingIndex, 1, {
                    ...newBookingItems[bookingIndex],
                    passengerInformation: { ...data },
                });
            }

            return {
                ...prev,
                bookingInfo: {
                    ...prev.bookingInfo,
                    bookingItems: [...newBookingItems],
                },
            };
        });
    };

    return {
        onSetPassengerInformation,
    };
};
export default usePassenger;
