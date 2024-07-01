import { useEffect, useMemo, useState } from "react";
import { ServiceGroupItemType } from "@/utils/productService";
import { Drawer, Space, Button, message, Spin } from "antd";
import { moneyFormatVND } from "@/utils/helper";
import classNames from "classnames";
// import DrawerServiceItem from "@/app/portal/booking/tour-services/_components/DrawerServiceItem";

import { PassengerType } from "@/models/common.interface";
import { FePriceConfig } from "@/models/fe/serviceItem.interface";
import {
    FeBookingInformation,
    IBookingSsrItemWithPax,
} from "@/app/[locale]/(booking)/modules/booking.interface";
import QuantityInput from "@/components/frontend/QuantityInput";
import { useTranslations } from "next-intl";

export interface DrawerServiceItemProps {
    serviceName?: string;
    open?: boolean;
    onClose?: () => void;
    passengerBookingList: FeBookingInformation["bookingInfo"]["passengers"];
    defaultPriceConfig?: FePriceConfig;
    priceConfigs: FePriceConfig[];
    onConfirm?: (data?: BookingSSRPaxItem[]) => void;
    bookingSSRItems?: IBookingSsrItemWithPax[];
}

type BookingSSRPaxItem = {
    paxIndex: number;
    paxType: PassengerType;
    priceConfig: FePriceConfig;
};
type QuantitySSRPassengerItem = {
    paxIndex: number;
    type: PassengerType;
    quantity: number;
};
const DrawerServiceItem: React.FC<DrawerServiceItemProps> = ({
    serviceName,
    open,
    onClose,
    passengerBookingList,
    defaultPriceConfig,
    priceConfigs,
    onConfirm,
    bookingSSRItems,
}) => {
    const [bookingItems, setBookingItems] = useState<BookingSSRPaxItem[]>();

    const [ssrQuantity, setSSRQuantity] = useState(() => {
        return passengerBookingList.reduce<QuantitySSRPassengerItem[]>(
            (acc, item) => {
                return [
                    ...acc,
                    { paxIndex: item.index, type: item.type, quantity: 0 },
                ];
            },
            [],
        );
    });

    const t = useTranslations("String");

    const getSortedFlatArrPriceConfigs = () => {
        return priceConfigs.reduce<FePriceConfig[]>((acc, item) => {
            Array.from({ length: item.open }, (v, k) => {
                acc = [...acc, item];
            });
            return acc.sort((a, b) => a.adult - b.adult);
        }, []);
    };

    const handleConfirmService = () => {
        onConfirm?.(bookingItems);
        onClose?.();
    };

    const subTotal = useMemo(() => {
        return (
            bookingItems?.reduce((acc, item) => {
                return (acc += item.priceConfig[item.paxType]);
            }, 0) || 0
        );
    }, [bookingItems]);

    const changeQuantity = (
        paxIndex: number,
        action: "minus" | "plus",
        quantity: number,
    ) => {
        if (action === "minus" && quantity < 0) {
            return;
        }
        if (action === "plus" && quantity > 9) {
            return;
        }

        const priceConfigsListPicker = getSortedFlatArrPriceConfigs();
        const filteredSSRQuaAmount = ssrQuantity.filter(
            (item) => item.paxIndex !== paxIndex,
        );
        let totalQuantity = filteredSSRQuaAmount.reduce((acc, item) => {
            return (acc += item.quantity);
        }, quantity);

        if (totalQuantity > priceConfigsListPicker.length) {
            message.info("Số lượng không đủ");
            return;
        }

        let newSSRQquantity = [...ssrQuantity];

        const indexItem = ssrQuantity.findIndex(
            (item) => item.paxIndex === paxIndex,
        );
        newSSRQquantity.splice(indexItem, 1, {
            ...ssrQuantity[indexItem],
            quantity: quantity,
        });

        /**
         * pick items from @priceConfigsListPicker
         */
        let pickedItems: BookingSSRPaxItem[] = [];
        newSSRQquantity.forEach((item) => {
            Array.from({ length: item.quantity }, (v, k) => {
                const priceConfigItem = priceConfigsListPicker.shift();

                pickedItems = priceConfigItem
                    ? [
                          ...pickedItems,
                          {
                              paxIndex: item.paxIndex,
                              paxType: item.type,
                              priceConfig: priceConfigItem,
                          },
                      ]
                    : [...pickedItems];
            });
        });
        setBookingItems(pickedItems);
        setSSRQuantity(newSSRQquantity);
    };

    const getQuantityOfPaxIndex = (paxIndex: number) => {
        const paxItem = ssrQuantity.find((item) => item.paxIndex === paxIndex);
        return paxItem ? paxItem.quantity : 0;
    };

    useEffect(() => {
        if (bookingSSRItems) {
            const initQuantity = passengerBookingList.reduce<
                QuantitySSRPassengerItem[]
            >((acc, paxItem) => {
                const items = bookingSSRItems.filter(
                    (item) => item.paxIndex === paxItem.index,
                );

                return [
                    ...acc,
                    {
                        paxIndex: paxItem.index,
                        type: paxItem.type,
                        quantity: items.length,
                    },
                ];
            }, []);

            setSSRQuantity(initQuantity);
        }
    }, [bookingSSRItems]);
    return (
        <Drawer
            title={serviceName}
            width={550}
            onClose={onClose}
            destroyOnClose={true}
            open={open}
            styles={{
                body: {
                    paddingBottom: 80,
                    paddingLeft: 0,
                    paddingRight: 0,
                    paddingTop: 0,
                },
            }}
        >
            <div className="service__item-body px-3 pt-6">
                <div>
                    {defaultPriceConfig ? (
                        <>
                            <div className="px-3 pb-3">
                                <p>{`Số lượng dịch vụ ở mức giá này chỉ còn ${defaultPriceConfig.open}`}</p>
                                <p className="text-right">Số lượng</p>
                            </div>
                            {passengerBookingList.map(
                                ({ index, info, type }) => (
                                    <div
                                        className="pax__item p-3 bg-white border mb-6 rounded-md"
                                        key={index}
                                    >
                                        <div className="pax__item-inner flex justify-between">
                                            <div className="w-32">
                                                <span className="text-xs text-gray-500">
                                                    {t(type)}
                                                </span>
                                                <span className="block font-500 uppercase">
                                                    {getPassengerFullname(
                                                        info?.paxLastname,
                                                        info?.paxMiddleFirstName,
                                                    )}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-x-4">
                                                <div className="price-item">
                                                    <span className="text-xs text-gray-500 mr-2">
                                                        {t("justFrom")}
                                                    </span>
                                                    <span className="text-red-600">
                                                        {moneyFormatVND(
                                                            defaultPriceConfig[
                                                                type
                                                            ],
                                                        )}
                                                    </span>
                                                </div>
                                                <QuantityInput
                                                    size="md"
                                                    maximum={9}
                                                    value={getQuantityOfPaxIndex(
                                                        index,
                                                    )}
                                                    onChange={(action, value) =>
                                                        changeQuantity(
                                                            index,
                                                            action,
                                                            value,
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ),
                            )}
                        </>
                    ) : (
                        <div>Hết slot</div>
                    )}
                </div>
            </div>
            <div className="drawler-action absolute px-4 py-4 border-t left-0 right-0 bg-white bottom-0">
                <div className="flex justify-between">
                    <div>
                        <div>
                            <span className="block">{t("subTotal")}</span>
                            <span className="font-[500] text-[16px] text-red-600">
                                {moneyFormatVND(subTotal)}
                            </span>
                        </div>
                    </div>
                    <Space>
                        <Button onClick={handleConfirmService} type="primary">
                            Xác nhận
                        </Button>
                    </Space>
                </div>
            </div>
        </Drawer>
    );
};
export default DrawerServiceItem;

const getPassengerFullname = (
    lastname?: string,
    middleAndGivename?: string,
) => {
    return `${lastname}, ${middleAndGivename}`;
};
