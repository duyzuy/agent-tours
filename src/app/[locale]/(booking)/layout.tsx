"use client";
import { useMemo } from "react";
import { usePathname, redirect } from "@/utils/navigation";
import { isUndefined } from "lodash";
import { LangCode } from "@/models/management/cms/language.interface";
import BookingSummary from "@/components/frontend/booking/BookingSummary";
import BookingSteps from "@/components/frontend/booking/BookingSteps";
import { useBookingSelector } from "@/store";
import CustomerAuthorized from "../(auth)/CustomerAuthorized";
interface Props {
  children: React.ReactNode;
  params: { locale: LangCode };
}

export default function FeBookingLayout({ children, params: { locale } }: Props) {
  const bookingInformation = useBookingSelector();
  const pathname = usePathname();

  const activeKey = useMemo(() => {
    let step = 0;
    if (pathname.startsWith("/passenger")) {
      step = 1;
    }
    if (pathname.startsWith("/payment")) {
      step = 2;
    }
    if (pathname.startsWith("/reservation")) {
      step = 3;
    }
    return step;
  }, [pathname]);

  const isReservationPage = useMemo(() => {
    return pathname.startsWith("/reservation");
  }, [pathname]);

  if (isUndefined(bookingInformation.bookingInfo.product)) {
    redirect("/");
  }
  return (
    <div className="bg-gray-100 booking-wrapper">
      <BookingSteps activeKey={activeKey} />
      <div className="container lg:px-8 md:px-6 px-3 mx-auto py-6 lg:py-12 flex flex-wrap justify-center">
        <div className="booking-content w-full lg:w-7/12 lg:mb-0 mb-6">{children}</div>
        {isReservationPage ? null : <BookingSummary className="w-full lg:w-5/12 lg:pl-8" />}
      </div>
    </div>
  );
}
