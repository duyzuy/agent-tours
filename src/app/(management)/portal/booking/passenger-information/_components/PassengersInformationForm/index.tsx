import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

import classNames from "classnames";
import { IBookingItem } from "../../../modules/bookingInformation.interface";
import PassengerForm, { PassengerFormProps } from "./PassengerForm";
import { PassengerType } from "@/models/common.interface";
import { PassengerInformationFormData } from "../../../modules/passenger.interface";
import { HandleSubmit, useFormSubmit } from "@/hooks/useFormSubmit";
import { Space, Button, Checkbox } from "antd";
import { useRouter } from "next/navigation";
import { passengerInformationSchema } from "../../schema/passengerInformation.schema";
import { object } from "yup";
import { isEqualObject } from "@/utils/compare";
import ModalConfirmation from "./ModalConfirmation";
import FormItem from "@/components/base/FormItem";
import useLocalUserProfile from "@/hooks/useLocalProfile";
export type PassengerListFormData = {
  index: number;
  type: PassengerType;
  data: PassengerInformationFormData;
}[];
export interface PassengersInformationFormProps {
  className?: string;
  startDate?: string;
  passengerList: {
    bookingIndex: number;
    passengerInfo: IBookingItem["passengerInformation"];
    type: PassengerType;
  }[];
  onSetPassengerInfo?: ({ index, data }: { index: number; data: IBookingItem["passengerInformation"] }) => void;
  onSetPassengerInformationBooking?: (data: PassengerListFormData) => void;
}

const PassengersInformationForm: React.FC<PassengersInformationFormProps> = ({
  className = "",
  passengerList,
  startDate,
  onSetPassengerInfo,
  onSetPassengerInformationBooking,
}) => {
  const router = useRouter();
  const userProfile = useLocalUserProfile();
  const [firstPaxCheck, setFirstPaxCheck] = useState(false);
  const [passengerListForm, setPassengerListForm] = useState<PassengerListFormData>(() =>
    passengerList.reduce<PassengerListFormData>((acc, pax) => {
      acc = [
        ...acc,
        {
          index: pax.bookingIndex,
          type: pax.type,
          data:
            Object.keys(pax.passengerInfo).length !== 0
              ? pax.passengerInfo
              : new PassengerInformationFormData(
                  undefined,
                  undefined,
                  "",
                  "",
                  undefined,
                  "",
                  "",
                  "",
                  "",
                  "",
                  undefined,
                ),
        },
      ];
      return acc;
    }, []),
  );
  const [isShow, setShowModal] = useState(false);
  const { handlerSubmit, errors } = useFormSubmit({
    schema: passengerInformationSchema,
  });
  const onChangeForm: PassengerFormProps["onChangeForm"] = useCallback(({ index, data }) => {
    setPassengerListForm((oldData) => {
      let newPaxFormList = [...oldData];

      const paxFormIndex = newPaxFormList.findIndex((item) => item.index === index);

      if (paxFormIndex !== -1) {
        newPaxFormList.splice(paxFormIndex, 1, {
          ...newPaxFormList[paxFormIndex],
          data: { ...data },
        });
      }

      return newPaxFormList;
    });
  }, []);

  const getErrorsMessagePerForms = useCallback(
    (formIndex: number) => {
      if (!errors) {
        return undefined;
      }
      const errorsForm = errors.find((item) => item.index === formIndex);
      return errorsForm?.data;
    },
    [errors],
  );
  const handleChangeFirstPaxCheck = (checked: boolean) => {
    setFirstPaxCheck(checked);
    setPassengerListForm((oldList) => {
      let newPaxList = [...oldList];

      newPaxList.splice(0, 1, {
        ...newPaxList[0],
        data: {
          ...newPaxList[0].data,
          paxPhoneNumber: userProfile?.phoneNumber,
        },
      });

      return newPaxList;
    });
  };
  const onNext = () => {
    const paxFormList = passengerListForm.reduce<PassengerInformationFormData[]>((acc, item) => {
      return [...acc, item.data];
    }, []);
    handlerSubmit(paxFormList, () => {
      onSetPassengerInformationBooking?.(passengerListForm);
      router.push("/portal/booking/payment");
    });
  };

  const onSkipAndNext = () => {
    let isChanged = false;
    for (let i = 0; i < passengerListForm.length; i++) {
      if (
        !isEqualObject(
          [
            "paxLastname",
            "paxAddress",
            "paxBirthDate",
            "paxGender",
            "paxIdNumber",
            "paxMiddleFirstName",
            "paxTitle",
            "paxPhoneNumber",
            "paxPassportNumber",
            "paxPassortExpiredDate",
            "paxNationality",
          ],
          passengerListForm[i].data,
          passengerList[i].passengerInfo,
        )
      ) {
        isChanged = true;
        break;
      }
    }

    isChanged ? setShowModal(true) : router.push("/portal/booking/payment");
  };

  const onModalCancel = useCallback(() => setShowModal(false), []);
  const onModalConfirm = useCallback(() => router.push("/portal/booking/payment"), []);
  return (
    <>
      <div
        className={classNames("passenger__information", {
          [className]: className,
        })}
      >
        <div className="passenger__information-head mb-6">
          <h3 className="font-[500] text-lg">Thông tin hành khách</h3>
          <div>
            <p>Thông tin hành khách được thay đổi trong quản lý booking.</p>
          </div>
        </div>
        <div className="passenger__information-body">
          {passengerListForm.map((pax) => (
            <React.Fragment key={pax.index}>
              {pax.index === 0 ? (
                <div className="px-6 py-4 bg-white rounded-md drop-shadow-sm mb-6">
                  <Checkbox checked={firstPaxCheck} onChange={(ev) => handleChangeFirstPaxCheck(ev.target.checked)}>
                    Sử dụng thông tin đăng nhập cho hành khách đầu tiên
                  </Checkbox>
                </div>
              ) : null}
              <PassengerForm
                index={pax.index}
                startDate={startDate}
                type={pax.type}
                initialValues={pax.data}
                className="bg-white px-6 py-4 rounded-md drop-shadow-sm mb-6"
                onChangeForm={onChangeForm}
                errors={getErrorsMessagePerForms(pax.index)}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="text-right">
        <Space align="end">
          <Button type="primary" ghost onClick={() => router.push("/portal/booking/tour-services")}>
            Mua thêm dịch vụ
          </Button>
          <Button type="primary" ghost onClick={onSkipAndNext}>
            Bỏ qua và tiến hành đặt chỗ
          </Button>
          <Button onClick={onNext} type="primary">
            Lưu và Tiến hành đặt chỗ
          </Button>
        </Space>
      </div>
      <ModalConfirmation isShowModal={isShow} onCancel={onModalCancel} onConfirm={onModalConfirm} />
    </>
  );
};
export default memo(PassengersInformationForm);
