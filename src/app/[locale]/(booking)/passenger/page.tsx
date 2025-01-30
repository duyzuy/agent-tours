"use client";
import React, { useMemo, useTransition } from "react";
import { Space, Button } from "antd";
import { isEmpty, isNull, isUndefined } from "lodash";
import { useTranslations } from "next-intl";
import ServiceContainer from "./_components/ServiceContainer";
import PassengerFormWraper from "./_components/PassengerFormWraper";
import { useRouter } from "@/utils/navigation";
import { useBookingSelector } from "@/store";
import { FeBookingFormData } from "@/store/booking/booking.type";
import useAddPassengerInformation from "@/modules/fe/booking/passenger/useAddPassengerInformation";

export type PassengerItemType = FeBookingFormData["bookingInfo"]["passengers"][number];

export type PassengerFormValues = {
  passengerItem: PassengerItemType[];
};

const PassengerPage = () => {
  const { updatePassengerInformation, passengers } = useAddPassengerInformation();
  const productInformation = useBookingSelector((state) => state.bookingInfo.product);
  const startDate = useBookingSelector((state) => state.bookingInfo.product?.startDate);

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const t = useTranslations("Passenger");

  const handleGonextActions = () => {
    startTransition(() => {
      router.push("/payment");
    });
  };

  const isCompletePassengerInformation = useMemo(() => {
    return passengers.some(
      (pax) =>
        isEmpty(pax.info.paxLastname) ||
        isEmpty(pax.info.paxMiddleFirstName) ||
        isUndefined(pax.info.paxBirthDate) ||
        isEmpty(pax.info.paxGender),
    );
  }, [passengers]);

  if (!passengers?.length || !passengers || !productInformation) {
    return null;
  }

  return (
    <>
      <div className="page-passenger">
        <div className="bg-white rounded-lg p-3 lg:p-6">
          <PassengerFormWraper
            title={t("page.title")}
            descriptions="Nhập tiếng Việt không dấu, họ tên trùng khớp trên giấy tờ tuỳ thân, passport."
            passengerList={passengers}
            startDate={startDate}
            onUpdate={updatePassengerInformation}
          />
          <div className="h-6"></div>
          <ServiceContainer productId={productInformation.recId} passengerList={passengers} />
        </div>
        <div className="text-right mt-6">
          <Space align="end">
            <Button
              type="primary"
              size="large"
              onClick={handleGonextActions}
              loading={isPending}
              disabled={isCompletePassengerInformation}
            >
              Tiến hành thanh toán
            </Button>
          </Space>
        </div>
      </div>
    </>
  );
};
export default PassengerPage;
