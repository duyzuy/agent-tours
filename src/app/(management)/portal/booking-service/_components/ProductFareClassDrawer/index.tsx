import { ESellChannel, SELL_CHANNEL } from "@/constants/channel.constant";
import { IProductService } from "@/models/management/booking/product.interface";
import { Button, Divider, Drawer, Empty, Segmented, Space } from "antd";
import useSelectProductTour from "../../modules/useSelectProductService";
import PassengerTourClassItem from "./PassengerTourClassItem";
import { moneyFormatVND } from "@/utils/helper";
import { PriceConfig } from "@/models/management/core/priceConfig.interface";
import { memo, useCallback, useMemo, useTransition } from "react";
import { PassengerType } from "@/models/common.interface";
import { CheckCircleOutlined, SwapOutlined } from "@ant-design/icons";
import { usePortalBookingServiceManager } from "../../modules/store/context";
import useMessage from "@/hooks/useMessage";
import { formatDate } from "@/utils/date";
import { getAdminUserInformationStorage } from "@/utils/common";

export interface ProductFareClassDrawerProps {
  open: boolean;
  onClose: () => void;
  onOk?: () => void;
  data?: IProductService;
}
const ProductFareClassDrawer: React.FC<ProductFareClassDrawerProps> = ({ open, onClose, onOk, data }) => {
  const adminInfo = getAdminUserInformationStorage();

  const [bookingInformation, _] = usePortalBookingServiceManager();
  const stocks = useMemo(() => data?.sellableDetails.stocks, [data]);
  const inventories = useMemo(() => data?.sellableDetails.inventories, [data]);
  const promotions = useMemo(() => data?.promotions, [data]);
  const message = useMessage();
  const { onReselectProduct, onChangeSellChannel, onSetProductItem } = useSelectProductTour();

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
      return 0;
    },
    [bookingInformation],
  );

  const onSelectPassenger = (
    type: PassengerType,
    quantity: number,
    priceConfig: PriceConfig,
    action: "minus" | "plus",
  ) => {};

  const mapRuleUserTypeSellChannel = (items: typeof SELL_CHANNEL) => {
    if (adminInfo?.localUserType === "ADMIN" || adminInfo?.localUserType === "STAFF") {
      return SELL_CHANNEL;
    }

    return SELL_CHANNEL.filter((item) => item.value === ESellChannel.B2B);
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
    return false;
  }, [bookingInformation]);

  return (
    <Drawer
      title={data?.template.name}
      width={650}
      open={open}
      destroyOnClose
      maskClosable={false}
      closeIcon={null}
      footer={
        <Space className="py-2">
          <Button
            type="primary"
            size="large"
            className="min-w-36"
            onClick={handleConfirmSelection}
            loading={isInitGotoNext}
            disabled={isDisableNextButton}
          >
            Tiến hành thanh toán
          </Button>
          <Button size="large" className="min-w-54" onClick={onCancelSelection}>
            Huỷ bỏ
          </Button>
        </Space>
      }
    >
      <div className="text-primary-default mb-3">
        <span className="block font-[500]">{data?.template.code}</span>
        <span className="text-sm">{data?.code}</span>
      </div>
      <Divider />
      <div className="tour__box__item-dropdown">
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
      <Divider />
      <div className="section-sell-channel">
        <h3 className="text-lg font-[500] mb-3">Kênh bán</h3>
        <Segmented
          value={bookingInformation.channel}
          options={mapRuleUserTypeSellChannel(SELL_CHANNEL)}
          onChange={(value) => {
            onChangeSellChannel(value as ESellChannel);
          }}
        />
      </div>
      <div className="tour__item-classes-head mt-3">
        <h3 className="text-lg font-[500] mb-3">Chọn số lượng dịch vụ</h3>
        {filterPriceConfigbySellChannel(data?.configs)?.length ? (
          <div className="flex flex-col gap-3">
            {filterPriceConfigbySellChannel(data?.configs)?.map((config) => (
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
            ))}
          </div>
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Số lượng hiện đã bán hết." />
        )}
      </div>
    </Drawer>
  );
};
export default memo(ProductFareClassDrawer);
