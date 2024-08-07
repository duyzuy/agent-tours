"use client";
import React, { useEffect, useMemo, useTransition, useState } from "react";
import QuantityInput from "@/components/frontend/QuantityInput";
import { DatePickerProps } from "antd";
import classNames from "classnames";
import { FeProductItem } from "@/models/fe/productItem.interface";

import dayjs, { Dayjs } from "dayjs";

import { moneyFormatVND } from "@/utils/helper";
import { useTranslations } from "next-intl";
import useInitProductItemAndPassengersInformation from "@/app/[locale]/(booking)/modules/useInitProductItemAndPassengersInformation";
import { useBookingSelector } from "@/app/[locale]/hooks/useBookingInformation";
import { PassengerType } from "@/models/common.interface";
import useSummaryPricingSelect from "@/app/[locale]/(booking)/modules/useSummaryPricingSelect";
import HotlineBox from "@/components/frontend/HotlineBox";
import ProductSummaryWraper from "@/components/frontend/ProductSummaryWraper";
import useCoupon from "@/app/[locale]/(booking)/modules/useCoupon";
import useAuth from "@/app/[locale]/hooks/useAuth";
import useAuthModal from "@/app/[locale]/(auth)/hooks";
import CalendarSelector from "./CalendarSelector";
import PromotionSelector from "./PromotionSelector";
import { stringToDate } from "@/utils/date";

interface Props {
  className?: string;
  sellableList?: FeProductItem[];
  defaultSellable?: FeProductItem;
}
const ProductSummary = ({ className = "", sellableList, defaultSellable }: Props) => {
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
      return d.isSame(stringToDate(item.departDate), "date");
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
    console.log({ sellableList, date });
    const newProduct = sellableList?.find((prd) => {
      return stringToDate(prd.startDate).isSame(date, "date");
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
    <div
      className={classNames("col-booking", {
        [className]: className,
      })}
    >
      <ProductSummaryWraper
        label={t("productSummary.title")}
        productPrice={productItem?.configs.length ? moneyFormatVND(getLowestPrice(productItem.configs)) : undefined}
        openAmount={lowestPriceConfigItem?.open}
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
        <PromotionSelector
          value={bookingCounponPolicy?.code}
          items={productItem?.promotions || []}
          onSelect={(item) =>
            bookingCounponPolicy?.code === item.code ? removeCouponPolicy() : addCouponPolicy(item.code)
          }
        />
        <CalendarSelector
          label={t("productSummary.departDate.title")}
          value={productItem?.startDate ? stringToDate(productItem.startDate) : undefined}
          disabledDate={(date) => {
            if (isInBookingDate(date) && date.isAfter(dayjs())) {
              return false;
            }
            return true;
          }}
          onChange={onChangeProduct}
          className="mb-6"
        />
        <ProductSummary.PassengerQuantity
          label={t("productSummary.passengerQuantity.title")}
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
      </ProductSummaryWraper>
      <HotlineBox label="Hotline" phoneNumber={"0982.013.089"} />
    </div>
  );
};
export default ProductSummary;

interface ProductSummaryPassengerQuantityProps {
  label?: string;
  passenger: {
    adult: number;
    children: number;
    infant: number;
  };
  onChangePassenger?: (type: PassengerType, quantity: number, action: "plus" | "minus") => void;
}
ProductSummary.PassengerQuantity = function ProductSummaryPassengerQuantity({
  passenger,
  label,
  onChangePassenger,
}: ProductSummaryPassengerQuantityProps) {
  const t = useTranslations("String");

  const onChangeQuantityPax = (type: PassengerType, value: number, action: "plus" | "minus") => {
    onChangePassenger?.(type, value, action);
  };
  return (
    <div className="passengers mb-6">
      <div className="label mb-3">
        <p>{label}</p>
      </div>
      <div className="select flex">
        <QuantityInput
          size="sm"
          label={t("adult")}
          value={passenger["adult"]}
          className="w-1/3"
          maximum={9}
          minimum={1}
          onChange={(action, value) => onChangeQuantityPax(PassengerType.ADULT, value, action)}
        />
        <QuantityInput
          size="sm"
          label={t("children")}
          value={passenger["children"]}
          maximum={9}
          minimum={0}
          className="w-1/3"
          onChange={(action, value) => onChangeQuantityPax(PassengerType.CHILD, value, action)}
        />
        <QuantityInput
          size="sm"
          label={t("infant")}
          value={passenger["infant"]}
          maximum={9}
          minimum={0}
          className="w-1/3"
          onChange={(action, value) => onChangeQuantityPax(PassengerType.INFANT, value, action)}
        />
      </div>
    </div>
  );
};
