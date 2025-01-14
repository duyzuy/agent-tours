import { Status } from "@/models/common.interface";
import { TabsProps, Form, Col, Row, Select, Tabs } from "antd";
import FormItem from "@/components/base/FormItem";
import CustomRangePicker from "@/components/admin/CustomRangePicker";
import { FilterOutlined, PlusOutlined } from "@ant-design/icons";
import { IInventoryDetail } from "@/models/management/core/inventory.interface";
import StockListContainer from "../../../stock/_components/StockListContainer";
import { useState } from "react";
import { StockQueryParams } from "@/models/management/core/stock.interface";
import { useGetStockInventoryListCoreQuery } from "@/queries/core/stockInventory";
import { RangePickerProps } from "antd/es/date-picker";
import useCRUDStockInventory from "../../../stock/modules/useCRUDStockInventory";
import dayjs from "dayjs";
import StockFormContainer from "../../../stock/_components/StockFormContainer";

const InventoryDetailContainer: React.FC<{ data: IInventoryDetail }> = ({ data }) => {
  const [stockQueryParams, setStockFilterFormdata] = useState(new StockQueryParams(undefined, 1, 10));

  const { data: stockResponse, isLoading: isLoadingStockList } = useGetStockInventoryListCoreQuery({
    queryparams: {
      ...stockQueryParams,
      requestObject: {
        ...stockQueryParams.requestObject,
        inventoryId: data.recId,
      },
    },
    enabled: data.isStock,
  });
  const { list: stockList, pageSize, pageCurrent, totalItems } = stockResponse || {};

  const { onCreate, onConfirm, onAdjustQuantity } = useCRUDStockInventory();

  const onChangeStatus = (value: string) => {
    if (value === "All") {
      setStockFilterFormdata((prev) => ({
        ...prev,
        status: undefined,
      }));
    } else {
      setStockFilterFormdata((prev) => ({
        ...prev,
        status: value as Status,
      }));
    }
  };
  const onChangeValidDate: RangePickerProps["onChange"] = (dates) => {
    setStockFilterFormdata((prev) => ({
      ...prev,
      requestObject: {
        ...prev.requestObject,

        valid: (dates && dates[0]?.toISOString()) || undefined,
        validTo: (dates && dates[1]?.toISOString()) || undefined,
      },
    }));
  };
  const onChangeUsedDate: RangePickerProps["onChange"] = (dates) => {
    setStockFilterFormdata((prev) => ({
      ...prev,
      requestObject: {
        ...prev.requestObject,
        start: (dates && dates[0]?.toISOString()) || undefined,
        end: (dates && dates[1]?.toISOString()) || undefined,
      },
    }));
  };

  const tabItems: TabsProps["items"] = [
    {
      key: "stockList",
      label: "Danh sách dịch vụ",
      children: (
        <StockListContainer
          items={stockList || []}
          pageSize={pageSize || 10}
          pageCurrent={pageCurrent || 1}
          totalItems={totalItems || 0}
          isLoading={isLoadingStockList}
          onConfirm={onConfirm}
          onAdjustQuantity={onAdjustQuantity}
          onChangeStockPage={(page) =>
            setStockFilterFormdata((prev) => ({
              ...prev,
              pageCurrent: page,
            }))
          }
          render={() => {
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
                          onChange={(value) => onChangeStatus(value)}
                        />
                      </FormItem>
                    </Col>
                    <Col span={6}>
                      <FormItem>
                        <CustomRangePicker
                          placeholder={["Ngày bán bắt đầu", "Ngày bán kết thúc"]}
                          format={"DD/MM/YYYY"}
                          value={[
                            stockQueryParams?.requestObject?.valid
                              ? dayjs(stockQueryParams?.requestObject?.valid)
                              : null,
                            stockQueryParams?.requestObject?.validTo
                              ? dayjs(stockQueryParams?.requestObject?.validTo)
                              : null,
                          ]}
                          onChange={onChangeValidDate}
                          className="w-full"
                        />
                      </FormItem>
                    </Col>
                    <Col span={6}>
                      <FormItem>
                        <CustomRangePicker
                          placeholder={["Bắt đầu ngày sử dụng", "Kết thúc ngày sử dụng"]}
                          format={"DD/MM/YYYY"}
                          value={[
                            stockQueryParams?.requestObject?.start
                              ? dayjs(stockQueryParams?.requestObject?.start)
                              : null,
                            stockQueryParams?.requestObject?.end ? dayjs(stockQueryParams?.requestObject?.end) : null,
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
          }}
        />
      ),
    },
    {
      key: "createStock",
      label: "Tạo dịch vụ",
      children: (
        <StockFormContainer
          inventoryId={data.recId}
          inventoryType={data.type}
          onSubmit={onCreate}
          onCancel={() => {}}
        />
      ),
      icon: <PlusOutlined />,
    },
  ];

  return <Tabs type="card" defaultActiveKey="stockList" items={tabItems} />;
};
export default InventoryDetailContainer;
