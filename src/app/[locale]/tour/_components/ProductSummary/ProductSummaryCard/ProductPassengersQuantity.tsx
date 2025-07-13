import { useTranslations } from "next-intl";
import { ProductSummaryCardCompound, useProductSummaryCard } from ".";
import classNames from "classnames";
import Quantity from "@/components/base/Quantity";
import { PassengerType } from "@/models/common.interface";

const ProductPassengersQuantity: ProductSummaryCardCompound["PassengerSelector"] = ({
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
        <span className="font-[500] text-gray-600">{t("productSummary.passengerQuantity.title")}</span>
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
            <p>{t("infant")}</p>
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

export default ProductPassengersQuantity;
