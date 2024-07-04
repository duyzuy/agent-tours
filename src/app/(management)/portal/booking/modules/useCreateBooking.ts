import { useRouter } from "next/navigation";
import { isUndefined } from "lodash";
import { useCreateBookingMutation } from "@/mutations/managements/booking";
import {
    IBookingItem,
    IBookingTourPayload,
} from "./bookingInformation.interface";
import useBooking from "../hooks/useBooking";
import useMessage from "@/hooks/useMessage";
import { CustomerInformation } from "@/models/management/booking/customer.interface";
import { InvoiceFormData } from "@/models/management/booking/invoice.interface";

const useCreateBooking = () => {
    const { mutate: makeCreateBooking } = useCreateBookingMutation();
    const [bookingInformation, setBookingInformation] = useBooking();

    const message = useMessage();
    const router = useRouter();

    const createBooking = ({
        customerInfo,
        invoiceInfo,
    }: {
        customerInfo: CustomerInformation;
        invoiceInfo: InvoiceFormData;
    }) => {
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
            invoiceAddress: invoiceInfo.invoiceAddress,
            invoiceCompanyName: invoiceInfo.invoiceCompanyName,
            invoiceEmail: invoiceInfo.invoiceEmail,
            invoiceName: invoiceInfo.invoiceName,
            invoiceTaxCode: invoiceInfo.invoiceTaxCode,
            rmk: customerInfo.rmk,
            referenceId: customerInfo.referenceId,
        };
        // console.table({ bookingInformation, bookingPayload });
        makeCreateBooking(bookingPayload, {
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
                router.push("/portal/booking/reservation");
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
    return { createBooking };
};
export default useCreateBooking;
