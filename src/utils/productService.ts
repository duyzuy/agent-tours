import { PassengerType } from "@/models/common.interface";
import { FePriceConfig } from "@/models/fe/serviceItem.interface";

/**
 *
 * Grouping Booking service items by serviceitem
 * @param sellableDetailsId present an type of service.
 *
 */
export type ServiceGroupItemType = {
  serviceId: number;
  serviceName: string;
  priceConfigs: FePriceConfig[];
};
export const groupingProductServices = (serviceList: FePriceConfig[]) => {
  return serviceList.reduce<{
    [key: string]: ServiceGroupItemType;
  }>((acc, svItem) => {
    const serviceId = svItem.sellableDetailsIds[0];

    if (acc[serviceId]) {
      acc = {
        ...acc,
        [serviceId]: {
          ...acc[serviceId],
          priceConfigs: [...acc[serviceId]["priceConfigs"], svItem],
        },
      };
    } else {
      acc = {
        ...acc,
        [serviceId]: {
          serviceId: serviceId,
          serviceName: svItem.details,
          priceConfigs: [svItem],
        },
      };
    }
    return acc;
  }, {});
};

/*
 * Grouping Booking service items by serviceitem
 * @param sellableDetailsId present an type of service.
 *
 */
export const getLowestPriceService = (priceConfigList: FePriceConfig[], type = PassengerType.ADULT) => {
  let lowestPrice = priceConfigList[0][type];

  if (priceConfigList.length === 1) return lowestPrice;

  priceConfigList.forEach((item) => {
    if (item[type] < lowestPrice) {
      lowestPrice = item[type];
    }
  });
  return lowestPrice;
};
