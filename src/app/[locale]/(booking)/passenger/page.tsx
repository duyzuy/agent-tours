"use client";
import React, { useEffect, useMemo, useState } from "react";
import PassengerFormWraper from "./_components/PassengerFormWraper";
import { Space, Button } from "antd";

import { useTranslations } from "next-intl";
import ServiceContainer from "./_components/ServiceContainer";
import usePassengerInformation from "./modules/usePassengerInformation";
import { isEmpty, isNull, isUndefined } from "lodash";
import { FeBookingInformation } from "../modules/booking.interface";
import { useTransition } from "react";
import { useRouter } from "@/utils/navigation";
import { useBookingSelector } from "@/store/hooks";

export type PassengerItemType = FeBookingInformation["bookingInfo"]["passengers"][0];

export type PassengerFormValues = {
  passengerItem: PassengerItemType[];
};

const PassengerPage = () => {
  /**
   * PassengerInfomation form data has been init from hook @useInitProductItemAndPassengersInformation
   */
  const { updatePassengerInformation, passengers } = usePassengerInformation();
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
