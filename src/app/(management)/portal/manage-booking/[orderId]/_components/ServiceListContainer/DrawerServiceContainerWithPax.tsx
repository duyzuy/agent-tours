import { useEffect, useMemo, useState } from "react";
import { Drawer, Space, Button, Spin, Empty, Typography, Modal } from "antd";

import { IOrderDetail } from "@/models/management/booking/order.interface";
import { getPassengerType } from "@/utils/common";
import { useGetBookingTourServicesCoreQuery } from "@/queries/core/bookingOrder";
import { EditBookingSSRByPassenger } from "../../modules/manageBooking.interface";
import ServiceBoxItem, { ServiceBoxItemProps } from "./ServiceBoxItem";
import classNames from "classnames";
import { UserOutlined, WarningOutlined } from "@ant-design/icons";

import { moneyFormatVND } from "@/utils/helper";
import useMessage from "@/hooks/useMessage";
import { ESellChannel } from "@/constants/channel.constant";

export interface DrawerServiceContainerWithPaxProps {
  label?: string;
  isOpen?: boolean;
  sellableId: number;
  passengerList: IOrderDetail["passengers"];
  orderId: number;
  channel: ESellChannel;
  onSubmit: (data: EditBookingSSRByPassenger) => void;
  onClose?: () => void;
}

const DrawerServiceContainerWithPax: React.FC<DrawerServiceContainerWithPaxProps> = ({
  label,
  isOpen = false,
  sellableId,
  passengerList,
  orderId,
  channel,
  onSubmit,
  onClose,
}) => {
  const { data: serviceList, isLoading } = useGetBookingTourServicesCoreQuery({
    enabled: isOpen,
    sellableId: sellableId,
  });
  const initFormData = new EditBookingSSRByPassenger(orderId, []);
  const message = useMessage();
  const [ssrFormData, setSSRFormData] = useState(initFormData);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [currentPassenter, setCurrentPassenter] = useState<IOrderDetail["passengers"][number]>();

  const passengerListSortedByType = useMemo(() => {
    return passengerList.sort((a, b) => a.type.localeCompare(b.type));
  }, [passengerList]);

  const selectedItems = useMemo(() => {
    return ssrFormData.ssrList.filter((item) => item.paxId === currentPassenter?.recId);
  }, [currentPassenter, ssrFormData]);

  const subtotal = useMemo(() => {
    return ssrFormData.ssrList.reduce((subtotal, item) => {
      return (subtotal += item.qty * item.configItem[item.type]);
    }, 0);
  }, [ssrFormData]);

  const getTotalQuantityByPassenger = (paxId: number) => {
    const paxList = ssrFormData.ssrList.filter((item) => item.paxId === paxId);

    return paxList.reduce((subTotal, item) => {
      return (subTotal += item.qty);
    }, 0);
  };

  const onChangeQuantity: ServiceBoxItemProps["onChangeQuantity"] = ({ action, passenger, qty, configItem }) => {
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

      const indexConfigItemByPassenger = newSSrList.findIndex(
        (item) => item.paxId === passenger.recId && item.configItem.recId === configItem.recId,
      );

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
            paxId: passenger.recId,
            amount: configItem[passenger.type],
            qty: qty,
            configItem: configItem,
            type: passenger.type,
          },
        ];
      }

      return {
        ...oldData,
        ssrList: [...newSSrList],
      };
    });
  };

  const handleSelectPassenger = (pax: IOrderDetail["passengers"][number]) => {
    setCurrentPassenter(pax);
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
    setCurrentPassenter(() => passengerListSortedByType[0]);
    setSSRFormData(initFormData);
  }, [passengerListSortedByType, isOpen]);

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
      <div className="passenger-container overflow-x-auto -mx-6 -mt-6 bg-slate-50 p-6">
        <div className="passenger-list flex whitespace-nowrap gap-x-4">
          {passengerListSortedByType.map((paxItem, _index) => (
            <PassengerBoxItem
              key={paxItem.recId}
              isActive={currentPassenter?.recId === paxItem.recId}
              paxType={getPassengerType(paxItem.type)}
              passengerName={
                paxItem.paxLastname && paxItem.paxMiddleFirstName
                  ? `${paxItem.paxLastname}, ${paxItem.paxMiddleFirstName}`
                  : `Hành khách ${_index + 1}`
              }
              onClick={() => handleSelectPassenger(paxItem)}
              itemCount={getTotalQuantityByPassenger(paxItem.recId)}
            />
          ))}
        </div>
      </div>
      <div className="h-12"></div>
      {isLoading ? (
        <Spin tip="Đang tải dịch vụ">
          <div className="py-12">{null}</div>
        </Spin>
      ) : !serviceList ? (
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
            passenger={currentPassenter}
            selectedItems={selectedItems}
            onChangeQuantity={onChangeQuantity}
          />
        ))
      )}
      <ModalCancelService open={openModalConfirm} onCancel={modalOnCancel} onOk={modalOnConfirm} />
    </Drawer>
  );
};
export default DrawerServiceContainerWithPax;

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
          <Button className="!text-red-600 !bg-red-100 w-[90px]" type="text" onClick={onCancel}>
            Đóng
          </Button>
          <Button className="!text-emerald-600 !bg-emerald-100 w-[90px]" type="text" onClick={onOk}>
            Đồng ý
          </Button>
        </Space>
      </div>
    </Modal>
  );
};

interface PassengerBoxItemProps {
  isActive?: boolean;
  onClick?: () => void;
  paxType: string;
  passengerName: string;
  itemCount: number;
}

const PassengerBoxItem: React.FC<PassengerBoxItemProps> = ({
  isActive,
  onClick,
  paxType,
  passengerName,
  itemCount,
}) => {
  return (
    <div
      className={classNames("rounded-md border relative p-4 min-w-[160px]", {
        "border-transparent shadow-sm bg-white cursor-pointer": !isActive,
        "border-primary-default shadow-md bg-blue-50": isActive,
      })}
    >
      <div className="passenger-name text-center" onClick={onClick}>
        <UserOutlined />
        <div className="text-xs text-gray-500 block">{paxType}</div>
        <div>{passengerName}</div>
        <span
          className={classNames(
            "w-[20px] h-[20px] rounded-full text-white inline-flex items-center justify-center text-xs",
            {
              "bg-emerald-600": itemCount !== 0,
              "bg-gray-400": itemCount === 0,
            },
          )}
        >
          {itemCount}
        </span>
      </div>
    </div>
  );
};
