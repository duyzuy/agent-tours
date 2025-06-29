import { Button, Space } from "antd";
import classNames from "classnames";

import { PassengerType } from "@/models/common.interface";
import { FeProductItem } from "@/models/fe/productItem.interface";

import { useTranslations } from "next-intl";
import React, { createContext, PropsWithChildren, useCallback, useContext, useMemo } from "react";
import PromotionSelector from "./PromotionSelector";
import { ProductSummaryCardNoPrice } from "./ProductSummaryPrice";
import CalendarSelector from "../CalendarSelector";
import { stringToDate } from "@/utils/date";
import { IconCalendarRange, IconPlane } from "@/assets/icons";
import { FeCMSTemplateContent } from "@/models/fe/templateContent.interface";
import SoleOut from "./SoleOut";
import dayjs from "dayjs";
import ProductCardTitle from "./ProductCardTitle";
import ProductPassengersQuantity from "./ProductPassengersQuantity";
import ProductSummaryDrawer from "./ProductSummaryDrawer";
import ProductCardPrice from "./ProductCardPrice";
import ProductCardBadget from "./ProductCardBadget";
import ProductCardSubTotal from "./ProductCardSubTotal";
import ProductCardInventories from "./ProductCardInventories";
import ProductSummaryDepartInformation from "./ProductSummaryDepartInformation";
import ButtonBookNow from "./ButtonBookNow";

type ProductSummaryContextType = {
  productItem?: FeProductItem;
  productList?: FeProductItem[];
  passenger?: {
    adult: number;
    child: number;
    infant: number;
  };
  coupon?: FeProductItem["promotions"][0];
  promotion?: Pick<
    FeCMSTemplateContent,
    | "promotionImage"
    | "promotionLabel"
    | "promotionLabelType"
    | "promotionReferencePrice"
    | "promotionValidFrom"
    | "promotionValidTo"
  >;
  onChangeCoupon?: (value: string, item: FeProductItem["promotions"][number]) => void;
  onChangePassenger?: (type: PassengerType, quantity: number, action: "minus" | "plus") => void;
  onChangeDepartDate?: (value: dayjs.Dayjs | null, dateString: string) => void;
  onNext?: () => void;
  isLoading?: boolean;
};
type ProductSummaryCardProps = PropsWithChildren &
  ProductSummaryContextType & {
    className?: string;
  };

type BaseProductSummaryType = { className?: string };

export type ProductSummaryCardCompound = {
  Title: React.FC<BaseProductSummaryType & { text?: string }>;
  Price: React.FC<BaseProductSummaryType>;
  PassengerSelector: React.FC<BaseProductSummaryType & { layout?: "vertical" | "horizontal"; size?: "sm" | "md" }>;
  Durations: React.FC<BaseProductSummaryType>;
  Inventories: React.FC<BaseProductSummaryType>;
  CalendarSelector: React.FC<
    BaseProductSummaryType & {
      isMobile?: boolean;
    }
  >;
  Drawer: React.FC<BaseProductSummaryType & { children: React.ReactNode }>;
  Promotion: React.FC<BaseProductSummaryType>;
  Subtotal: React.FC<BaseProductSummaryType>;
  SubmitButton: React.FC<BaseProductSummaryType>;
  CanBooking: React.FC<BaseProductSummaryType & { children?: React.ReactNode }>;
  Badget: React.FC<BaseProductSummaryType & { children?: React.ReactNode }>;
};

const ProductSummaryContext = createContext<ProductSummaryContextType | undefined>(undefined);

export const useProductSummaryCard = () => {
  const context = useContext(ProductSummaryContext);
  if (!context) {
    throw new Error("Hook must use in ProductSummaryCard provider");
  }
  return context;
};

const ProductSummaryCard = ({ children, className = "", ...restProps }: ProductSummaryCardProps) => {
  return (
    <ProductSummaryContext.Provider value={{ ...restProps }}>
      <div
        className={classNames("product-summary-card", {
          [className]: className,
        })}
      >
        {children}
      </div>
    </ProductSummaryContext.Provider>
  );
};

const CardCalendarSelector: ProductSummaryCardCompound["CalendarSelector"] = ({ className = "", isMobile }) => {
  const { productList, productItem, onChangeDepartDate } = useProductSummaryCard();

  const t = useTranslations("String");
  const departureDates = productList?.reduce<{ departDate: string }[]>((acc, item) => {
    return [...acc, { departDate: item.startDate }];
  }, []);

  const disabledDate = useCallback(
    (d: dayjs.Dayjs) => {
      if (!departureDates) return true;
      return departureDates.every((item) => {
        return !d.isSame(stringToDate(item.departDate), "date");
      });
    },
    [departureDates],
  );

  return (
    <CalendarSelector
      label={t("productSummary.departDate.title")}
      className={classNames({ [className]: className })}
      value={productItem ? stringToDate(productItem.startDate) : undefined}
      disabledDate={disabledDate}
      onChange={onChangeDepartDate}
      isMobile={isMobile}
    />
  );
};

const CheckCanBooking: ProductSummaryCardCompound["CanBooking"] = ({ children }) => {
  const { productItem } = useProductSummaryCard();

  const t = useTranslations("String");

  const isSoleOut = productItem?.open === 0 || productItem?.configs.every((item) => item.open === 0);

  const isNotConfigPrice = !productItem?.configs.length;

  if (isSoleOut) return <SoleOut label="Đã bán hết" description="Vui lòng chọn ngày khởi hành khác." />;

  if (isNotConfigPrice)
    return <ProductSummaryCardNoPrice label={t("card.contact")} description={t("productSummary.emptyPrices")} />;

  return children;
};

ProductSummaryCard.Title = ProductCardTitle;
ProductSummaryCard.PassengerSelector = ProductPassengersQuantity;
ProductSummaryCard.Price = ProductCardPrice;
ProductSummaryCard.Durations = ProductSummaryDepartInformation;
ProductSummaryCard.Inventories = ProductCardInventories;
ProductSummaryCard.Drawer = ProductSummaryDrawer;
ProductSummaryCard.Promotion = PromotionSelector;
ProductSummaryCard.Subtotal = ProductCardSubTotal;
ProductSummaryCard.CalendarSelector = CardCalendarSelector;
ProductSummaryCard.SubmitButton = ButtonBookNow;
ProductSummaryCard.CanBooking = CheckCanBooking;
ProductSummaryCard.Badget = ProductCardBadget;

export default ProductSummaryCard;
export type { ProductSummaryCardProps };
