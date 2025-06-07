import { useTranslations } from "next-intl";
import { ProductSummaryCardCompound, useProductSummaryCard } from ".";
import { memo, useMemo } from "react";
import classNames from "classnames";
import { IconCheckCircle } from "@/assets/icons";

const ProductCardInventories: ProductSummaryCardCompound["Inventories"] = ({ className = "" }) => {
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
export default memo(ProductCardInventories);
