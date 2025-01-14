import { PriceConfig } from "@/models/management/core/priceConfig.interface";

export const getLowestPriceAvailable = (priceConfigs: PriceConfig[]) => {
  if (!priceConfigs.length) return;

  let lowestItem: PriceConfig | undefined;

  for (let i = 0; i < priceConfigs.length; i++) {
    if (priceConfigs[i].open <= 0) {
      continue;
    }

    if (!lowestItem) {
      lowestItem = priceConfigs[i];
    } else {
      if (priceConfigs[i].adult < lowestItem.adult) {
        lowestItem = priceConfigs[i];
      }
    }
  }

  return lowestItem;
};
