"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { isUndefined } from "lodash";
import PageContainer from "@/components/admin/PageContainer";
import { useGetBookingDetailCoreQuery } from "@/queries/core/bookingOrder";
import { Button, Spin, Input, Form, Radio, Space, Checkbox, message } from "antd";

import FormItem from "@/components/base/FormItem";

import { HandleSubmit, useFormSubmit } from "@/hooks/useFormSubmit";

import useMessage from "@/hooks/useMessage";
import { useGetRoomingList } from "@/queries/core/bookingOrder";
import { RoomingItem, RoomingType } from "@/models/management/booking/rooming.interface";

import { getRoomingName, ROOM_TYPES } from "@/constants/rooming.constant";
import { EPassengerGender, EPassengerTitle, getPassengerGender, getPassengerTitle } from "@/constants/common";
import { RoomingFormData } from "./modules/rooming.interface";
import useRooming from "./modules/useRomming";
interface RoomingPageProps {
  params: { orderId: number; sellableId: number };
}
const RoomingPage: React.FC<RoomingPageProps> = ({ params }) => {
  const router = useRouter();

  const message = useMessage();
  const { data, isLoading } = useGetRoomingList({ sellableId: params.sellableId });
  const initFormData = new RoomingFormData(undefined, 0, []);
  const [formData, setFormdata] = useState(initFormData);

  const getNewRoomingNumber = () => {
    const currentRoomingNumberList = data?.reduce<number[]>((acc, item) => {
      if (!acc.length || !acc.includes(item.roomingListNumber)) {
        acc = [...acc, item.roomingListNumber];
      }
      return acc;
    }, []);

    let nextNum = 1;

    if (currentRoomingNumberList) {
      do {
        nextNum = nextNum + 1;
      } while (currentRoomingNumberList.includes(nextNum));
    }
    return nextNum;
  };

  const { onChangeRoomingType, onSubmit } = useRooming();
  const groupingRooming = useMemo(() => {
    return data?.reduce<{ [key: string]: RoomingItem[] | undefined }>((acc, item) => {
      return {
        ...acc,
        [item.roomingListNumber]: [...(acc[item.roomingListNumber] || []), item],
      };
    }, {});
  }, [data]);

  const getFullName = (lastName?: string, middleAndFirstname?: string) => {
    if (!lastName) {
      return "--";
    }

    return `${lastName}, ${middleAndFirstname}`;
  };

  const hasSelectedPaxItem = (item: RoomingItem) => {
    return formData?.roomingItems?.some((roomingItem) => roomingItem.bookingPaxId === item.bookingPaxId);
  };
  const handleChangeRoomType = (type: RoomingType) => {
    const nextNum = getNewRoomingNumber();
    setFormdata((oldData) => ({
      ...oldData,
      roomingType: type,
      roomingItems: [],
      roomingNumber: nextNum,
    }));
  };

  const handleChangeRoomingPax = (item: RoomingItem) => {
    setFormdata((oldData) => {
      const { roomingItems, roomingType } = oldData;

      if (!roomingType) {
        message.info("Vui lòng chọn loại phòng trước.");
        return oldData;
      }
      let newRoomingItems = [...roomingItems];
      const indexItem = roomingItems.findIndex((pItem) => pItem.bookingPaxId === item.bookingPaxId);

      if (indexItem !== -1) {
        newRoomingItems.splice(indexItem, 1);
      } else {
        if (roomingType === "SINGLE" && roomingItems.length === 1) {
          message.info("Phòng đơn chỉ chọn 1 người.");
          return oldData;
        }
        if (
          (roomingType === "DOUBLE" && roomingItems.length === 2) ||
          (roomingType === "TWIN" && roomingItems.length === 2)
        ) {
          message.info("Phòng tối đa 2 người");
          return oldData;
        }
        if (roomingType === "TRIPLE" && roomingItems.length === 3) {
          message.info("Phòng tối đa 3 người");
          return oldData;
        }

        newRoomingItems = [...newRoomingItems, item];
      }

      return {
        ...oldData,
        roomingItems: [...newRoomingItems],
      };
    });
  };

  const handleSubmitChange = () => {
    onSubmit(formData, () => {
      setFormdata(initFormData);
    });
  };
  return (
    <PageContainer
      name="Xếp phòng"
      modelName="Xếp phòng"
      breadCrumItems={[
        { title: "Quản lý booking", href: "/portal/manage-booking" },
        {
          title: "Chi tiết booking",
          href: `/portal/manage-booking/${params.orderId}`,
        },
        { title: "Xếp phòng" },
      ]}
      onBack={() => router.push(`/portal/manage-booking/${params.orderId}`)}
      // className="bg-slate-50 -m-6 p-6 pb-10 h-auto"
      hideAddButton
    >
      <div>
        <div className="">
          <Form layout="vertical">
            <FormItem label="Loại phòng">
              <Space>
                {ROOM_TYPES.map((type) => (
                  <Checkbox
                    key={type.value}
                    value={type.value}
                    checked={formData?.roomingType === type.value}
                    onChange={() => handleChangeRoomType(type.value)}
                  >
                    {type.label}
                  </Checkbox>
                ))}
              </Space>
            </FormItem>
          </Form>
        </div>
        <div className="rooming-list">
          <div className="flex items-center">
            <div className="w-20">Chọn</div>
            <div className="w-20">Order ID</div>
            <div className="w-36">Danh xưng</div>
            <div className="w-56">Họ và tên</div>
            <div className="w-24">Hành khách</div>
            <div className="w-20">Giới tính</div>
            <div className="w-36">Loại phòng</div>
          </div>
          {groupingRooming
            ? Object.entries(groupingRooming).map(([key, roomingItem], _index) => (
                <div className="mb-2 pb-2 border-b" key={_index}>
                  {roomingItem?.map((paxItem) => (
                    <div className="pax-item flex items-center py-2" key={paxItem.bookingPaxId}>
                      <div className="w-20">
                        <Checkbox
                          checked={hasSelectedPaxItem(paxItem)}
                          onChange={() => handleChangeRoomingPax(paxItem)}
                        ></Checkbox>
                      </div>
                      <div className="w-20">{paxItem.orderId}</div>
                      <div className="w-36">{getPassengerTitle(paxItem.paxTitle as EPassengerTitle)}</div>
                      <div className="w-56">{getFullName(paxItem.paxLastname, paxItem.paxMiddleFirstName)}</div>
                      <div className="w-24">{paxItem.type}</div>
                      <div className="w-20">{getPassengerGender(paxItem.paxGender as EPassengerGender)}</div>
                      <div className="w-36">{getRoomingName(paxItem.roomingListType)}</div>
                      <div>{paxItem.roomingListNumber}</div>
                    </div>
                  ))}
                </div>
              ))
            : null}
        </div>
        <Button type="primary" onClick={handleSubmitChange}>
          Lưu
        </Button>
      </div>
    </PageContainer>
  );
};
export default RoomingPage;
