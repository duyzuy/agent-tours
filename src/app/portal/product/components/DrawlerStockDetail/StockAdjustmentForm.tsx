import React, { useMemo, useState } from "react";
import classNames from "classnames";
import { Form, Input, Button, Space } from "antd";
import { isEmpty } from "lodash";
import { stockAdjustSchema } from "../../hooks/validation";
import FormItem from "@/components/base/FormItem";
import { useFormSubmit, HandleSubmit } from "@/hooks/useFormSubmit";
import { StockInventoryAdjustFormData } from "@/models/management/core/stockInventory.interface";
interface StockAdjustmentFormProps {
    inventoryStockId: number;
    onSubmit?: (
        formData: StockInventoryAdjustFormData,
        cb?: () => void,
    ) => void;
    className?: string;
    onCancel?: () => void;
}

const StockAdjustmentForm: React.FC<StockAdjustmentFormProps> = ({
    inventoryStockId,
    onSubmit,
    className = "",
    onCancel,
}) => {
    const initFormData = new StockInventoryAdjustFormData(
        inventoryStockId,
        "",
        0,
    );
    const [formData, setFormData] = useState(initFormData);

    const { handlerSubmit, errors } = useFormSubmit({
        schema: stockAdjustSchema,
    });
    const onChangeFormData = (
        key: keyof StockInventoryAdjustFormData,
        value: string | number,
    ) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const onResetFormData = () => {
        setFormData(initFormData);
    };
    const isDisableButton = useMemo(() => {
        return Number(formData.quantity) === 0 || isEmpty(formData.rmk);
    }, [formData]);

    const onSubmitForm: HandleSubmit<StockInventoryAdjustFormData> = (data) => {
        onSubmit?.(data, onResetFormData);
    };

    return (
        <div
            className={classNames({
                [className]: className,
            })}
        >
            <div className="mb-3">
                <p className="font-bold">Cập nhật số lượng stock</p>
            </div>
            <Form layout="vertical">
                <FormItem
                    label="Số lượng"
                    required
                    tooltip="Sử dụng '-' để giảm số lượng"
                    validateStatus={errors?.quantity ? "error" : ""}
                    help={errors?.quantity || ""}
                >
                    <Input
                        type="text"
                        placeholder="Số lượng"
                        value={formData.quantity}
                        onChange={(ev) =>
                            onChangeFormData("quantity", ev.target.value)
                        }
                    />
                </FormItem>
                <FormItem
                    label="Mô tả"
                    required
                    validateStatus={errors?.rmk ? "error" : ""}
                    help={errors?.rmk || ""}
                >
                    <Input.TextArea
                        placeholder="Mô tả"
                        value={formData.rmk}
                        onChange={(ev) =>
                            onChangeFormData("rmk", ev.target.value)
                        }
                    />
                </FormItem>
                <Space>
                    <Button onClick={onCancel}>Huỷ</Button>
                    <Button
                        type="primary"
                        onClick={() => handlerSubmit(formData, onSubmitForm)}
                        disabled={isDisableButton}
                    >
                        Thêm
                    </Button>
                </Space>
            </Form>
        </div>
    );
};
export default StockAdjustmentForm;
