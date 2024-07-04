import { useCallback, useEffect, useMemo, useState } from "react";
import {
    Drawer,
    Space,
    Button,
    Form,
    Input,
    Checkbox,
    Tooltip,
    Switch,
    SwitchProps,
} from "antd";

import { InfoCircleOutlined } from "@ant-design/icons";
import {
    IStateProvinceListRs,
    IDestinationPayload,
    DestinationFormData,
    IDestinationListRs,
    IStateProvince,
} from "@/models/management/region.interface";

import FormItem from "@/components/base/FormItem";
import { vietnameseTonesToUnderscoreKeyname } from "@/utils/helper";
import { isEmpty, isEqual } from "lodash";
import { Status } from "@/models/common.interface";
import ProvinceStateSelection from "./ProvinceStateSelection";

export enum EActionType {
    CREATE = "create",
    EDIT = "edit",
}
export type TDrawlerCreateAction = {
    action: EActionType.CREATE;
};
export type TDrawlerEditAction = {
    action: EActionType.EDIT;
    record: IDestinationListRs["result"][0];
};
export type TDrawlerDestination = TDrawlerEditAction | TDrawlerCreateAction;

interface DrawlerRoleProps {
    isOpen?: boolean;
    onClose: () => void;
    actionType?: EActionType;
    onUpdateStatus: (id: number, status: Status.OK | Status.OX) => void;
    initialValues?: IDestinationListRs["result"][0];
    onSubmit?: (actionType: EActionType, data: IDestinationPayload) => void;
    items: IStateProvinceListRs["result"];
    errors?: any;
}
const DrawlerDestination: React.FC<DrawlerRoleProps> = ({
    isOpen,
    onClose,
    actionType = EActionType.CREATE,
    onSubmit,
    items,
    initialValues,
    errors,
    onUpdateStatus,
}) => {
    const initFormData = new DestinationFormData("", "", []);

    const [formData, setFormData] = useState<IDestinationPayload>(initFormData);

    const onUpdateDestinationStatus: SwitchProps["onChange"] = (checked) => {
        setFormData((prev) => ({
            ...prev,
            status: checked ? Status.OK : Status.OX,
        }));
        if (actionType === EActionType.EDIT && initialValues) {
            onUpdateStatus(initialValues.id, checked ? Status.OK : Status.OX);
        }
    };

    const onChangeFormData = useCallback(
        (
            key: keyof Omit<IDestinationPayload, "listStateProvince">,
            value: string,
        ) => {
            setFormData((prev) => ({
                ...prev,
                [key]:
                    key === "codeKey"
                        ? vietnameseTonesToUnderscoreKeyname(
                              value,
                          ).toUpperCase()
                        : value,
            }));
        },
        [formData],
    );

    const onChangeProvinceState = useCallback(
        (provinList: IStateProvince[]) => {
            setFormData((oldDate) => ({
                ...oldDate,
                listStateProvince: provinList,
            }));
        },
        [],
    );

    const isButtonDisabled = useMemo(() => {
        if (
            isEqual(initialValues, formData) ||
            isEmpty(formData.listStateProvince) ||
            isEmpty(formData.codeKey)
        ) {
            return true;
        }
        return false;
    }, [initialValues, formData]);

    useEffect(() => {
        setFormData(() => initialValues ?? initFormData);
    }, [initialValues, isOpen]);

    return (
        <Drawer
            title={
                actionType === EActionType.CREATE
                    ? "Thêm nhóm điểm đến"
                    : `Sửa nhóm điểm đến`
            }
            width={850}
            onClose={onClose}
            open={isOpen}
            styles={{
                body: {
                    paddingBottom: 80,
                },
            }}
        >
            <Form layout="vertical">
                <FormItem
                    label="Tên nhóm"
                    validateStatus={errors?.codeName ? "error" : ""}
                    required
                    help={errors?.codeName || ""}
                >
                    <Input
                        placeholder="Nhập tên nhóm"
                        value={formData.codeName}
                        onChange={(e) =>
                            onChangeFormData("codeName", e.target.value)
                        }
                    />
                </FormItem>
                <FormItem
                    label="Mã nhóm"
                    validateStatus={errors?.codeKey ? "error" : ""}
                    required
                    help={errors?.codeKey || ""}
                >
                    <Input
                        placeholder="Mã nhóm"
                        value={formData.codeKey}
                        onChange={(e) =>
                            onChangeFormData("codeKey", e.target.value)
                        }
                        disabled={actionType === EActionType.EDIT}
                        suffix={
                            <Tooltip title="Mã nhóm được ngăn cách bằng dấu gạch dưới '_' và viết bằng ký tự không dấu và số.">
                                <InfoCircleOutlined
                                    style={{ color: "rgba(0,0,0,.45)" }}
                                />
                            </Tooltip>
                        }
                    />
                </FormItem>
                <FormItem label="Trạng thái" required>
                    <div className="flex items-center">
                        <Switch
                            checked={formData.status === "OK"}
                            onChange={onUpdateDestinationStatus}
                        />
                        <span className="ml-2">Kích hoạt</span>
                    </div>
                </FormItem>
                <div className="province-wrapper">
                    <ProvinceStateSelection
                        items={items}
                        value={formData.listStateProvince}
                        onChange={onChangeProvinceState}
                        editAble={
                            actionType === EActionType.CREATE ? true : false
                        }
                    />
                </div>
            </Form>
            <div className="drawler-action absolute px-4 py-4 border-t left-0 right-0 bg-white bottom-0">
                <Space>
                    <Button onClick={onClose}>Huỷ</Button>
                    <Button
                        onClick={() => onSubmit?.(actionType, formData)}
                        type="primary"
                        disabled={isButtonDisabled}
                    >
                        {actionType === EActionType.CREATE
                            ? "Thêm mới"
                            : "Cập nhật"}
                    </Button>
                </Space>
            </div>
        </Drawer>
    );
};
export default DrawlerDestination;
