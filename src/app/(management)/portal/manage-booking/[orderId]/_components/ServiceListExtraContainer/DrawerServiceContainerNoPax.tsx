import { useEffect, useMemo, useState } from "react";
import { Drawer, Space, Button, Spin, Empty, Typography, Modal } from "antd";
import { useGetBookingTourServicesCoreQuery } from "@/queries/core/bookingOrder";
import { EditBookingSSRNoPassenger } from "../../modules/manageBooking.interface";
import classNames from "classnames";
import { WarningOutlined } from "@ant-design/icons";

import Quantity from "@/components/base/Quantity";

// import { IProductService } from "@/models/management/booking/service.interface";
import { IServiceItem } from "@/models/management/booking/service.interface";
import { PassengerType } from "@/models/common.interface";
import { ESellChannel } from "@/constants/channel.constant";
import { moneyFormatVND } from "@/utils/helper";
import useMessage from "@/hooks/useMessage";

export interface DrawerServiceContainerNoPaxProps {
  label?: string;
  isOpen?: boolean;
  sellableId: number;
  orderId: number;
  channel: ESellChannel;
  onSubmit: (data: EditBookingSSRNoPassenger) => void;
  onClose?: () => void;
}

const DrawerServiceContainerNoPax: React.FC<DrawerServiceContainerNoPaxProps> = ({
  label,
  isOpen = false,

  sellableId,
  orderId,
  channel,
  onSubmit,
  onClose,
}) => {
  const { data: serviceList, isLoading } = useGetBookingTourServicesCoreQuery({
    enabled: isOpen,
    sellableId: sellableId,
  });
  const initFormData = new EditBookingSSRNoPassenger(orderId, []);
  const message = useMessage();
  const [ssrFormData, setSSRFormData] = useState(initFormData);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);

  const subtotal = useMemo(() => {
    return ssrFormData.ssrList.reduce((subtotal, item) => {
      return (subtotal += item.qty * item.configItem[item.type]);
    }, 0);
  }, [ssrFormData]);

  const onChangeQuantity: ServiceBoxItemProps["onChangeQuantity"] = ({ action, qty, configItem }) => {
    if (qty < 0) {
      message.warning("Số lượng không nhỏ hơn 0.");
      return;
    }

    if (action === "plus" && qty > configItem.open) {
      message.warning(`Số lượng đã chọn không vượt quá ${configItem.open}.`);
      return;
    }

    setSSRFormData((oldData) => {
      const { ssrList } = oldData;

      let newSSrList = [...ssrList];

      const indexConfigItemByPassenger = newSSrList.findIndex((item) => item.configItem.recId === configItem.recId);

      if (indexConfigItemByPassenger !== -1) {
        if (qty === 0) {
          newSSrList.splice(indexConfigItemByPassenger, 1);
        } else {
          newSSrList.splice(indexConfigItemByPassenger, 1, {
            ...newSSrList[indexConfigItemByPassenger],
            qty: qty,
          });
        }
      }

      if (indexConfigItemByPassenger === -1) {
        newSSrList = [
          ...newSSrList,
          {
            amount: configItem[PassengerType.ADULT],
            qty: qty,
            configItem: configItem,
            type: PassengerType.ADULT,
          },
        ];
      }

      return {
        ...oldData,
        ssrList: [...newSSrList],
      };
    });
  };

  const handleSubmitServiceList = () => {
    onSubmit?.(ssrFormData);
  };

  const modalOnCancel = () => {
    setOpenModalConfirm(false);
  };

  const modalOnConfirm = () => {
    setSSRFormData(initFormData);
    setOpenModalConfirm(false);
    onClose?.();
  };

  const handleCloseDrawer = () => {
    if (ssrFormData.ssrList.length === 0) {
      onClose?.();
    } else {
      setOpenModalConfirm(true);
    }
  };

  /**
   *
   * @param items
   * @returns newItems mapping with sellchannel
   * @type {ESellChannel}
   *
   */
  const filterServiceListBySellChannel = (items: Exclude<typeof serviceList, undefined>) => {
    return items.reduce<Exclude<typeof serviceList, undefined>>((acc, item) => {
      let newconfigItems = [...item.configs];
      if (channel === ESellChannel.B2C) {
        newconfigItems = newconfigItems.filter((configIt) => configIt.channel === "CUSTOMER");
      }
      if (channel === ESellChannel.B2B) {
        newconfigItems = newconfigItems.filter((configIt) => configIt.channel === "CUSTOMER");
      }
      return [...acc, { ...item, configs: newconfigItems }];
    }, []);
  };
  const isDisabledButton = useMemo(() => {
    return ssrFormData.ssrList.length === 0;
  }, [ssrFormData]);
  useEffect(() => {
    setSSRFormData(initFormData);
  }, [isOpen]);

  return (
    <Drawer
      title={label}
      width={850}
      onClose={handleCloseDrawer}
      closeIcon={null}
      destroyOnClose={true}
      open={isOpen}
      footer={
        <div className="flex justify-between py-3">
          <div className="price-subtotal">
            <span className="text-gray-500">Tạm tính</span>
            <div className="text-lg text-red-600 font-[500]">{moneyFormatVND(subtotal)}</div>
          </div>
          <Space>
            <Button
              type="primary"
              size="large"
              className="w-[120px]"
              onClick={handleSubmitServiceList}
              disabled={isDisabledButton}
            >
              Xác nhận
            </Button>
            <Button size="large" className="w-[120px]" onClick={handleCloseDrawer}>
              Huỷ
            </Button>
          </Space>
        </div>
      }
    >
      {isLoading ? (
        <Spin tip="Đang tải dịch vụ">
          <div className="py-12">{null}</div>
        </Spin>
      ) : !serviceList || !serviceList.length ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={<Typography.Text>Không có dịch vụ nào khả dụng</Typography.Text>}
        />
      ) : (
        filterServiceListBySellChannel(serviceList).map((svItem) => (
          <ServiceBoxItem
            key={svItem.inventory.recId}
            serviceName={svItem.inventory.name}
            consfigItems={svItem.configs}
            passengerType={PassengerType.ADULT}
            selectedItems={ssrFormData.ssrList}
            onChangeQuantity={onChangeQuantity}
          />
        ))
      )}
      <ModalCancelService open={openModalConfirm} onCancel={modalOnCancel} onOk={modalOnConfirm} />
    </Drawer>
  );
};
export default DrawerServiceContainerNoPax;

