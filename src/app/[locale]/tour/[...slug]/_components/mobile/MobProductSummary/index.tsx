"use client";
import React, { useEffect, useMemo, useTransition } from "react";
import QuantityInput from "@/components/frontend/QuantityInput";
import { Form, DatePickerProps, message } from "antd";
import classNames from "classnames";
import { FeProductItem } from "@/models/fe/productItem.interface";
import FeDatePicker from "@/components/frontend/FeDatePicker";
import dayjs, { Dayjs } from "dayjs";
import FormItem from "@/components/base/FormItem";
import { useState } from "react";
import { moneyFormatVND } from "@/utils/helper";
import { useTranslations } from "next-intl";
import useInitProductItemAndPassengersInformation from "@/app/[locale]/(booking)/modules/useInitProductItemAndPassengersInformation";
import { useBookingSelector } from "@/app/[locale]/hooks/useBookingInformation";
import { PassengerType } from "@/models/common.interface";
import useSummaryPricingSelect from "@/app/[locale]/(booking)/modules/useSummaryPricingSelect";
import MobProductSummaryWraper from "@/components/frontend/mobile/MobProductSummaryWraper";
import { formatDate } from "@/utils/date";
import useCoupon from "@/app/[locale]/(booking)/modules/useCoupon";
import useAuth from "@/app/[locale]/hooks/useAuth";
import useAuthModal from "@/app/[locale]/(auth)/hooks";

import CalendarSelector from "./CalendarSelector";
import Quantity from "@/components/base/Quantity";

interface Props {
  className?: string;
  sellableList?: FeProductItem[];
  defaultSellable?: FeProductItem;
  name?: string;
}
const MobProductSummary = ({ className = "", sellableList, defaultSellable, name }: Props) => {
  const bookingPassenger = useBookingSelector((state) => state.bookingPassenger);
  const bookingCounponPolicy = useBookingSelector((state) => state.bookingInfo.couponPolicy);
  const { session } = useAuth();
  const { showAuthModal } = useAuthModal();

  const {
    initProduct,
    setQuantityPassenger,
    // resetQuantityPassenger,
    // initBookingDetailItemsThenGoToPassengerInfo,
    initPassengerInfoThenGoToPassenger,
  } = useInitProductItemAndPassengersInformation();
  const { addCouponPolicy, removeCouponPolicy } = useCoupon();
  const { productBreakdown, subtotal } = useSummaryPricingSelect();
  const t = useTranslations("String");

  const [productItem, setProductItem] = useState<FeProductItem | undefined>(defaultSellable);

  const departureDates = sellableList?.reduce<{ departDate: string }[]>((acc, item) => {
    return [...acc, { departDate: item.startDate }];
  }, []);

  const [isPendingInitBookingDetails, startTransitionInitBookingDetailItems] = useTransition();

  const isInBookingDate = (d: Dayjs) => {
    return departureDates?.some((item) => {
      return d.isSame(dayjs(item.departDate), "date");
    });
  };

  const getLowestPrice = (configs: FeProductItem["configs"]) => {
    let minPrice = 99999999999999;
    configs.forEach((item) => {
      if (item.open > 0 && item.adult < minPrice) {
        minPrice = item.adult;
      }
    });
    return minPrice;
  };
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

  const onChangeProduct: DatePickerProps["onChange"] = (date) => {
    const newProduct = sellableList?.find((prd) => {
      return dayjs(prd.startDate).isSame(date);
    });

    newProduct && setProductItem(newProduct);
  };
  const breakDownItems = useMemo(() => {
    return Object.entries(productBreakdown).reduce<
      {
        type: PassengerType;
        pricing: string;
        id: number;
        configClass: string;
      }[]
    >((acc, [type, configList]) => {
      const items = configList.map((configItem, _index) => ({
        type: type as PassengerType,
        pricing: moneyFormatVND(configItem[type as PassengerType]),
        id: configItem.recId,
        configClass: configItem.class,
      }));
      acc = [...acc, ...items];
      return acc;
    }, []);
  }, [productBreakdown]);

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
    initProduct(productItem);
  }, [productItem]);

  return (
    <>
      <div
        className={classNames("mb-summary-booking", {
          [className]: className,
        })}
      >
        <MobProductSummaryWraper
          label={name}
          productPrice={productItem?.configs.length ? moneyFormatVND(getLowestPrice(productItem.configs)) : undefined}
          openAmount={lowestPriceConfigItem?.open}
          promotion={{
            selectedCode: bookingCounponPolicy?.code,
            items: productItem?.promotions.map((item) => ({
              name: item.name,
              code: item.code,
              price: moneyFormatVND(item.discountAmount),
              validFrom: formatDate(item.validFrom, "dd/MM/yyyy"),
              validTo: formatDate(item.validTo, "dd/MM/yyyy"),
              type: item.type,
            })),
            onSelect: (code) => {
              bookingCounponPolicy?.code === code ? removeCouponPolicy() : addCouponPolicy(code);
            },
          }}
          onBookNow={handleNextToPassengerInfo}
          isLoading={isPendingInitBookingDetails}
          breakDown={{
            pricingConfigs: breakDownItems,
            couponPolicy: bookingCounponPolicy && {
              code: bookingCounponPolicy.code,
              discountAmount: moneyFormatVND(bookingCounponPolicy.discountAmount),
            },
            subtotal: moneyFormatVND(subtotal),
          }}
        >
          <CalendarSelector
            value={dayjs(productItem?.startDate)}
            disabledDate={(date) => {
              if (isInBookingDate(date) && date.isAfter(dayjs())) {
                return false;
              }
              return true;
            }}
            onChange={onChangeProduct}
          />
          <div className="h-6"></div>
          <MobProductSummary.PassengerQuantity
            label={"Số lượng hành khách"}
            passenger={{
              adult: bookingPassenger.adult,
              children: bookingPassenger.child,
              infant: bookingPassenger.infant,
            }}
            onChangePassenger={(type, quantity, action) =>
              setQuantityPassenger({
                type: type,
                quantity: quantity,
                action,
              })
            }
          />
        </MobProductSummaryWraper>
      </div>
    </>
  );
};
export default MobProductSummary;

