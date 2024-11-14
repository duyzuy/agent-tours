"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Form, Input, Select, Space, Button, SelectProps, Drawer, Tag, message, Row, Col, Divider, Empty } from "antd";
import FormItem from "@/components/base/FormItem";
import { DatePickerProps, RangePickerProps } from "antd/es/date-picker";
import { ISellable, SellableConfirmFormData } from "@/models/management/core/sellable.interface";
import { Status } from "@/models/common.interface";
import { HandleSubmit, useFormSubmit } from "@/hooks/useFormSubmit";
import { SellableListRs } from "@/models/management/core/sellable.interface";
import dayjs from "dayjs";
import { IInventory } from "@/models/management/core/inventory.interface";
import { isArray, isEmpty, isUndefined } from "lodash";
import StockTourListSelector, { StockTourListSelectorProps } from "./StockTourListSelector";

import InventoryExtraListSelector, { InventoryExtraListSelectorProps } from "./InventoryExtraListSelector";
import StockExtraListSelector, { StockExtraListSelectorProps } from "./StockExtraListSelector";
import ModalConfirmResetCap from "./ModalConfirmResetCap";
import { sellableConfirmSchema } from "../../../schema/sellable.schema";
import { TIME_FORMAT, DATE_TIME_FORMAT } from "@/constants/common";
import CustomRangePicker from "@/components/admin/CustomRangePicker";
import CustomDatePicker from "@/components/admin/CustomDatePicker";

import { stringToDate } from "@/utils/date";
import InventoryTourListSelector, { InventoryTourListSelectorProps } from "./InventoryTourListSelector";
import { EInventoryType } from "@/models/management/core/inventoryType.interface";
import { IStock } from "@/models/management/core/stock.interface";
import StockExtraList, { StockExtraListProps } from "./StockExtraListSelector/StockExtraList";
const MAX_NUMBER_INPUT = 999;

export interface IInventoryOption {
  label: string;
  value: number;
  data: IInventory | undefined;
}

export interface DrawerSellableApprovalProps {
  isOpen?: boolean;
  onCancel: () => void;
  initialValues: ISellable;
  onSubmit?: (formData: SellableConfirmFormData) => void;
  sellableName: string;
  inventoryTypeList: EInventoryType[];
}

