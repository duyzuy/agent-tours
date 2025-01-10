import React, { useState, useEffect, useMemo } from "react";
import { Empty, Tag, Divider, Button, Modal, Space } from "antd";
import {
  PlusCircleOutlined,
  DeleteOutlined,
  EyeOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import Table, { ColumnsType, TableProps } from "antd/es/table";
import { IStock } from "@/models/management/core/stock.interface";
import { useGetStockInventoryListCoreQuery } from "@/queries/core/stockInventory";
import ModalContent from "@/components/admin/ModalContent";
import ContentDetail from "@/components/admin/ContentDetail";
import { formatDate } from "@/utils/date";
import { StockQueryParams } from "@/models/management/core/stock.interface";
import { Status } from "@/models/common.interface";
import { EInventoryType } from "@/models/management/core/inventoryType.interface";
import { EProductType } from "@/models/management/core/productType.interface";
import dayjs from "dayjs";
import { isUndefined } from "lodash";

type StockExtraItemType = {
  stock: IStock;
  qty: number;
};
export type StockExtraListSelectorProps = TableProps<IStock> & {
  inventoryTypeList: EInventoryType[];
  validFrom?: string;
  validTo?: string;
  extraStocks?: StockExtraItemType[];
  isLoading?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  onConfirm?: (data: IStock[]) => void;
};

function StockExtraListSelector(props: StockExtraListSelectorProps) {
  const {
    validFrom,
    validTo,
    isLoading,
    onConfirm,
    onClose,
    columns,
    extraStocks,
    inventoryTypeList,
    isOpen,
    ...restProps
  } = props;

  const [stockQueryParams, setStockQueryParams] = useState(
    () =>
      new StockQueryParams(
        { status: Status.OK, inventoryType: inventoryTypeList, productType: [EProductType.EXTRA] },
        1,
        5,
      ),
  );
  const [showModalDetail, setShowModalDetail] = useState<{
    isShow: boolean;
    record?: IStock;
  }>({ isShow: false, record: undefined });

  const { data: stockResponse, isLoading: isLoadingStock } = useGetStockInventoryListCoreQuery({
    queryparams: stockQueryParams,
    enabled:
      isOpen &&
      !isUndefined(stockQueryParams.requestObject?.validTo) &&
      !isUndefined(stockQueryParams.requestObject?.valid),
  });
  const { pageCurrent, pageSize, totalItems } = stockResponse || {};

  const isSelectedStock = (stock: IStock) => {
    return Boolean(extraStocks?.find((item) => item.stock.recId === stock.recId));
  };

  const stockSelectionList = useMemo(() => {
    return stockResponse?.list;
  }, [stockResponse]);

  const [currentSelectingStockList, setCurrentSelectingStockList] = useState<IStock[]>([]);

  const onViewStock = (record: IStock) => {
    setShowModalDetail({ isShow: true, record: record });
  };

  const onAddStock = (stock: IStock) => {
    setCurrentSelectingStockList((oldData) => [...oldData, stock]);
  };
  const onRemoveStock = (recId: number) => {
    setCurrentSelectingStockList((oldData) => {
      let updateStock = [...oldData];

      const indexItem = updateStock.findIndex((item) => item.recId === recId);

      if (indexItem !== -1) {
        updateStock.splice(indexItem, 1);
      }
      return [...updateStock];
    });
  };
  const handleConfirmSelection = () => {
    currentSelectingStockList.length && onConfirm?.(currentSelectingStockList),
      setCurrentSelectingStockList([]),
      onClose?.();
  };

  const isSelectingStock = (record: IStock) => {
    return Boolean(currentSelectingStockList?.find((item) => item.recId === record.recId));
  };

  const mergeColumns: ColumnsType<IStock> = [
    {
      title: "#ID",
      dataIndex: "recId",
      width: 80,
      render: (_, record) => {
        return record.recId;
      },
    },
    {
      title: "Tên",
      dataIndex: "code",
      width: 250,
      render: (_, record) => {
        return (
          <>
            <p>{record.code}</p>
            <p className="text-xs text-gray-500">{record.description}</p>
          </>
        );
      },
    },
    {
      title: "Ngày sử dụng",
      dataIndex: "used-date",
      key: "used-date",
      width: 250,
      render: (_, { startDate, endDate }) => {
        return (
          <>
            <div>
              <span className="w-8 inline-block text-blue-600">Từ</span> {formatDate(startDate)}
            </div>
            <div>
              <span className="w-8 inline-block text-cyan-600">Đến</span> {formatDate(endDate)}
            </div>
          </>
        );
      },
    },
    {
      title: "Số lượng",
      dataIndex: "open",
      key: "open",
      width: 150,
      render: (_, record) => {
        let color = "green";
        if (record.open <= 0) {
          color = "red";
        }

        return (
          <Tag bordered={false} color={color}>
            {record.open}
          </Tag>
        );
      },
    },
    {
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
              title="Xem chi tiết"
              onClick={() => onViewStock(record)}
              shape="circle"
            ></Button>
            {isSelectedStock(record) ? (
              <Button
                size="small"
                icon={<CheckCircleOutlined />}
                type="text"
                shape="circle"
                className="!text-emerald-600"
              />
            ) : (
              <>
                {isSelectingStock(record) ? (
                  <Button
                    icon={<DeleteOutlined />}
                    size="small"
                    danger
                    title="Xoá"
                    type="text"
                    onClick={() => onRemoveStock(record.recId)}
                    shape="circle"
                  ></Button>
                ) : (
                  <Button
                    icon={<PlusCircleOutlined style={{ color: "green" }} />}
                    size="small"
                    type="text"
                    title="Thêm"
                    onClick={() => onAddStock(record)}
                    shape="circle"
                    className="text-red-500"
                  ></Button>
                )}
              </>
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
      <Modal
        open={isOpen}
        destroyOnClose={true}
        width={850}
        onCancel={onClose}
        cancelText="Huỷ bỏ"
        okText="Xác nhận"
        onOk={handleConfirmSelection}
      >
        <div className="modal-head">
          <h3 className="text-center font-semibold text-lg mb-6">Dịch vụ bổ sung có stock</h3>
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
            và có số lượng tối thiểu là <span className="font-semibold">{1}</span>
          </div>
        </div>
        <h3 className="font-semibold mb-3">Danh sách dịch vụ đang chọn</h3>
        <div className="list-select py-2">
          {!currentSelectingStockList.length ? (
            <Empty description="" imageStyle={{ width: 60, height: 60, margin: "auto" }} />
          ) : (
            <Space wrap className="mb-2">
              {currentSelectingStockList.map((item) => (
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
          rowKey="recId"
          dataSource={stockSelectionList}
          loading={isLoadingStock}
          size="small"
          locale={{
            emptyText: (
              <div className="py-4">
                <span>Không có dịch vụ nào khả dụng.</span>
              </div>
            ),
          }}
          pagination={{
            hideOnSinglePage: true,
            current: pageCurrent,
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
      </Modal>
      <ModalContent
        isShowModal={showModalDetail.isShow}
        onClose={() => setShowModalDetail({ isShow: false, record: undefined })}
        title={`Chi tiết Stock`}
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
      />
    </React.Fragment>
  );
}
export default StockExtraListSelector;
