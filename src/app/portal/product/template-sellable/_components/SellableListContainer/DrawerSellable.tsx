"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
    Form,
    Input,
    Select,
    Space,
    Button,
    SelectProps,
    Drawer,
    Tag,
    DatePicker,
    message,
    Row,
    Col,
    Divider,
} from "antd";
import FormItem from "@/components/base/FormItem";
import { DatePickerProps, RangePickerProps } from "antd/es/date-picker";
import { SellableConfirmFormData } from "@/models/management/core/sellable.interface";
import { Status } from "@/models/management/common.interface";

import { HandleSubmit, useFormSubmit } from "@/hooks/useFormSubmit";

import { SellableListRs } from "@/models/management/core/sellable.interface";
import dayjs from "dayjs";
import { IInventory } from "@/models/management/core/inventory.interface";
import { isArray, isEmpty, isUndefined } from "lodash";

import StockSelection, { StockSelectionProps } from "./StockSelection";

import { PlusOutlined } from "@ant-design/icons";
import InventoryExtraList, {
    InventoryExtraListProps,
} from "./InventoryExtraList/intex";
import StockExtraSelection, {
    StockExtraSelectionProps,
} from "./StockExtraSelection";
import ModalConfirmResetCap from "./ModalConfirmResetCap";
import { sellableConfirmSchema } from "../../../hooks/validation";
import SellableSelection from "./SellableSelection";

const MAX_QUANTITY = 50;
const MAX_NUMBER_INPUT = 999;
const { RangePicker } = DatePicker;
export enum EActionType {
    CREATE = "CREATE",
    EDIT = "EDIT",
}
export const DATE_FORMAT = "DDMMMYY HH:mm";
export const TIME_FORMAT = "HH:mm";

export interface IInventoryOption {
    label: string;
    value: number;
    data: IInventory | undefined;
}

export interface DrawerSellableProps {
    isOpen?: boolean;
    onCancel: () => void;
    actionType?: EActionType;
    initialValues?: SellableListRs["result"][0];
    onSubmit?: (
        actionType: EActionType,
        formData: SellableConfirmFormData,
    ) => void;
    onApproval?: (recId: number) => void;
    isApproval: boolean;
    code: string;
    inventories: IInventory[];
}

