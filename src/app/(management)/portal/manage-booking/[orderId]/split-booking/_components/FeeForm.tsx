import React, { useState } from "react";
import { Form, Space, Radio, Input } from "antd";
import FormItem from "@/components/base/FormItem";
import classNames from "classnames";
import { SplitBookingFormData } from "../modules/splitBooking.interface";
import { SplitTypes } from "../modules/useSplitBooking";
import { EFopType } from "@/models/management/core/formOfPayment.interface";

export interface FeeFormProps {
  value: SplitBookingFormData["bookingOrder"]["fop"];
  onChange: (
    fopType: EFopType.CHARGE_SPLIT | EFopType.SPLIT,
    data: {
      key: keyof Omit<SplitBookingFormData["bookingOrder"]["fop"][0], "type">;
      value: SplitBookingFormData["bookingOrder"]["fop"][0][keyof SplitBookingFormData["bookingOrder"]["fop"][0]];
    },
  ) => void;
  onChangeSplitType: (type: SplitTypes) => void;

  className?: string;
  splitType: SplitTypes;
}
const FeeForm: React.FC<FeeFormProps> = ({
  value,
  onChange,
  className = "",
  splitType = "SplitToOnce",
  onChangeSplitType,
}) => {
  const getValue = (fopType: EFopType, key: keyof Omit<SplitBookingFormData["bookingOrder"]["fop"][0], "type">) => {
    const item = value.find((item) => item.type === fopType);
    return item ? item[key] : "";
  };
  return (
    <div
      className={classNames("fee-form", {
        [className]: className,
      })}
    >
      <h3 className="text-[16px] mb-2 font-[500]">Hình thức</h3>
      <Form layout="vertical" component="div">
        <FormItem>
          <Radio.Group onChange={(ev) => onChangeSplitType(ev.target.value)} value={splitType}>
            <Space direction="horizontal">
              <Radio value="SplitToOnce">Tách 1 mã đặt chỗ mới</Radio>
              <Radio value="SplitToTwo">Tách 2 mã đặt chỗ</Radio>
            </Space>
          </Radio.Group>
        </FormItem>
        <FormItem label="Phí tách mã đặt chỗ">
          <Input
            value={getValue(EFopType.CHARGE_SPLIT, "amount")}
            placeholder="Phí tách mã đặt chỗ"
            maxLength={9}
            onChange={(ev) =>
              onChange(EFopType.CHARGE_SPLIT, {
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
              onChange(EFopType.CHARGE_SPLIT, {
                key: "rmk",
                value: ev.target.value,
              })
            }
          />
        </FormItem>
        {splitType === "SplitToTwo" && (
          <>
            <FormItem label="Số tiền cần tách sang mã đặt chỗ mới">
              <Input
                value={getValue(EFopType.SPLIT, "amount")}
                placeholder="Số tiền cần tách"
                onChange={(ev) =>
                  onChange(EFopType.SPLIT, {
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
                  onChange(EFopType.SPLIT, {
                    key: "rmk",
                    value: ev.target.value,
                  })
                }
              />
            </FormItem>
          </>
        )}
      </Form>
    </div>
  );
};
export default FeeForm;
