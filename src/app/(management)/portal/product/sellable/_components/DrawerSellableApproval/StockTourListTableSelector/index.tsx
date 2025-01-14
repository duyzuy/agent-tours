import React, { useState, useEffect, useMemo } from "react";
import { Empty, Space, Tag, Button } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import {
  DeleteOutlined,
  EyeOutlined,
  InfoCircleOutlined,
  PlusCircleOutlined,
  SwapRightOutlined,
} from "@ant-design/icons";
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

type StockItem = { stock: IStock; qty: number };

export type StockTourListTableSelectorProps = {
  inventories?: IInventory[];
  inventoryTypeList: EInventoryType[];
  validFrom?: string;
  validTo?: string;
  stocks?: StockItem[];
  minimumQuantity: number;
  onAdd: (stock: IStock) => void;
  onRemove: (stockId: number) => void;
};

function StockTourListTableSelector({
  inventories,
  inventoryTypeList,
  onAdd,
  onRemove,
  stocks,
  minimumQuantity = 0,
  validTo,
  validFrom,
  ...restProps
}: StockTourListTableSelectorProps) {
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
        10,
      ),
  );

  const { data: stockResponse, isLoading: isLoadingStock } = useGetStockInventoryListCoreQuery({
    queryparams: stockQueryparams,
    enabled:
      !isUndefined(stockQueryparams.requestObject?.valid) && !isUndefined(stockQueryparams.requestObject?.validTo),
  });
  const { list: stockList, pageCurrent, pageSize, totalItems } = stockResponse || {};

  const stockSelectedList = useMemo(() => {
    return stocks?.map((item) => item.stock) || [];
  }, [stocks]);

  const onViewStock = (record: IStock) => {
    setShowModalDetail({ isShow: true, record: record });
  };
  const isSelecting = (record: IStock) => {
    return stockSelectedList?.find((item) => item.recId === record.recId);
  };

  const handleAddStock = (record: IStock) => {
    if (record.open <= 0 || record.open < minimumQuantity) {
      message.error("Số lượng của dịch vụ không đủ.");
      return;
    }
    onAdd(record);
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
                onClick={() => onRemove(record.recId)}
                shape="circle"
              ></Button>
            ) : (
              <Button
                icon={<PlusCircleOutlined style={{ color: "green" }} />}
                size="small"
                type="text"
                onClick={() => handleAddStock(record)}
                shape="circle"
              ></Button>
            )}
          </>
        );
      },
    },
  ];

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

  return (
    <React.Fragment>
      <div className="list-select py-2">
        {!stockSelectedList.length ? (
          <Empty description="Đang trống" imageStyle={{ width: 60, height: 60, margin: "auto" }} />
        ) : (
          <Space wrap className="mb-2">
            {stockSelectedList.map((item) => (
              <Tag key={item.recId} color="blue" onClose={() => item.recId && onRemove(item.recId)} closable>
                {`#${item.recId} - ${item.code}  `}
              </Tag>
            ))}
          </Space>
        )}
      </div>
      <div className="w-full p-4 rounded-md bg-red-50 mb-3">
        <div className="text-red-600 mb-3">
          <InfoCircleOutlined /> Lưu ý
        </div>
        <ul className="pl-4 list-disc">
          <li>
            Ngày đóng/mở bán của dịch vụ phải bao trùm
            <span className="font-semibold mx-1">
              {validFrom ? dayjs(validFrom).locale("en").format("DD/MM/YYYY HH:mm") : "--"}
            </span>
            <SwapRightOutlined />
            <span className="font-semibold mx-1">
              {validTo ? dayjs(validTo).locale("en").format("DD/MM/YYYY HH:mm") : "--"}
            </span>
          </li>
          <li>
            Số lượng tối thiểu là <span className="font-semibold">{minimumQuantity}</span>
          </li>
        </ul>
      </div>

      <Table
        columns={mergeColumns}
        size="small"
        rowKey={"recId"}
        dataSource={stockList || []}
        loading={isLoadingStock}
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
    </React.Fragment>
  );
}
export default StockTourListTableSelector;
