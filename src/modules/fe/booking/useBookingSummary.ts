import { FeProductItem } from "@/models/fe/productItem.interface";
import { PassengerType } from "@/models/common.interface";
import { useCallback } from "react";
import { useBookingSelector } from "@/store";
import { PriceConfig } from "@/models/management/core/priceConfig.interface";
import { FeBookingInformation } from "@/store/booking/booking.type";
import { FeProductService } from "@/models/fe/serviceItem.interface";

type PassengerInformation = FeBookingInformation["bookingInfo"]["passengers"][number]["info"];
type BreakDownServiceItemGroupByPassenger = {
  index: number;
  type: PassengerType;
  info: PassengerInformation;
  ssrList: {
    [key: string]: {
      stock: FeProductService["stock"];
      inventory: FeProductService["inventory"];
      priceConfigs: {
        item: FeProductService["configs"][number];
        quantity: number;
      }[];
    };
  };
};
type BreakdownServices = {
  [key: string]: {
    stock: FeProductService["stock"];
    inventory: FeProductService["inventory"];
    subTotal: number;
    passengers: {
      info: PassengerInformation;
      index: number;
      type: PassengerType;
      priceConfigs: {
        quantity: number;
        priceConfig: FeProductService["configs"][number];
      }[];
    }[];
  };
};
type BreakdownCoupons = {
  couponPolicy?: {
    discountAmount: number;
    code: string;
    validFrom: string;
    validTo: string;
  };
  coupons: {
    discountAmount: number;
    code: string;
    validFrom: string;
    validTo: string;
  }[];
  subtotal: number;
};
const useBookingSummary = () => {
  const bookingPassenger = useBookingSelector((state) => state.bookingPassenger);
  const { product, bookingSsrWithPax, passengers, couponPolicy, coupons } = useBookingSelector(
    (state) => state.bookingInfo,
  );

  const getProductFlatPricings = useCallback(() => {
    let items: FeProductItem["configs"] = [];
    product?.configs.forEach((configItem) => {
      Array.from({ length: configItem.open }, (v, k) => {
        items = [...items, configItem];
      });
    });
    return items.sort((a, b) => a.adult - b.adult);
  }, [product]);

  const getBreakDownProductPrice = () => {
    let pricingListPicker = getProductFlatPricings();

    let bookingDetailItemBookedList: {
      [key: string]: PriceConfig[];
    } = { adult: [], child: [], infant: [] };

    Object.entries(bookingPassenger).forEach(([type, amount]) => {
      for (let i = 0; i < amount; i++) {
        const priceConfigItem = pricingListPicker.shift();

        bookingDetailItemBookedList[type] = priceConfigItem
          ? [...bookingDetailItemBookedList[type], priceConfigItem]
          : [...bookingDetailItemBookedList[type]];
      }
    });

    return bookingDetailItemBookedList;
  };
  const getSubtotalTourProduct = () => {
    const breakDown = getBreakDownProductPrice();
    let subtotal = 0;
    Object.entries(breakDown).forEach(([type, priceList]) => {
      priceList.forEach((configItem) => {
        subtotal += configItem[type as PassengerType];
      });
    });
    return subtotal;
  };
  const getBookingProductAndServiceSubtotal = () => {
    let subTotal = getSubtotalTourProduct();

    const subTotalService =
      bookingSsrWithPax?.reduce((acc, item) => {
        return (acc += item.priceConfig[item.paxType]);
      }, 0) || 0;

    return subTotal + subTotalService;
  };
  const getServiceBreakdownGroupByPassenger = () => {
    return passengers.reduce<BreakDownServiceItemGroupByPassenger[]>((accBreakdown, paxItem) => {
      const ssrItemsBypax = bookingSsrWithPax?.filter((item) => item.paxIndex === paxItem.index);

      if (ssrItemsBypax && ssrItemsBypax.length) {
        let ssrItemsByPaxInventories: typeof ssrItemsBypax = [];
        let ssrItemsByPaxStocks: typeof ssrItemsBypax = [];

        ssrItemsBypax.forEach((item) => {
          if (item.stock) {
            ssrItemsByPaxStocks = [...ssrItemsByPaxStocks, item];
          } else {
            ssrItemsByPaxInventories = [...ssrItemsByPaxInventories, item];
          }
        });

        let ssrItemsInventoriesGrouped = ssrItemsByPaxInventories.reduce<
          BreakDownServiceItemGroupByPassenger["ssrList"]
        >((acc, item) => {
          const serviceId = item.inventory.recId;

          if (acc[serviceId]) {
            const configItems = acc[serviceId].priceConfigs;

            let newConfigItems = [...configItems];

            const indexConfigItem = configItems.findIndex((cfItem) => cfItem.item.recId === item.priceConfig.recId);

            if (indexConfigItem !== -1) {
              newConfigItems.splice(indexConfigItem, 1, {
                ...configItems[indexConfigItem],
                quantity: configItems[indexConfigItem].quantity + 1,
              });
            } else {
              newConfigItems = [
                ...newConfigItems,
                {
                  quantity: 1,
                  item: item.priceConfig,
                },
              ];
            }

            acc = {
              ...acc,
              [serviceId]: {
                ...acc[serviceId],
                priceConfigs: newConfigItems,
              },
            };
          } else {
            acc = {
              ...acc,
              [serviceId]: {
                inventory: item.inventory,
                stock: item.stock,
                priceConfigs: [
                  {
                    item: item.priceConfig,
                    quantity: 1,
                  },
                ],
              },
            };
          }
          return acc;
        }, {});

        accBreakdown = [
          ...accBreakdown,
          {
            index: paxItem.index,
            type: paxItem.type,
            info: paxItem.info,
            ssrList: {
              ...ssrItemsInventoriesGrouped,
            },
          },
        ];
      }
      return accBreakdown;
    }, []);
  };
  const getServiceBreakdown = () => {
    return bookingSsrWithPax?.reduce<BreakdownServices>((acc, bkSSRItem) => {
      const serviceId = bkSSRItem.stock ? bkSSRItem.stock.recId : bkSSRItem.inventory.recId;
      const serviceItem = acc[serviceId];

      const paxItem = passengers.find((item) => item.index === bkSSRItem.paxIndex);
      if (!paxItem) {
        throw new Error("Invalid passenger booking list");
      }

      if (serviceItem) {
        const bookingPassengers = serviceItem.passengers;
        let newPassengers = [...bookingPassengers];

        const _paxIndex = bookingPassengers.findIndex((pax) => pax.index === bkSSRItem.paxIndex);

        if (_paxIndex !== -1) {
          const bookingpriceConfigs = bookingPassengers[_paxIndex].priceConfigs;
          let newPriceConfigs = [...bookingpriceConfigs];

          const _indexPriceConfig = bookingpriceConfigs.findIndex(
            (cfItem) => cfItem.priceConfig.recId === bkSSRItem.priceConfig.recId,
          );

          if (_indexPriceConfig !== -1) {
            newPriceConfigs.splice(_indexPriceConfig, 1, {
              ...bookingpriceConfigs[_indexPriceConfig],
              quantity: bookingpriceConfigs[_indexPriceConfig].quantity + 1,
            });
          } else {
            newPriceConfigs = [
              ...bookingpriceConfigs,
              {
                priceConfig: bkSSRItem.priceConfig,
                quantity: 1,
              },
            ];
          }

          newPassengers.splice(_paxIndex, 1, {
            ...newPassengers[_paxIndex],
            priceConfigs: [...newPriceConfigs],
          });
        } else {
          newPassengers = [
            ...newPassengers,
            {
              index: bkSSRItem.paxIndex,
              info: paxItem.info,
              type: paxItem.type,
              priceConfigs: [
                {
                  priceConfig: bkSSRItem.priceConfig,
                  quantity: 1,
                },
              ],
            },
          ];
        }
        acc = {
          ...acc,
          [serviceId]: {
            ...acc[serviceId],
            subTotal: acc[serviceId].subTotal + bkSSRItem.priceConfig[bkSSRItem.paxType],
            passengers: [...newPassengers],
          },
        };
      } else {
        acc = {
          ...acc,
          [serviceId]: {
            stock: bkSSRItem.stock,
            inventory: bkSSRItem.inventory,
            subTotal: bkSSRItem.priceConfig[bkSSRItem.paxType],
            passengers: [
              {
                index: bkSSRItem.paxIndex,
                info: paxItem.info,
                type: bkSSRItem.paxType,
                priceConfigs: [
                  {
                    quantity: 1,
                    priceConfig: bkSSRItem.priceConfig,
                  },
                ],
              },
            ],
          },
        };
      }
      return acc;
    }, {});
  };

  const getBreakdownDiscount = () => {
    let breakdownCounpons: BreakdownCoupons = {
      coupons: [],
      couponPolicy: undefined,
      subtotal: 0,
    };
    if (couponPolicy) {
      breakdownCounpons = {
        ...breakdownCounpons,
        couponPolicy: {
          discountAmount: couponPolicy.discountAmount,
          code: couponPolicy.code,
          validFrom: couponPolicy.validFrom,
          validTo: couponPolicy.validTo,
        },
        subtotal: couponPolicy.discountAmount,
      };
    }

    coupons?.forEach((coupon) => {
      breakdownCounpons = {
        ...breakdownCounpons,
        coupons: [
          ...breakdownCounpons.coupons,
          {
            discountAmount: coupon.discountAmount,
            code: coupon.code,
            validFrom: coupon.validFrom,
            validTo: coupon.validTo,
          },
        ],
        subtotal: breakdownCounpons.subtotal + coupon.discountAmount,
      };
    });
    return breakdownCounpons;
  };
  const getTotalAmountNeedPayment = () => {
    const totalBooking = getBookingProductAndServiceSubtotal();
    const totalDiscount = getBreakdownDiscount().subtotal;

    return totalBooking - totalDiscount;
  };

  return {
    productBreakdown: getBreakDownProductPrice(),
    subTotal: getBookingProductAndServiceSubtotal(),
    subTotalProduct: getSubtotalTourProduct(),
    servicesBreakdown: getServiceBreakdown(),
    servicesBreakdownByPax: getServiceBreakdownGroupByPassenger(),
    discountBreakdown: getBreakdownDiscount(),
    lastTotalPayment: getTotalAmountNeedPayment(),
  };
};
export default useBookingSummary;
