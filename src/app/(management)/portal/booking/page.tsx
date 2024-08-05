"use client";
import React, { useCallback, useMemo } from "react";
import BoxBooking from "./_components/BoxBooking";
import { Button, Divider, Empty, Segmented, Space } from "antd";
import useBooking from "./hooks/useBooking";
import TourBoxItem from "./_components/TourBoxItem";
import { isUndefined } from "lodash";
import { UndoOutlined } from "@ant-design/icons";
import { PassengerType } from "@/models/common.interface";
import useSelectProductTour from "./modules/useSelectProductTour";
import { moneyFormatVND } from "@/utils/helper";
import PassengerTourClassItem from "./_components/PassengerTourClassItem";
import { PriceConfig } from "@/models/management/core/priceConfig.interface";
import useMessage from "@/hooks/useMessage";
import { ESellChannel, SELL_CHANNEL } from "@/constants/channel.constant";

const BookingPage = () => {
  const [bookingInformation, setBookingInformation] = useBooking();
  const message = useMessage();

  const { onNext, onSetPassengerConfig, onReselectProduct, onChangeSellChannel, onSetProductItem } =
    useSelectProductTour();

  const productList = useMemo(() => bookingInformation?.productList, [bookingInformation]);

  const isSearched = useMemo(() => {
    return (
      !isUndefined(bookingInformation.searchBooking?.byMonth) && !isUndefined(bookingInformation.searchBooking?.byDest)
    );
  }, [bookingInformation]);

  const productSelectedItem = useMemo(() => {
    return bookingInformation.bookingInfo?.product;
  }, [bookingInformation]);

  const isDisableNextButton = useMemo(() => {
    return (
      bookingInformation.passengerPriceConfigs.adult.length === 0 &&
      bookingInformation.passengerPriceConfigs.child.length === 0
    );
  }, [bookingInformation]);

  const onSelectPassenger = (
    type: PassengerType,
    quantity: number,
    priceConfig: PriceConfig,
    action: "minus" | "plus",
  ) => {
    const { passengerPriceConfigs } = bookingInformation;

    if (quantity < 0) {
      message.error("Số lượng không nhỏ hơn 0");
      return;
    }
    const adultOfConfig = passengerPriceConfigs[PassengerType.ADULT].find(
      (item) => item.priceConfig.recId === priceConfig.recId,
    );
    const childOfConfig = passengerPriceConfigs[PassengerType.CHILD].find(
      (item) => item.priceConfig.recId === priceConfig.recId,
    );

    const infantOfConfig = passengerPriceConfigs[PassengerType.INFANT].find(
      (item) => item.priceConfig.recId === priceConfig.recId,
    );

    const childAmout = childOfConfig?.qty || 0;
    const adultAmount = adultOfConfig?.qty || 0;
    const inFantAmount = infantOfConfig?.qty || 0;

    if (type === PassengerType.ADULT || type === PassengerType.CHILD) {
      if (action === "plus" && childAmout + adultAmount === priceConfig.open) {
        message.error(`Bạn đã chọn đủ số lượng hạng ${priceConfig.class}.`);
        return;
      }
    }

    if (type === PassengerType.INFANT && inFantAmount === adultAmount && action === "plus") {
      message.error("`Số lượng hành khách em bé tối đa bằng số lượng hành khách người lớn.");
      return;
    }
    if (type === PassengerType.ADULT && action === "minus" && adultAmount === inFantAmount) {
      onSetPassengerConfig(PassengerType.INFANT, quantity, priceConfig);
    }
    onSetPassengerConfig(type, quantity, priceConfig);
  };
  const getPassengerAmount = useCallback(
    (paxType: PassengerType, priceConfig: PriceConfig) => {
      const passengerPriceConfis = {
        ...bookingInformation.passengerPriceConfigs,
      };

      const paxPriceConfig = passengerPriceConfis[paxType].find(
        (configItem) => configItem.priceConfig.recId === priceConfig.recId,
      );
      return paxPriceConfig?.qty || 0;
    },
    [bookingInformation.passengerPriceConfigs],
  );

  const filterPriceConfigbySellChannel = (priceConfigs: PriceConfig[]) => {
    const sellChannel = bookingInformation.channel;

    return priceConfigs.reduce<PriceConfig[]>((acc, item) => {
      if (sellChannel === ESellChannel.B2C) {
        if (item.channel === "CUSTOMER") {
          acc = [...acc, item];
        }
      } else {
        acc = [...acc, item];
      }

      return acc;
    }, []);
  };

  return (
    <div className="page">
      <div
        className="header-page p-6 bg-gray-200 rounded-lg mb-14"
        style={{
          background: "url('/assets/images/admin/bg-header.png')",
          backgroundSize: "cover",
          backgroundPosition: "bottom center",
        }}
      >
        <div className="h-44"></div>
        <BoxBooking className="searchbox" />
      </div>
      <div className="tours-wrapper">
        {isSearched ? (
          <div className="tour-list">
            {(productList?.length &&
              productList.map((item) => (
                <TourBoxItem
                  key={item.recId}
                  tour={item}
                  isSelected={item.recId === productSelectedItem?.recId}
                  hideBoxNotSelect={!isUndefined(productSelectedItem)}
                  onSelect={() => onSetProductItem(item)}
                />
              ))) || <Empty description="Không có tour nào" />}
          </div>
        ) : null}
        {!isUndefined(productSelectedItem) ? (
          <div className="text-right mb-2">
            <span className="inline-flex text-primary-default cursor-pointer" onClick={onReselectProduct}>
              <UndoOutlined size={12} />
              <span className="ml-2 inline-block">Chọn lại</span>
            </span>
          </div>
        ) : null}
        {productSelectedItem ? (
          <>
            <div className="tour__item-classes">
              <Divider />
              <div className="mb-6 section-sell-channel">
                <p className="text-lg font-[500] mb-3">Chọn kênh bán</p>
                <Segmented
                  value={bookingInformation.channel}
                  options={SELL_CHANNEL}
                  onChange={(value) => {
                    onChangeSellChannel(value as ESellChannel);
                  }}
                />
              </div>
              <div className="tour__item-classes-head mb-3">
                <span className="block text-lg font-[500]">Chọn số lượng khách</span>
                <p>* Giá lựa chọn sẽ dc áp dụng cho toàn bộ hành khách trong tour.</p>
              </div>
              <div className="tour__item-classes-body">
                {filterPriceConfigbySellChannel(productSelectedItem.configs).map((config) => (
                  <PassengerTourClassItem
                    key={config.recId}
                    channel={config.channel}
                    classChannel={config.class}
                    open={config.open}
                    adultPricing={moneyFormatVND(config.adult)}
                    childPricing={moneyFormatVND(config.child)}
                    infantPricing={moneyFormatVND(config.infant)}
                    adultAmount={getPassengerAmount(PassengerType.ADULT, config)}
                    childAmount={getPassengerAmount(PassengerType.CHILD, config)}
                    infantAmount={getPassengerAmount(PassengerType.INFANT, config)}
                    onSelectPassenger={(type, value, action) => onSelectPassenger(type, value, config, action)}
                  />
                ))}
              </div>
            </div>
            <div className="sticky py-4 bottom-0 bg-white">
              <Space>
                <Button
                  type="primary"
                  ghost
                  className="w-32"
                  onClick={onReselectProduct}
                  icon={<UndoOutlined size={12} />}
                >
                  Chọn lại
                </Button>
                <Button type="primary" className="w-32" onClick={onNext} disabled={isDisableNextButton}>
                  Đi tiếp
                </Button>
              </Space>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};
export default BookingPage;
