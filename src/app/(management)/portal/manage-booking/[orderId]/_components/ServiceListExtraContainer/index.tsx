import React, { useMemo, useState } from "react";
import { IOrderDetail } from "@/models/management/booking/order.interface";
import { Button, Table, Popconfirm } from "antd";
import classNames from "classnames";
import { CheckCircleOutlined, DeleteOutlined, PlusOutlined, WarningOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { serviceColumns } from "./columns";
import useEditSSR from "../../modules/useEditSSR";
import DrawerServiceContainerNoPax, { DrawerServiceContainerNoPaxProps } from "./DrawerServiceContainerNoPax";
import { ESellChannel } from "@/constants/channel.constant";

interface ServiceListExtraContainerProps {
  orderId: number;
  sellableId: number;
  includedItems: IOrderDetail["bookingOrder"]["sellableDetails"];
  serviceList: IOrderDetail["ssrBookings"];

  className?: string;
  channel: ESellChannel;
  isBookingCanceled?: boolean;
}
export type ServiceItem = Exclude<IOrderDetail["ssrBookings"], null>[number];
export type PassengerItem = Exclude<IOrderDetail["passengers"], null>[number];

const ServiceListExtraContainer: React.FC<ServiceListExtraContainerProps> = ({
  orderId,
  sellableId,
  includedItems,
  serviceList,
  channel,
  isBookingCanceled,
  className = "",
}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [drawerType, setDrawerType] = useState<"SSRWithPax" | "SSRNoPax">();

  const { onAddSSRNoPax, onDeleteSSR, loadingDelete } = useEditSSR();

  const onClickBuyService = (type: "SSRWithPax" | "SSRNoPax") => {
    setShowDrawer(true);
    setDrawerType(type);
  };
  const onCancelBuyService = () => {
    setShowDrawer(true);
    setDrawerType(undefined);
  };

  const handleDeleteSSR = ({ bookingId, sellableConfigId }: { bookingId: number; sellableConfigId: number }) => {
    onDeleteSSR({ bookingOrderId: orderId, deleteSSR: [{ bookingId, sellableConfigId }] });
  };

  const handleSubmitSSRNoPax: DrawerServiceContainerNoPaxProps["onSubmit"] = (data) => {
    onAddSSRNoPax(data, {
      onSuccess(data, variables, context) {
        setShowDrawer(true);
        setDrawerType(undefined);
      },
    });
  };

  const serviceListWithoutPax = useMemo(() => {
    return serviceList?.filter((item) => item.paxId === 0);
  }, [serviceList]);

  const serviceListNoPaxColumn: ColumnsType<ServiceItem> = [
    ...serviceColumns,
    {
      title: "",
      render(value, record, index) {
        return (
          <Popconfirm
            title={"Xoá dịch vụ"}
            description="Bạn chắc chắn muốn xoá dịch vụ đã mua."
            okText="Đồng ý"
            cancelText="Huỷ bỏ"
            icon={<WarningOutlined className="!text-red-600" />}
            onConfirm={() => handleDeleteSSR({ bookingId: record.recId, sellableConfigId: record.sellableConfigId })}
          >
            <Button
              type="text"
              size="small"
              icon={<DeleteOutlined />}
              className="!text-red-600 !bg-red-50 hover:!bg-red-100"
              loading={loadingDelete}
            >
              Xoá
            </Button>
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <div
      className={classNames("booking__detail--ssr", {
        [className]: className,
      })}
    >
      <div className="booking__detail-head mb-6 flex items-center gap-x-4">
        <h3 className="text-lg font-[500] mr-2">Thông tin dịch vụ</h3>
        {isBookingCanceled ? null : (
          <Button
            type="text"
            className="!bg-blue-50 !text-blue-600 hover:!bg-blue-100"
            icon={<PlusOutlined />}
            onClick={() => onClickBuyService("SSRNoPax")}
          >
            Mua thêm
          </Button>
        )}
      </div>
      <div className="flex gap-6 flex-wrap mb-6">
        {includedItems?.inventories.map((item) => (
          <div className="item" key={item.recId}>
            <CheckCircleOutlined className="!text-emerald-600" /> {item.name}
          </div>
        ))}
        {includedItems?.stocks.map((item) => (
          <div className="item" key={item.recId}>
            <CheckCircleOutlined className="!text-emerald-600" /> {`${item?.inventory?.name} - ${item.code}`}
          </div>
        ))}
      </div>
      <Table
        rowKey={"recId"}
        columns={serviceListNoPaxColumn}
        dataSource={serviceListWithoutPax}
        pagination={{ hideOnSinglePage: true, pageSize: 20, size: "small" }}
      />
      <DrawerServiceContainerNoPax
        label="Chọn dịch vụ"
        orderId={orderId}
        sellableId={sellableId}
        isOpen={showDrawer && drawerType === "SSRNoPax"}
        onClose={onCancelBuyService}
        onSubmit={handleSubmitSSRNoPax}
        channel={channel}
      />
    </div>
  );
};
export default ServiceListExtraContainer;
