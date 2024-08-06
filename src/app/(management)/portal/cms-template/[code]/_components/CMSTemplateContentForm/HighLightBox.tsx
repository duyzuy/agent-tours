import CustomDatePicker from "@/components/admin/CustomDatePicker";
import CustomRangePicker from "@/components/admin/CustomRangePicker";
import CustomTimePicker from "@/components/admin/CustomTimePicker";
import DateRangPicker from "@/components/base/DateRangePicker";
import FormItem from "@/components/base/FormItem";
import { DatePickerProps, Input, InputNumber, Segmented, Select } from "antd";
import dayjs, { Dayjs } from "dayjs";

type HighLightBoxValues = {
  promotionReferencePrice?: number | null;
  promotionLabel?: string;
  promotionLabelType?: "text" | "image";
  promotionValidFrom?: Dayjs;
  promotionValidTo?: Dayjs;
  promotionImage?: string;
};
export interface HighLightBoxProps {
  values?: HighLightBoxValues;
  onChange?: (data: {
    key: string;
    value: HighLightBoxValues[keyof HighLightBoxValues];
    data?: HighLightBoxValues;
  }) => void;
}
const HighLightBox: React.FC<HighLightBoxProps> = ({ values, onChange }) => {
  const {
    promotionReferencePrice,
    promotionLabel,
    promotionLabelType,
    promotionValidFrom,
    promotionValidTo,
    promotionImage,
  } = values || {};

  const onChangeValidFromDate: DatePickerProps["onChange"] = (value, dateStr) => {
    onChange?.({ key: "promotionValidFrom", value: value, data: values });
  };
  const onChangeValidFromTime: DatePickerProps["onChange"] = (value, dateStr) => {
    onChange?.({ key: "promotionValidFrom", value: value, data: values });
  };

  const onChangeValidToDate: DatePickerProps["onChange"] = (value, dateStr) => {
    onChange?.({ key: "promotionValidTo", value: value, data: values });
  };

  const onChangeValidToTime: DatePickerProps["onChange"] = (value, dateStr) => {
    onChange?.({ key: "promotionValidTo", value: value, data: values });
  };
  return (
    <div className="box border rounded-[4px] mb-6">
      <div className="box-head py-4 border-b px-4">
        <p className="font-bold">Highlight box</p>
      </div>
      <div className="box-body py-4 px-4">
        <div className="relative">
          <FormItem label="Hiển thị từ">
            <div className="flex items-center gap-x-4">
              <CustomDatePicker
                onChange={onChangeValidFromDate}
                value={promotionValidFrom}
                format={"DD/MM/YYYY"}
                placeholder="Chọn ngày"
                picker="date"
                className="flex-1"
                disabledDate={(date) => {
                  return date.isBefore(values?.promotionValidTo);
                }}
              />
              <CustomTimePicker
                onChange={onChangeValidFromTime}
                value={promotionValidFrom}
                placeholder="Chọn giờ"
                className="w-28"
                format={"HH:mm"}
              />
            </div>
          </FormItem>
          <FormItem label="Hiển thị đến">
            <div className="flex items-center gap-x-4">
              <CustomDatePicker
                onChange={onChangeValidToDate}
                value={dayjs(promotionValidTo)}
                format={"DD/MM/YYYY"}
                placeholder="Chọn ngày"
                picker="date"
                className="flex-1"
              />
              <CustomTimePicker
                onChange={onChangeValidToTime}
                value={dayjs(promotionValidTo)}
                placeholder="Chọn giờ"
                className="w-28"
                format={"HH:mm"}
              />
            </div>
          </FormItem>
          <FormItem label="Giá tiền">
            <InputNumber
              placeholder="Nhập giá tiền"
              value={promotionReferencePrice}
              onChange={(number) => onChange?.({ key: "promotionReferencePrice", value: number, data: values })}
              min={0}
              className="w-full"
              width={"100%"}
              style={{ width: "100%" }}
            />
          </FormItem>
          <FormItem label="Loại hiển thị">
            <Segmented
              value={promotionLabelType}
              onChange={(value) =>
                onChange?.({ key: "promotionLabelType", value: value as "text" | "image", data: values })
              }
              options={[
                { label: "image", value: "image" },
                { label: "text", value: "text" },
              ]}
            />
          </FormItem>
          {promotionLabelType === "text" ? (
            <FormItem label="Tên label">
              <Input
                placeholder="Nhập tên label hiển thị"
                value={promotionLabel}
                onChange={(ev) => onChange?.({ key: "promotionLabel", value: ev.target.value, data: values })}
              />
            </FormItem>
          ) : (
            <FormItem label="Label icon">
              <Select
                placeholder="Chọn label Icon"
                value={promotionImage}
                options={[{ label: "Hot deal", value: "Hotdeal" }]}
                onChange={(value) => onChange?.({ key: "promotionImage", value: value, data: values })}
              />
            </FormItem>
          )}
        </div>
      </div>
    </div>
  );
};
export default HighLightBox;
