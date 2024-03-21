import { useRouter } from "next/navigation";
import { isUndefined } from "lodash";
import { useCreateBookingMutation } from "@/mutations/managements/booking";
import {
    BookingInformation,
    IBookingItem,
    IBookingTourPayload,
} from "./bookingInformation.interface";
import useBooking from "../hooks/useBooking";
import useMessage from "@/hooks/useMessage";
import { CustomerInformation } from "@/models/management/booking/customer.interface";

const useCreateBooking = () => {
    const { mutate: createBooking } = useCreateBookingMutation();
    const [bookingInformation, setBookingInformation] = useBooking();

    const message = useMessage();
    const router = useRouter();
    const onCreateBooking = (customerInfo: CustomerInformation) => {
        let bookingPayload: IBookingTourPayload = { bookingDetails: [] };

        const bookingDetails = getBookingDetailsItems(
            bookingInformation.bookingInfo?.bookingItems,
        );

        setBookingInformation((prev) => ({
            ...prev,
            bookingInfo: {
                ...prev.bookingInfo,
                customerInformation: { ...customerInfo },
            },
        }));
        bookingPayload = {
            bookingDetails: bookingDetails,
            sellableId: bookingInformation.bookingInfo?.product?.recId,
            custAddress: customerInfo.custAddress,
            custEmail: customerInfo.custEmail,
            custName: customerInfo.custName,
            custPhoneNumber: customerInfo.custPhoneNumber,
            rmk: customerInfo.rmk,
        };
        console.log({ bookingInformation, bookingPayload });
        createBooking(bookingPayload, {
            onSuccess: (response) => {
                console.log(response);
                setBookingInformation((prev) => ({
                    ...prev,
                    bookingInfo: {
                        ...prev.bookingInfo,
                        customerInformation: {
                            ...customerInfo,
                        },
                    },
                    reservation: response["result"],
                }));
                router.push("./portal/booking/reservation");
            },
            onError(error, variables, context) {
                message.error(error.message);
            },
        });
    };

    const getBookingDetailsItems = (
        items?: IBookingItem[],
    ): IBookingTourPayload["bookingDetails"] => {
        if (isUndefined(items)) {
            throw new Error("Missing booking information bookingItems");
        }

        let bookingDetails: IBookingTourPayload["bookingDetails"] = [];

        bookingDetails = items?.reduce<IBookingTourPayload["bookingDetails"]>(
            (acc, bkItem) => {
                const ssrItems = bkItem.ssr.reduce<
                    IBookingTourPayload["bookingDetails"][0]["ssr"]
                >((acc, ssrItem) => {
                    acc = [
                        ...acc,
                        {
                            amount: ssrItem.item[ssrItem.type],
                            sellableConfigId: ssrItem.priceConfigRecId,
                            qty: ssrItem.qty,
                            type: ssrItem.type,
                        },
                    ];
                    return acc;
                }, []);
                acc = [
                    ...acc,
                    {
                        sellableConfigId: bkItem.item.recId,
                        index: bkItem.index,
                        amount: bkItem.item[bkItem.type],
                        type: bkItem.type,
                        pax: { ...bkItem.passengerInformation },
                        ssr: [...ssrItems],
                    },
                ];
                return acc;
            },
            [],
        );
        return bookingDetails;
    };
    return { onCreateBooking };
};
export default useCreateBooking;
