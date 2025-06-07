import { FeProductItem } from "@/models/fe/productItem.interface";
import { ProductSummaryCardCompound, useProductSummaryCard } from ".";
import ProductSummarySubtotal, { ProductSummarySubtotalProps } from "./ProductSummarySubtotal";
import { PassengerType } from "@/models/common.interface";
import { memo, useMemo } from "react";

const ProductCardSubTotal: ProductSummaryCardCompound["Subtotal"] = ({ className }) => {
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
const createArrayItemFromLength = <ItemType,>(length: number, item: ItemType) => {
  return Array.from({ length: length }, (v, k) => item);
};

export default memo(ProductCardSubTotal);
