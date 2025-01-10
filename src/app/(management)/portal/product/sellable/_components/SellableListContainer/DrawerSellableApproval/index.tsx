"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Form, Space, Button, Drawer, message, Row, Col, Tabs, TabsProps, InputNumber, InputNumberProps } from "antd";
import FormItem from "@/components/base/FormItem";
import { DatePickerProps, RangePickerProps } from "antd/es/date-picker";
import { ISellable } from "@/models/management/core/sellable.interface";
import { SellableApprovalFormData } from "../../../modules/sellable.interface";
import dayjs from "dayjs";
import { IInventory } from "@/models/management/core/inventory.interface";

import InventoryExtraListSelector, { InventoryExtraListSelectorProps } from "./InventoryExtraListSelector";
import StockExtraListSelector, { StockExtraListSelectorProps } from "./StockExtraListSelector";
import ModalConfirmResetCap from "./ModalConfirmResetCap";
import { sellableApprovalSchema } from "../../../schema/sellable.schema";
import { TIME_FORMAT, DATE_TIME_FORMAT } from "@/constants/common";
import CustomRangePicker from "@/components/admin/CustomRangePicker";
import CustomDatePicker from "@/components/admin/CustomDatePicker";

import { stringToDate } from "@/utils/date";
import InventoryTourListSelector, { InventoryTourListSelectorProps } from "./InventoryTourListSelector";
import { EInventoryType } from "@/models/management/core/inventoryType.interface";
import StockExtraList, { StockExtraListProps } from "./StockExtraListSelector/StockExtraList";
import StockTourListTableSelector, { StockTourListTableSelectorProps } from "./StockTourListTableSelector";
import { Controller, SubmitHandler, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { boolean } from "yup";

const MAXIMUM_CAP_AMOUNT = 999;

export interface IInventoryOption {
  label: string;
  value: number;
  data: IInventory | undefined;
}

export interface DrawerSellableApprovalProps {
  isOpen?: boolean;
  onCancel: () => void;
  productType: "TOUR" | "EXTRA";
  initialValues: ISellable;
  onSubmit?: SubmitHandler<SellableApprovalFormData>;
  sellableName: string;
  inventoryTypeList: EInventoryType[];
}

const DrawerSellableApproval: React.FC<DrawerSellableApprovalProps> = ({
  isOpen,
  onCancel,
  onSubmit,
  productType,
  initialValues,
  sellableName,
  inventoryTypeList,
}) => {
  const initFormData = new SellableApprovalFormData(
    initialValues.recId,
    initialValues.cap,
    stringToDate(initialValues.closeDate).toDate().toString(),
    stringToDate(initialValues.validFrom).toDate().toString(),
    stringToDate(initialValues.validTo).toDate().toString(),
    stringToDate(initialValues.startDate).toDate().toString(),
    stringToDate(initialValues.endDate).toDate().toString(),
    productType,
    [],
    [],
    [],
    [],
  );
  const { control, getValues, setValue, getFieldState, watch, handleSubmit } = useForm<SellableApprovalFormData>({
    defaultValues: initFormData,
    resolver: yupResolver(sellableApprovalSchema),
  });

  const validField = getFieldState("valid");
  const validToField = getFieldState("validTo");

  const startField = getFieldState("start");
  const endField = getFieldState("end");

  const [resetCap, setResetCap] = useState({
    show: false,
    value: initialValues.cap,
  });

  const [openStockExtraModal, setOpenStockExtraModal] = useState(false);

  const onConfirmUpdateCapAndResetSelection = (newcap: number) => {
    setResetCap((prev) => ({ ...prev, show: false }));

    setValue("cap", newcap);
    setValue("extraStocks", []);
    setValue("stocks", []);
  };
  const onCancelUpdateCap = () => {
    setResetCap((prev) => ({ ...prev, show: false }));
  };
  const onChangeCap: InputNumberProps<number>["onChange"] = (cap) => {
    const extraStocks = getValues("extraStocks");
    const stocks = getValues("stocks");
    if (!cap) return;

    if (cap > MAXIMUM_CAP_AMOUNT) {
      return;
    }

    if ((stocks && stocks.length) || (extraStocks && extraStocks.length)) {
      setResetCap((prev) => ({ value: cap, show: true }));
      return;
    }

    setValue("cap", cap);
  };
  const onChangeValidDateRange: RangePickerProps["onChange"] = (date, dateStr) => {
    const [newValidDate, newValidToDate] = date || [];
    setValue("valid", newValidDate?.toDate().toString());
    setValue("validTo", newValidToDate?.toDate().toString());
  };

  const onChangeCloseDate: DatePickerProps["onChange"] = (closeDate, closeDateStr) => {
    const valid = getValues("valid");
    const validTo = getValues("validTo");
    if (!closeDate) return;

    if (
      (valid && closeDate.isBefore(dayjs(valid, DATE_TIME_FORMAT))) ||
      (validTo && closeDate.isAfter(dayjs(validTo, DATE_TIME_FORMAT)))
    ) {
      message.error("Ngày kết thúc mở bán phải nằm trong khoảng ngày mở bán.");
      return;
    }

    setValue("closeDate", closeDate.toDate().toString());
  };
  const onChangeUsedDateRange: RangePickerProps["onChange"] = (usedDate, usedDateStr) => {
    const validTo = getValues("validTo");

    if (!usedDate) return;

    const [startUsedDate, endUsedData] = usedDate;

    if (validTo && endUsedData?.isBefore(dayjs(validTo, DATE_TIME_FORMAT))) {
      message.error("Ngày kết thúc áp dụng phải lớn hơn ngày kết thúc mở bán.");
      return;
    }
    setValue("start", startUsedDate?.toDate().toString());
    setValue("end", endUsedData?.toDate().toString());
  };

  const onChangeInventoryTour: InventoryTourListSelectorProps["onChange"] = (value, inventories) => {
    const cap = getValues("cap");
    const correctInventories = inventories.reduce<Exclude<SellableApprovalFormData["inventories"], undefined>>(
      (acc, inv) => {
        return [...acc, { qty: cap, inventory: inv, recId: inv.recId }];
      },
      [],
    );

    setValue("inventories", correctInventories);
  };

  const onAddTourStock: StockTourListTableSelectorProps["onAdd"] = (stock) => {
    const currentStocks = getValues("stocks") || [];
    const cap = getValues("cap");
    setValue("stocks", [...currentStocks, { qty: cap, stock: stock, recId: stock.recId }]);
  };
  const onRemoveTourStock: StockTourListTableSelectorProps["onRemove"] = (recId) => {
    let newStocks = getValues("stocks") || [];

    const indexStock = newStocks.findIndex((item) => item.recId === recId);
    if (indexStock !== -1) {
      newStocks.splice(indexStock, 1);
    }
    setValue("stocks", [...newStocks]);
  };

  const onAddExtraStock: StockExtraListSelectorProps["onConfirm"] = (stockList) => {
    const newStockList = stockList.reduce<Exclude<SellableApprovalFormData["extraStocks"], undefined>>((acc, item) => {
      return [...acc, { qty: 1, stock: item, recId: item.recId }];
    }, []);

    setValue("extraStocks", [...newStockList]);
  };

  const onChangeQuantityExtraStock: StockExtraListProps["onChangeQuantity"] = ({ stock, qty }) => {
    const cap = getValues("cap");
    if (!cap) {
      message.error("Cap không hợp lệ.");
      return;
    }
    if (qty < 0) {
      message.error("Số lượng tối thiểu là 1.");
      return;
    }

    const stockOpen = stock.open || 0;

    if (qty > stockOpen) {
      message.error("Số lượng hiện tại không đủ.");
      return;
    }

    if (qty > cap) {
      message.error(`Số lượng được phép thêm tối đa ${cap}`);
      return;
    }
    let newExtraStocks = getValues("extraStocks") || [];

    const indexItem = newExtraStocks.findIndex((item) => item.recId === stock.recId);

    if (indexItem !== -1) {
      newExtraStocks.splice(indexItem, 1, {
        ...newExtraStocks[indexItem],
        qty: qty,
      });
      setValue("extraStocks", newExtraStocks);
    }
  };

  const onRemoveExtraStock: StockExtraListProps["onRemove"] = (recId) => {
    let newExtraStocks = getValues("extraStocks") || [];
    const indexItem = newExtraStocks.findIndex((item) => item.recId === recId);
    if (indexItem !== -1) {
      newExtraStocks.splice(indexItem, 1);
      setValue("extraStocks", newExtraStocks);
    }
  };

  const onSaveQuantityInventoryExtra: InventoryExtraListSelectorProps["onChangeQuantity"] = ({ qty, inventory }) => {
    /**
     * check quantity remain from inventories
     */

    const cap = getValues("cap");
    if (qty < 0) {
      message.error("Số lượng phải lớn hơn 1");
      return;
    }
    if (qty > cap) {
      message.error(`Số lượng được phép thêm tối đa ${cap}`);
      return;
    }
    let newExtraInventories = getValues("extraInventories") || [];
    const indxInventoryExtra = newExtraInventories.findIndex((item) => item.recId === inventory.recId);

    if (indxInventoryExtra !== -1) {
      newExtraInventories.splice(indxInventoryExtra, 1, {
        ...newExtraInventories[indxInventoryExtra],
        qty: qty,
      });

      setValue("extraInventories", newExtraInventories);
    }
  };
  const onAddInventoryExtra: InventoryExtraListSelectorProps["onAdd"] = (inventory) => {
    const extraInventories = getValues("extraInventories") || [];
    setValue("extraInventories", [...extraInventories, { recId: inventory.recId, qty: 1, inventory: inventory }]);
  };

  const onRemoveInventoryExtra: InventoryExtraListSelectorProps["onRemove"] = (record) => {
    let newExtraInventories = getValues("extraInventories") || [];
    const indexItem = newExtraInventories.findIndex((item) => item.recId === record.inventory.recId);
    if (indexItem !== -1) {
      newExtraInventories.splice(indexItem, 1);
      setValue("extraInventories", [...newExtraInventories]);
    }
  };

  const extraStockSelected = useMemo(() => {
    const extraStocks = getValues("extraStocks") || [];
    return extraStocks.reduce<Required<StockExtraListSelectorProps>["extraStocks"]>((acc, item) => {
      if (item.stock) {
        acc = [...acc, { stock: item.stock, qty: item.qty }];
      }
      return acc;
    }, []);
  }, [watch("extraStocks")]);

  const extraInventoriesSelected = useMemo(() => {
    const extraInventories = getValues("extraInventories") || [];

    return extraInventories.reduce<Exclude<InventoryExtraListSelectorProps["inventories"], undefined>>((acc, item) => {
      if (item.inventory) {
        acc = [...acc, { qty: item.qty, inventory: item.inventory }];
      }
      return acc;
    }, []);
  }, [watch("extraInventories")]);
  const stocksSelected = useMemo(() => {
    const stocks = getValues("stocks") || [];

    return stocks.reduce<Exclude<StockTourListTableSelectorProps["stocks"], undefined>>((acc, item) => {
      if (item.stock) {
        acc = [...acc, { qty: item.qty, stock: item.stock }];
      }
      return acc;
    }, []);
  }, [watch("stocks")]);

  const inventoriesSelected = useMemo(() => {
    const inventories = getValues("inventories") || [];

    return inventories.reduce<Exclude<InventoryTourListSelectorProps["value"], undefined>>((acc, item) => {
      return [...acc, item.recId];
    }, []);
  }, [watch("inventories")]);

  let tabItems: TabsProps["items"] = [
    {
      label: "Dịch vụ mua thêm",
      key: "extra",
      children: (
        <>
          <FormItem label="Dịch vụ bổ sung không stock">
            <InventoryExtraListSelector
              enabled={isOpen}
              inventories={extraInventoriesSelected}
              inventoryTypes={inventoryTypeList}
              onChangeQuantity={onSaveQuantityInventoryExtra}
              onAdd={onAddInventoryExtra}
              onRemove={onRemoveInventoryExtra}
            />
          </FormItem>
          <FormItem label="Dịch vụ bổ sung có stock">
            <Button type="dashed" size="small" onClick={() => setOpenStockExtraModal(true)} className="mb-6">
              Thêm
            </Button>
            <StockExtraList
              stocks={extraStockSelected}
              onChangeQuantity={onChangeQuantityExtraStock}
              onRemove={onRemoveExtraStock}
            />
          </FormItem>
          <StockExtraListSelector
            isOpen={openStockExtraModal}
            onClose={() => setOpenStockExtraModal(false)}
            inventoryTypeList={inventoryTypeList}
            validFrom={getValues("valid")}
            validTo={getValues("validTo")}
            onConfirm={onAddExtraStock}
            extraStocks={extraStockSelected}
          />
        </>
      ),
    },
  ];
  if (productType === "TOUR") {
    tabItems = [
      {
        label: "Dịch vụ Tour bao gồm",
        key: "tour",
        children: (
          <>
            <Controller
              control={control}
              name="stocks"
              render={() => (
                <FormItem label="Dịch vụ không có stock" required>
                  <InventoryTourListSelector
                    inventoryTypes={inventoryTypeList}
                    value={inventoriesSelected}
                    onChange={onChangeInventoryTour}
                    enabled={isOpen}
                  />
                </FormItem>
              )}
            />
            <div>Dịch vụ có stock</div>
            <Controller
              control={control}
              name="cap"
              render={() => (
                <StockTourListTableSelector
                  inventoryTypeList={inventoryTypeList}
                  validFrom={getValues("valid")}
                  validTo={getValues("validTo")}
                  minimumQuantity={getValues("cap")}
                  onAdd={onAddTourStock}
                  onRemove={onRemoveTourStock}
                  stocks={stocksSelected}
                />
              )}
            />
          </>
        ),
      },
      ...tabItems,
    ];
  }
  useWatch({ control: control });
  useEffect(() => {
    Object.keys(initFormData).forEach((key) => {
      setValue(key as keyof SellableApprovalFormData, initFormData[key as keyof SellableApprovalFormData]);
    });
  }, [isOpen]);

  return (
    <>
      <Drawer
        title={`Duyệt ${sellableName}`}
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
        <Form layout="vertical" colon={false} labelWrap className="max-w-4xl">
          <Row gutter={16}>
            <Col span={12}>
              <FormItem
                label="Ngày mở bán (valid date)"
                required
                validateStatus={validField.error || validToField.error ? "error" : undefined}
                help={validField.error?.message || validToField.error?.message}
              >
                <CustomRangePicker
                  showTime={{
                    format: TIME_FORMAT,
                    hideDisabledOptions: true,
                    defaultValue: [dayjs("00:00:00", "HH:mm:ss"), dayjs("23:59:59", "HH:mm:ss")],
                  }}
                  allowClear={false}
                  placeholder={["Từ ngày", "Đến ngày"]}
                  format={"DD/MM/YYYY - HH:mm"}
                  value={[
                    getValues("valid") ? dayjs(getValues("valid")) : null,
                    getValues("validTo") ? dayjs(getValues("validTo")) : null,
                  ]}
                  disabledDate={(date) => {
                    return dayjs().isAfter(date) && !dayjs().isSame(date, "date");
                  }}
                  onChange={onChangeValidDateRange}
                  className="w-full"
                />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                label="Ngày áp dụng (used)"
                required
                validateStatus={startField.error || endField.error ? "error" : undefined}
                help={startField.error?.message || endField.error?.message}
              >
                <CustomRangePicker
                  showTime={{
                    format: TIME_FORMAT,
                    hideDisabledOptions: true,
                    defaultValue: [dayjs("00:00:00", "HH:mm:ss"), dayjs("23:59:59", "HH:mm:ss")],
                  }}
                  allowClear={false}
                  placeholder={["Từ ngày", "Đến ngày"]}
                  format={"DD/MM/YYYY - HH:mm"}
                  disabled={false}
                  value={[
                    getValues("start") ? dayjs(getValues("start")) : null,
                    getValues("end") ? dayjs(getValues("end")) : null,
                  ]}
                  disabledDate={(date) => {
                    return getValues("validTo") ? dayjs(getValues("validTo")).isAfter(date) : dayjs().isAfter(date);
                  }}
                  onChange={onChangeUsedDateRange}
                  className="w-full"
                />
              </FormItem>
            </Col>
            <Col span={12}>
              <Controller
                control={control}
                name="closeDate"
                render={({ field: { value }, fieldState: { error } }) => (
                  <FormItem
                    label="Ngày kết thúc mở bán"
                    required
                    validateStatus={error ? "error" : undefined}
                    help={error?.message}
                  >
                    <CustomDatePicker
                      showTime={{
                        format: TIME_FORMAT,
                        hideDisabledOptions: true,
                        defaultValue: dayjs("23:59:59", "HH:mm:ss"),
                      }}
                      allowClear={false}
                      placeholder="Ngày kết thúc mở bán"
                      format={"DD/MM/YYYY - HH:mm"}
                      disabled={false}
                      value={value ? dayjs(value) : null}
                      disabledDate={(date) =>
                        dayjs().isAfter(date) ||
                        dayjs(getValues("valid")).isAfter(date) ||
                        dayjs(getValues("validTo")).isBefore(date)
                      }
                      onChange={onChangeCloseDate}
                      className="w-full"
                    />
                  </FormItem>
                )}
              />
            </Col>
            <Col span={12}>
              <Controller
                control={control}
                name="cap"
                render={({ field: { value }, fieldState: { error } }) => (
                  <FormItem
                    label="Số lượng (cap)"
                    required
                    validateStatus={error ? "error" : undefined}
                    help={error?.message}
                  >
                    <InputNumber
                      placeholder="Số lượng"
                      max={999}
                      min={1}
                      value={value}
                      onChange={(value) => onChangeCap(value)}
                      disabled={false}
                      className="!w-full"
                    />
                  </FormItem>
                )}
              />
            </Col>
          </Row>
          <Tabs type="card" items={tabItems} />
        </Form>
        <div className="bottom py-4 absolute bottom-0 left-0 right-0 border-t px-6 bg-white z-50">
          <Space>
            <Button onClick={onCancel}>Huỷ bỏ</Button>
            <Button type="primary" onClick={onSubmit && handleSubmit(onSubmit)}>
              Duyệt
            </Button>
          </Space>
        </div>
      </Drawer>

      <ModalConfirmResetCap
        title="Lưu ý"
        descriptions="Cập nhật lại Số lượng (Cap) sẽ remove toàn bộ các stocks đã chọn trước đó"
        isShowModal={resetCap.show}
        onCancel={onCancelUpdateCap}
        onConfirm={() => onConfirmUpdateCapAndResetSelection(resetCap.value)}
      />
    </>
  );
};
export default DrawerSellableApproval;
