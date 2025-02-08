import React, { useState } from "react";
import { Form, Space, Radio, Input } from "antd";
import FormItem from "@/components/base/FormItem";
import classNames from "classnames";
import { SplitBookingFormData } from "../modules/splitBooking.interface";
import { EFopType } from "@/models/management/core/formOfPayment.interface";
import useChangeFee from "../modules/useChangeFee";

export interface FeeFormProps {
  className?: string;
}

export type OnChangeFeeForm = (
  fopType: EFopType.CHARGE_SPLIT | EFopType.SPLIT,
  data: {
    key: keyof Omit<SplitBookingFormData["bookingOrder"]["fops"][0], "type">;
    value: SplitBookingFormData["bookingOrder"]["fops"][0][keyof SplitBookingFormData["bookingOrder"]["fops"][0]];
  },
) => void;

const FeeForm: React.FC<FeeFormProps> = ({ className = "" }) => {
  const { onChangeFee, fops } = useChangeFee();
  const getValue = (fopType: EFopType, key: keyof Omit<SplitBookingFormData["bookingOrder"]["fops"][0], "type">) => {
    const item = fops.find((item) => item.type === fopType);
    return item ? item[key] : "";
  };
  return (
    <div
      className={classNames("fee-form", {
        [className]: className,
      })}
    >
      <Form layout="vertical" component="div">
        <FormItem label="Phí tách mã đặt chỗ">
          <Input
            value={getValue(EFopType.CHARGE_SPLIT, "amount")}
            placeholder="Phí tách mã đặt chỗ"
            maxLength={9}
            onChange={(ev) =>
              onChangeFee(EFopType.CHARGE_SPLIT, {
                key: "amount",
                value: ev.target.value,
              })
            }
          />
        </FormItem>
        <FormItem label="Ghi chú">
          <Input.TextArea
            value={getValue(EFopType.CHARGE_SPLIT, "rmk")}
            placeholder="Ghi chú"
            onChange={(ev) =>
              onChangeFee(EFopType.CHARGE_SPLIT, {
                key: "rmk",
                value: ev.target.value,
              })
            }
          />
        </FormItem>
        <FormItem label="Số tiền cần tách sang mã đặt chỗ mới">
          <Input
            value={getValue(EFopType.SPLIT, "amount")}
            placeholder="Số tiền cần tách"
            onChange={(ev) =>
              onChangeFee(EFopType.SPLIT, {
                key: "amount",
                value: ev.target.value,
              })
            }
          />
        </FormItem>
        <FormItem label="Ghi chú">
          <Input.TextArea
            value={getValue(EFopType.SPLIT, "rmk")}
            placeholder="Ghi chú"
            onChange={(ev) =>
              onChangeFee(EFopType.SPLIT, {
                key: "rmk",
                value: ev.target.value,
              })
            }
          />
        </FormItem>
      </Form>
    </div>
  );
};
export default FeeForm;
