import { usePortalBookingServiceSelector } from "../store/bookingServiceContext";
import { PassengerType } from "@/models/common.interface";
import { PortalBookingServiceFormData } from "../store/bookingService.type";
import { useCallback, useMemo } from "react";

type BookingServiceItem = Exclude<PortalBookingServiceFormData["bookingInfo"], undefined>["bookingSsr"][number] & {
  subTotal: number;
};

const useBreakDownSummary = () => {
  const { bookingInfo } = usePortalBookingServiceSelector((state) => state);

  const bookingSsr = bookingInfo?.bookingSsr || [];

  const services = useMemo<{
    [key in PassengerType]: BookingServiceItem[];
  }>(() => {
    let adult: BookingServiceItem[] = [],
      child: BookingServiceItem[] = [],
      infant: BookingServiceItem[] = [];

    bookingSsr.forEach((item) => {
      const subtotalItem = {
        ...item,
        subTotal: item.configItem[item.type] * item.qty,
      };
      if (item.type === PassengerType.ADULT) {
        adult = [...adult, subtotalItem];
      }
      if (item.type === PassengerType.CHILD) {
        child = [...child, subtotalItem];
      }
      if (item.type === PassengerType.INFANT) {
        infant = [...infant, subtotalItem];
      }
    });

    return {
      adult,
      child,
      infant,
    };
  }, [bookingSsr]);
  const totalPricingServices = useMemo(() => {
    const ssrSubTotalNoPax = bookingSsr.reduce((acc, bkItem) => {
      acc += bkItem.configItem[bkItem.type] * bkItem.qty;
      return acc;
    }, 0);
    return ssrSubTotalNoPax;
  }, [bookingSsr]);
  return {
    services,
    total: totalPricingServices,
  };
};
export default useBreakDownSummary;