const DrawerSellable: React.FC<DrawerSellableProps> = ({
    isOpen,
    onCancel,
    actionType,
    onSubmit,
    initialValues,
    onApproval,
    isApproval,
    code,
    inventories,
}) => {
    const initSellableConfirmFormData = new SellableConfirmFormData(
        0,
        0,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        [],
        [],
        [],
        [],
        [],
    );
    const [inventoryExtraItem, setInventoryExtraItem] = useState<IInventory>();
    const [showModalResetCap, setShowModalResetCap] = useState(false);
    const [sellableConfirmFormData, setSellableConfirmFormData] = useState(
        initSellableConfirmFormData,
    );

    const [errorSellableForm, setErrorSellableForm] =
        useState<Partial<Record<keyof SellableConfirmFormData, string>>>();
    /**
     * If inventory has stock only pick stock;
     */

    const inventoryWithOutStockOptions = useMemo(() => {
        return (
            inventories?.reduce<IInventoryOption[]>((acc, inv) => {
                if (!inv.isStock) {
                    acc = [
                        ...acc,
                        { label: inv.name, value: inv.recId, data: inv },
                    ];
                }
                return acc;
            }, []) || []
        );
    }, [inventories]);

    const inventoriesWithManageStock = useMemo(() => {
        return inventories?.filter((item) => item.isStock) || [];
    }, [inventories]);

    const { handlerSubmit, errors } = useFormSubmit<SellableConfirmFormData>({
        schema: sellableConfirmSchema,
    });

    const onChangeFormData = (
        key: keyof SellableConfirmFormData,
        value: string | number,
    ) => {
        if (key === "cap") {
            if (!isNaN(value as number)) {
                value = Number(value);

                if (value > MAX_NUMBER_INPUT) {
                    return;
                }
            }

            /**
             * Check extra selected
             */
            const hasAnyPicked =
                (!isUndefined(sellableConfirmFormData.stocks) &&
                    !isEmpty(sellableConfirmFormData.stocks)) ||
                (!isUndefined(sellableConfirmFormData.extraStocks) &&
                    !isEmpty(sellableConfirmFormData.extraStocks));

            if (hasAnyPicked) {
                setShowModalResetCap(true);
                return;
            }
        }
        setSellableConfirmFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const onConfirmUpdateCapAndResetSelection = () => {
        setShowModalResetCap(false);
        setSellableConfirmFormData((prev) => ({
            ...prev,
            extraStocks: [],
            stocks: [],
        }));
    };
    const onCancelUpdateCap = () => {
        setShowModalResetCap(false);
    };
    const onChangeValidDateRange: RangePickerProps["onChange"] = (
        date,
        dateStr,
    ) => {
        setSellableConfirmFormData((prev) => ({
            ...prev,
            valid: dateStr[0],
            validTo: dateStr[1],
        }));
    };

    const onChangeCloseDate: DatePickerProps["onChange"] = (
        closeDate,
        closeDateStr,
    ) => {
        if (!closeDate) return;
        if (
            closeDate.isBefore(
                dayjs(sellableConfirmFormData.valid, DATE_FORMAT),
            ) ||
            closeDate.isAfter(
                dayjs(sellableConfirmFormData.validTo, DATE_FORMAT),
            )
        ) {
            message.error("Close date phải nằm trong khoảng ngày Valid");
        } else {
            setSellableConfirmFormData((prev) => ({
                ...prev,
                closeDate: closeDateStr,
            }));
        }
    };
    const onChangeUsedDateRange: RangePickerProps["onChange"] = (
        closeDate,
        closeDateStr,
    ) => {
        if (!closeDate) return;

        if (
            closeDate[1]?.isBefore(
                dayjs(sellableConfirmFormData.validTo, DATE_FORMAT),
            )
        ) {
            message.error(
                "Ngày kết thúc áp dụng phải lớn hơn ngày kết thúc mở bán.",
            );
        }
        setSellableConfirmFormData((prev) => ({
            ...prev,
            start: closeDateStr[0],
            end: closeDateStr[1],
        }));
    };

    const onSelectInventoryHasnotStock: SelectProps<
        number,
        IInventoryOption
    >["onChange"] = (value, options) => {
        let inventories: SellableConfirmFormData["inventories"] = [];
        const qty = sellableConfirmFormData.cap;
        if (isUndefined(qty)) {
            message.error("Số lượng của sellable không hợp lệ.");
            return;
        }

        if (isArray(options)) {
            options.forEach((opt) => {
                if (opt && opt.data) {
                    inventories = [
                        ...(inventories || []),
                        { qty: qty, inventory: opt.data },
                    ];
                }
            });
        }
        setSellableConfirmFormData((prev) => ({
            ...prev,
            inventories,
        }));
    };

    const onSelectExtraInventoryHasnotStock: SelectProps<
        number,
        IInventoryOption
    >["onChange"] = (value, option) => {
        if (!isArray(option)) {
            setInventoryExtraItem(option.data);
        }
    };
    const inventoryExtraOptions = useMemo(() => {
        const recordIdList = (
            sellableConfirmFormData.extraInventories || []
        ).map((inv) => inv.inventory.recId);
        return inventoryWithOutStockOptions.filter(
            (inv) => !recordIdList.includes(inv.value),
        );
    }, [
        inventoryWithOutStockOptions,
        sellableConfirmFormData.extraInventories,
    ]);

    const onAddExtraInventory = () => {
        if (isUndefined(inventoryExtraItem)) {
            setErrorSellableForm((prev) => ({
                ...prev,
                extraInventories: "Vui lòng chọn inventory.",
            }));
            return;
        }
        const { extraInventories } = sellableConfirmFormData;

        /**
         * check item is picked
         */
        const itemSelectedInExtraInventory = (extraInventories || []).find(
            (item) => item.inventory.recId === inventoryExtraItem.recId,
        );

        if (itemSelectedInExtraInventory) {
            message.error("Đã được thêm.");
            return;
        }
        setSellableConfirmFormData((prev) => ({
            ...prev,
            extraInventories: [
                ...(prev.extraInventories || []),
                { qty: 1, inventory: inventoryExtraItem },
            ],
        }));
        setInventoryExtraItem(undefined);
    };

    const onSelectStock: StockSelectionProps["onSetStock"] = (
        action,
        stock,
    ) => {
        /**
         * default qty = cap
         * (compare quantity open (open key) of stock); minimun >= cap
         */
        const { cap, stocks, extraStocks } = sellableConfirmFormData;

        let stockList = [...(stocks || [])];

        if (isUndefined(cap)) {
            message.error("Số lượng của sellable không hợp lệ.");
            return;
        }
        if (action === "add") {
            /**
             * Check open quantity of stock
             * Must >= cap of sellable
             */
            if (!stock.open || stock.open < cap) {
                message.error("Available của Stock không đủ.");
                return;
            }

            /**
             * Check if extraStockSelected
             */
            const { qty, stock: stockSelectedInExtraStock } =
                (extraStocks || []).find(
                    (item) => item.stock.recId === stock.recId,
                ) || {};
            if (
                !isUndefined(stockSelectedInExtraStock) &&
                stockSelectedInExtraStock.open &&
                qty
            ) {
                if (cap > stockSelectedInExtraStock.open - qty) {
                    message.error("Available của Stock không đủ.");
                    return;
                }
            }
            stockList = [...stockList, { stock, qty: cap }];
        }
        if (action === "remove") {
            const indx = stockList.findIndex(
                (item) => item.stock.recId === stock.recId,
            );
            if (indx !== -1) {
                stockList.splice(indx, 1);
            }
        }
        setSellableConfirmFormData((prev) => ({
            ...prev,
            stocks: stockList,
        }));
    };

    const onSelectStockExtra: StockExtraSelectionProps["onSetStock"] = (
        action,
        stock,
    ) => {
        console.log(action, stock);
        /**
         * default qty = cap
         * (compare quantity open (open key) of stock); minimun >= cap
         */
        const { cap, extraStocks, stocks } = sellableConfirmFormData;

        let stockList = [...(extraStocks || [])];

        if (isUndefined(cap)) {
            message.error("Số lượng của sellable không hợp lệ.");
            return;
        }
        if (action === "add") {
            /**
             * check stocks is Selected before
             */
            const pickedStock = (stocks || []).find(
                (item) => item.stock.recId === stock.recId,
            );

            if (!isUndefined(pickedStock)) {
                if (!stock?.open || stock?.open < pickedStock.qty) {
                    message.error("Số lượng không đủ");
                    return;
                }
            }
            /**
             * open quantity of stock must large than cap of sellable
             */
            if (!stock?.open || stock?.open < cap) {
                message.error("Available của Stock không đủ.");
                return;
            }
            stockList = [...stockList, { stock, qty: 1 }];
        }
        if (action === "remove") {
            const indx = stockList.findIndex(
                (item) => item.stock.recId === stock.recId,
            );
            if (indx !== -1) {
                stockList.splice(indx, 1);
            }
        }
        setSellableConfirmFormData((prev) => ({
            ...prev,
            extraStocks: stockList,
        }));
    };
    const onSaveStockExtraQuantity: StockExtraSelectionProps["onSaveQuantity"] =
        (record) => {
            const { stock, qty } = record;

            const { stocks, extraStocks } = sellableConfirmFormData;
            let openQuantity = Number(stock.open);
            let newStocksExtra = [...(extraStocks || [])];

            //Check quantity remain

            const stockSelected = (stocks || []).find(
                (stk) => stk.stock.recId === stock.recId,
            );

            if (stockSelected) {
                openQuantity = openQuantity - Number(stockSelected.qty);
            }
            if (openQuantity - Number(qty) < 0) {
                message.error("Số lượng hiện tại không đủ.");
                return;
            }
            const stockIndx = (extraStocks || []).findIndex(
                (stk) => stk.stock.recId === stock.recId,
            );
            if (stockIndx !== -1) {
                newStocksExtra.splice(stockIndx, 1, {
                    stock,
                    qty: Number(qty),
                });
            }
            setSellableConfirmFormData((prev) => ({
                ...prev,
                extraStocks: [...newStocksExtra],
            }));
        };
    const onSaveQuantityInventoryExtra: InventoryExtraListProps["onSave"] = (
        record,
    ) => {
        /**
         * check quantity remain from inventories
         */
        if (record.qty < 0) {
            message.error("Số lượng lớn hơn 1");
            return;
        }
        if (record.qty > MAX_QUANTITY) {
            message.error(`Số lượng được phép thêm tối đa ${MAX_QUANTITY}`);
            return;
        }

        const indxInventoryExtra =
            sellableConfirmFormData.extraInventories.findIndex(
                (inv) => inv.inventory.recId === record.inventory.recId,
            );
        let extraInventories = [...sellableConfirmFormData.extraInventories];
        if (indxInventoryExtra !== -1) {
            extraInventories.splice(indxInventoryExtra, 1, {
                qty: Number(record.qty),
                inventory: record.inventory,
            });
        }
        setSellableConfirmFormData((prev) => ({
            ...prev,
            extraInventories: [...extraInventories],
        }));
    };
    const onDeleteRowInventoryExtra: InventoryExtraListProps["onDelete"] = (
        record,
    ) => {
        let inventoriesExtra = [...sellableConfirmFormData.extraInventories];
        const indxInventoryExtra = inventoriesExtra.findIndex(
            (inv) => inv.inventory.recId === record.inventory.recId,
        );

        if (indxInventoryExtra !== -1) {
            inventoriesExtra.splice(indxInventoryExtra, 1);

            setSellableConfirmFormData((prev) => ({
                ...prev,
                extraInventories: [...inventoriesExtra],
            }));
        }
    };

    const onSubmitForm: HandleSubmit<SellableConfirmFormData> = (data) => {
        console.log(data);

        actionType && onSubmit?.(actionType, data);
    };

    useEffect(() => {
        if (initialValues && actionType === EActionType.EDIT) {
            setSellableConfirmFormData((prev) => ({
                ...prev,
                start: dayjs(initialValues.startDate).format(DATE_FORMAT),
                end: dayjs(initialValues.endDate).format(DATE_FORMAT),
                valid: dayjs(initialValues.validFrom).format(DATE_FORMAT),
                validTo: dayjs(initialValues.validTo).format(DATE_FORMAT),
                closeDate: dayjs(initialValues.closeDate).format(DATE_FORMAT),
                recId: initialValues.recId,
                cap: initialValues.cap,
            }));
        } else {
            setSellableConfirmFormData(initSellableConfirmFormData);
        }
    }, [initialValues, actionType, isOpen]);

    return (
        <>
            <Drawer
                title={`${isApproval ? "Thông tin" : "Duyệt"} ${code}`}
                destroyOnClose
                width={850}
                onClose={onCancel}
                open={isOpen}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
            >
                <Form
                    layout="vertical"
                    colon={false}
                    labelWrap
                    className="max-w-4xl"
                >
                    {actionType === EActionType.EDIT ? (
                        <Space className="mb-3">
                            <span>Trạng thái:</span>
                            <Tag
                                color={
                                    initialValues?.status === Status.OK
                                        ? "green"
                                        : "orange"
                                }
                            >
                                {initialValues?.status === Status.OK
                                    ? "Đã duyệt"
                                    : "Chờ duyệt"}
                            </Tag>
                        </Space>
                    ) : null}
                    <Row gutter={16}>
                        <Col span={12}>
                            <FormItem
                                label="Ngày mở bán (valid date)"
                                required
                                validateStatus={
                                    errors?.valid || errors?.validTo
                                        ? "error"
                                        : ""
                                }
                                help={errors?.valid || errors?.validTo || ""}
                            >
                                <RangePicker
                                    showTime={{ format: "HH:mm" }}
                                    placeholder={["Date from", "Date to"]}
                                    format={DATE_FORMAT}
                                    value={[
                                        sellableConfirmFormData.valid
                                            ? dayjs(
                                                  sellableConfirmFormData.valid,
                                                  DATE_FORMAT,
                                              )
                                            : null,
                                        sellableConfirmFormData.validTo
                                            ? dayjs(
                                                  sellableConfirmFormData.validTo,
                                                  DATE_FORMAT,
                                              )
                                            : null,
                                    ]}
                                    disabledDate={(date) => {
                                        return dayjs().isAfter(date);
                                    }}
                                    onChange={onChangeValidDateRange}
                                    className="w-full "
                                />
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem
                                label="Ngày áp dụng (used)"
                                required
                                validateStatus={
                                    errors?.start || errors?.end ? "error" : ""
                                }
                                help={errors?.start || errors?.end || ""}
                            >
                                <RangePicker
                                    showTime={{ format: "HH:mm" }}
                                    placeholder={["Date from", "Date to"]}
                                    format={DATE_FORMAT}
                                    disabled={false}
                                    value={[
                                        sellableConfirmFormData.start
                                            ? dayjs(
                                                  sellableConfirmFormData.start,
                                                  DATE_FORMAT,
                                              )
                                            : null,
                                        sellableConfirmFormData.end
                                            ? dayjs(
                                                  sellableConfirmFormData.end,
                                                  DATE_FORMAT,
                                              )
                                            : null,
                                    ]}
                                    disabledDate={(date) => {
                                        return dayjs().isAfter(date);
                                    }}
                                    onChange={onChangeUsedDateRange}
                                    className="w-full "
                                />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <FormItem
                                label="Ngày đóng (Closed date)"
                                required
                                validateStatus={
                                    errors?.start || errors?.end ? "error" : ""
                                }
                                help={errors?.start || errors?.end || ""}
                            >
                                <DatePicker
                                    showTime={{ format: "HH:mm" }}
                                    placeholder="Close date"
                                    format={DATE_FORMAT}
                                    disabled={false}
                                    value={
                                        sellableConfirmFormData.closeDate
                                            ? dayjs(
                                                  sellableConfirmFormData.closeDate,
                                                  DATE_FORMAT,
                                              )
                                            : null
                                    }
                                    disabledDate={(date) => {
                                        return (
                                            dayjs().isAfter(date) ||
                                            dayjs(
                                                sellableConfirmFormData.valid,
                                                DATE_FORMAT,
                                            ).isAfter(date) ||
                                            dayjs(
                                                sellableConfirmFormData.validTo,
                                                DATE_FORMAT,
                                            ).isBefore(date)
                                        );
                                    }}
                                    onChange={onChangeCloseDate}
                                    className="w-full "
                                />
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem
                                label="Số lượng (cap)"
                                required
                                validateStatus={errors?.cap ? "error" : ""}
                                help={errors?.cap || ""}
                            >
                                <Input
                                    placeholder="Số lượng"
                                    type="number"
                                    max={999}
                                    min={1}
                                    value={sellableConfirmFormData?.cap}
                                    disabled={false}
                                    onChange={(ev) =>
                                        onChangeFormData("cap", ev.target.value)
                                    }
                                />
                            </FormItem>
                        </Col>
                    </Row>

                    <FormItem label="Chọn inventory" required>
                        <Select
                            mode="multiple"
                            options={inventoryWithOutStockOptions}
                            onChange={onSelectInventoryHasnotStock}
                            placeholder="Chọn inventory"
                        />
                    </FormItem>

                    <FormItem label="Danh sách stock" required>
                        <div>
                            <p className="text-xs text-gray-500">
                                Số lượng ở mỗi stock mặc định theo số lượng
                                (cap) của Sellable
                            </p>
                        </div>
                        <StockSelection
                            inventories={inventoriesWithManageStock}
                            scroll={{ x: 750 }}
                            rowKey={"recId"}
                            defaultQuantity={sellableConfirmFormData.cap || 0}
                            onSetStock={onSelectStock}
                            stocks={sellableConfirmFormData.stocks}
                            stockSelectedList={
                                sellableConfirmFormData.extraStocks
                            }
                        />
                    </FormItem>
                    <div className="py-2">
                        <Divider />
                    </div>
                    <FormItem
                        label="Thêm Inventory (Extra)"
                        validateStatus={
                            errorSellableForm?.extraInventories ? "error" : ""
                        }
                        help={errorSellableForm?.extraInventories || ""}
                    >
                        <Row gutter={8} className="mb-3">
                            <Col style={{ flex: 1 }}>
                                <Select
                                    value={inventoryExtraItem?.recId ?? null}
                                    options={inventoryExtraOptions}
                                    placeholder="Chọn inventory (extra)"
                                    onChange={onSelectExtraInventoryHasnotStock}
                                    className="w-full"
                                />
                            </Col>
                            <Col>
                                <Button
                                    type="primary"
                                    ghost
                                    icon={<PlusOutlined />}
                                    onClick={onAddExtraInventory}
                                    disabled={!Boolean(inventoryExtraItem)}
                                >
                                    Thêm
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <InventoryExtraList
                                    inventories={
                                        sellableConfirmFormData.extraInventories ||
                                        []
                                    }
                                    onSave={onSaveQuantityInventoryExtra}
                                    onDelete={onDeleteRowInventoryExtra}
                                />
                            </Col>
                        </Row>
                    </FormItem>

                    <FormItem label="Thêm stock (Extra)">
                        <StockExtraSelection
                            inventories={inventoriesWithManageStock}
                            scroll={{ x: 750 }}
                            rowKey={"recId"}
                            onSetStock={onSelectStockExtra}
                            onSaveQuantity={onSaveStockExtraQuantity}
                            stocks={sellableConfirmFormData.extraStocks}
                            stockSelectedList={sellableConfirmFormData.stocks}
                        />
                    </FormItem>
                    <FormItem label="Chọn sellable">
                        <SellableSelection />
                    </FormItem>
                </Form>

                <div className="bottom py-4 absolute bottom-0 left-0 right-0 border-t px-6 bg-white z-50">
                    <Space>
                        <Button>Huỷ bỏ</Button>
                        {actionType === EActionType.EDIT &&
                        initialValues?.status === Status.QQ ? (
                            <Button
                                type="primary"
                                onClick={() =>
                                    handlerSubmit(
                                        sellableConfirmFormData,
                                        onSubmitForm,
                                    )
                                }
                            >
                                Duyệt
                            </Button>
                        ) : (
                            <Button type="primary" onClick={() => {}}>
                                {actionType === EActionType.CREATE
                                    ? "Thêm mới"
                                    : "Cập nhật"}
                            </Button>
                        )}
                    </Space>
                </div>
            </Drawer>
            <ModalConfirmResetCap
                title="Lưu ý"
                descriptions="Cập nhật lại Số lượng (Cap) sẽ remove toàn bộ các stocks đã chọn trước đó"
                isShowModal={showModalResetCap}
                onCancel={onCancelUpdateCap}
                onConfirm={onConfirmUpdateCapAndResetSelection}
            />
        </>
    );
};
export default DrawerSellable;
