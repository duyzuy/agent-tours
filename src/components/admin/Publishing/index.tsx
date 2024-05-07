import React, { memo } from "react";
import FormItem from "@/components/base/FormItem";
import CustomTimePicker from "../CustomTimePicker";
import CustomDatePicker from "../CustomDatePicker";
import { templateDefault } from "@/constants/cmsTemplate.constant";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";
import {
    DatePickerProps,
    TimePickerProps,
    Button,
    Select,
    SelectProps,
    Tag,
    Switch,
    SwitchProps,
} from "antd";
import { Dayjs } from "dayjs";
import {
    CheckCircleOutlined,
    CheckOutlined,
    CloseOutlined,
} from "@ant-design/icons";

export interface PublishingProps {
    label?: string;
    dateValue?: Dayjs;
    timeValue?: Dayjs;
    templateList?: { label: string; value: string }[];
    templateValue?: string;
    onChangeDate?: DatePickerProps["onChange"];
    onChangeTime?: TimePickerProps["onChange"];
    onApproval?: () => void;
    onSaveForApproval?: () => void;
    onSaveAndPublish?: () => void;
    disableSubmit?: boolean;
    disableSaveForApproval?: boolean;
    disableApproval?: boolean;
    hideApproval?: boolean;
    hideSaveForApproval?: boolean;

    onChangeTemplate?: SelectProps["onChange"];
    action?: "create" | "update";
    status?: PageContentStatus;
    onChangeStatus?: SwitchProps["onChange"];
}
const Publishing: React.FC<PublishingProps> = ({
    label = "Đăng bài viết",
    templateList = [templateDefault],
    templateValue = templateDefault.value,
    onChangeDate,
    onChangeTime,
    onApproval,
    onSaveAndPublish,
    onSaveForApproval,
    dateValue,
    timeValue,
    disableSubmit,
    disableSaveForApproval,
    hideApproval = !onApproval,
    hideSaveForApproval = false,
    disableApproval,
    onChangeTemplate,
    action = "create",
    status,
    onChangeStatus,
}) => {
    return (
        <div className="box border rounded-[4px] mb-6">
            <div className="py-4 border-b px-4">
                <p className="font-bold">{label}</p>
            </div>
            <div className="px-4">
                <div className="h-6"></div>
                <div className="mb-6 flex items-center justify-between">
                    <span>
                        <span className="inline-block w-24">Trạng thái:</span>
                        {action === "create" ? (
                            "--"
                        ) : (
                            <>
                                {(status === PageContentStatus.PUBLISH && (
                                    <Tag color="green">Đã kích hoạt</Tag>
                                )) ||
                                    (status === PageContentStatus.PENDING && (
                                        <Tag color="yellow">Chờ duyệt</Tag>
                                    )) ||
                                    (status === PageContentStatus.UNPUBLISH && (
                                        <Tag color="red">Chưa kích hoạt</Tag>
                                    )) ||
                                    "--"}
                            </>
                        )}
                    </span>
                    {action === "update" &&
                    status !== PageContentStatus.PENDING ? (
                        <Switch
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                            checked={
                                status === PageContentStatus.PUBLISH ?? false
                            }
                            onChange={onChangeStatus}
                        />
                    ) : null}
                </div>
                <FormItem label="Chọn template">
                    <Select<string>
                        options={templateList}
                        value={templateValue}
                        onChange={onChangeTemplate}
                    />
                </FormItem>
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

                {hideApproval ? null : (
                    <div className="mb-4">
                        <Button
                            className="flex-1"
                            block
                            type="primary"
                            ghost
                            onClick={onApproval}
                            disabled={disableApproval}
                        >
                            Xét duyệt
                        </Button>
                    </div>
                )}

                <div className="publishing-actions flex gap-x-4 mb-4">
                    {hideSaveForApproval ? null : (
                        <Button
                            className="flex-1"
                            block
                            onClick={onSaveForApproval}
                            disabled={disableSaveForApproval}
                        >
                            Lưu và chờ duyệt
                        </Button>
                    )}
                    <Button
                        type="primary"
                        className=" bg-primary-default flex-1"
                        block
                        disabled={disableSubmit}
                        onClick={onSaveAndPublish}
                    >
                        {action === "create" ? "Lưu và duyệt" : "Cập nhật"}
                    </Button>
                </div>
            </div>
        </div>
    );
};
export default memo(Publishing);
