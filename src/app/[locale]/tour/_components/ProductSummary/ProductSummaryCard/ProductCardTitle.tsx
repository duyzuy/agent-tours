import { memo } from "react";
import classNames from "classnames";
import { ProductSummaryCardCompound } from ".";
const ProductCardTitle: ProductSummaryCardCompound["Title"] = ({ text, className = "" }) => {
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
export default memo(ProductCardTitle);
