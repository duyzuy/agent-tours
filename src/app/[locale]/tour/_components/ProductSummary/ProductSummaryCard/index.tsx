import { Button, Drawer, Space, Tag } from "antd";
import classNames from "classnames";
import styled from "styled-components";
import Quantity from "@/components/base/Quantity";
import { PassengerType } from "@/models/common.interface";
import { FeProductItem } from "@/models/fe/productItem.interface";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import React, { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from "react";
import PromotionSelector from "./PromotionSelector";
import ProductSummarySubtotal, { ProductSummarySubtotalProps } from "./ProductSummarySubtotal";
import { ProductSummaryCardNoPrice, ProductSummaryCardWithPrice } from "./ProductSummaryPrice";
import CalendarSelector from "../CalendarSelector";
import { stringToDate } from "@/utils/date";
import { IconCalendarRange, IconCheckCircle, IconPlane } from "@/assets/icons";
import { moneyFormatVND } from "@/utils/helper";
import { FeCMSTemplateContent } from "@/models/fe/templateContent.interface";
import { getLabelHotDealIcon } from "@/constants/icons.constant";
import { usePathname } from "@/utils/navigation";

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
  onChangeCoupon?: (value: string, item: FeProductItem["promotions"][0]) => void;
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
type ProductSummaryCardCompound = {
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

const useProductSummaryCard = () => {
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

const CardTitle: ProductSummaryCardCompound["Title"] = ({ text, className = "" }) => {
  return (
    <div
      className={classNames("produuct-summary-card__title", {
        [className]: className,
      })}
    >
      <h3 className="font-[500] text-lg">{text}</h3>
    </div>
  );
};

const CardPassengerSelector: ProductSummaryCardCompound["PassengerSelector"] = ({
  className = "",
  layout = "horizontal",
  size = "sm",
}) => {
  const { passenger, onChangePassenger } = useProductSummaryCard();
  const t = useTranslations("String");

  return (
    <div
      className={classNames("passengers-selection", {
        [className]: className,
      })}
    >
      <div className="label mb-3 border-b pb-3">
        <span className="font-semibold">{t("productSummary.passengerQuantity.title")}</span>
      </div>
      <div
        className={classNames("flex gap-y-3", {
          "flex-row": layout === "horizontal",
          "flex-col": layout === "vertical",
        })}
      >
        <div
          className={classNames("quantity-item", {
            "w-1/3 gap-y-3 flex flex-col": layout === "horizontal",
            "flex items-center justify-between": layout === "vertical",
          })}
        >
          <div className="label">
            <p>{t("adult")}</p>
            <p className="text-xs text-gray-600">{`Từ 12 tuổi`}</p>
          </div>
          <Quantity
            maximum={9}
            minimum={1}
            size={size}
            value={passenger?.["adult"]}
            onChange={(action, value) => onChangePassenger?.(PassengerType.ADULT, value, action)}
          />
        </div>
        <div
          className={classNames("quantity-item", {
            "w-1/3 gap-y-3 flex flex-col": layout === "horizontal",
            "flex items-center justify-between": layout === "vertical",
          })}
        >
          <div className="label">
            <p>{t("children")}</p>
            <p className="text-xs text-gray-600">{`Từ 2 - 11 tuổi`}</p>
          </div>
          <Quantity
            maximum={9}
            minimum={0}
            size={size}
            value={passenger?.["child"]}
            onChange={(action, value) => onChangePassenger?.(PassengerType.CHILD, value, action)}
          />
        </div>
        <div
          className={classNames("quantity-item", {
            "w-1/3 gap-y-3 flex flex-col": layout === "horizontal",
            "flex items-center justify-between": layout === "vertical",
          })}
        >
          <div className="label">
            <span>{t("infant")}</span>
            <p className="text-xs text-gray-600">{`Dưới 2 tuổi`}</p>
          </div>
          <Quantity
            maximum={9}
            minimum={0}
            size={size}
            value={passenger?.["infant"]}
            onChange={(action, value) => onChangePassenger?.(PassengerType.INFANT, value, action)}
          />
        </div>
      </div>
    </div>
  );
};

const CardPrice: ProductSummaryCardCompound["Price"] = ({ className }) => {
  const { productItem, promotion } = useProductSummaryCard();

  const isOnPromotion = useMemo(() => {
    const now = dayjs();
    if (!promotion || !promotion.promotionValidFrom || !promotion.promotionValidTo) return false;

    if (
      now.isBefore(stringToDate(promotion.promotionValidFrom)) ||
      now.isAfter(stringToDate(promotion.promotionValidTo))
    ) {
      return false;
    }
    return true;
  }, [promotion]);

  const t = useTranslations("String");
  const lowestConfig = useMemo(() => {
    if (!productItem || !productItem.configs || !productItem.configs.length) return;

    const { configs } = productItem;

    let lowestItem = configs[0];

    configs.forEach((item) => {
      if (lowestItem.open <= 0 && item.open > 0) {
        lowestItem = item;
      }
      if (item.open > 0 && item.adult < lowestItem.adult) {
        lowestItem = item;
      }
    });
    return lowestItem;
  }, [productItem]);

  return (
    <>
      {lowestConfig ? (
        <ProductSummaryCardWithPrice
          price={lowestConfig.adult}
          referencePrice={isOnPromotion ? promotion?.promotionReferencePrice : undefined}
          subText={t("justFrom")}
          note={t("productSummary.amountRemain", {
            amount: lowestConfig.open,
          })}
          className={className}
        />
      ) : (
        <ProductSummaryCardNoPrice
          label={t("card.contact")}
          description={t("productSummary.emptyPrices")}
          className={className}
        />
      )}
    </>
  );
};

const CardPromotion: ProductSummaryCardCompound["Promotion"] = ({ className }) => {
  const { productItem, coupon, onChangeCoupon } = useProductSummaryCard();

  return (
    <PromotionSelector
      items={productItem?.promotions}
      value={coupon?.code}
      onChange={onChangeCoupon}
      className={className}
    />
  );
};

const CardSubTotal: ProductSummaryCardCompound["Subtotal"] = ({ className }) => {
  const { productItem, passenger, coupon } = useProductSummaryCard();

  const priceConfigsByPaxType = useMemo(() => {
    const pricingListPicker = productItem?.configs
      .reduce<FeProductItem["configs"]>((acc, configItem) => {
        const item = createArrayItemFromLength(configItem.open, configItem);
        return [...acc, ...item];
      }, [])
      .sort((a, b) => a.adult - b.adult);

    // let pricingListPicker = getProductFlatPricings();

    let output: {
      [key in PassengerType]: FeProductItem["configs"];
    } = { adult: [], child: [], infant: [] };

    if (passenger && pricingListPicker) {
      Object.entries(passenger).forEach(([type, amount]) => {
        for (let i = 0; i < amount; i++) {
          const priceConfigItem = pricingListPicker.shift();

          output[type as PassengerType] = priceConfigItem
            ? [...output[type as PassengerType], priceConfigItem]
            : [...output[type as PassengerType]];
        }
      });
    }
    return output;
  }, [productItem, passenger]);

  const subTotal = useMemo(() => {
    let subtotal = 0;
    Object.entries(priceConfigsByPaxType).forEach(([type, priceList]) => {
      priceList.forEach((configItem) => {
        subtotal += configItem[type as PassengerType];
      });
    });
    if (coupon) {
      subtotal = subtotal - coupon.discountAmount;
    }
    return subtotal;
  }, [priceConfigsByPaxType, coupon]);

  const items = useMemo(() => {
    return Object.entries(priceConfigsByPaxType).reduce<Required<ProductSummarySubtotalProps>["items"]>(
      (acc, [type, configList]) => {
        const items = configList.map((configItem, _index) => ({
          type: type as PassengerType,
          pricing: configItem[type as PassengerType],
          id: configItem.recId,
          configClass: configItem.class,
        }));
        acc = [...acc, ...items];
        return acc;
      },
      [],
    );
  }, [priceConfigsByPaxType]);

  return <ProductSummarySubtotal items={items} subtotal={subTotal} coupon={coupon} className={className} />;
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

const CardSubmitButton: ProductSummaryCardCompound["SubmitButton"] = ({ className = "" }) => {
  const t = useTranslations("String");
  const { onNext, isLoading } = useProductSummaryCard();
  return (
    <Button type="primary" block className="bg-primary-default" onClick={onNext} size="large" loading={isLoading}>
      {t("button.bookNow")}
    </Button>
  );
};

const ProductSummaryDepartInformation: ProductSummaryCardCompound["Durations"] = ({ className }) => {
  const t = useTranslations("String");
  const { productItem } = useProductSummaryCard();

  const durationDay = useMemo(() => {
    if (!productItem || !productItem.endDate || !productItem.startDate) return;
    const dayNum = stringToDate(productItem.endDate)?.diff(stringToDate(productItem.startDate), "days");
    return dayNum;
  }, [productItem]);

  return (
    <ul className="mb-3">
      {durationDay ? (
        <li>
          <Space>
            <IconCalendarRange className="w-5 h-5" />
            <span className="text-[16px]">
              {t("card.durationDayValues", { day: durationDay, night: durationDay - 1 })}
            </span>
          </Space>
        </li>
      ) : null}
      <li>
        <Space>
          <IconPlane className="w-5 h-5" />
          <span className="text-[16px]">{productItem?.template.depart.name_vi}</span>
        </Space>
      </li>
    </ul>
  );
};

const ProductSummaryCardInventories: ProductSummaryCardCompound["Inventories"] = ({ className = "" }) => {
  const t = useTranslations("String");
  const { productItem } = useProductSummaryCard();

  const inventories = useMemo(() => {
    return productItem?.sellableDetails.inventories;
  }, [productItem]);

  const stocks = useMemo(() => {
    return productItem?.sellableDetails.stocks;
  }, [productItem]);

  return inventories || stocks ? (
    <div
      className={classNames("tour-included", {
        [className]: className,
      })}
    >
      <h3 className="font-[500] mb-2">Tour bao gồm</h3>
      <ul className="service-includes">
        {inventories?.map((inv) => (
          <li className="inv" key={inv.recId}>
            {/* {inv.type === EInventoryType.AIR ? ""} */}
            <div className="inv-inner flex items-center gap-x-2">
              <IconCheckCircle className="text-emerald-600 w-4 h-4" />
              {inv.name}
            </div>
          </li>
        ))}
        {stocks?.map((item) => (
          <li className="inv" key={item.recId}>
            {/* {inv.type === EInventoryType.AIR ? ""} */}
            <div className="inv-inner flex items-center gap-x-2">
              <IconCheckCircle className="text-emerald-600 w-4 h-4" />
              {`${item.inventory.name}`}
              <span className="text-xs text-gray-600">{item.type}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  ) : null;
};

const ProductSummaryCardDrawer: ProductSummaryCardCompound["Drawer"] = ({ children }) => {
  const { productItem, onNext, isLoading } = useProductSummaryCard();

  const pathName = usePathname();
  const t = useTranslations("String");

  const lowestConfig = useMemo(() => {
    if (!productItem || !productItem.configs || !productItem.configs.length) return;

    const { configs } = productItem;

    let output = configs[0];

    configs.forEach((item) => {
      if (output.open <= 0 && item.open > 0) {
        output = item;
      }
      if (item.open > 0 && item.adult < output.adult) {
        output = item;
      }
    });
    return output;
  }, [productItem]);
  const [isOpenDrawer, setOpenDrawer] = useState(false);

  const closeDrawer = () => {
    setOpenDrawer(false);
  };
  const openDrawer = () => {
    setOpenDrawer(true);
  };
  useEffect(() => {
    setOpenDrawer(false);
  }, [pathName]);
  return (
    <>
      <div
        className="mb-box-summary-booking__head fixed z-30 left-0 right-0 bottom-0 bg-white border-t"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {lowestConfig ? (
          <div className="flex items-center px-4 py-3">
            <div className="price block w-1/2">
              <span className="text-xs block">{t("justFrom")}</span>
              <span className="text-red-600 font-semibold text-lg block">{moneyFormatVND(lowestConfig.adult)}</span>
            </div>
            <div className="buttons w-1/2">
              <Button type="primary" block className="bg-primary-default w-full" onClick={openDrawer} size="large">
                {t("button.bookNow")}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center px-3 gap-3 py-2">
            <div className="text-xs">
              <p>Hiện chưa có mức giá bán cho tour khởi hành ngày này.</p>
            </div>
            <Button type="primary" onClick={openDrawer} size="large">
              Chọn ngày khác
            </Button>
          </div>
        )}
      </div>
      <DrawerBookingSummary
        open={isOpenDrawer}
        placement="bottom"
        height={"calc(80vh - env(safe-area-inset-bottom))"}
        push={false}
        destroyOnClose={true}
        closeIcon={null}
        onClose={closeDrawer}
        footer={
          <div className="flex gap-x-3 py-3">
            <Button type="text" size="large" className="!bg-gray-100 !text-gray-600 flex-1" onClick={closeDrawer}>
              Huỷ bỏ
            </Button>
            <Button
              type="primary"
              block
              className="bg-primary-default flex-1"
              onClick={onNext}
              size="large"
              loading={isLoading}
            >
              {t("button.bookNow")}
            </Button>
          </div>
        }
      >
        {children}
      </DrawerBookingSummary>
    </>
  );
};
const DrawerBookingSummary = styled(Drawer)`
  &.travel-drawer-content {
    border-radius: 10px 10px 0 0;
    .travel-drawer-body {
      padding: 16px;
    }
  }
`;

const CheckCanBooking: ProductSummaryCardCompound["CanBooking"] = ({ children }) => {
  const { productItem } = useProductSummaryCard();
  const t = useTranslations("String");
  const isNotBooking =
    !productItem || !productItem?.configs.length || productItem?.configs.every((item) => item.open === 0);
  return isNotBooking ? (
    <ProductSummaryCardNoPrice
      label={t("card.contact")}
      description={t("productSummary.emptyPrices")}
      className="mb-3"
    />
  ) : (
    children
  );
};

const Badget: ProductSummaryCardCompound["Badget"] = ({ className }) => {
  const { promotion } = useProductSummaryCard();
  const { promotionLabelType, promotionLabel, promotionImage, promotionValidFrom, promotionValidTo } = promotion || {};
  const IconEl = getLabelHotDealIcon(promotionImage ?? "");

  const isOnPromotion = useMemo(() => {
    const now = dayjs();
    if (!promotionValidTo || !promotionValidFrom) return false;

    if (now.isBefore(stringToDate(promotionValidFrom)) || now.isAfter(stringToDate(promotionValidTo))) {
      return false;
    }
    return true;
  }, [promotionValidFrom, promotionValidTo]);

  if (isOnPromotion && promotionLabelType === "text") {
    return (
      <span className="absolute z-10 w-24 h-24 -top-12 -right-6 bg-rose-600 rounded-full">
        <span className="w-12 h-12 absolute left-4 bottom-0 flex items-center text-[13px] leading-[16px] text-white text-center">
          {promotionLabel}
        </span>
      </span>
    );
  }
  if (isOnPromotion && promotionLabelType === "image") {
    return IconEl ? (
      <span className="absolute z-10 top-1 right-1">{<IconEl.icon width={32} height={32} />}</span>
    ) : null;
  }

  return null;
};

const createArrayItemFromLength = <ItemType,>(length: number, item: ItemType) => {
  return Array.from({ length: length }, (v, k) => item);
};

ProductSummaryCard.Title = CardTitle;
ProductSummaryCard.PassengerSelector = CardPassengerSelector;
ProductSummaryCard.Price = CardPrice;
ProductSummaryCard.Durations = ProductSummaryDepartInformation;
ProductSummaryCard.Inventories = ProductSummaryCardInventories;
ProductSummaryCard.Drawer = ProductSummaryCardDrawer;
ProductSummaryCard.Promotion = CardPromotion;
ProductSummaryCard.Subtotal = CardSubTotal;
ProductSummaryCard.CalendarSelector = CardCalendarSelector;
ProductSummaryCard.SubmitButton = CardSubmitButton;
ProductSummaryCard.CanBooking = CheckCanBooking;
ProductSummaryCard.Badget = Badget;

export default ProductSummaryCard;
export type { ProductSummaryCardProps };
