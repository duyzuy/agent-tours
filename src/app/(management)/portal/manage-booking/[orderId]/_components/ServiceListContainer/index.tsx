import React, { useMemo, useState, useTransition } from "react";
import { IOrderDetail } from "@/models/management/booking/order.interface";
import { Button, Table, Tabs, Popconfirm, Popover } from "antd";
import { getPassengerType } from "@/utils/common";
import classNames from "classnames";
import { CheckCircleOutlined, DeleteOutlined, WarningOutlined } from "@ant-design/icons";
import { isEmpty } from "lodash";
import { useRouter } from "next/navigation";
import { ColumnsType } from "antd/es/table";
import { serviceColumns } from "./columns";
import useEditSSR from "../../modules/useEditSSR";
import DrawerServiceContainerWithPax, { DrawerServiceContainerWithPaxProps } from "./DrawerServiceContainerWithPax";
import DrawerServiceContainerNoPax, { DrawerServiceContainerNoPaxProps } from "./DrawerServiceContainerNoPax";
import { ESellChannel } from "@/constants/channel.constant";

interface ServiceListContainerProps {
  orderId: number;
  sellableId: number;
  includedItems: IOrderDetail["bookingOrder"]["sellableDetails"];
  serviceList: IOrderDetail["ssrBookings"];
  passengerList: IOrderDetail["passengers"];
  className?: string;
  channel: ESellChannel;
}
export type ServiceItem = Exclude<IOrderDetail["ssrBookings"], null>[number];
export type PassengerItem = Exclude<IOrderDetail["passengers"], null>[number];

const ServiceListContainer: React.FC<ServiceListContainerProps> = ({
  orderId,
  sellableId,
  includedItems,
  serviceList,
  passengerList,
  channel,
  className = "",
}) => {
  const [isStartingBuyService, startBuyServiceTransition] = useTransition();
  const [showDrawer, setShowDrawer] = useState(false);
  const [drawerType, setDrawerType] = useState<"SSRWithPax" | "SSRNoPax">();
  const [openPopConfirm, setOpenPopconfirm] = useState(false);

  const router = useRouter();
  const { onAddSSRByPax, onAddSSRNoPax, onDeleteSSR, loadingDelete } = useEditSSR();

  const onClickBuyService = (type: "SSRWithPax" | "SSRNoPax") => {
    setShowDrawer(true);
    setDrawerType(type);
    setOpenPopconfirm(false);
  };
  const onCancelBuyService = () => {
    setShowDrawer(true);
    setDrawerType(undefined);
  };

  const handleDeleteSSR = ({ bookingId, sellableConfigId }: { bookingId: number; sellableConfigId: number }) => {
    onDeleteSSR({ bookingOrderId: orderId, deleteSSR: [{ bookingId, sellableConfigId }] });
  };

  const handleSubmitSSRByPax: DrawerServiceContainerWithPaxProps["onSubmit"] = (data) => {
    onAddSSRByPax(data, {
      onSuccess(data, variables, context) {
        setShowDrawer(true);
        setDrawerType(undefined);
      },
    });
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

  const serviceListByPax = useMemo(() => {
    return serviceList
      ?.filter((item) => item.paxId !== 0)
      .reduce<(ServiceItem & { pax?: PassengerItem })[]>((acc, item) => {
        const paxItem = passengerList?.find((pax) => pax.recId === item.paxId);
        return [...acc, { ...item, pax: paxItem }];
      }, []);
  }, [serviceList, passengerList]);

  const serviceListByPaxColumn: ColumnsType<ServiceItem & { pax?: PassengerItem }> = [
    {
      title: "Họ và tên",
      width: 200,
      render: (value, { pax }, index) => {
        return (
          <>
            {`${isEmpty(pax?.paxLastname) ? "--" : pax?.paxLastname}, 
            ${isEmpty(pax?.paxMiddleFirstName) ? "--" : pax?.paxMiddleFirstName}`}
          </>
        );
      },
    },
    {
      title: "Hành khách",
      width: 150,
      render: (value, record, index) => {
        return getPassengerType(record.type);
      },
    },
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
              loading={loadingDelete}
              className="!text-red-600 !bg-red-50 hover:!bg-red-100"
            >
              Xoá
            </Button>
          </Popconfirm>
        );
      },
    },
  ];

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
      </div>

      <h3 className="text-[16px] mb-3">Dịch vụ đi kèm</h3>
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
      <div className="flex items-center gap-x-3 mb-6">
        <h3 className="text-[16px]">Dịch vụ mua thêm</h3>
        <Popover
          open={openPopConfirm}
          placement="bottom"
          content={
            <>
              <h3 className="mb-3 font-semibold">Mua dịch vụ</h3>
              <div className="flex flex-col gap-3">
                <Button
                  className="!text-rose-600 !bg-rose-100 hover:!bg-rose-200 !block w-[180px]"
                  type="text"
                  onClick={() => onClickBuyService("SSRWithPax")}
                >
                  Theo hành khách
                </Button>
                <Button
                  className="!text-orange-600 !bg-orange-100 hover:!bg-orange-200 !block w-[180px]"
                  type="text"
                  onClick={() => onClickBuyService("SSRNoPax")}
                >
                  Không theo hành khách
                </Button>
              </div>
            </>
          }
        >
          <Button
            // icon={<PlusOutlined />}
            type="text"
            className="!bg-cyan-100 !text-cyan-600 hover:!bg-cyan-200"
            onClick={() => setOpenPopconfirm((prev) => !prev)}
            loading={isStartingBuyService}
          >
            Mua dịch vụ
          </Button>
        </Popover>
      </div>
      <Tabs
        type="card"
        items={[
          {
            label: "Dịch vụ theo khách",
            key: "serviceByPax",
            children: (
              <Table
                rowKey={"recId"}
                columns={serviceListByPaxColumn}
                dataSource={serviceListByPax}
                pagination={{ hideOnSinglePage: true, pageSize: 20, size: "small" }}
              />
            ),
          },
          {
            label: "Dịch vụ không theo khách",
            key: "serviceNoPax",
            children: (
              <Table
                rowKey={"recId"}
                columns={serviceListNoPaxColumn}
                dataSource={serviceListWithoutPax}
                pagination={{ hideOnSinglePage: true, pageSize: 20, size: "small" }}
              />
            ),
          },
        ]}
      />
      <DrawerServiceContainerWithPax
        label="Mua dịch vụ theo khách"
        orderId={orderId}
        sellableId={sellableId}
        passengerList={passengerList}
        isOpen={showDrawer && drawerType === "SSRWithPax"}
        onClose={onCancelBuyService}
        onSubmit={handleSubmitSSRByPax}
        channel={channel}
      />
      <DrawerServiceContainerNoPax
        label="Mua dịch vụ"
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
export default ServiceListContainer;
