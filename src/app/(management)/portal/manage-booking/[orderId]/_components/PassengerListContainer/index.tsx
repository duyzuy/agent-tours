import React, { useState } from "react";
import { moneyFormatVND } from "@/utils/helper";
import { Button, Col, Row, Space, Tag } from "antd";
import { IOrderDetail } from "@/models/management/booking/order.interface";
import { EditOutlined } from "@ant-design/icons";
import DrawerPassengerInfo, { DrawerPassengerInfoProps } from "./DrawerPassengerInfo";
import { getPassengerType } from "@/utils/common";
import { IOrderPassengerEditPayload } from "../../../modules/bookingOrder.interface";
import { isUndefined } from "lodash";
import dayjs from "dayjs";
import { EPassengerGender, EPassengerTitle, getPassengerGender, getPassengerTitle } from "@/constants/common";
import { ButtonSecondary } from "@/components/base/buttons";
import { PassengerType } from "@/models/common.interface";
import { IDocument } from "@/models/management/core/document.interface";
import { useDocument } from "../../modules/useDocument";
import ModalCreateDocument, { ModalCreateDocumentProps } from "./ModalCreateDocument";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { ContentDetailList } from "@/components/admin/ContentDetailList";

interface PassengerListContainerPropsProps {
  items: (IOrderDetail["passengers"][number] & { tourItem?: IOrderDetail["tourBookings"][number] })[];
  onSave?: (data: IOrderPassengerEditPayload, cb?: () => void) => void;
  orderId: number;
  sellableId: number;
}

const PassengerListContainer: React.FC<PassengerListContainerPropsProps> = ({ items, orderId, onSave, sellableId }) => {
  const [openModal, setOpenModal] = useState(false);
  const [paxId, setPaxId] = useState<number>();
  const { onCreate, onUpdateStatus } = useDocument();
  const [editRecord, setEditRecord] = useState<IOrderDetail["passengers"][0]>();
  const [showDrawer, setShowDrawer] = useState(false);
  const [isStartRooming, startRoomingTransition] = useTransition();

  const router = useRouter();
  const onEditPassengerInfo = (record: IOrderDetail["passengers"][0]) => {
    setEditRecord(record);
    setShowDrawer(true);
  };

  const onCancelEdit = () => {
    setEditRecord(undefined);
    setShowDrawer(false);
  };

  const handeSavePassengerDetail: DrawerPassengerInfoProps["onSubmit"] = (formData) => {
    if (isUndefined(editRecord) || isUndefined(orderId)) {
      throw new Error("Thiếu chi tiết booking.");
    }

    onSave?.(
      {
        bookingOrderId: orderId,
        pax: formData,
      },
      () => {
        setEditRecord(undefined);
        setShowDrawer(false);
      },
    );
  };
  const setCreateDoc = (paxId: number) => {
    setOpenModal(true);
    setPaxId(paxId);
  };
  const onCancelCreateDoc = () => {
    setOpenModal(false);
  };
  const handleCreateDoc: ModalCreateDocumentProps["onSubmit"] = (data) => {
    onCreate(
      { ...data, bookingPaxId: paxId },
      {
        onSuccess(data, variables, context) {
          setOpenModal(false);
        },
      },
    );
  };

  const handleUpdateStatus = (data: { documentCheckListId: number; status: "NOT_FINISHED" | "FINISHED" }) => {
    onUpdateStatus(data);
  };
  const onGotoRooming = () => {
    startRoomingTransition(() => router.push(`/portal/manage-booking/${orderId}/rooming/${sellableId}`));
  };
  return (
    <>
      <div className="booking__detail mb-12">
        <div className="booking__detail-head flex gap-x-2 mb-3">
          <span className="text-lg font-[500]">Thông tin hành khách</span>
          <Button
            type="text"
            className="!text-pink-600 !bg-pink-50 hover:!bg-pink-100"
            loading={isStartRooming}
            onClick={onGotoRooming}
          >
            Xếp phòng
          </Button>
        </div>

        <div className="booking__detail-body">
          <div className="grid grid-cols-2 2xl:grid-cols-3 gap-4">
            {items
              .sort((a, b) => a.type.localeCompare(b.type))
              .map((paxInfo, _index) => (
                <PassengerBoxInfo
                  key={paxInfo.recId}
                  data={{
                    bookingClass: paxInfo.tourItem?.class,
                    amount: paxInfo.tourItem?.amount,
                    paxDob: paxInfo.paxBirthDate,
                    paxGender: paxInfo.paxGender as EPassengerGender,
                    paxLastname: paxInfo.paxLastname,
                    paxMiddleFirstName: paxInfo.paxMiddleFirstName,
                    paxTitle: paxInfo.paxTitle as EPassengerTitle,
                    paxType: paxInfo.type,
                    phoneNumber: paxInfo.paxPhoneNumber,
                    documents: paxInfo.documents ?? undefined,
                  }}
                  onEdit={() => onEditPassengerInfo(paxInfo)}
                  onCreateDoc={() => setCreateDoc(paxInfo.recId)}
                  onUpdateDocStatus={handleUpdateStatus}
                />
              ))}
          </div>
        </div>
      </div>
      <DrawerPassengerInfo
        isOpen={showDrawer}
        initialValues={editRecord}
        onClose={onCancelEdit}
        onSubmit={(data) => handeSavePassengerDetail(data)}
      />
      <ModalCreateDocument open={openModal} onCancel={onCancelCreateDoc} onSubmit={handleCreateDoc} />
    </>
  );
};
export default PassengerListContainer;

