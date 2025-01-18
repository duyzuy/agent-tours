import { IOperation, IOperationStatus } from "@/models/management/core/operation.interface";
import { formatDate } from "@/utils/date";
import { RetweetOutlined, SwapRightOutlined } from "@ant-design/icons";
import { Button, Space, Tabs, TabsProps, Tag } from "antd";
import OperationInformation from "./_components/OperationInformation";
import { useGetOperationStatusQuery } from "@/queries/core/operation";
import DeadlineContainer from "./_components/DeadlineContainer";
import CostingContainer from "./_components/CostingContainer";
import RoomingContainer from "./_components/RoomingContainer";
import classNames from "classnames";
import useOperation from "../modules/useOperation";
import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { queryCore } from "@/queries/var";
import { useGetOperationThingTodoList } from "@/queries/core/operation";
import {
  IOperationThingTodo,
  OperationThingTodoQueryParams,
} from "@/models/management/core/operationThingTodo.interface";
import OperationThingTodoList from "@/components/admin/OperationThingTodoList";
import OperationThingTodoItemListContainer from "./_components/OperationThingTodoItemListContainer";

interface OperationContainerProps {
  operationId: number;
  data: IOperation;
}
const OperationContainer: React.FC<OperationContainerProps> = ({ operationId, data }) => {
  const { status } = data;
  const queryClient = useQueryClient();
  const { data: operationStatus, isLoading } = useGetOperationStatusQuery({
    queryParams: { operationId: operationId },
    enabled: !!operationId,
  });

  const { onUpdateStatus } = useOperation();
  const onUpdateStatusThenRevalidateQuery = (status: IOperationStatus) => {
    onUpdateStatus(
      { id: operationId, status: status },
      {
        onSuccess(data, variables, context) {
          queryClient.invalidateQueries({ queryKey: [queryCore.GET_OPERATION_DETAIL] });
        },
      },
    );
  };

  const operationActions = useMemo(() => {
    //NEW - default sau khi tạo => ACCEPTED, CANCELED
    //ACCEPTED - đã nhận: vẫn được update roomingList + checkList => HANDOVERED, PENDINGCANCELED
    //HANDOVERED - đã bàn giao: vẫn được book thêm dịch vụ Costing => LOCKED, PENDINGCANCELED
    //LOCKED - khoá: vẫn có thể thanh toán => HANDOVERED, PENDINGCANCELED, DONE
    //PENDINGCANCELED - đã huỷ, vẫn có thể thanh toán => HANDOVERED, CANCELED
    //CANCELED - xong, chỉ xem
    //DONE - xong, chỉ xem

    if (status === "DONE" || status === "CANCELED") return;

    let actions: { key: string; label: React.ReactNode; className?: string; onClick?: () => void }[] = [
      {
        key: "accept",
        label: <span className="text-emerald-600">Duyệt</span>,
        onClick: () => onUpdateStatusThenRevalidateQuery("ACCEPTED"),
        className: "!text-emerald-600 !bg-emerald-50",
      },
      {
        key: "handOver",
        label: <span className="text-amber-500">Bàn giao</span>,
        onClick: () => onUpdateStatusThenRevalidateQuery("HANDOVERED"),
        className: "!bg-amber-100 !text-amber-500",
      },
      {
        key: "lock",
        label: <span>Khoá</span>,
        onClick: () => onUpdateStatusThenRevalidateQuery("LOCKED"),
        className: "!bg-gray-100 !text-gray-600",
      },
      {
        key: "pendingCancel",
        label: <span className="text-pink-600">Chờ huỷ</span>,
        onClick: () => onUpdateStatusThenRevalidateQuery("PENDINGCANCELED"),
        className: "!text-pink-600 !bg-pink-100",
      },
      {
        key: "cancel",
        label: <span className="text-white">Huỷ</span>,
        onClick: () => onUpdateStatusThenRevalidateQuery("CANCELED"),
        className: "!bg-red-600 !text-red-600",
      },
      {
        key: "done",
        label: <span className="text-emerald-600">Hoàn thành</span>,
        onClick: () => onUpdateStatusThenRevalidateQuery("DONE"),
        className: "!bg-emerald-50 !text-emerald-600",
      },
    ];

    if (status === "NEW") {
      actions = actions.filter((item) => item?.key === "accept" || item?.key === "cancel");
    }
    if (status === "ACCEPTED") {
      actions = actions.filter((item) => item?.key === "handOver" || item?.key === "pendingCancel");
    }
    if (status === "HANDOVERED") {
      actions = actions.filter((item) => item?.key === "lock" || item?.key === "pendingCancel");
    }
    if (status === "LOCKED") {
      actions = actions.filter(
        (item) => item?.key === "handOver" || item?.key === "pendingCancel" || item?.key === "done",
      );
    }
    if (status === "PENDINGCANCELED") {
      actions = actions.filter((item) => item?.key === "handOver" || item?.key === "cancel");
    }
    return actions;
  }, [status]);

  const isEditDeadline = useMemo(() => {
    return status === "ACCEPTED";
  }, [status]);
  const isEditCosting = useMemo(() => {
    return status === "HANDOVERED" || status === "ACCEPTED";
  }, [status]);

  const isEditRooming = useMemo(() => {
    return status === "ACCEPTED" && operationStatus?.roomingList.roomingListStatus === "IN_PROGRESS";
  }, [status, operationStatus]);

  const TAB_ITEMS: TabsProps["items"] = [
    {
      key: "information",
      label: "Thông tin chung",
      children: (
        <OperationInformation
          passengerList={operationStatus?.passengerList}
          orderList={operationStatus?.orderList}
          totalCosting={operationStatus?.totalCosting}
          totalSale={operationStatus?.totalSale}
          roomingList={operationStatus?.roomingList}
        />
      ),
    },
    {
      key: "deadline",
      label: "Deadline",
      children: <DeadlineContainer operationId={operationId} isEditAble={isEditDeadline} />,
    },
    {
      key: "costing",
      label: "Phí & dịch vụ",
      children: (
        <CostingContainer
          totalCosting={operationStatus?.totalCosting ?? 0}
          operationId={operationId}
          isEditAble={isEditCosting}
        />
      ),
    },
    {
      key: "rooming",
      label: "Xếp phòng",
      children: (
        <RoomingContainer
          operationId={operationId}
          isEditAble={isEditRooming}
          status={operationStatus?.roomingList.roomingListStatus}
        />
      ),
    },
  ];

  return (
    <>
      <ProductTourDetailInformation
        data={data?.sellable}
        templateCode={data?.template.code}
        templateName={data?.template.name}
      />

      <div className="flex flex-wrap gap-6">
        <OperationPersonInfo
          fullName={data?.pic?.fullname}
          email={data?.pic?.email}
          phoneNumber={data?.pic?.phoneNumber}
        />
        <OperationThingTodoItemListContainer operationId={operationId} />
      </div>

      <div className="h-[1px] bg-gray-100 mt-6 mb-6"></div>
      <div>
        {status === "NEW" ? <p className="mb-3">Duyệt để tiến hành điều hành.</p> : null}
        <Space>
          {operationActions?.map((act) => (
            <Button key={act.key} onClick={act.onClick} className={act.className} type="text">
              {act.label}
            </Button>
          ))}
        </Space>
      </div>
      <div className="h-[1px] bg-gray-100 mt-6 mb-6"></div>
      <Tabs type="card" defaultActiveKey="information" items={TAB_ITEMS} onChange={() => {}} />
    </>
  );
};
export default OperationContainer;

