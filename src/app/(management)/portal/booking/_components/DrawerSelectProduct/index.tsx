import { ESellChannel, SELL_CHANNEL } from "@/constants/channel.constant";
import { IProductTour } from "@/models/management/booking/product.interface";
import { Button, Drawer, Empty, Segmented, Space } from "antd";
import useSelectProductTour from "../../modules/useSelectProductTour";
import PassengerTourClassItem from "../PassengerTourClassItem";
import { moneyFormatVND } from "@/utils/helper";
import { PriceConfig } from "@/models/management/core/priceConfig.interface";
import { memo, useCallback, useMemo, useTransition } from "react";
import { PassengerType } from "@/models/common.interface";
import { CheckCircleOutlined, SwapOutlined } from "@ant-design/icons";
import useBooking from "../../hooks/useBooking";
import useMessage from "@/hooks/useMessage";
import { formatDate } from "@/utils/date";

export interface DrawerSelectProduct {
  open: boolean;
  onClose: () => void;
  onOk?: () => void;
  data?: IProductTour;
}
const DrawerSelectProduct: React.FC<DrawerSelectProduct> = ({ open, onClose, onOk, data }) => {
  const [bookingInformation, _] = useBooking();
  const stocks = useMemo(() => data?.sellableDetails.stocks, [data]);
  const inventories = useMemo(() => data?.sellableDetails.inventories, [data]);
  const promotions = useMemo(() => data?.promotions, [data]);
  const message = useMessage();
  const { onSetPassengerConfig, onReselectProduct, onChangeSellChannel, onSetProductItem } = useSelectProductTour();

  const [isInitGotoNext, startGoToNext] = useTransition();

  const filterPriceConfigbySellChannel = (priceConfigs?: PriceConfig[]) => {
    const { channel } = bookingInformation;

    return priceConfigs?.reduce<PriceConfig[]>((acc, item) => {
      if (channel === ESellChannel.B2C) {
        if (item.channel === "CUSTOMER") {
          acc = [...acc, item];
        }
      }
      if (channel === ESellChannel.B2B) {
        if (item.channel === "AGENT") {
          acc = [...acc, item];
        }
      }
      return acc;
    }, []);
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

  const onCancelSelection = () => {
    onReselectProduct();
    onClose?.();
  };
  const handleConfirmSelection = () => {
    data && onSetProductItem(data);
    data && onOk && startGoToNext(onOk);
  };
  const isDisableNextButton = useMemo(() => {
    return (
      bookingInformation.passengerPriceConfigs.adult.length === 0 &&
      bookingInformation.passengerPriceConfigs.child.length === 0
    );
  }, [bookingInformation]);

  return (
    <Drawer
      title={data?.template.name}
      width={650}
      open={open}
      // onClose={onClose}
      destroyOnClose
      maskClosable={false}
      closeIcon={null}
      footer={
        <Space className="py-2">
          <Button size="large" type="text" className="!bg-gray-200 !text-gray-600 w-36" onClick={onCancelSelection}>
            Huỷ bỏ
          </Button>
          <Button
            type="primary"
            size="large"
            className="w-36"
            onClick={handleConfirmSelection}
            loading={isInitGotoNext}
            disabled={isDisableNextButton}
          >
            Mua dịch vụ
          </Button>
        </Space>
      }
    >
      <div className="text-primary-default mb-3">
        <span className="block font-[500]">{data?.template.code}</span>
        <span className="text-sm">{data?.code}</span>
      </div>
      <div className="flex items-center">
        <div>
          <span className="block text-xs">Ngày đi</span>
          <span className="">{data ? formatDate(data?.startDate) : null}</span>
        </div>
        <SwapOutlined className="mx-6" />
        <div>
          <span className="block text-xs">Ngày về</span>
          <span className="">{data ? formatDate(data?.endDate) : null}</span>
        </div>
      </div>
      <div className="tour__box__item-dropdown border-t pt-4 mt-4">
        {inventories || stocks ? <h4 className="font-semibold mb-3">Dịch vụ đi kèm</h4> : null}
        <div className="flex flex-wrap gap-3 mb-3">
          {inventories?.map((item) => (
            <div className="detail-item flex items-start" key={item.recId}>
              <CheckCircleOutlined className="!text-emerald-600 mr-1 mt-[3px]" />
              <span>{item.name}</span>
            </div>
          ))}
          {stocks?.map((item) => (
            <div className="detail-item flex items-start" key={item.recId}>
              <CheckCircleOutlined className="!text-emerald-600 mr-1 mt-[3px]" />
              <span>{`${item.inventory.name} - ${item.code}`}</span>
            </div>
          ))}
        </div>
        {promotions ? (
          <>
            <h4 className="font-semibold mb-3">Các giảm giá có thể áp dụng</h4>
            {promotions.map((promo) => (
              <div className="promo-item flex mb-1 items-start" key={promo.code}>
                <CheckCircleOutlined className="!text-emerald-600 mr-1 mt-[3px]" />
                <span>{moneyFormatVND(promo.discountAmount)}</span>
              </div>
            ))}
          </>
        ) : null}
      </div>
      <div className="section-sell-channel mt-3 pt-3 border-t">
        <h3 className="text-lg font-[500] mb-3">Kênh bán</h3>
        <Segmented
          value={bookingInformation.channel}
          options={SELL_CHANNEL}
          onChange={(value) => {
            onChangeSellChannel(value as ESellChannel);
          }}
        />
      </div>
      <div className="tour__item-classes-head mt-3">
        <h3 className="text-lg font-[500] mb-3">Chọn số lượng khách</h3>
        {filterPriceConfigbySellChannel(data?.configs)?.length ? (
          filterPriceConfigbySellChannel(data?.configs)?.map((config) => (
            <PassengerTourClassItem
              variant="vertical"
              key={config.recId}
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
              onSelectPassenger={(type, value, action) => onSelectPassenger(type, value, config, action)}
            />
          ))
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Số lượng hiện đã bán hết." />
        )}
      </div>
    </Drawer>
  );
};
export default memo(DrawerSelectProduct);
