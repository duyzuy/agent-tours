"use client";
import React, { useEffect, useMemo, useTransition, useState, useCallback } from "react";
import { DatePickerProps } from "antd";
import classNames from "classnames";
import { FeProductItem } from "@/models/fe/productItem.interface";
import { useTranslations } from "next-intl";
import HotlineBox from "@/components/frontend/HotlineBox";
import useAuthModal from "@/app/[locale]/(auth)/hooks";
import { stringToDate } from "@/utils/date";

import ProductSummaryCard, { ProductSummaryCardProps } from "./ProductSummaryCard";
import { FeCMSTemplateContent } from "@/models/fe/templateContent.interface";
// import useCoupon from "@/app/[locale]/(booking)/modules/useCoupon";
// import useSelectProduct from "@/app/[locale]/(booking)/modules/useSelectProduct";
// import useSelectPassengerQuantity from "@/app/[locale]/(booking)/modules/useSelectPassengerQuantity";

import useSelectProduct from "@/modules/fe/booking/product/useSelectProduct";
import useCoupon from "@/modules/fe/booking/coupon/useCoupon";
import useSelectPassengerQuantity from "@/modules/fe/booking/passenger/useSelectPassengerQuantity";
import { useBookingSelector } from "@/store";
import useAuth from "@/hooks/fe/useAuth";
interface ProductSummaryProps {
  cmsTemplate: FeCMSTemplateContent;
  defaultProductItem: FeProductItem;
  className?: string;
  tourName?: string;
  productList?: FeProductItem[];
  isMobile: boolean;
}
const ProductSummary: React.FC<ProductSummaryProps> = ({
  className = "",
  productList,
  defaultProductItem,
  isMobile,
  tourName,
  cmsTemplate,
}) => {
  const t = useTranslations("String");
  const productItem = useBookingSelector((state) => state.bookingInfo.product);
  const passengers = useBookingSelector((state) => state.bookingPassenger);

  const { addCouponPolicy, removeCouponPolicy, couponPolicy } = useCoupon();

  const { initTemplateAndProduct, setProductItem } = useSelectProduct();
  const { session } = useAuth();

  const { showAuthModal } = useAuthModal();
  const { initPassengerFormDataThenGoToNext, setQuantityPassenger } = useSelectPassengerQuantity();
  const [isPendingInitBookingDetails, startTransitionInitBookingDetailItems] = useTransition();

  const handleChangeCoupon: ProductSummaryCardProps["onChangeCoupon"] = (value, coupon) => {
    couponPolicy?.code === value ? removeCouponPolicy() : addCouponPolicy(coupon);
  };

  const onChangeProduct = useCallback<Required<DatePickerProps>["onChange"]>((date) => {
    const newProduct = productList?.find((prd) => {
      return stringToDate(prd.startDate)?.isSame(date, "date");
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
      initPassengerFormDataThenGoToNext();
    });
  };

  const handleChangePassenger: ProductSummaryCardProps["onChangePassenger"] = (type, quantity, action) =>
    setQuantityPassenger({ type, quantity, action });

  useEffect(() => {
    initTemplateAndProduct(defaultProductItem, cmsTemplate);
  }, [defaultProductItem]);

  const productCardProps: ProductSummaryCardProps = {
    passenger: passengers,
    productItem: productItem,
    productList: productList,
    coupon: couponPolicy,
    onChangeDepartDate: onChangeProduct,
    onChangePassenger: handleChangePassenger,
    onNext: handleNextToPassengerInfo,
    onChangeCoupon: handleChangeCoupon,
    isLoading: isPendingInitBookingDetails,
    promotion: {
      promotionImage: cmsTemplate.promotionImage,
      promotionLabel: cmsTemplate.promotionLabel,
      promotionLabelType: cmsTemplate.promotionLabelType,
      promotionReferencePrice: cmsTemplate.promotionReferencePrice,
      promotionValidFrom: cmsTemplate.promotionValidFrom,
      promotionValidTo: cmsTemplate.promotionValidTo,
    },
  };

  return (
    <>
      {isMobile ? (
        <ProductSummaryCard {...productCardProps}>
          <ProductSummaryCard.Drawer>
            <ProductSummaryCard.Title className="mb-4" text={tourName} />
            <ProductSummaryCard.CalendarSelector className="mb-6" isMobile={true} />
            <ProductSummaryCard.Durations />
            <ProductSummaryCard.Inventories className="mb-6" />
            <ProductSummaryCard.Promotion className="mb-6" />
            <ProductSummaryCard.CanBooking>
              <ProductSummaryCard.Price className="mb-6" />
              <ProductSummaryCard.PassengerSelector className="mb-6" layout="vertical" size="md" />
              <ProductSummaryCard.Subtotal />
            </ProductSummaryCard.CanBooking>
          </ProductSummaryCard.Drawer>
        </ProductSummaryCard>
      ) : (
        <div
          className={classNames("col-booking", {
            [className]: className,
          })}
        >
          <ProductSummaryCard {...productCardProps}>
            <div className="box-booking border min-h-[650px] lg:px-6 px-4 pt-4 pb-6 mb-4 rounded-md bg-white shadow-sm relative z-10 overflow-hidden">
              <div className="header py-3 flex items-center justify-between">
                <h3 className="font-semibold text-primary-default uppercase">{t("productSummary.title")}</h3>
              </div>
              <ProductSummaryCard.Badget />
              <ProductSummaryCard.CalendarSelector className="mb-6" />
              <ProductSummaryCard.Durations />
              <ProductSummaryCard.Inventories className="mb-6" />
              <ProductSummaryCard.Promotion className="mb-6" />
              <ProductSummaryCard.CanBooking>
                <ProductSummaryCard.Price className="mb-6" />
                <ProductSummaryCard.PassengerSelector className="mb-6" />
                <ProductSummaryCard.Subtotal className="py-6" />
                <ProductSummaryCard.SubmitButton />
              </ProductSummaryCard.CanBooking>
            </div>
          </ProductSummaryCard>
          <HotlineBox label="Hotline" phoneNumber={"0982.013.089"} />
        </div>
      )}
    </>
  );
};
export default ProductSummary;