interface ProductTourDetailInformationProps {
  data?: IOperation["sellable"];
  templateCode?: string;
  templateName?: string;
}
const ProductTourDetailInformation: React.FC<ProductTourDetailInformationProps> = ({
  data,
  templateCode,
  templateName,
}) => {
  return (
    <>
      <div className="mb-3">
        <h3 className="text-lg font-semibold flex items-center">
          <span className="mr-3">{templateName}</span>
          <Tag color="blue" bordered={false}>
            {templateCode}
          </Tag>
        </h3>
      </div>
      <div className="box-content py-3 border p-4 rounded-md mb-6">
        <div className="mb-3">
          <p className="text-red-600 font-semibold">{data?.code}</p>
        </div>
        <div className="flex gap-x-8">
          <div>
            <span className="mb-1 block text-xs text-gray-500">Ngày khởi hành</span>
            <div className="flex gap-x-3">
              <span>{data?.startDate ? formatDate(data?.startDate) : "--"}</span>
              <RetweetOutlined />
              <span>{data?.endDate ? formatDate(data?.endDate) : "--"}</span>
            </div>
          </div>
          <div>
            <span className="mb-1 block text-xs text-gray-500">Ngày mở bán</span>
            <div className="flex gap-x-3">
              <span>{data?.validFrom ? formatDate(data?.validFrom) : "--"}</span>
              <SwapRightOutlined />
              <span>{data?.validTo ? formatDate(data?.validTo) : "--"}</span>
            </div>
          </div>
          <div>
            <span className="mb-1 block text-xs text-gray-500">Ngày đóng</span>
            <span className="">{data?.closeDate ? formatDate(data?.closeDate) : "--"}</span>
          </div>
          <div>
            <span className="mb-1 block text-xs text-gray-500">Khả dụng</span>
            <span className="text-main-500">{data?.available}</span>
          </div>
          <div>
            <span className="mb-1 block text-xs text-gray-500">Đã bán</span>
            <span className="text-rose-600">{data?.used}</span>
          </div>
          <div>
            <span className="mb-1 block text-xs text-gray-500">Đang còn</span>
            <span className="text-green-600">{data?.open}</span>
          </div>
        </div>
      </div>
    </>
  );
};

const OperationPersonInfo: React.FC<{
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  className?: string;
}> = ({ className = "", fullName, email, phoneNumber }) => {
  return (
    <div
      className={classNames("info w-[380px] border rounded-md p-4", {
        [className]: className,
      })}
    >
      <div className="box-head mb-3 pb-3 border-b">
        <h3 className="font-semibold">Người phụ trách</h3>
      </div>
      <div className="box-content">
        <div>
          <span className="w-28 inline-block">Họ và tên</span>
          <span>{fullName}</span>
        </div>
        <div>
          <span className="w-28 inline-block">Email</span>
          <span>{email}</span>
        </div>
        <div>
          <span className="w-28 inline-block">Điện thoại</span>
          <span>{phoneNumber}</span>
        </div>
      </div>
    </div>
  );
};