interface ProductSummaryPassengerQuantityProps {
  label?: string;
  passenger: {
    adult: number;
    children: number;
    infant: number;
  };
  onChangePassenger?: (type: PassengerType, quantity: number, action: "plus" | "minus") => void;
}
MobProductSummary.PassengerQuantity = function ProductSummaryPassengerQuantity({
  passenger,
  label,
  onChangePassenger,
}: ProductSummaryPassengerQuantityProps) {
  const t = useTranslations("String");

  const onChangeQuantityPax = (type: PassengerType, value: number, action: "plus" | "minus") => {
    onChangePassenger?.(type, value, action);
  };
  return (
    <>
      <div className="passengers-selection mb-4 border rounded-lg p-4">
        <div className="label mb-3">
          <p>{label}</p>
        </div>
        <div className="flex flex-col gap-y-3">
          <div className="quantity-adult flex items-center justify-between">
            <span>{t("adult")}</span>
            <Quantity
              maximum={9}
              minimum={1}
              value={passenger["adult"]}
              onChange={(action, value) => onChangeQuantityPax(PassengerType.ADULT, value, action)}
            />
          </div>
          <div className="quantity-adult flex items-center justify-between">
            <span>{t("children")}</span>
            <Quantity
              maximum={9}
              minimum={0}
              value={passenger["children"]}
              onChange={(action, value) => onChangeQuantityPax(PassengerType.CHILD, value, action)}
            />
          </div>
          <div className="quantity-adult flex items-center justify-between">
            <span>{t("infant")}</span>
            <Quantity
              maximum={9}
              minimum={0}
              value={passenger["infant"]}
              onChange={(action, value) => onChangeQuantityPax(PassengerType.INFANT, value, action)}
            />
          </div>
        </div>
      </div>
    </>
  );
};
