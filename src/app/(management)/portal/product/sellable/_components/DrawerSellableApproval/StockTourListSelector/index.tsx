import React, { useState, useEffect } from "react";
import { Empty, Space, Tag, Divider, Button, Modal } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EyeOutlined, InfoCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useGetStockInventoryListCoreQuery } from "@/queries/core/stockInventory";
import { miniStockColumns } from "./miniStockColumns";
import { formatDate } from "@/utils/date";
import ModalContent from "@/components/admin/ModalContent";
import ContentDetail from "@/components/admin/ContentDetail";

import { Status } from "@/models/common.interface";
import { IInventory } from "@/models/management/core/inventory.interface";
import { IStock, StockQueryParams } from "@/models/management/core/stock.interface";
import dayjs from "dayjs";
import useMessage from "@/hooks/useMessage";
import { EProductType } from "@/models/management/core/productType.interface";
import { EInventoryType } from "@/models/management/core/inventoryType.interface";
import { isUndefined } from "lodash";

type StockItem = {
  stock: IStock;
  qty: number;
};
export type StockTourListSelectorProps = {
  inventories?: IInventory[];
  inventoryTypeList: EInventoryType[];
  isOpen?: boolean;
  onClose?: () => void;
  validFrom?: string;
  validTo?: string;
  stocks?: StockItem[];
  minimumQuantity: number;
  onConfirm?: (stockList: Partial<IStock>[]) => void;
};

