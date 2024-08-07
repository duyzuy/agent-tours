"use client";
import TourCard from "@/components/frontend/TourCard";
import { moneyFormatVND } from "@/utils/helper";
import { mediaConfig } from "@/configs";
import { IFeTemplateProductItem } from "@/models/fe/productItem.interface";
import { LangCode } from "@/models/management/cms/language.interface";
import dayjs from "dayjs";
import { formatDate, stringToDate } from "@/utils/date";
import { useMemo } from "react";

interface TourCardTemplateItemProps {
  data: IFeTemplateProductItem;
  lang?: LangCode;
}
const TourCardTemplateItem: React.FC<TourCardTemplateItemProps> = ({ data, lang }) => {
  const { sellables } = data;
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
    if (!sellables.length) return;

    let sellableItem = sellables[0];

    sellables.forEach((item) => {
      if (stringToDate(item.startDate).isBefore(stringToDate(sellableItem.startDate))) {
        sellableItem = item;
      }
      if (stringToDate(item.startDate).isSame(stringToDate(sellableItem.startDate))) {
        if (stringToDate(item.validFrom).isBefore(stringToDate(sellableItem.validFrom))) {
          sellableItem = item;
        }
      }
    });
    return sellableItem;
  }, [sellables]);

  const otherDeparts = useMemo(() => {
    return sellables.map((item) => stringToDate(item.startDate).format("DD/MM/YYYY")).splice(1);
  }, [sellables]);

  console.log(otherDeparts);
  return (
    <TourCard
      key={data.recId}
      tourCode={data.code}
      thumbnail={
        tourCMSContent && tourCMSContent.thumbnail
          ? `${mediaConfig.rootApiPath}/${tourCMSContent?.thumbnail.original}`
          : undefined
      }
      name={tourCMSContent?.name}
      price={
        sellableItem && getMinAdultPrice(sellableItem.configs)
          ? moneyFormatVND(getMinAdultPrice(sellableItem.configs))
          : undefined
      }
      departDate={sellableItem ? formatDate(sellableItem.startDate, "DD/MM/YYYY") : undefined}
      openAmount={sellableItem?.open}
      href={sellableItem?.recId ? `/tour/${data.recId}/${sellableItem.recId}/${tourCMSContent?.slug}` : "/"}
      otherDepartDate={otherDeparts}
    />
  );
};
export default TourCardTemplateItem;
