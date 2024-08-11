"use client";
import React, { useEffect, useMemo, useTransition, useState, useCallback } from "react";
import { Button, DatePickerProps } from "antd";
import classNames from "classnames";
import { FeProductItem } from "@/models/fe/productItem.interface";

import dayjs, { Dayjs } from "dayjs";

import { useTranslations } from "next-intl";
import useSetProductItemAndPaxQuantity from "@/app/[locale]/(booking)/modules/useSetProductItemAndPaxQuantity";
import { useBookingSelector } from "@/app/[locale]/hooks/useBookingInformation";
import { PassengerType } from "@/models/common.interface";
import useSummaryPricingSelect from "@/app/[locale]/(booking)/modules/useSummaryPricingSelect";
import HotlineBox from "@/components/frontend/HotlineBox";

import useAuth from "@/app/[locale]/hooks/useAuth";
import useAuthModal from "@/app/[locale]/(auth)/hooks";

import { stringToDate } from "@/utils/date";

import DesktopBoxSummary from "./DesktopBoxSummary";
import MobileBoxSummary from "./MobileBoxSummary";

interface Props {
  className?: string;
  tourName?: string;
  productList?: FeProductItem[];
  defaultProductItem: FeProductItem;
  isMobile: boolean;
}
const ProductSummary = ({ className = "", productList, defaultProductItem, isMobile, tourName }: Props) => {
  const productItem = useBookingSelector((state) => state.bookingInfo.product);
  const { session } = useAuth();
  const { showAuthModal } = useAuthModal();

  const { setProductItem, initPassengerInfoThenGoToPassenger } = useSetProductItemAndPaxQuantity();

  const { productBreakdown, subtotal } = useSummaryPricingSelect();
  const t = useTranslations("String");

  const { startDate, endDate } = productItem || {};

  const [isPendingInitBookingDetails, startTransitionInitBookingDetailItems] = useTransition();

  const departureDates = productList?.reduce<{ departDate: string }[]>((acc, item) => {
    return [...acc, { departDate: item.startDate }];
  }, []);

  const lowestPrice = useMemo(() => {
    if (!productItem) return;
    const { configs } = productItem;
    if (!configs || !configs.length) return;
    let minPrice: number | undefined;
    configs.forEach((item) => {
      if (!minPrice && item.open > 0) {
        minPrice = item.adult;
      }
      if (minPrice && item.open > 0 && item.adult < minPrice) {
        minPrice = item.adult;
      }
    });
    return minPrice;
  }, [productItem]);

  const lowestPriceConfigItem = useMemo(() => {
    let minConfig: FeProductItem["configs"][0] | undefined;
    productItem?.configs.forEach((item) => {
      if (!minConfig) {
        minConfig = item;
      } else {
        if (item.open > 0 && item.adult < minConfig.adult) {
          minConfig = item;
        }
      }
    });

    return minConfig;
  }, [productItem]);

  const durationDay = useMemo(() => {
    if (!endDate || !startDate) return;
    const dayNum = stringToDate(endDate).diff(stringToDate(startDate), "days");
    return dayNum;
  }, [startDate, endDate]);

  const isInBookingDate = useCallback(
    (d: Dayjs) => {
      return (
        departureDates?.some((item) => {
          return d.isSame(stringToDate(item.departDate), "date");
        }) || false
      );
    },
    [departureDates],
  );

  const breakDownItems = useMemo(() => {
    type BreakDownItem = {
      type: PassengerType;
      pricing: number;
      id: number;
      configClass: string;
    };
    return Object.entries(productBreakdown).reduce<BreakDownItem[]>((acc, [type, configList]) => {
      const items = configList.map((configItem, _index) => ({
        type: type as PassengerType,
        pricing: configItem[type as PassengerType],
        id: configItem.recId,
        configClass: configItem.class,
      }));
      acc = [...acc, ...items];
      return acc;
    }, []);
  }, [productBreakdown]);

  const onChangeProduct = useCallback<Required<DatePickerProps>["onChange"]>((date) => {
    const newProduct = productList?.find((prd) => {
      return stringToDate(prd.startDate).isSame(date, "date");
    });

    newProduct && setProductItem(newProduct);
  }, []);

  const handleNextToPassengerInfo = () => {
    if (session.status === "unauthenticated" || session.status === "loading") {
      // message.info("Vui long Thuc hien dang nhap.");
      showAuthModal();
      return;
    }
    startTransitionInitBookingDetailItems(() => {
      initPassengerInfoThenGoToPassenger();
    });
  };

  useEffect(() => {
    setProductItem(defaultProductItem);
  }, [defaultProductItem]);

  return (
    <div
      className={classNames("col-booking", {
        [className]: className,
      })}
    >
      {!isMobile ? (
        <DesktopBoxSummary
          lowestPrice={lowestPrice}
          subtotal={subtotal}
          lowestPriceConfigItem={lowestPriceConfigItem}
          durationDay={durationDay}
          breakDownItems={breakDownItems}
          sellableDetails={productItem?.sellableDetails}
          promotions={productItem?.promotions}
          startDate={startDate}
          onNext={handleNextToPassengerInfo}
          onChangeProduct={onChangeProduct}
          isInBookingDate={isInBookingDate}
          isLoading={isPendingInitBookingDetails}
        />
      ) : (
        <MobileBoxSummary
          label={tourName}
          lowestPrice={lowestPrice}
          subtotal={subtotal}
          lowestPriceConfigItem={lowestPriceConfigItem}
          durationDay={durationDay}
          breakDownItems={breakDownItems}
          sellableDetails={productItem?.sellableDetails}
          promotions={productItem?.promotions}
          startDate={startDate}
          onNext={handleNextToPassengerInfo}
          onChangeProduct={onChangeProduct}
          isInBookingDate={isInBookingDate}
          isLoading={isPendingInitBookingDetails}
        />
      )}
      <HotlineBox label="Hotline" phoneNumber={"0982.013.089"} />
    </div>
  );
};
export default ProductSummary;
