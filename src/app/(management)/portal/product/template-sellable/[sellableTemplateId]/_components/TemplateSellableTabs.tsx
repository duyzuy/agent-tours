import { Col, Form, Input, Row, Tabs, TabsProps } from "antd";
import SellableListContainer from "../../../sellable/_components/SellableListContainer";
import { useGetSellableListCoreQuery } from "@/queries/core/Sellable";
import SellableFormContainer from "../../../sellable/_components/SellableFormContainer";
import { SellableQueryParams } from "@/models/management/core/sellable.interface";
import { useState } from "react";
import FormItem from "@/components/base/FormItem";
import { PlusOutlined } from "@ant-design/icons";
import useCRUDSellable from "../../../sellable/modules/useCRUDSellable";
import { ITemplateSellableDetail } from "@/models/management/core/templateSellable.interface";

export interface TempalateSellableTabsProps {
  templateId: number;
  data: ITemplateSellableDetail;
}
const TempalateSellableTabs: React.FC<TempalateSellableTabsProps> = ({ templateId, data }) => {
  const { onCreate } = useCRUDSellable();

  const [sellableQueryParams, setSellableQueryParams] = useState(
    new SellableQueryParams({ sellableTemplateId: templateId }, 1, 20),
  );

  const { data: sellableResponse, isLoading: isLoadingSellable } = useGetSellableListCoreQuery({
    queryParams: sellableQueryParams,
    enabled: true,
  });

  const { list: sellableList, pageCurrent, pageSize, totalItems } = sellableResponse || {};

  const onSearchSellableCode = (code: string) => {
    setSellableQueryParams((prev) => ({
      ...prev,
      requestObject: { ...prev.requestObject, andCodeLike: code },
    }));
  };

  const onCancelCreate = () => {};
  const tabItems: TabsProps["items"] = [
    {
      key: "sellableList",
      label: "Danh sách sản phẩm",
      children: (
        <div className="pt-3">
          <h3 className="font-semibold text-lg">Danh sách sản phẩm</h3>
          <SellableListContainer
            templateSellable={data}
            dataSource={sellableList}
            pageSize={pageSize}
            pageCurrent={pageCurrent}
            totalItems={totalItems}
            isLoading={isLoadingSellable}
            onChangePageSellable={(page) =>
              setSellableQueryParams((prev) => ({
                ...prev,
                pageCurrent: page,
              }))
            }
            render={() => (
              <Form layout="horizontal">
                <Row gutter={12}>
                  <Col span={8} offset={16}>
                    <Input.Search
                      size="large"
                      placeholder="Nhập mã sản phẩm cần tìm"
                      enterButton="Tìm kiếm"
                      onSearch={(value, ev) => onSearchSellableCode(value)}
                    />
                  </Col>
                </Row>
              </Form>
            )}
          />
        </div>
      ),
    },
    {
      key: "sellableForm",
      label: "Thêm sản phẩm",
      children: (
        <div className="pt-3">
          <h3 className="font-semibold text-lg mb-3">Thêm sản phẩm</h3>
          <SellableFormContainer template={data} onSubmit={onCreate} onCancel={onCancelCreate} />
        </div>
      ),
      icon: <PlusOutlined />,
    },
  ];

  return <Tabs type="card" items={tabItems} />;
};
export default TempalateSellableTabs;