const DrawerSellableApproval: React.FC<DrawerSellableApprovalProps> = ({
  isOpen,
  onCancel,
  onSubmit,
  initialValues,
  sellableName,
  inventoryTypeList,
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
  );

  const [showModalResetCap, setShowModalResetCap] = useState(false);
  const [sellableConfirmFormData, setSellableConfirmFormData] = useState(initSellableConfirmFormData);
  const [openStockModal, setOpenStockTourModal] = useState(false);
  const [openStockExtraModal, setOpenStockExtraModal] = useState(false);

  const { handlerSubmit, errors } = useFormSubmit<SellableConfirmFormData>({
    schema: sellableConfirmSchema,
  });

  const onChangeFormData = (key: keyof SellableConfirmFormData, value: string | number) => {
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
        (!isUndefined(sellableConfirmFormData.stocks) && !isEmpty(sellableConfirmFormData.stocks)) ||
        (!isUndefined(sellableConfirmFormData.extraStocks) && !isEmpty(sellableConfirmFormData.extraStocks));

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
  const onChangeValidDateRange: RangePickerProps["onChange"] = (date, dateStr) => {
    if (!date) {
      return;
    }
    // console.log(date[0]?.toDate().t);
    setSellableConfirmFormData((prev) => ({
      ...prev,
      valid: date[0]?.toDate().toString(),
      validTo: date[1]?.toDate().toString(),
    }));

    // setSellableConfirmFormData((prev) => ({
    //   ...prev,
    //   valid: date[0]?.locale("en").format(DATE_TIME_FORMAT),
    //   validTo: date[1]?.locale("en").format(DATE_TIME_FORMAT),
    // }));
  };

  const onChangeCloseDate: DatePickerProps["onChange"] = (closeDate, closeDateStr) => {
    if (!closeDate) return;
    if (
      closeDate.isBefore(dayjs(sellableConfirmFormData.valid, DATE_TIME_FORMAT)) ||
      closeDate.isAfter(dayjs(sellableConfirmFormData.validTo, DATE_TIME_FORMAT))
    ) {
      message.error("Close date phải nằm trong khoảng ngày Valid");
    } else {
      setSellableConfirmFormData((prev) => ({
        ...prev,
        closeDate: closeDate.toDate().toString(),
      }));
    }
  };
  const onChangeUsedDateRange: RangePickerProps["onChange"] = (date, dateStr) => {
    if (!date) return;

    if (date[1]?.isBefore(dayjs(sellableConfirmFormData.validTo, DATE_TIME_FORMAT))) {
      message.error("Ngày kết thúc áp dụng phải lớn hơn ngày kết thúc mở bán.");
      return;
    }
    setSellableConfirmFormData((prev) => ({
      ...prev,
      start: date[0]?.toDate().toString(),
      end: date[1]?.toDate().toString(),
    }));
  };

  const onChangeInventoryTour: InventoryTourListSelectorProps["onChange"] = (value, options) => {
    let inventories: SellableConfirmFormData["inventories"] = [];

    const qty = sellableConfirmFormData.cap;

    options.forEach((opt) => {
      inventories = [...(inventories || []), { qty: qty, inventory: opt }];
    });

    setSellableConfirmFormData((prev) => ({
      ...prev,
      inventories,
    }));
  };

  const handleConfirmSelectStockTour: StockTourListSelectorProps["onConfirm"] = (stockList) => {
    setSellableConfirmFormData((oldData) => {
      const stockItems = stockList.reduce<{ qty: number; stock: Partial<IStock> }[]>((acc, item) => {
        return [
          ...acc,
          {
            qty: sellableConfirmFormData.cap,
            stock: item,
          },
        ];
      }, []);

      return {
        ...oldData,
        stocks: stockItems,
      };
    });
    setOpenStockTourModal(false);
  };
  const onConfirmExtraStock: StockExtraListSelectorProps["onConfirm"] = (stockList) => {
    setSellableConfirmFormData((oldData) => {
      const newStockList = stockList.reduce<{ qty: number; stock: IStock }[]>((acc, item) => {
        return [...acc, { qty: 1, stock: item }];
      }, []);

      return {
        ...oldData,
        extraStocks: [...oldData.extraStocks, ...newStockList],
      };
    });
  };

  const onChangeQuantityExtraStock: StockExtraListProps["onChangeQuantity"] = (record) => {
    const { stock, qty } = record;

    if (qty < 0) {
      message.error("Số lượng tối thiểu là 1.");
      return;
    }

    const { cap } = sellableConfirmFormData;

    const stockOpen = stock.open || 0;

    if (qty > stockOpen) {
      message.error("Số lượng hiện tại không đủ.");
      return;
    }

    if (qty > cap) {
      message.error(`Số lượng được phép thêm tối đa ${cap}`);
      return;
    }

    setSellableConfirmFormData((oldData) => {
      const { extraStocks } = oldData;
      let newExtraStocks = [...extraStocks];
      const indexItem = newExtraStocks.findIndex((stk) => stk.stock.recId === stock.recId);

      if (indexItem !== -1) {
        newExtraStocks.splice(indexItem, 1, {
          stock,
          qty: qty,
        });
      }
      return {
        ...oldData,
        extraStocks: [...newExtraStocks],
      };
    });
  };
  const onRemoveExtraStock: StockExtraListProps["onRemove"] = (recId) => {
    setSellableConfirmFormData((oldData) => {
      const { extraStocks } = oldData;
      let newExtraStocks = [...extraStocks];
      const indexItem = newExtraStocks.findIndex((stk) => stk.stock.recId === recId);

      if (indexItem !== -1) {
        newExtraStocks.splice(indexItem, 1);
      }
      return {
        ...oldData,
        extraStocks: [...newExtraStocks],
      };
    });
  };

  const onSaveQuantityInventoryExtra: InventoryExtraListSelectorProps["onChangeQuantity"] = ({ qty, inventory }) => {
    /**
     * check quantity remain from inventories
     */
    const { cap } = sellableConfirmFormData;
    if (qty < 0) {
      message.error("Số lượng phải lớn hơn 1");
      return;
    }
    if (qty > cap) {
      message.error(`Số lượng được phép thêm tối đa ${cap}`);
      return;
    }

    setSellableConfirmFormData((oldData) => {
      const { extraInventories } = oldData;

      const indxInventoryExtra = extraInventories.findIndex((inv) => inv.inventory.recId === inventory.recId);

      let newExtraInventories = [...sellableConfirmFormData.extraInventories];

      if (indxInventoryExtra !== -1) {
        newExtraInventories.splice(indxInventoryExtra, 1, {
          qty: qty,
          inventory: inventory,
        });
      }

      return {
        ...oldData,
        extraInventories: [...newExtraInventories],
      };
    });
  };
  const onAddInventoryExtra: InventoryExtraListSelectorProps["onAdd"] = (inventory) => {
    const { extraInventories } = sellableConfirmFormData;

    const indxInventoryExtra = extraInventories.findIndex((inv) => inv.inventory.recId === inventory.recId);

    if (indxInventoryExtra !== -1) {
      message.error(`Dịch vụ đã được thêm vào danh sách`);
      return;
    }
    setSellableConfirmFormData((prev) => ({
      ...prev,
      extraInventories: [...prev.extraInventories, { qty: 1, inventory: inventory }],
    }));
  };

  const onRemoveInventoryExtra: InventoryExtraListSelectorProps["onRemove"] = (record) => {
    setSellableConfirmFormData((oldData) => {
      const { extraInventories } = oldData;

      const indxInventoryExtra = extraInventories.findIndex((inv) => inv.inventory.recId === record.inventory.recId);
      let updateExtraInventory = [...extraInventories];
      if (indxInventoryExtra !== -1) {
        updateExtraInventory.splice(indxInventoryExtra, 1);
      }
      return {
        ...oldData,
        extraInventories: [...updateExtraInventory],
      };
    });
  };

  const onSubmitForm: HandleSubmit<SellableConfirmFormData> = (data) => {
    onSubmit?.(data);
  };

  useEffect(() => {
    if (initialValues) {
      setSellableConfirmFormData((prev) => ({
        ...prev,
        start: stringToDate(initialValues.startDate).toDate().toString(),
        end: stringToDate(initialValues.endDate).toDate().toString(),
        valid: stringToDate(initialValues.validFrom).toDate().toString(),
        validTo: stringToDate(initialValues.validTo).toDate().toString(),
        closeDate: stringToDate(initialValues.closeDate).toDate().toString(),
        recId: initialValues.recId,
        cap: initialValues.cap,
      }));
    } else {
      setSellableConfirmFormData(initSellableConfirmFormData);
    }
  }, [initialValues, isOpen]);

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
                validateStatus={errors?.valid || errors?.validTo ? "error" : ""}
                help={errors?.valid || errors?.validTo || ""}
              >
                <CustomRangePicker
                  showTime={{
                    format: TIME_FORMAT,
                    hideDisabledOptions: true,
                    defaultValue: [dayjs("00:00:00", "HH:mm:ss"), dayjs("23:59:59", "HH:mm:ss")],
                  }}
                  placeholder={["Từ ngày", "Đến ngày"]}
                  format={"DD/MM/YYYY - HH:mm"}
                  value={[
                    sellableConfirmFormData.valid ? dayjs(sellableConfirmFormData.valid) : null,
                    sellableConfirmFormData.validTo ? dayjs(sellableConfirmFormData.validTo) : null,
                  ]}
                  disabledDate={(date) => {
                    return dayjs().isAfter(date) && !dayjs().isSame(date, "date");
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
                validateStatus={errors?.start || errors?.end ? "error" : ""}
                help={errors?.start || errors?.end || ""}
              >
                <CustomRangePicker
                  showTime={{
                    format: TIME_FORMAT,
                    hideDisabledOptions: true,
                    defaultValue: [dayjs("00:00:00", "HH:mm:ss"), dayjs("23:59:59", "HH:mm:ss")],
                  }}
                  placeholder={["Từ ngày", "Đến ngày"]}
                  format={"DD/MM/YYYY - HH:mm"}
                  disabled={false}
                  value={[
                    sellableConfirmFormData.start ? dayjs(sellableConfirmFormData.start) : null,
                    sellableConfirmFormData.end ? dayjs(sellableConfirmFormData.end) : null,
                  ]}
                  disabledDate={(date) => {
                    return sellableConfirmFormData.valid
                      ? dayjs(sellableConfirmFormData.valid).isAfter(date)
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
                validateStatus={errors?.start || errors?.end ? "error" : ""}
                help={errors?.start || errors?.end || ""}
              >
                <CustomDatePicker
                  showTime={{
                    format: TIME_FORMAT,
                    hideDisabledOptions: true,
                    defaultValue: dayjs("23:59:59", "HH:mm:ss"),
                  }}
                  placeholder="Ngày kết thúc mở bán"
                  format={"DD/MM/YYYY - HH:mm"}
                  disabled={false}
                  value={sellableConfirmFormData.closeDate ? dayjs(sellableConfirmFormData.closeDate) : null}
                  disabledDate={(date) => {
                    return (
                      dayjs().isAfter(date) ||
                      dayjs(sellableConfirmFormData.valid).isAfter(date) ||
                      dayjs(sellableConfirmFormData.validTo).isBefore(date)
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
                  onChange={(ev) => onChangeFormData("cap", ev.target.value)}
                />
              </FormItem>
            </Col>
          </Row>
          <Divider />
          <h3 className="font-semibold text-[16px] mb-6">Dịch vụ tour bao gồm</h3>
          <FormItem label="Dịch vụ không có stock" required>
            <InventoryTourListSelector
              inventoryTypes={inventoryTypeList}
              onChange={onChangeInventoryTour}
              enabled={isOpen}
            />
          </FormItem>
          <FormItem label="Dịch vụ có stock">
            <div className="mb-3">
              <Button type="dashed" size="small" onClick={() => setOpenStockTourModal(true)}>
                Thêm
              </Button>
            </div>
            <div>
              <Space>
                {sellableConfirmFormData.stocks.map((item) => (
                  <Tag key={item.stock.recId}>{`#${item.stock.code}`}</Tag>
                ))}
              </Space>
            </div>
          </FormItem>
          <Divider />
          <h3 className="font-semibold text-[16px] mb-6">Dịch vụ mua thêm</h3>

          <FormItem label="Dịch vụ bổ sung không stock">
            <InventoryExtraListSelector
              enabled={isOpen}
              inventories={sellableConfirmFormData.extraInventories}
              inventoryTypes={inventoryTypeList}
              onChangeQuantity={onSaveQuantityInventoryExtra}
              onAdd={onAddInventoryExtra}
              onRemove={onRemoveInventoryExtra}
            />
          </FormItem>
          <FormItem label="Loại dịch vụ bổ sung có stock">
            <Button type="dashed" size="small" onClick={() => setOpenStockExtraModal(true)}>
              Thêm
            </Button>
            <div className="h-6"></div>
            <StockExtraList
              stocks={sellableConfirmFormData.extraStocks}
              onChangeQuantity={onChangeQuantityExtraStock}
              onRemove={onRemoveExtraStock}
            />
          </FormItem>
        </Form>

        <div className="bottom py-4 absolute bottom-0 left-0 right-0 border-t px-6 bg-white z-50">
          <Space>
            <Button onClick={onCancel}>Huỷ bỏ</Button>
            <Button type="primary" onClick={() => handlerSubmit(sellableConfirmFormData, onSubmitForm)}>
              Duyệt
            </Button>
          </Space>
        </div>
      </Drawer>
      <StockTourListSelector
        isOpen={openStockModal}
        inventoryTypeList={inventoryTypeList}
        onClose={() => setOpenStockTourModal(false)}
        validFrom={sellableConfirmFormData.valid}
        validTo={sellableConfirmFormData.validTo}
        minimumQuantity={sellableConfirmFormData.cap}
        onConfirm={handleConfirmSelectStockTour}
        stocks={sellableConfirmFormData.stocks}
      />
      <StockExtraListSelector
        isOpen={openStockExtraModal}
        onClose={() => setOpenStockExtraModal(false)}
        inventoryTypeList={inventoryTypeList}
        validFrom={sellableConfirmFormData.valid}
        validTo={sellableConfirmFormData.validTo}
        onConfirm={onConfirmExtraStock}
        extraStocks={sellableConfirmFormData.extraStocks}
      />

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
export default DrawerSellableApproval;
