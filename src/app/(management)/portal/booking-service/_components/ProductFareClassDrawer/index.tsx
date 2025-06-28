import { memo, useCallback, useMemo, useState, useTransition } from "react";
import { Button, Divider, Drawer, Empty, Space } from "antd";
import { ESellChannel } from "@/constants/channel.constant";
import { IProductService } from "@/models/management/booking/product.interface";
import useSelectServiceFareClass from "../../modules/useSelectServiceFareClass";
import PassengerServiceFareClassItem from "./PassengerServiceFareClassItem";
import { moneyFormatVND } from "@/utils/helper";
import { PriceConfig } from "@/models/management/core/priceConfig.interface";
import { PassengerType } from "@/models/common.interface";
import { usePortalBookingServiceSelector } from "../../store/bookingServiceContext";
import useMessage from "@/hooks/useMessage";
import ChannelSelector, { ChannelSelectorProps } from "./ChannelSelector";
import { isUndefined } from "lodash";
import ProductBoxDetail from "./ProductBoxDetail";
import * as yup from "yup";
export interface ProductFareClassDrawerProps {
  open: boolean;
  onClose: () => void;
  product?: IProductService;
}

const addFareClassSchema = yup.object({
  product: yup.object({}),
  channel: yup.string().oneOf([ESellChannel.B2B, ESellChannel.B2C]),
  configItems: yup.array(yup.object({})),
});
const ProductFareClassDrawer: React.FC<ProductFareClassDrawerProps> = ({ open, onClose, product }) => {
  const [selectedChannel, setSelectedChannel] = useState<ESellChannel>();
  const [selectedConfigItems, setSelectedConfigItems] = useState<
    { configItem: IProductService["configs"][number]; qty: number; type: PassengerType }[]
  >([]);

  const bookingInformation = usePortalBookingServiceSelector((state) => state.bookingInfo);
  const bookingChannel = usePortalBookingServiceSelector((state) => state.channel);

  const message = useMessage();
  const { onConfirmSelectFareClass } = useSelectServiceFareClass();

  const [isPendingGotoPayment, startGotoPayment] = useTransition();

  const priceConfigsBySellChannel = useMemo(() => {
    return product?.configs?.reduce<PriceConfig[]>((acc, item) => {
      if (selectedChannel === ESellChannel.B2C && item.channel === "CUSTOMER") {
        acc = [...acc, item];
      }
      if (selectedChannel === ESellChannel.B2B && item.channel === "AGENT") {
        acc = [...acc, item];
      }
      return acc;
    }, []);
  }, [selectedChannel, product]);

  const isDisableNextButton = useMemo(() => {
    return isUndefined(product) || !selectedConfigItems.length;
  }, [selectedConfigItems, product]);

  const handleChangeSellChannel: ChannelSelectorProps["onChange"] = (newChannel) => {
    if (newChannel !== selectedChannel) {
      setSelectedConfigItems([]);
    }
    setSelectedChannel(newChannel);
  };
  const getPassengerAmount = useCallback(
    (paxType: PassengerType, priceConfig: PriceConfig) => {
      return (
        selectedConfigItems.find((item) => item.configItem.recId === priceConfig.recId && item.type === paxType)?.qty ||
        0
      );
    },
    [selectedConfigItems],
  );

  const handleSelectPassengerFareclass =
    (priceConfig: PriceConfig) => (type: PassengerType, quantity: number, action: "minus" | "plus") => {
      if (quantity < 0) return;

      if (quantity > priceConfig.limitPerBooking) {
        message.error(`Số lượng booking tối đa cho phép là ${priceConfig.limitPerBooking}`);
        return;
      }

      if (quantity > priceConfig.open) {
        message.error("Số lượng đã hết");
        return;
      }

      setSelectedConfigItems((oldItems) => {
        let newItems = [...oldItems];
        const indexItem = newItems.findIndex(
          (item) => item.configItem.recId === priceConfig.recId && item.type === type,
        );
        if (indexItem !== -1) {
          if (quantity === 0) {
            newItems.splice(indexItem, 1);
          } else {
            newItems.splice(indexItem, 1, { type, configItem: priceConfig, qty: quantity });
          }
        } else {
          newItems = [...newItems, { type, configItem: priceConfig, qty: quantity }];
        }
        return newItems;
      });
    };

  const handleDrawerAfterOpenChange = (open: boolean) => {
    if (!open) return;

    bookingChannel && setSelectedChannel(bookingChannel);
    bookingInformation?.bookingSsr && setSelectedConfigItems(bookingInformation?.bookingSsr);
  };
  const handleConfirmSelection = () => {
    if (!product) {
      message.error("Product is invalid.");
      return;
    }
    if (!selectedChannel) {
      message.error("Channel is invalid");
      return;
    }
    if (!selectedConfigItems.length) {
      message.error("Fare class is not empty.");
      return;
    }
    startGotoPayment(() =>
      onConfirmSelectFareClass({
        product: product,
        channel: selectedChannel,
        configItems: selectedConfigItems,
      }),
    );
  };

  // useEffect(() => {
  //   /**
  //    * Init Temporary fare selection.
  //    */
  //   setSelectedChannel(bookingInformation.channel);
  //   setSelectedConfigItems(bookingInformation.bookingInfo.bookingSsr);
  // }, [bookingInformation, open]);

  return (
    <Drawer
      title={product?.template.name}
      width={650}
      open={open}
      destroyOnClose
      maskClosable={false}
      closeIcon={null}
      afterOpenChange={handleDrawerAfterOpenChange}
      footer={
        <Space className="py-2">
          <Button
            type="primary"
            size="large"
            className="min-w-36"
            onClick={handleConfirmSelection}
            loading={isPendingGotoPayment}
            disabled={isDisableNextButton}
          >
            Tiến hành thanh toán
          </Button>
          <Button size="large" className="min-w-54" onClick={onClose}>
            Huỷ bỏ
          </Button>
        </Space>
      }
    >
      <ProductBoxDetail
        promotions={product?.promotions ?? undefined}
        prodcutTemplateCode={product?.template.code}
        productCode={product?.code}
        productName={product?.template.name}
        avaiableAmount={product?.available}
        usedAmount={product?.used}
        openAmount={product?.open}
      />
      <Divider />
      <ChannelSelector value={selectedChannel} onChange={handleChangeSellChannel} />
      <div className="h-3"></div>
      <h3 className="text-lg font-[500] mb-3">Chọn số lượng dịch vụ</h3>
      {priceConfigsBySellChannel?.length ? (
        <div className="flex flex-col gap-3">
          {priceConfigsBySellChannel?.map((config) => (
            <PassengerServiceFareClassItem
              key={config.recId}
              variant="vertical"
              channel={config.channel}
              classChannel={config.class}
              open={config.open}
              sold={config.sold}
              adultPricing={moneyFormatVND(config.adult)}
              childPricing={moneyFormatVND(config.child)}
              infantPricing={moneyFormatVND(config.infant)}
              adultAmount={getPassengerAmount(PassengerType.ADULT, config)}
              childAmount={getPassengerAmount(PassengerType.CHILD, config)}
              infantAmount={getPassengerAmount(PassengerType.INFANT, config)}
              onSelectPassenger={handleSelectPassengerFareclass(config)}
            />
          ))}
        </div>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Số lượng hiện đã bán hết." />
      )}
    </Drawer>
  );
};
export default memo(ProductFareClassDrawer);
