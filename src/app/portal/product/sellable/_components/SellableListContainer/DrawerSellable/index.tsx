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
} from "./InventoryExtraList";
import StockExtraSelection, {
    StockExtraSelectionProps,
} from "./StockExtraSelection";
import ModalConfirmResetCap from "./ModalConfirmResetCap";
import { sellableConfirmSchema } from "../../../schema/sellable.interface";
import SellableSelection, { SellableSelectionProps } from "./SellableSelection";
import { TIME_FORMAT, DATE_TIME_FORMAT } from "@/constants/common";
import CustomRangePicker from "@/components/admin/CustomRangePicker";
import CustomDatePicker from "@/components/admin/CustomDatePicker";
const MAX_NUMBER_INPUT = 999;

export enum EActionType {
    APPROVAL = "APPROVAL",
    EDIT = "EDIT",
}

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
        if (!date) {
            return;
        }
        setSellableConfirmFormData((prev) => ({
            ...prev,
            valid: date[0]?.locale("en").format(DATE_TIME_FORMAT),
            validTo: date[1]?.locale("en").format(DATE_TIME_FORMAT),
        }));
    };

    const onChangeCloseDate: DatePickerProps["onChange"] = (
        closeDate,
        closeDateStr,
    ) => {
        if (!closeDate) return;
        if (
            closeDate.isBefore(
                dayjs(sellableConfirmFormData.valid, DATE_TIME_FORMAT),
            ) ||
            closeDate.isAfter(
                dayjs(sellableConfirmFormData.validTo, DATE_TIME_FORMAT),
            )
        ) {
            message.error("Close date phải nằm trong khoảng ngày Valid");
        } else {
            setSellableConfirmFormData((prev) => ({
                ...prev,
                closeDate: closeDate.locale("en").format(DATE_TIME_FORMAT),
            }));
        }
    };
    const onChangeUsedDateRange: RangePickerProps["onChange"] = (
        date,
        dateStr,
    ) => {
        if (!date) return;

        if (
            date[1]?.isBefore(
                dayjs(sellableConfirmFormData.validTo, DATE_TIME_FORMAT),
            )
        ) {
            message.error(
                "Ngày kết thúc áp dụng phải lớn hơn ngày kết thúc mở bán.",
            );
            return;
        }
        setSellableConfirmFormData((prev) => ({
            ...prev,
            start: date[0]?.format(DATE_TIME_FORMAT),
            end: date[1]?.format(DATE_TIME_FORMAT),
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
            message.error("Cap của sellable không hợp lệ.");
            return;
        }
        if (isUndefined(stock.open) || Number(stock.open) <= 0) {
            message.error("open của sellable không hợp lệ.");
            return;
        }
        if (action === "add") {
            /**
             * Check open quantity of stock
             * Must >= cap of sellable
             */
            if (stock.open < cap) {
                message.error("Open của Stock không đủ.");
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
                if (stock.open - qty < cap) {
                    message.error("Open của Stock không đủ.");
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

            if (pickedStock) {
                if (!stock?.open || stock.open - pickedStock.qty <= 0) {
                    message.error("Số lượng không đủ");
                    return;
                }
            } else {
                if (!stock?.open || stock?.open <= 0) {
                    message.error("Open của Stock không đủ.");
                    return;
                }
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

            const { stocks, extraStocks, cap } = sellableConfirmFormData;
            let openQuantity = Number(stock.open);
            let newStocksExtra = [...(extraStocks || [])];

            //Check quantity remain

            const stockSelected = (stocks || []).find(
                (stk) => stk.stock.recId === stock.recId,
            );

            // if (Number(qty) <= 0) {
            //     message.error("Số lượng không hợp lệ");
            //     return;
            // }

            if (stockSelected) {
                openQuantity = openQuantity - Number(stockSelected.qty);
            }
            if (openQuantity - Number(qty) < 0) {
                message.error("Số lượng hiện tại không đủ.");
                return;
            }
            if (Number(qty) > cap) {
                message.error(`Số lượng được phép thêm tối đa ${cap}`);
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
        const { cap } = sellableConfirmFormData;
        if (record.qty < 0) {
            message.error("Số lượng phải lớn hơn 1");
            return;
        }
        if (record.qty > cap) {
            message.error(`Số lượng được phép thêm tối đa ${cap}`);
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

    // const onSelectSellable: SellableSelectionProps["onSetSellable"] = (
    //     action,
    //     sellable,
    // ) => {
    //     const { otherSellables } = sellableConfirmFormData;
    //     let newOtherSellables = [...otherSellables];
    //     if (action === "add") {
    //         const indx = newOtherSellables.findIndex(
    //             (item) => item.sellable.recId === sellable.recId,
    //         );
    //         if (indx !== -1) {
    //             message.error("Sellable đã được thêm.");
    //             return;
    //         }
    //         if (!sellable.open || sellable.open === 0 || sellable.open < 0) {
    //             message.error("Số lượng không đủ");
    //             return;
    //         }

    //         newOtherSellables = [
    //             ...newOtherSellables,
    //             { qty: 1, sellable: sellable },
    //         ];
    //     }
    //     if (action === "remove") {
    //         const indx = newOtherSellables.findIndex(
    //             (item) => item.sellable.recId === sellable.recId,
    //         );
    //         if (indx !== -1) {
    //             newOtherSellables.splice(indx, 1);
    //         }
    //     }
    //     setSellableConfirmFormData((prev) => ({
    //         ...prev,
    //         otherSellables: [...newOtherSellables],
    //     }));
    // };

    // const onSaveSellableByQuantity: SellableSelectionProps["onSaveQuantity"] =
    //     ({ sellable, qty }) => {
    //         const { cap } = sellableConfirmFormData;
    //         if (Number(qty) < 0) {
    //             message.error("Số lượng phải lớn hơn 1");
    //             return;
    //         }

    //         if (Number(qty) > cap) {
    //             message.error(`Số lượng được lớn hơn ${cap}`);
    //             return;
    //         }
    //         if (qty > Number(sellable.open)) {
    //             message.error(`Số lượng không đủ`);
    //             return;
    //         }
    //         let newOtherSellables = [...sellableConfirmFormData.otherSellables];
    //         const indxSellable =
    //             sellableConfirmFormData.otherSellables.findIndex(
    //                 (item) => item.sellable.recId === sellable.recId,
    //             );

    //         if (indxSellable !== -1) {
    //             newOtherSellables.splice(indxSellable, 1, {
    //                 qty: Number(qty),
    //                 sellable: sellable,
    //             });
    //         }
    //         setSellableConfirmFormData((prev) => ({
    //             ...prev,
    //             otherSellables: [...newOtherSellables],
    //         }));
    //     };

    const onSubmitForm: HandleSubmit<SellableConfirmFormData> = (data) => {
        actionType && onSubmit?.(actionType, data);
    };

    useEffect(() => {
        if (initialValues) {
            setSellableConfirmFormData((prev) => ({
                ...prev,
                start: dayjs(initialValues.startDate)
                    .locale("en")
                    .format(DATE_TIME_FORMAT),
                end: dayjs(initialValues.endDate)
                    .locale("en")
                    .format(DATE_TIME_FORMAT),
                valid: dayjs(initialValues.validFrom)
                    .locale("en")
                    .format(DATE_TIME_FORMAT),
                validTo: dayjs(initialValues.validTo)
                    .locale("en")
                    .format(DATE_TIME_FORMAT),
                closeDate: dayjs(initialValues.closeDate)
                    .locale("en")
                    .format(DATE_TIME_FORMAT),
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
                                <CustomRangePicker
                                    showTime={{
                                        format: TIME_FORMAT,
                                        hideDisabledOptions: true,
                                        defaultValue: [
                                            dayjs("00:00:00", "HH:mm:ss"),
                                            dayjs("23:59:59", "HH:mm:ss"),
                                        ],
                                    }}
                                    placeholder={["Từ ngày", "Đến ngày"]}
                                    format={"DD/MM/YYYY - HH:mm"}
                                    value={[
                                        sellableConfirmFormData.valid
                                            ? dayjs(
                                                  sellableConfirmFormData.valid,
                                                  { format: DATE_TIME_FORMAT },
                                              )
                                            : null,
                                        sellableConfirmFormData.validTo
                                            ? dayjs(
                                                  sellableConfirmFormData.validTo,
                                                  { format: DATE_TIME_FORMAT },
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
                                <CustomRangePicker
                                    showTime={{
                                        format: TIME_FORMAT,
                                        hideDisabledOptions: true,
                                        defaultValue: [
                                            dayjs("00:00:00", "HH:mm:ss"),
                                            dayjs("23:59:59", "HH:mm:ss"),
                                        ],
                                    }}
                                    placeholder={["Từ ngày", "Đến ngày"]}
                                    format={"DD/MM/YYYY - HH:mm"}
                                    disabled={false}
                                    value={[
                                        sellableConfirmFormData.start
                                            ? dayjs(
                                                  sellableConfirmFormData.start,
                                                  { format: DATE_TIME_FORMAT },
                                              )
                                            : null,
                                        sellableConfirmFormData.end
                                            ? dayjs(
                                                  sellableConfirmFormData.end,
                                                  { format: DATE_TIME_FORMAT },
                                              )
                                            : null,
                                    ]}
                                    disabledDate={(date) => {
                                        return sellableConfirmFormData.valid
                                            ? dayjs(
                                                  sellableConfirmFormData.valid,
                                              ).isAfter(date)
                                            : dayjs().isAfter(date);
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
                                label="Ngày kết thúc mở bán"
                                required
                                validateStatus={
                                    errors?.start || errors?.end ? "error" : ""
                                }
                                help={errors?.start || errors?.end || ""}
                            >
                                <CustomDatePicker
                                    showTime={{
                                        format: TIME_FORMAT,
                                        hideDisabledOptions: true,
                                        defaultValue: dayjs(
                                            "23:59:59",
                                            "HH:mm:ss",
                                        ),
                                    }}
                                    placeholder="Ngày kết thúc mở bán"
                                    format={"DD/MM/YYYY - HH:mm"}
                                    disabled={false}
                                    value={
                                        sellableConfirmFormData.closeDate
                                            ? dayjs(
                                                  sellableConfirmFormData.closeDate,
                                                  { format: DATE_TIME_FORMAT },
                                              )
                                            : null
                                    }
                                    disabledDate={(date) => {
                                        return (
                                            dayjs().isAfter(date) ||
                                            dayjs(
                                                sellableConfirmFormData.valid,
                                                { format: DATE_TIME_FORMAT },
                                            ).isAfter(date) ||
                                            dayjs(
                                                sellableConfirmFormData.validTo,
                                                { format: DATE_TIME_FORMAT },
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

                    <FormItem label="Chọn nhóm kho sản phẩm" required>
                        <Select
                            mode="multiple"
                            options={inventoryWithOutStockOptions}
                            onChange={onSelectInventoryHasnotStock}
                            placeholder="Chọn inventory"
                        />
                    </FormItem>

                    <FormItem label="Danh sách kho sản phẩm" required>
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
                            validFrom={sellableConfirmFormData.valid}
                            validTo={sellableConfirmFormData.validTo}
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
                        label="Thêm nhóm kho sản phẩm (Extra)"
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
                    <FormItem label="Thêm kho sản phẩm (Extra)">
                        <StockExtraSelection
                            inventories={inventoriesWithManageStock}
                            scroll={{ x: 750 }}
                            rowKey={"recId"}
                            validFrom={sellableConfirmFormData.valid}
                            validTo={sellableConfirmFormData.validTo}
                            onSetStock={onSelectStockExtra}
                            onSaveQuantity={onSaveStockExtraQuantity}
                            stocks={sellableConfirmFormData.extraStocks}
                            stockSelectedList={sellableConfirmFormData.stocks}
                        />
                    </FormItem>
                    {/* <FormItem label="Chọn sản phẩm">
                        <SellableSelection
                            onSetSellable={onSelectSellable}
                            sellableList={
                                sellableConfirmFormData.otherSellables
                            }
                            onSaveQuantity={onSaveSellableByQuantity}
                        />
                    </FormItem> */}
                </Form>

                <div className="bottom py-4 absolute bottom-0 left-0 right-0 border-t px-6 bg-white z-50">
                    <Space>
                        <Button onClick={onCancel}>Huỷ bỏ</Button>
                        {actionType === EActionType.APPROVAL &&
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
                            <Button
                                type="primary"
                                onClick={() => {}}
                                disabled={true}
                            >
                                Cập nhật
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