function StockTourListSelector({
  inventories,
  inventoryTypeList,
  isOpen = false,
  onClose,
  onConfirm,
  stocks,
  minimumQuantity = 0,
  validTo,
  validFrom,
  ...restProps
}: StockTourListSelectorProps) {
  const [selectedStockList, setSelectedStockList] = useState<Partial<IStock>[]>([]);
  const [showModalDetail, setShowModalDetail] = useState<{
    isShow: boolean;
    record?: IStock;
  }>({ isShow: false, record: undefined });

  const message = useMessage();
  const [stockQueryparams, setStockQueryParams] = useState(
    () =>
      new StockQueryParams(
        {
          valid: validFrom,
          validTo: validTo,
          status: Status.OK,
          productType: [EProductType.TOUR],
          inventoryType: inventoryTypeList,
        },
        1,
        5,
      ),
  );

  const { data: stockResponse, isLoading: isLoadingStock } = useGetStockInventoryListCoreQuery({
    queryparams: stockQueryparams,
    enabled:
      isOpen &&
      !isUndefined(stockQueryparams.requestObject?.valid) &&
      !isUndefined(stockQueryparams.requestObject?.validTo),
  });
  const { list: stockList, pageCurrent, pageSize, totalItems } = stockResponse || {};

  const onAddStock = (record: IStock) => {
    if (record.open <= 0 || record.open < minimumQuantity) {
      message.error("Số lượng của dịch vụ không đủ.");
      return;
    }

    setSelectedStockList((oldData) => {
      return [...oldData, record];
    });
  };
  const onRemoveStock = (recordId: number | undefined) => {
    setSelectedStockList((stockList) => {
      const indx = stockList.findIndex((item) => item.recId === recordId);

      if (indx !== -1) {
        stockList.splice(indx, 1);
      }

      return [...stockList];
    });
  };

  const onViewStock = (record: IStock) => {
    setShowModalDetail({ isShow: true, record: record });
  };
  const isSelecting = (record: IStock) => {
    return selectedStockList?.find((item) => item.recId === record.recId);
  };

  const mergeColumns: ColumnsType<IStock> = [
    ...miniStockColumns,
    {
      title: "Số lượng",
      dataIndex: "open",
      key: "open",
      width: 150,
      render: (_, record) => {
        let quantity = Number(record.open);

        return (
          <Tag color={quantity < minimumQuantity ? "red" : "green"} bordered={false}>
            {isSelecting(record) ? quantity - minimumQuantity : quantity}
          </Tag>
        );
      },
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      width: 100,
      fixed: "right",
      render: (_, record) => {
        return (
          <>
            <Button
              icon={<EyeOutlined style={{ color: "#0078ce" }} />}
              size="small"
              type="text"
              onClick={() => onViewStock(record)}
              shape="circle"
            ></Button>
            {isSelecting(record) ? (
              <Button
                icon={<DeleteOutlined />}
                size="small"
                danger
                type="text"
                onClick={() => onRemoveStock(record.recId)}
                shape="circle"
              ></Button>
            ) : (
              <Button
                icon={<PlusCircleOutlined style={{ color: "green" }} />}
                size="small"
                type="text"
                onClick={() => onAddStock(record)}
                shape="circle"
              ></Button>
            )}
          </>
        );
      },
    },
  ];

  const onConfirmSelection = () => {
    onConfirm?.(selectedStockList);
  };
  const onCancelSelection = () => {
    setSelectedStockList(() => {
      return stocks?.map((item) => item.stock) || [];
    });
    onClose?.();
  };
  useEffect(() => {
    setStockQueryParams((prev) => ({
      ...prev,
      requestObject: {
        ...prev.requestObject,
        valid: validFrom,
        validTo: validTo,
      },
    }));
  }, [validFrom, validTo]);
  useEffect(() => {
    setSelectedStockList(() => {
      return stocks?.map((item) => item.stock) || [];
    });
  }, [stocks]);
  return (
    <React.Fragment>
      <Modal
        open={isOpen}
        destroyOnClose={true}
        width={850}
        onCancel={onCancelSelection}
        cancelText="Huỷ bỏ"
        okText="Xác nhận"
        onOk={onConfirmSelection}
      >
        <div className="modal-head">
          <h3 className="text-center font-semibold text-lg mb-6">Dịch vụ bao gồm tour có stock</h3>
        </div>
        <div className="w-full p-4 rounded-md bg-red-50 mb-3">
          <div className="text-red-600">
            <InfoCircleOutlined /> Điều kiện lựa chọn dịch vụ có stock
          </div>
          <div>
            Ngày mở bán của dịch vụ có stock từ
            <span className="font-semibold mx-1">
              {validFrom ? dayjs(validFrom).locale("en").format("DD/MM/YYYY HH:mm") : "--"}
            </span>
            đến
            <span className="font-semibold mx-1">
              {validTo ? dayjs(validTo).locale("en").format("DD/MM/YYYY HH:mm") : "--"}
            </span>
            và có số lượng tối thiểu là <span className="font-semibold">{minimumQuantity}</span>
          </div>
        </div>
        <h3 className="font-semibold mb-3">Danh sách dịch vụ đang chọn</h3>
        <div className="list-select py-2">
          {!selectedStockList.length ? (
            <Empty description="" imageStyle={{ width: 60, height: 60, margin: "auto" }} />
          ) : (
            <Space wrap className="mb-2">
              {selectedStockList.map((item) => (
                <Tag key={item.recId} color="blue" onClose={() => onRemoveStock(item.recId)} closable>
                  {`#${item.recId} - ${item.code}  `}
                </Tag>
              ))}
            </Space>
          )}
        </div>
        <Divider />
        <Table
          columns={mergeColumns}
          size="small"
          dataSource={stockList || []}
          loading={isLoadingStock}
          rowKey={"recId"}
          locale={{
            emptyText: (
              <div className="py-4">
                <span>Không có dịch vụ nào khả dụng.</span>
              </div>
            ),
          }}
          pagination={{
            hideOnSinglePage: true,
            current: pageCurrent || 1,
            pageSize: pageSize,
            total: totalItems,
            size: "small",
            onChange: (page) =>
              setStockQueryParams((prev) => ({
                ...prev,
                pageCurrent: page,
              })),
          }}
          {...restProps}
        />
        <ModalContent
          title={`Chi tiết Dịch vụ`}
          descriptions={
            showModalDetail.record ? (
              <ContentDetail
                contents={[
                  {
                    label: "#ID",
                    value: showModalDetail.record.recId.toString(),
                  },
                  {
                    label: "Code",
                    value: showModalDetail.record.code,
                  },
                  {
                    label: "Loại Inventory",
                    value: showModalDetail.record.inventoryType,
                  },
                  {
                    label: "Loại stock",
                    value: showModalDetail.record.type,
                  },
                  {
                    label: "Mô tả",
                    value: showModalDetail.record.description,
                  },
                  {
                    label: "Khả dụng",
                    value: showModalDetail.record.available.toString(),
                  },
                  {
                    label: "Đã sử dụng",
                    value: showModalDetail.record.used.toString(),
                  },
                  {
                    label: "Ngày mở bán",
                    value: formatDate(showModalDetail.record.validFrom),
                  },
                  {
                    label: "Ngày kết thúc mở bán",
                    value: formatDate(showModalDetail.record.validTo),
                  },
                  {
                    label: "Ngày sử dụng",
                    value: formatDate(showModalDetail.record.startDate),
                  },
                  {
                    label: "Ngày hết hạn sử dụng",
                    value: formatDate(showModalDetail.record.endDate),
                  },
                ]}
              />
            ) : null
          }
          isShowModal={showModalDetail.isShow}
          onClose={() => setShowModalDetail({ isShow: false, record: undefined })}
        />
      </Modal>
    </React.Fragment>
  );
}
export default StockTourListSelector;
