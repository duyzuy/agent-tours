import React, { useState } from "react";
import { moneyFormatVND } from "@/utils/helper";
import { Button, Col, Row, Space, Tag } from "antd";
import { IOrderDetail } from "@/models/management/booking/order.interface";
import { EditOutlined } from "@ant-design/icons";
import DrawerPassengerInfo, { DrawerPassengerInfoProps } from "./DrawerPassengerInfo";
import { getPassengerType } from "@/utils/common";
import { IBookingOrderPassengersPayload } from "../../../modules/bookingOrder.interface";
import { isUndefined } from "lodash";
import dayjs from "dayjs";
import { EPassengerGender, EPassengerTitle, getPassengerGender, getPassengerTitle } from "@/constants/common";
import { ButtonSecondary } from "@/components/base/buttons";
import { PassengerType } from "@/models/common.interface";
import { IDocument } from "@/models/management/core/document.interface";
import { useDocument } from "../../modules/useDocument";
import { DocumentFormData } from "@/models/management/core/document.interface";
import ModalCreateDocument, { ModalCreateDocumentProps } from "./ModalCreateDocument";

interface OrderDetailProps {
  bookingOrderDetailList: IOrderDetail["bookingDetails"];
  onSave?: (data?: IBookingOrderPassengersPayload, cb?: () => void) => void;
  orderId?: number;
}

