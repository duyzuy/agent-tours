import React, { useState } from "react";
import FormItem from "@/components/base/FormItem";
import { Form, Input, Button } from "antd";
import { StockInventoryAdjustFormData } from "@/models/management/core/stockInventory.interface";
interface StockAdjustmentFormProps {
    inventoryStockId: number;
    onSubmit?: (formData: StockInventoryAdjustFormData) => void;
}
const StockAdjustmentForm: React.FC<StockAdjustmentFormProps> = ({
    inventoryStockId,
    onSubmit,
}) => {
    const initFormData = new StockInventoryAdjustFormData(
        inventoryStockId,
        "",
        0,
    );
    const [formData, setFormData] = useState(initFormData);
    const onChangeFormData = (
        key: keyof StockInventoryAdjustFormData,
        value: string | number,
    ) => {
        if (key === "quantity" && typeof value === "string") {
            value = Number(value);
        }
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };
    return (
        <>
            <div className="mb-3">
                <p className="font-bold">Cập nhật số lượng stock</p>
            </div>
            <Form layout="vertical">
                <FormItem label="Số lượng" required>
                    <Input
                        placeholder="Số lượng"
                        value={formData.quantity}
                        onChange={(ev) =>
                            onChangeFormData("quantity", ev.target.value)
                        }
                    />
                </FormItem>
                <FormItem label="Mô tả" required>
                    <Input.TextArea
                        placeholder="Mô tả"
                        value={formData.description}
                        onChange={(ev) =>
                            onChangeFormData("description", ev.target.value)
                        }
                    />
                </FormItem>
                <Button type="primary" onClick={() => onSubmit?.(formData)}>
                    Cập nhật
                </Button>
            </Form>
        </>
    );
};
export default StockAdjustmentForm;
