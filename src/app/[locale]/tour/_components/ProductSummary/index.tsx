"use client";
import React, { useEffect, useTransition, useCallback, memo } from "react";
import { DatePickerProps } from "antd";
import classNames from "classnames";
import { FeProductItem } from "@/models/fe/productItem.interface";
import { useTranslations } from "next-intl";
import HotlineBox from "@/components/frontend/HotlineBox";
import { stringToDate } from "@/utils/date";
import ProductSummaryCard, { ProductSummaryCardProps } from "./ProductSummaryCard";
import { FeCMSTemplateContent } from "@/models/fe/templateContent.interface";
import useSelectProduct from "@/modules/fe/booking/product/useSelectProduct";
import useCoupon from "@/modules/fe/booking/coupon/useCoupon";
import useSelectPassengerQuantity from "@/modules/fe/booking/passenger/useSelectPassengerQuantity";
import { useBookingSelector } from "@/store";
import { Session } from "next-auth";
import useAuthModal from "@/modules/fe/auth/hooks/useAuthModal";
interface ProductSummaryProps {
  cmsTemplate: FeCMSTemplateContent;
  defaultProductItem: FeProductItem;
  className?: string;
  tourName?: string;
  productList?: FeProductItem[];
  isMobile: boolean;
  session: Session | null;
}
const ProductSummary: React.FC<ProductSummaryProps> = ({
  className = "",
  productList,
  defaultProductItem,
  isMobile,
  tourName,
  cmsTemplate,
  session,
}) => {
  const { showAuthModal } = useAuthModal();
  const t = useTranslations("String");
  const { addCouponPolicy, removeCouponPolicy, couponPolicy } = useCoupon();
  const { initTemplateAndProduct, setProductItem } = useSelectProduct();
  const { initPassengerFormDataThenGoToNext, setQuantityPassenger } = useSelectPassengerQuantity();
  const [isPendingInitBooking, startInitBooking] = useTransition();
  const bookingInformation = useBookingSelector();
  const productItem = bookingInformation.bookingInfo.product;
  const passengerAmounts = bookingInformation.bookingPassenger;

  const handleChangeCoupon: ProductSummaryCardProps["onChangeCoupon"] = (value, coupon) => {
    couponPolicy?.code === value ? removeCouponPolicy() : addCouponPolicy(coupon);
  };

  const handleChangeDepartDate = useCallback<Required<DatePickerProps>["onChange"]>((date) => {
    const newProduct = productList?.find((prd) => stringToDate(prd.startDate)?.isSame(date, "date"));
    newProduct && setProductItem(newProduct);
  }, []);

  const handleChangePassenger: Exclude<ProductSummaryCardProps["onChangePassenger"], undefined> = useCallback(
    (type, quantity, action) => {
      setQuantityPassenger({ type, quantity, action });
    },
    [initTemplateAndProduct],
  );

  const ensureUserLogedIn = (handler: Function) => () => {
    if (!session) {
      showAuthModal();
      return;
    }
    handler();
  };
  const handleGotoPassengerInformation = useCallback(() => {
    startInitBooking(() => {
      initPassengerFormDataThenGoToNext();
    });
  }, []);

  useEffect(() => {
    initTemplateAndProduct(defaultProductItem, cmsTemplate);
  }, [defaultProductItem]);

  const productCardProps: ProductSummaryCardProps = {
    passenger: passengerAmounts,
    productItem: productItem,
    productList: productList,
    coupon: couponPolicy,
    isLoading: isPendingInitBooking,
    promotion: {
      promotionImage: cmsTemplate.promotionImage,
      promotionLabel: cmsTemplate.promotionLabel,
      promotionLabelType: cmsTemplate.promotionLabelType,
      promotionReferencePrice: cmsTemplate.promotionReferencePrice,
      promotionValidFrom: cmsTemplate.promotionValidFrom,
      promotionValidTo: cmsTemplate.promotionValidTo,
    },
    onChangeDepartDate: handleChangeDepartDate,
    onChangePassenger: handleChangePassenger,
    onNext: ensureUserLogedIn(handleGotoPassengerInformation),
    onChangeCoupon: handleChangeCoupon,
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
            <div className="box-booking border border-primary-default min-h-[650px] lg:p-6 p-4 mb-4 rounded-2xl bg-white  relative z-10 overflow-hidden">
              <h3 className="font-semibold text-primary-default uppercase mb-6">{t("productSummary.title")}</h3>
              <ProductSummaryCard.Durations />
              <ProductSummaryCard.Badget />
              <ProductSummaryCard.CalendarSelector className="mb-6" />
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
        </div>
      )}
    </>
  );
};
export default memo(ProductSummary);
