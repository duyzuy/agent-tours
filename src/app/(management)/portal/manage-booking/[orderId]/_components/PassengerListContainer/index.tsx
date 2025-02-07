import React, { useMemo, useState } from "react";
import { moneyFormatVND } from "@/utils/helper";
import { Button, Card, Divider } from "antd";
import { IOrderDetail } from "@/models/management/booking/order.interface";
import { EditOutlined } from "@ant-design/icons";
import PassengerFormDrawer, { PassengerFormDrawerProps } from "./PassengerFormDrawer";
import { getPassengerType } from "@/utils/common";
import { isUndefined } from "lodash";
import dayjs from "dayjs";
import {
  DATE_FORMAT,
  EPassengerGender,
  EPassengerTitle,
  getPassengerGender,
  getPassengerTitle,
} from "@/constants/common";

import { PassengerType } from "@/models/common.interface";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { ContentDetailList } from "@/components/admin/ContentDetailList";
import useUpdatePassengerInformation from "../../../modules/updatePassengerInfo";
import { formatDate } from "@/utils/date";
import DocumentCheckList from "./DocumentCheckList";
import { IconUser } from "@/assets/icons";

interface PassengerListContainerPropsProps {
  orderId: number;
  sellableId: number;
  passengers?: IOrderDetail["passengers"];
  tourBookings: IOrderDetail["tourBookings"];
  isBookingCanceled?: boolean;
}

const PassengerListContainer: React.FC<PassengerListContainerPropsProps> = ({
  passengers,
  tourBookings,
  orderId,
  sellableId,
  isBookingCanceled,
}) => {
  const [editRecord, setEditRecord] = useState<IOrderDetail["passengers"][number]>();
  const [showDrawer, setShowDrawer] = useState(false);
  const [isStartRooming, startRoomingTransition] = useTransition();
  const router = useRouter();

  const { mutate: updatePassenger, isPending } = useUpdatePassengerInformation();

  const passengerMapingTourList = useMemo(() => {
    return passengers
      ?.reduce<(IOrderDetail["passengers"][number] & { tourItem?: IOrderDetail["tourBookings"][number] })[]>(
        (acc, pax) => {
          const bookingItem = tourBookings?.find((item) => item.paxId === pax.recId);
          acc = [...acc, { ...pax, tourItem: bookingItem }];
          return acc;
        },
        [],
      )
      .sort((a, b) => a.type.localeCompare(b.type));
  }, [passengers, tourBookings]);

  const handleEditPassengerInfo = (record: IOrderDetail["passengers"][number]) => {
    setEditRecord(record);
    setShowDrawer(true);
  };

  const cancelEditPassengerInfo = () => {
    setEditRecord(undefined);
    setShowDrawer(false);
  };

  const handeSavePassengerInfo: PassengerFormDrawerProps["onSubmit"] = (newPassengerInfo) => {
    if (isUndefined(editRecord) || isUndefined(orderId)) {
      throw new Error("Thiếu chi tiết booking.");
    }
    updatePassenger?.(
      {
        bookingOrderId: orderId,
        pax: {
          ...newPassengerInfo,
          paxPhoneNumber: newPassengerInfo.paxPhoneNumber ?? undefined,
          paxBirthDate: dayjs(newPassengerInfo.paxBirthDate).format(DATE_FORMAT),
          paxPassortExpiredDate: dayjs(newPassengerInfo.paxPassortExpiredDate).format(DATE_FORMAT),
        },
      },
      {
        onSuccess(data, variables, context) {
          setEditRecord(undefined);
          setShowDrawer(false);
        },
      },
    );
  };

  const onGotoRooming = () => {
    startRoomingTransition(() => router.push(`/portal/manage-booking/${orderId}/rooming/${sellableId}`));
  };
  return (
    <>
      <div className="booking__detail-head flex gap-x-2 mb-3">
        <span className="text-lg font-[500]">Thông tin hành khách</span>
        {isBookingCanceled ? null : (
          <Button
            type="text"
            className="!text-pink-600 !bg-pink-50 hover:!bg-pink-100"
            loading={isStartRooming}
            onClick={onGotoRooming}
          >
            Xếp phòng
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {passengerMapingTourList?.map((paxInfo, _index) => (
          <Card key={paxInfo.recId}>
            <Card.Meta
              avatar={
                <span className="bg-gray-300/30 p-3 rounded-full inline-block">
                  <IconUser />
                </span>
              }
              title={
                <div className="flex items-center py-2">
                  <p>{`${paxInfo.paxLastname || "--"}, ${paxInfo.paxMiddleFirstName || "--"}`}</p>
                  <Button
                    type="text"
                    size="small"
                    icon={<EditOutlined />}
                    color="primary"
                    className="!text-blue-600"
                    onClick={() => handleEditPassengerInfo(paxInfo)}
                  >
                    <span>Sửa</span>
                  </Button>
                </div>
              }
            />
            <div className="pt-6">
              <PassengerInformationBox
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
                  paxId: paxInfo.recId,
                }}
              />
              <Divider style={{ margin: "12px 0" }} />
              <DocumentCheckList documents={paxInfo.documents} paxId={paxInfo.recId} />
            </div>
          </Card>
        ))}
      </div>

      <PassengerFormDrawer
        isOpen={showDrawer}
        initialValues={editRecord}
        onClose={cancelEditPassengerInfo}
        onSubmit={handeSavePassengerInfo}
        loading={isPending}
      />
    </>
  );
};
export default PassengerListContainer;

interface PassengerInformationBoxProps {
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
    paxId?: number;
  };
  onEdit?: () => void;
}
const PassengerInformationBox: React.FC<PassengerInformationBoxProps> = ({ data, onEdit }) => {
  const { bookingClass, paxType, amount, paxTitle, paxGender, paxDob, paxMiddleFirstName, paxLastname, phoneNumber } =
    data || {};
  return (
    <>
      <div className="booking__detail__item-passenger flex flex-wrap gap-6">
        <ContentDetailList.Item
          label="Danh xưng"
          value={<span className="font-[500]">{paxTitle ? getPassengerTitle(paxTitle) : "--"}</span>}
          className="w-16"
        />
        <ContentDetailList.Item
          label="Giới tính"
          value={<span className="font-[500]">{paxGender ? getPassengerGender(paxGender) : "--"}</span>}
          className="w-16"
        />
        <ContentDetailList.Item label="Họ" value={<span className="font-[500]">{paxLastname || "--"}</span>} />
        <ContentDetailList.Item
          label="Tên đệm và tên"
          value={<span className="font-[500]">{paxMiddleFirstName || "--"}</span>}
          className="w-24"
        />
        <ContentDetailList.Item
          label="Ngày sinh"
          value={<span className="font-[500]">{paxDob ? formatDate(paxDob, "DD/MM/YYYY") : "--"}</span>}
        />
        <ContentDetailList.Item
          label="Số điện thoại"
          value={<span className="font-[500]">{phoneNumber || "--"}</span>}
        />
      </div>
      <Divider style={{ margin: "12px 0" }} />
      <div className="flex flex-wrap gap-6 items-center flex-1">
        <ContentDetailList.Item
          className="w-16"
          label="Class"
          value={<span className="font-[500]">{bookingClass}</span>}
        />
        <ContentDetailList.Item
          className="w-16"
          label="Hành khách"
          value={<span className="font-[500]">{getPassengerType(paxType)}</span>}
        />
        <ContentDetailList.Item
          label="Giá tiền"
          value={<span className="font-[500] text-primary-default">{moneyFormatVND(amount)}</span>}
        />
      </div>
    </>
  );
};