const formatDate = (dateStr: string, fm = "DD/MM/YYYY") => {
  return dayjs(dateStr).format(fm);
};

interface PassengerBoxInfoProps {
  data?: {
    bookingClass?: string;
    paxType?: PassengerType;
    amount?: number;
    paxTitle?: EPassengerTitle;
    paxGender?: EPassengerGender;
    paxDob?: string;
    phoneNumber?: string;
    paxLastname?: string;
    paxMiddleFirstName?: string;
    documents?: IDocument[];
  };
  onEdit?: () => void;
  onCreateDoc?: () => void;
  onUpdateDocStatus?: (data: { documentCheckListId: number; status: "NOT_FINISHED" | "FINISHED" }) => void;
}
const PassengerBoxInfo: React.FC<PassengerBoxInfoProps> = ({ data, onEdit, onCreateDoc, onUpdateDocStatus }) => {
  const {
    bookingClass,
    paxType,
    amount,
    paxTitle,
    paxGender,
    paxDob,
    paxMiddleFirstName,
    paxLastname,
    phoneNumber,
    documents,
  } = data || {};
  return (
    <div className="p-4 border-slate-200 border rounded-md">
      <div className="booking__detail__item-head flex border-b mb-3 pb-3">
        <div className="flex gap-x-6 items-center flex-1">
          <ContentDetailList.Item
            className="w-12"
            label="Class"
            value={<span className="font-[500]">{bookingClass}</span>}
          />
          <ContentDetailList.Item
            className="w-20"
            label="Hành khách"
            value={<span className="font-[500]">{getPassengerType(paxType)}</span>}
          />
          <ContentDetailList.Item
            label="Giá tiền"
            value={<span className="font-[500] text-primary-default">{moneyFormatVND(amount)}</span>}
          />
        </div>
        <ButtonSecondary
          onClick={onEdit}
          buttonProps={{
            size: "small",
            icon: <EditOutlined />,
            shape: "circle",
          }}
          color="primary"
        ></ButtonSecondary>
      </div>
      <div className="booking__detail__item-passenger grid grid-cols-2 gap-4">
        <ContentDetailList.Item
          label="Danh xưng"
          value={<span className="font-[500]">{paxTitle ? getPassengerTitle(paxTitle) : "--"}</span>}
        />
        <ContentDetailList.Item
          label="Giới tính"
          value={<span className="font-[500]">{paxGender ? getPassengerGender(paxGender) : "--"}</span>}
        />
        <ContentDetailList.Item label="Họ" value={<span className="font-[500]">{paxLastname || "--"}</span>} />
        <ContentDetailList.Item
          label="Tên đệm và tên"
          value={<span className="font-[500]">{paxMiddleFirstName || "--"}</span>}
        />
        <ContentDetailList.Item
          label="Ngày sinh"
          value={<span className="font-[500]">{paxDob ? formatDate(paxDob) : "--"}</span>}
        />
        <ContentDetailList.Item
          label="Số điện thoại"
          value={<span className="font-[500]">{phoneNumber || "--"}</span>}
        />
      </div>
      <div className="document border-t pt-3 mt-3">
        <div className="document__head flex gap-x-3 mb-3">
          <span className="font-semibold">Hồ sơ giấy tờ cần nộp</span>
          <Button size="small" className="!text-blue-600 !bg-blue-50" type="text" onClick={onCreateDoc}>
            Thêm
          </Button>
        </div>
        <div className="document__list max-h-[240px] overflow-y-auto px-3 -mx-3">
          {documents?.map(({ documentCheckListId, status, documentDescription, documentName }, _index) => (
            <div className="doc-item p-3 bg-gray-50 rounded-md mb-3 relative" key={documentCheckListId}>
              <div className="relative">
                <span className="absolute top-0 right-0">
                  <Tag
                    bordered={false}
                    color={
                      status === "NEW"
                        ? "blue"
                        : status === "FINISHED"
                        ? "green"
                        : status === "HANDOVERED"
                        ? "lime"
                        : status === "NOT_FINISHED"
                        ? "red"
                        : "default"
                    }
                  >
                    {status === "NEW"
                      ? "Mới"
                      : status === "FINISHED"
                      ? "Đã nộp"
                      : status === "HANDOVERED"
                      ? "Đã bàn giao"
                      : status === "NOT_FINISHED"
                      ? "Chưa nộp"
                      : "Unknown"}
                  </Tag>
                </span>
                <div className="mb-2">
                  <span>{documentName}</span>
                  <p className="text-xs text-gray-600">{documentDescription}</p>
                </div>
                <div className="text-left">
                  <Space>
                    <Button
                      size="small"
                      type="text"
                      className="!text-red-600 !bg-red-50 hover:!bg-red-100"
                      onClick={() => onUpdateDocStatus?.({ documentCheckListId, status: "NOT_FINISHED" })}
                    >
                      Chưa nộp
                    </Button>
                    <Button
                      size="small"
                      className="!text-emerald-600 !bg-emerald-50 hover:!bg-emerald-100"
                      type="text"
                      onClick={() => onUpdateDocStatus?.({ documentCheckListId, status: "FINISHED" })}
                    >
                      Đã nộp
                    </Button>
                  </Space>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
