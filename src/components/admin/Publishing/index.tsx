import React from "react";
import FormItem from "@/components/base/FormItem";
import CustomTimePicker from "../CustomTimePicker";
import CustomDatePicker from "../CustomDatePicker";
import { DatePickerProps, TimePickerProps, Button } from "antd";
import { Dayjs } from "dayjs";

export interface PublishingProps {
    label?: string;
    dateValue?: Dayjs;
    timeValue?: Dayjs;
    onChangeDate?: DatePickerProps["onChange"];
    onChangeTime?: TimePickerProps["onChange"];
    onPublish?: () => void;
    onSaveForApproval?: () => void;
    onSaveAndPublish?: () => void;
    disableSubmit?: boolean;
    disableApproval?: boolean;
}
const Publishing: React.FC<PublishingProps> = ({
    label = "Đăng bài viết",
    onChangeDate,
    onChangeTime,
    onPublish,
    onSaveAndPublish,
    onSaveForApproval,
    dateValue,
    timeValue,
    disableSubmit,
    disableApproval,
}) => {
    return (
        <div className="box border rounded-[4px] mb-6">
            <div className="py-4 border-b px-4">
                <p className="font-bold">{label}</p>
            </div>
            <div className="">
                <div className="post-times px-4 pt-4 input-control">
                    <FormItem label="Ngày hiển thị">
                        <div className="flex items-center gap-x-4">
                            <CustomDatePicker
                                onChange={onChangeDate}
                                value={dateValue}
                                format={"DD/MM/YYYY"}
                                placeholder="Chọn ngày"
                                picker="date"
                                className="flex-1"
                            />
                            <CustomTimePicker
                                onChange={onChangeTime}
                                value={timeValue}
                                placeholder="Chọn giờ"
                                className="w-28"
                                format={"HH:mm"}
                            />
                        </div>
                    </FormItem>
                </div>
                <div className="feature-post pb-4 px-4 flex gap-x-4">
                    <Button
                        className="flex-1"
                        block
                        onClick={onSaveForApproval}
                        disabled={disableApproval}
                    >
                        Lưu và chờ duyệt
                    </Button>
                    <Button
                        type="primary"
                        className=" bg-primary-default flex-1"
                        block
                        disabled={disableSubmit}
                        onClick={onSaveAndPublish}
                    >
                        Công khai
                    </Button>
                </div>
            </div>
        </div>
    );
};
export default Publishing;
