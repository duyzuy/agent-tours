"use client";
import { useState } from "react";
import { isUndefined } from "lodash";
import { Tabs, TabsProps, Form, Row, Col, Select } from "antd";
import { FilterOutlined, PlusOutlined } from "@ant-design/icons";
import { RangePickerProps } from "antd/es/date-picker";
import FormItem from "@/components/base/FormItem";
import { useGetInventoryListCoreQuery } from "@/queries/core/inventory";
import { useGetStockInventoryListCoreQuery } from "@/queries/core/stockInventory";
import useCRUDStockInventory from "./modules/useCRUDStockInventory";
import StockFormContainer from "./_components/StockFormContainer";
import StockListContainer, { StockListContainerProps } from "./_components/StockListContainer";
import { StockQueryParams } from "@/models/management/core/stock.interface";
import { Status } from "@/models/common.interface";
import { InventoryQueryParams } from "@/models/management/core/inventory.interface";
import CustomRangePicker from "@/components/admin/CustomRangePicker";
import PageContainer from "@/components/admin/PageContainer";
import dayjs from "dayjs";

type StockTabKeys = "stockList" | "createStock";
const StockPage = () => {
  const initInventoryQueryparams = new InventoryQueryParams(
    {
      isStock: true,
      status: Status.OK,
    },
    undefined,
    undefined,
  );
  const [stockTabKey, setStockTabKey] = useState<StockTabKeys>("stockList");
  const { data: inventoryResponse } = useGetInventoryListCoreQuery({
    queryParams: initInventoryQueryparams,
    enabled: true,
  });
  const { list: inventoryList } = inventoryResponse || {};
  const [stockQueryParams, setStockQueryParams] = useState(new StockQueryParams(undefined, 1, 10));

  const { data: stockResponse, isLoading: isLoadingStockList } = useGetStockInventoryListCoreQuery({
    queryparams: stockQueryParams,
    enabled: !isUndefined(stockQueryParams.requestObject?.inventoryId),
  });
  const { list: stockList, pageSize, pageCurrent, totalItems } = stockResponse || {};
  const { onCreate, onConfirm, loading } = useCRUDStockInventory();

  const onChangeValidDate: RangePickerProps["onChange"] = (dates) => {
    setStockQueryParams((prev) => ({
      ...prev,
      requestObject: {
        ...prev.requestObject,
        valid: dates ? dates[0]?.toISOString() : undefined,
        validTo: dates ? dates[1]?.toISOString() : undefined,
      },
    }));
  };
  const onChangeUsedDate: RangePickerProps["onChange"] = (dates) => {
    setStockQueryParams((prev) => ({
      ...prev,
      requestObject: {
        ...prev.requestObject,
        start: dates && dates[0] ? dates[0]?.toISOString() : undefined,
        end: dates && dates[1] ? dates[1]?.toISOString() : undefined,
      },
    }));
  };
  const onChangePage: StockListContainerProps["onChangeStockPage"] = (page, pageSize) => {
    setStockQueryParams((prev) => ({
      ...prev,
      pageCurrent: page,
      pageSize: pageSize,
    }));
  };
  const onCancel = () => {
    setStockTabKey("stockList");
  };

  const renderSearchStockList = () => {
    return (
      <div className="stock-list-filter pt-3">
        <Form layout="vertical">
          <Row gutter={12}>
            <Col>
              <FormItem>
                <FilterOutlined /> Lọc
              </FormItem>
            </Col>
            <Col span={4}>
              <FormItem>
                <Select
                  placeholder="Chọn loại dịch vụ"
                  value={stockQueryParams?.requestObject?.inventoryId}
                  fieldNames={{
                    value: "recId",
                    label: "name",
                  }}
                  options={inventoryList}
                  onChange={(value) =>
                    setStockQueryParams((prev) => ({
                      ...prev,
                      requestObject: {
                        ...prev.requestObject,
                        inventoryId: value,
                      },
                    }))
                  }
                />
              </FormItem>
            </Col>
            <Col span={4}>
              <FormItem>
                <Select
                  value={stockQueryParams?.requestObject?.status ?? "All"}
                  options={[
                    {
                      label: "Tất cả trạng thái",
                      value: "All",
                    },
                    {
                      label: "Đã duyệt",
                      value: Status.OK,
                    },
                    {
                      label: "Chờ duyệt",
                      value: Status.QQ,
                    },
                  ]}
                  onChange={(value) =>
                    setStockQueryParams((prev) => ({
                      ...prev,
                      requestObject: {
                        ...prev.requestObject,
                        status: value === "All" ? undefined : (value as Status),
                      },
                    }))
                  }
                />
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem>
                <CustomRangePicker
                  placeholder={["Mở bán từ", "Mở bán đến"]}
                  format={"DD/MM/YYYY"}
                  value={[
                    stockQueryParams?.requestObject?.valid ? dayjs(stockQueryParams.requestObject.valid) : null,
                    stockQueryParams?.requestObject?.validTo ? dayjs(stockQueryParams.requestObject.validTo) : null,
                  ]}
                  onChange={onChangeValidDate}
                  className="w-full"
                />
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem>
                <CustomRangePicker
                  placeholder={["Sử dụng từ", "Sử dụng đến"]}
                  format={"DD/MM/YYYY"}
                  value={[
                    stockQueryParams?.requestObject?.start ? dayjs(stockQueryParams.requestObject.start) : null,
                    stockQueryParams?.requestObject?.end ? dayjs(stockQueryParams.requestObject.end) : null,
                  ]}
                  onChange={onChangeUsedDate}
                  className="w-full"
                />
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    );
  };
  const tabItems: TabsProps["items"] = [
    {
      key: "stockList",
      label: "Danh sách kho dịch vụ",
      children: (
        <StockListContainer
          items={stockList || []}
          pageSize={pageSize || 10}
          pageCurrent={pageCurrent || 1}
          totalItems={totalItems || 0}
          isLoading={isLoadingStockList}
          onConfirm={onConfirm}
          onChangeStockPage={onChangePage}
          render={renderSearchStockList}
        />
      ),
    },
    {
      key: "createStock",
      label: "Tạo kho dịch vụ",
      children: <StockFormContainer onSubmit={onCreate} onCancel={onCancel} loading={loading} />,
      icon: <PlusOutlined />,
    },
  ];

  return (
    <PageContainer
      name={"Kho dịch vụ"}
      modelName="Kho dịch vụ"
      breadCrumItems={[{ title: "Kho dịch vụ" }]}
      hideAddButton
    >
      <Tabs
        activeKey={stockTabKey}
        items={tabItems}
        destroyInactiveTabPane={true}
        onChange={(tab) => setStockTabKey(tab as StockTabKeys)}
      />
    </PageContainer>
  );
};
export default StockPage;
