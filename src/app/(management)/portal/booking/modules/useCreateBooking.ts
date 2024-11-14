import { useRouter } from "next/navigation";
import { isUndefined } from "lodash";
import { useCreateBookingMutation } from "@/mutations/managements/booking";
import { IProductTourBookingItem, IBookingTourPayload } from "./bookingInformation.interface";
import useBooking from "../hooks/useBooking";
import useMessage from "@/hooks/useMessage";
import { CustomerInformation } from "@/models/management/booking/customer.interface";
import { InvoiceFormData } from "@/models/management/booking/invoice.interface";

const useCreateBooking = () => {
  const { mutate: makeCreateBooking } = useCreateBookingMutation();
  const [bookingInformation, setBookingInformation] = useBooking();

  const bookingSSRWithPax = bookingInformation.bookingInfo?.bookingSsrWithPax;
  const bookingSsr = bookingInformation.bookingInfo?.bookingSsr;

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
    let bookingPayload: IBookingTourPayload = { bookingDetails: [] };

    const bookingDetails = getBookingDetailsItems(bookingInformation.bookingInfo?.bookingItems);

    const bookingSSRNoPax = bookingSsr?.reduce<IBookingTourPayload["bookingSsr"]>((acc, item) => {
      acc = [
        ...(acc || []),
        {
          amount: item.configItem["adult"],
          qty: item.qty,
          type: item.type,
          sellableConfigId: item.configItem.recId,
        },
      ];
      return acc;
    }, []);

    // setBookingInformation((prev) => ({
    //   ...prev,
    //   bookingInfo: {
    //     ...prev.bookingInfo,
    //     customerInformation: { ...customerInfo },
    //   },
    // }));
    bookingPayload = {
      bookingDetails: bookingDetails,
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
      bookingSsr: bookingSSRNoPax,
    };
    console.log(bookingPayload);
    makeCreateBooking(bookingPayload, {
      onSuccess: (response) => {
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

  const getServiceListByPax = (
    bookingIndex: number,
  ): IBookingTourPayload["bookingDetails"][number]["ssr"] | undefined => {
    const serviceItemByPax = bookingSSRWithPax?.filter((item) => item.bookingIndex === bookingIndex);
    const ssrItemCanculateQuantity = serviceItemByPax?.reduce<IBookingTourPayload["bookingDetails"][number]["ssr"]>(
      (acc, item) => {
        if (!acc) {
          acc = [
            {
              sellableConfigId: item.configItem.recId,
              qty: item.qty,
              amount: item.configItem[item.type],
              type: item.type,
            },
          ];
        }
        if (acc) {
          const indexConfigItem = acc.findIndex((ssrItem) => ssrItem.sellableConfigId === item.configItem.recId);

          if (indexConfigItem !== -1) {
            acc.splice(indexConfigItem, 1, {
              ...acc[indexConfigItem],
              qty: acc[indexConfigItem].qty + item.qty,
            });
          } else {
            acc = [
              ...acc,
              {
                sellableConfigId: item.configItem.recId,
                qty: item.qty,
                amount: item.configItem[item.type],
                type: item.type,
              },
            ];
          }
        }

        return acc;
      },
      [],
    );
    return ssrItemCanculateQuantity;
  };

  const getBookingDetailsItems = (items?: IProductTourBookingItem[]): IBookingTourPayload["bookingDetails"] => {
    if (isUndefined(items)) {
      throw new Error("Missing booking information bookingItems");
    }

    let bookingDetails: IBookingTourPayload["bookingDetails"] = [];

    bookingDetails = items?.reduce<IBookingTourPayload["bookingDetails"]>((acc, bkItem) => {
      const ssrItems = getServiceListByPax(bkItem.index);

      acc = [
        ...acc,
        {
          sellableConfigId: bkItem.configItem.recId,
          index: bkItem.index,
          amount: bkItem.configItem[bkItem.type],
          type: bkItem.type,
          pax: { ...bkItem.passengerInformation },
          ssr: ssrItems,
        },
      ];
      return acc;
    }, []);
    return bookingDetails;
  };
  return { createBooking };
};
export default useCreateBooking;
