import { useRouter } from "next/navigation";
import { isUndefined } from "lodash";
import { useCreateBookingMutation } from "@/mutations/managements/booking";
import { BookingServicePayload, PortalBookingServiceFormData } from "./bookingInformation.interface";

import useMessage from "@/hooks/useMessage";
import { CustomerInformation } from "@/models/management/booking/customer.interface";
import { InvoiceFormData } from "@/models/management/booking/invoice.interface";
import { usePortalBookingServiceManager } from "../store/bookingServiceContext";
import { PassengerType } from "@/models/common.interface";
import { useTransition } from "react";
const useCreateBooking = () => {
  const { mutate: makeCreateBooking, isPending } = useCreateBookingMutation();
  const [bookingInformation, dispatch] = usePortalBookingServiceManager();

  const bookingSsr = bookingInformation.bookingInfo?.bookingSsr;
  const [isPushing, startPushReservation] = useTransition();
  const message = useMessage();
  const router = useRouter();

  const createBooking = ({
    customerInfo,
    invoiceInfo,
    agentUserId,
  }: {
    customerInfo: CustomerInformation;
    invoiceInfo: InvoiceFormData;
    agentUserId?: number;
  }) => {
    console.log({ customerInfo, invoiceInfo, agentUserId, bookingInformation });
    let bookingPayload: BookingServicePayload = { bookingSsr: [] };

    const ssrItems = bookingSsr?.reduce<BookingServicePayload["bookingSsr"]>((acc, item) => {
      acc = [
        ...(acc || []),
        {
          amount: item.configItem["adult"],
          qty: item.qty,
          type: PassengerType.ADULT,
          sellableConfigId: item.configItem.recId,
        },
      ];
      return acc;
    }, []);
    bookingPayload = {
      sellableId: bookingInformation.bookingInfo?.product?.sellableId,
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
      agentUserId: agentUserId,
      channel: bookingInformation.channel,
      bookingSsr: ssrItems,
    };

    console.log({ bookingPayload });
    makeCreateBooking(
      { ...bookingPayload, bookingDetails: undefined },
      {
        onSuccess: (response) => {
          dispatch({
            type: "SET_RESERVATION",
            payload: {
              reservation: response["result"],
              customerInformation: customerInfo,
            },
          });
          startPushReservation(() => {
            router.push("/portal/booking/reservation");
          });
        },
        onError(error, variables, context) {
          message.error(error.message);
        },
      },
    );
  };

  return { createBooking, loading: isPending || isPushing };
};
export default useCreateBooking;