const BookingDetail: React.FC<OrderDetailProps> = ({ bookingOrderDetailList, orderId, onSave }) => {
  const [openModal, setOpenModal] = useState(false);
  const [paxId, setPaxId] = useState<number>();
  const { onCreate, onUpdateStatus } = useDocument();
  const [record, setEditRecord] = useState<IOrderDetail["bookingDetails"][0]>();
  const [showDrawer, setShowDrawer] = useState(false);

  const onEditPassengerInfo = (record: IOrderDetail["bookingDetails"][0]) => {
    setEditRecord(record);
    setShowDrawer(true);
  };

  const onCancelEdit = () => {
    setEditRecord(undefined);
    setShowDrawer(false);
  };

  const handeSavePassengerDetail: DrawerPassengerInfoProps["onSubmit"] = (paxInfo) => {
    if (isUndefined(record) || isUndefined(orderId)) {
      throw new Error("Thiếu chi tiết booking.");
    }

    onSave?.(
      {
        bookingOrder: {
          recId: orderId,
        },
        bookingDetails: [
          {
            booking: {
              recId: record.booking.recId,
              bookingRefId: record.booking.bookingRefId,
              pax: paxInfo,
            },
          },
        ],
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
  return (
    <>
      <div className="booking__detail mb-12">
        <div className="booking__detail-head mb-3">
          <span className="text-[16px] font-bold">Thông tin hành khách</span>
        </div>
        <div className="booking__detail-body">
          <Row gutter={[24, 24]}>
            {bookingOrderDetailList.map((bookingDetail, _index) => (
              <PassengerBoxInfo
                key={bookingDetail.booking.paxId}
                data={{
                  bookingClass: bookingDetail.booking.class,
                  amount: bookingDetail.booking.amount,
                  paxDob: bookingDetail.booking.pax.paxBirthDate,
                  paxGender: bookingDetail.booking.pax.paxGender as EPassengerGender,
                  paxLastname: bookingDetail.booking.pax.paxLastname,
                  paxMiddleFirstName: bookingDetail.booking.pax.paxMiddleFirstName,
                  paxTitle: bookingDetail.booking.pax.paxTitle as EPassengerTitle,
                  paxType: bookingDetail.booking.pax.type,
                  phoneNumber: bookingDetail.booking.pax.paxPhoneNumber,
                  documents: bookingDetail.booking.pax.documents ?? undefined,
                }}
                onEdit={() => onEditPassengerInfo(bookingDetail)}
                onCreateDoc={() => setCreateDoc(bookingDetail.booking.paxId)}
                onUpdateDocStatus={handleUpdateStatus}
              />
            ))}
          </Row>
        </div>
      </div>
      <DrawerPassengerInfo
        isOpen={showDrawer}
        initialValues={record?.booking.pax}
        onClose={onCancelEdit}
        onSubmit={(data) => handeSavePassengerDetail(data)}
      />
      <ModalCreateDocument open={openModal} onCancel={onCancelCreateDoc} onSubmit={handleCreateDoc} />
    </>
  );
};
export default BookingDetail;

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
    <Col span={8} className="booking__detail__item">
      <div className="p-4 border-slate-200 border rounded-md">
        <div className="booking__detail__item-head border-b mb-3 pb-3">
          <ul className="flex">
            <li className="w-16">
              <span className="block text-xs text-gray-600">Class</span>
              <span className="font-[500]">{bookingClass}</span>
            </li>
            <li className="w-24">
              <span className="block text-xs text-gray-600">Hành khách</span>
              <span className="font-[500]">{getPassengerType(paxType)}</span>
            </li>
            <li className=" flex-1">
              <span className="block text-xs text-gray-600">Giá tiền</span>
              <span className="font-[500] text-primary-default">{moneyFormatVND(amount)}</span>
            </li>
            <li>
              <ButtonSecondary
                onClick={onEdit}
                buttonProps={{
                  size: "small",
                  icon: <EditOutlined />,
                  shape: "circle",
                }}
                color="primary"
              ></ButtonSecondary>
            </li>
          </ul>
        </div>
        <div className="booking__detail__item-passenger">
          <div className="booking__detail__item-passenger-info">
            <Row gutter={16} className="mb-3">
              <Col span={12}>
                <div>
                  <span className="block text-xs text-gray-600">Danh xưng</span>
                  <span className="font-[500]">{paxTitle ? getPassengerTitle(paxTitle) : "--"}</span>
                </div>
              </Col>
              <Col span={12}>
                <div>
                  <span className="block text-xs text-gray-600">Giới tính</span>
                  <span className="font-[500]">{paxGender ? getPassengerGender(paxGender) : "--"}</span>
                </div>
              </Col>
            </Row>
            <Row gutter={16} className="mb-3">
              <Col span={12}>
                <div>
                  <span className="block text-xs">Họ</span>
                  <span className="font-[500]">{paxLastname || "--"}</span>
                </div>
              </Col>
              <Col span={12}>
                <div>
                  <span className="block text-xs text-gray-600">Tên đệm và tên</span>
                  <span className="font-[500]">{paxMiddleFirstName || "--"}</span>
                </div>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <div>
                  <span className="block text-xs text-gray-600">Ngày sinh</span>
                  <span className="font-[500]">{paxDob ? formatDate(paxDob) : "--"}</span>
                </div>
              </Col>
              <Col span={12}>
                <div>
                  <span className="block text-xs text-gray-600">Số điện thoại</span>
                  <span className="font-[500]">{phoneNumber || "--"}</span>
                </div>
              </Col>
            </Row>
          </div>
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
                    {status === "NEW"
                      ? "Mới"
                      : status === "FINISHED"
                      ? "Đã nộp"
                      : status === "HANDOVERED"
                      ? "Đã bàn giao"
                      : status === "NOT_FINISHED"
                      ? "Chưa nộp"
                      : "Unknown"}
                  </span>
                  <div className="mb-2">
                    <span>{documentName}</span>
                    <p className="text-xs text-gray-600">{documentDescription}</p>
                  </div>
                  <div className="text-right">
                    <Space>
                      <Button
                        size="small"
                        type="text"
                        className="!text-red-600 !bg-red-50"
                        onClick={() => onUpdateDocStatus?.({ documentCheckListId, status: "NOT_FINISHED" })}
                      >
                        Chưa nộp
                      </Button>
                      <Button
                        size="small"
                        className="!text-emerald-600 !bg-emerald-50"
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
    </Col>
  );
};
