import { useEffect, useMemo, useState } from "react";
import { Drawer, Space, Button, message, Spin } from "antd";
import { moneyFormatVND } from "@/utils/helper";
import { PassengerType } from "@/models/common.interface";
import { FeProductService } from "@/models/fe/serviceItem.interface";
import QuantityInput from "@/components/frontend/QuantityInput";
import { useTranslations } from "next-intl";
import { FeBookingInformation } from "@/store/booking/booking.type";
import classNames from "classnames";
export interface DrawerServiceItemProps {
  serviceName: string;
  open?: boolean;
  onClose?: () => void;
  passengers: FeBookingInformation["bookingInfo"]["passengers"];
  priceConfigs: FeProductService["configs"];
  defaultPriceConfig?: FeProductService["configs"][number];
  onConfirm?: (data?: PassengerConfigItem[]) => void;
  selectedItems?: FeBookingInformation["bookingInfo"]["bookingSsrWithPax"];
}

type PassengerConfigItem = {
  paxIndex: number;
  paxType: PassengerType;
  priceConfig: FeProductService["configs"][number];
};
type QuantityServiceItem = {
  paxIndex: number;
  type: PassengerType;
  quantity: number;
};
const DrawerServiceItem: React.FC<DrawerServiceItemProps> = ({
  serviceName,
  priceConfigs,
  open,
  onClose,
  passengers,
  defaultPriceConfig,
  onConfirm,
  selectedItems,
}) => {
  const [bookingItems, setBookingItems] = useState<PassengerConfigItem[]>([]);
  const [quantityService, setQuantityService] = useState<QuantityServiceItem[]>([]);

  const t = useTranslations("String");

  const getPriceConfigsListSelector = () => {
    return priceConfigs.reduce<FeProductService["configs"]>((acc, item) => {
      Array.from({ length: item.open }, (v, k) => {
        acc = [...acc, item];
      });
      return acc.sort((a, b) => a.adult - b.adult);
    }, []);
  };

  const subTotal = useMemo(() => {
    return bookingItems.reduce((total, { priceConfig, paxType }) => (total += priceConfig[paxType]), 0) || 0;
  }, [bookingItems]);

  const isDisabledButton = useMemo(() => {
    return bookingItems.length === 0 || selectedItems?.length === bookingItems.length;
  }, [bookingItems, selectedItems]);
  const changeQuantity = (paxIndex: number, action: "minus" | "plus", newQuantity: number) => {
    if (action === "minus" && newQuantity < 0) {
      message.info("Số lượng tối thiểu là 1.");
      return;
    }
    if (action === "plus" && newQuantity > 9) {
      message.info("Số lượng tối đa là 9.");
      return;
    }

    const configListSelector = getPriceConfigsListSelector();

    const paxIndexQuantityItem = quantityService.findIndex((item) => item.paxIndex === paxIndex);

    if (paxIndexQuantityItem === -1) return;

    let newQuantityService = [...quantityService];

    newQuantityService.splice(paxIndexQuantityItem, 1, {
      ...quantityService[paxIndexQuantityItem],
      quantity: newQuantity,
    });

    const newTotalQuantityOfAllPax = newQuantityService.reduce((total, item) => (total += item.quantity), 0);
    if (newTotalQuantityOfAllPax > configListSelector.length) {
      message.info("Số lượng dịch vụ đã được chọn hết.");
      return;
    }

    let newItemList: PassengerConfigItem[] = [];
    Object.entries(newQuantityService).forEach(([key, { paxIndex, quantity, type }]) => {
      Array.from({ length: quantity }).forEach(() => {
        const pickedItem = configListSelector.shift();
        if (!pickedItem) {
          return;
        }

        newItemList = [...newItemList, { paxIndex: paxIndex, paxType: type, priceConfig: pickedItem }];
      });
    });

    setBookingItems(newItemList);
    setQuantityService(newQuantityService);
  };

  const getQuantityOfPaxIndex = (paxIndex: number) => {
    return quantityService?.find((item) => item.paxIndex === paxIndex)?.quantity || 0;
  };

  const handleConfirmService = () => {
    onConfirm?.(bookingItems);
    onClose?.();
  };

  useEffect(() => {
    setQuantityService(() =>
      passengers.reduce<QuantityServiceItem[]>((acc, pax) => {
        const serviceListByPassenger = selectedItems?.filter((item) => item.paxIndex === pax.index);
        acc = [
          ...acc,
          {
            paxIndex: pax.index,
            type: pax.type,
            quantity: serviceListByPassenger ? serviceListByPassenger.length : 0,
          },
        ];
        return acc;
      }, []),
    );
    setBookingItems(
      () =>
        selectedItems?.reduce<PassengerConfigItem[]>(
          (acc, item) =>
            [...acc, { paxIndex: item.paxIndex, paxType: item.paxType, priceConfig: item.priceConfig }].sort(
              (a, b) => a.paxIndex - b.paxIndex,
            ),
          [],
        ) || [],
    );
  }, [selectedItems, open]);
  return (
    <Drawer
      title={serviceName}
      width={550}
      onClose={onClose}
      destroyOnClose={true}
      closeIcon={null}
      open={open}
      footer={
        <div className="flex justify-between py-2">
          <div>
            <span className="block">{t("subTotal")}</span>
            <span className="font-[500] text-[16px] text-red-600">{moneyFormatVND(subTotal)}</span>
          </div>
          <Space>
            <Button onClick={handleConfirmService} type="primary" size="large" disabled={isDisabledButton}>
              Xác nhận
            </Button>
            <Button onClick={onClose} type="text" size="large" className="!bg-gray-100 !text-gray-800">
              Huỷ bỏ
            </Button>
          </Space>
        </div>
      }
    >
      {defaultPriceConfig ? (
        <>
          <div className="px-3 pb-3">
            {/* <p>{`Số lượng dịch vụ ở mức giá này chỉ còn`}</p> */}
            <p className="text-right">Số lượng</p>
          </div>
          {passengers.map(({ index, info, type }) => (
            <div className="pax__item p-3 bg-white border mb-6 rounded-md" key={index}>
              <div className="pax__item-inner flex justify-between">
                <div className="w-32">
                  <span className="text-xs text-gray-500">{t(type)}</span>
                  <div className="pax-title">
                    {info?.paxLastname && info?.paxMiddleFirstName ? (
                      <span className="font-500 uppercase">
                        {getPassengerFullname(info?.paxLastname, info?.paxMiddleFirstName)}
                      </span>
                    ) : (
                      <span>{`Hành khách ${index + 1}`}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-x-4">
                  <div className="price-item">
                    <span className="text-xs text-gray-500 mr-2">{t("justFrom")}</span>
                    <span className="text-red-600">{moneyFormatVND(defaultPriceConfig[type])}</span>
                  </div>
                  <QuantityInput
                    size="md"
                    maximum={9}
                    value={getQuantityOfPaxIndex(index)}
                    onChange={(action, value) => changeQuantity(index, action, value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div>Dịch vụ đã hết</div>
      )}
    </Drawer>
  );
};
export default DrawerServiceItem;

const getPassengerFullname = (lastname?: string, middleAndGivename?: string) => {
  return `${lastname}, ${middleAndGivename}`;
};
