import { useRouter } from "next/navigation";
import { isUndefined } from "lodash";
import { useCreateBookingMutation } from "@/mutations/managements/booking";
import { BookingInformationPayload } from "@/models/management/booking/bookingPayload.interface";
import { BookingInformation } from "./bookingInformation.interface";
import useBooking from "../hooks/useBooking";
import useMessage from "@/hooks/useMessage";

const useCreateBooking = () => {
    const { mutate: createBooking } = useCreateBookingMutation();
    const [bookingInformation, setBookingInformation] = useBooking();
    const message = useMessage();
    const router = useRouter();
    const onCreateBooking = () => {
        const bookingPayload = getBookingInformationPayload(
            bookingInformation.bookingInfo,
        );

        createBooking(bookingPayload, {
            onSuccess: (response) => {
                console.log(response);
                setBookingInformation((prev) => ({
                    ...prev,
                    reservation: response["result"],
                }));
                router.push("./portal/booking/reservation");
            },
            onError(error, variables, context) {
                message.error(error.message);
            },
        });
    };

    const getBookingInformationPayload = (
        data: BookingInformation["bookingInfo"],
    ): BookingInformationPayload => {
        if (isUndefined(data)) {
            throw new Error("Missing booking information data");
        }

        let payload: BookingInformationPayload = {
            sellableId: data.product?.recId,
            bookingDetails: [],
            rmk: data?.rmk,
            custAddress: data?.customerInformation?.custAddress,
            custEmail: data?.customerInformation?.custEmail,
            custName: data?.customerInformation?.custName,
            custPhoneNumber: data?.customerInformation?.custPhoneNumber,
        };

        const bookingItems = data?.passengerSelections?.reduce<
            BookingInformationPayload["bookingDetails"]
        >((acc, paxItem, _index) => {
            acc = [
                ...acc,
                {
                    index: _index,
                    indexRef: 0,
                    sellableConfigId: paxItem.item.recId,
                    bookingRefId: 0,
                    qty: paxItem.quantity,
                    amount: paxItem.item[paxItem.type],
                    type: paxItem.type,
                    pax: {},
                },
            ];
            return acc;
        }, []);
        return {
            ...payload,
            bookingDetails: bookingItems || [],
        };
    };
    return { onCreateBooking };
};
export default useCreateBooking;