interface ModalCancelServiceProps {
  open: boolean;
  onCancel: () => void;
  onOk: () => void;
}
const ModalCancelService: React.FC<ModalCancelServiceProps> = ({ open, onCancel, onOk }) => {
  return (
    <Modal width={450} open={open} footer={null} closeIcon={null}>
      <div className="text-center mb-3">
        <WarningOutlined className="!text-orange-600 !text-2xl" />
        <h3 className="text-lg font-semibold">Đóng!</h3>
      </div>
      <div className="text-center mb-6">
        <p>Đồng ý và huỷ các dịch vụ đang chọn.</p>
      </div>
      <div className="text-center">
        <Space>
          <Button className="!text-emerald-600 !bg-emerald-100 w-[90px]" type="text" onClick={onOk}>
            Đồng ý
          </Button>
          <Button className="!text-red-600 !bg-red-100 w-[90px]" type="text" onClick={onCancel}>
            Đóng
          </Button>
        </Space>
      </div>
    </Modal>
  );
};

interface ServiceBoxItemProps {
  serviceName?: string;
  consfigItems: IServiceItem["configs"];
  onChangeQuantity?: (data: {
    action: "minus" | "plus";
    qty: number;
    configItem: IServiceItem["configs"][number];
  }) => void;
  selectedItems?: EditBookingSSRNoPassenger["ssrList"];
  passengerType: PassengerType.ADULT;
}
const ServiceBoxItem: React.FC<ServiceBoxItemProps> = ({
  serviceName,
  passengerType,
  onChangeQuantity,
  consfigItems,
  selectedItems,
}) => {
  const getQuantityValueItem = (record: IServiceItem["configs"][number]) => {
    const configItem = selectedItems?.find((item) => item.configItem.recId === record.recId);
    return configItem ? configItem.qty : 0;
  };

  return (
    <div className="service__item mb-6 pb-6 border-b">
      <div className="service__item-head flex justify-between mb-3">
        <span className="text-[16px] font-semibold">{serviceName}</span>
      </div>
      <div className="service__item-body">
        {consfigItems.map((configItem, _indexConfig) => (
          <div
            key={configItem.recId}
            className={classNames("pricing-item flex justify-between", {
              "mt-3 border-t border-dashed pt-3": _indexConfig !== 0,
            })}
          >
            <div className="flex items-center gap-x-6">
              <div className="w-28">
                <span className="text-xs text-gray-500 block">Kênh bán</span>
                <span className="block">{configItem.channel}</span>
              </div>
              <div className="w-16">
                <span className="text-xs text-gray-500 block">Hạng</span>
                <span className="block">{configItem.class}</span>
              </div>
              <div className="w-24">
                <span className="text-xs text-gray-500 block">Số lượng còn</span>
                <span className="block text-emerald-600">{configItem.open}</span>
              </div>
              <div className="w-32">
                <span className="text-xs text-gray-500 block">Đơn giá</span>
                <span className="block text-primary-default">{moneyFormatVND(configItem[passengerType])}</span>
              </div>
            </div>
            <div>
              <span className="text-xs text-gray-500 block"></span>
              <span className="block">
                <Quantity
                  size="sm"
                  value={getQuantityValueItem(configItem)}
                  onChange={(action, qty) => onChangeQuantity?.({ action, qty, configItem })}
                />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
