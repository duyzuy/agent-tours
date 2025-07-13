import { useTranslations } from "next-intl";
import { ProductSummaryCardCompound, useProductSummaryCard } from ".";
import { memo, useMemo } from "react";
import { stringToDate } from "@/utils/date";
import { Space } from "antd";
import { IconCalendarRange, IconPlane } from "@/assets/icons";

const ProductSummaryDepartInformation: ProductSummaryCardCompound["Durations"] = ({ className }) => {
  const t = useTranslations("String");
  const { productItem } = useProductSummaryCard();

  const durationDay = useMemo(() => {
    if (!productItem || !productItem.endDate || !productItem.startDate) return;
    const dayNum = stringToDate(productItem.endDate)?.diff(stringToDate(productItem.startDate), "days");
    return dayNum;
  }, [productItem]);

  return (
    <ul className="mb-3 grid grid-cols-2 gap-3">
      <li>
        <Space>
          <IconPlane className="w-5 h-5" />
          <span className="text-[16px]">{productItem?.template.depart.name_vi}</span>
        </Space>
      </li>
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
    </ul>
  );
};
export default memo(ProductSummaryDepartInformation);
