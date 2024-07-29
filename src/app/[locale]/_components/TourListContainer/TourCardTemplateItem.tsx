"use client";
import TourCard from "@/components/frontend/TourCard";
import { moneyFormatVND } from "@/utils/helper";
import { mediaConfig } from "@/configs";
import { IFeTemplateProductItem } from "@/models/fe/productItem.interface";
import { LangCode } from "@/models/management/cms/language.interface";
import dayjs from "dayjs";
import { formatDate } from "@/utils/date";
import { useMemo } from "react";

interface TourCardTemplateItemProps {
  data: IFeTemplateProductItem;
  lang?: LangCode;
}
const TourCardTemplateItem: React.FC<TourCardTemplateItemProps> = ({ data, lang }) => {
  const tourCMSContent = useMemo(() => {
    return data.cms.find((cmsItem) => cmsItem.lang === lang);
  }, [data]);

  const getMinAdultPrice = (configPrices: IFeTemplateProductItem["sellables"][0]["configs"]) => {
    if (!configPrices.length) return;
    let minPrice = configPrices[0].adult;
    configPrices.forEach((item) => {
      if (item.open > 0 && item.adult < minPrice) {
        minPrice = item.adult;
      }
    });

    return minPrice;
  };

  const sellableItem = useMemo(() => {
    const { sellables } = data;
    if (!sellables.length) return;

    let sellableItem = sellables[0];

    sellables.forEach((item) => {
      if (dayjs(item.startDate).isBefore(sellableItem.startDate)) {
        sellableItem = item;
      }
      if (dayjs(item.startDate).isSame(sellableItem.startDate)) {
        if (dayjs(item.validFrom).isBefore(sellableItem.validFrom)) {
          sellableItem = item;
        }
      }
    });
    return sellableItem;
  }, [data]);

  return (
    <TourCard
      key={data.recId}
      tourCode={data.code}
      thumbnail={`${mediaConfig.rootApiPath}/${tourCMSContent?.thumbnail.original}`}
      name={tourCMSContent?.name}
      price={
        sellableItem && getMinAdultPrice(sellableItem.configs)
          ? moneyFormatVND(getMinAdultPrice(sellableItem.configs))
          : undefined
      }
      departDate={sellableItem ? formatDate(sellableItem.startDate, "dd/MM/yyyy") : undefined}
      openAmount={sellableItem?.open}
      href={sellableItem?.recId ? `/tour/${data.recId}/${sellableItem.recId}/${tourCMSContent?.slug}` : "/"}
    />
  );
};
export default TourCardTemplateItem;
