import { moneyFormatVND } from "@/utils/helper";
import classNames from "classnames";
interface ProductSummaryWithPricePriceProps {
  subText: string;
  note?: string;
  price: number;
  className?: string;
  referencePrice?: number;
}
const ProductSummaryCardWithPrice = ({
  subText,
  note,
  price,
  referencePrice,
  className = "",
}: ProductSummaryWithPricePriceProps) => {
  return (
    <div
      className={classNames("product-summary-pricing", {
        [className]: className,
      })}
    >
      <div className="price block">
        {subText && <span className="text-xs block">{subText}</span>}
        {referencePrice ? (
          <>
            <span className="text-red-600 font-[500] text-2xl block mr-2">{moneyFormatVND(price)}</span>
            <span className="text-xl block line-through opacity-60">{moneyFormatVND(referencePrice)}</span>
          </>
        ) : (
          <span className="text-red-600 font-[500] text-2xl inline-block">{moneyFormatVND(price)}</span>
        )}
      </div>
      {note && (
        <div className="amount-remainning">
          <p className="text-xs ">{note}</p>
        </div>
      )}
    </div>
  );
};

interface ProductSummaryNoPricePriceProps {
  label: string;
  description: string;
  className?: string;
}
const ProductSummaryCardNoPrice = ({ label, description, className = "" }: ProductSummaryNoPricePriceProps) => {
  return (
    <div
      className={classNames("product-summary-no-price", {
        [className]: className,
      })}
    >
      <p className="text-red-600 font-semibold text-2xl mb-3">{label}</p>
      <p>{description}</p>
    </div>
  );
};
export { ProductSummaryCardNoPrice, ProductSummaryCardWithPrice };
