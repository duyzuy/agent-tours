"use client";
import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Select, SelectProps, Row, Col, Radio, Space, Divider } from "antd";
import PageContainer from "@/components/admin/PageContainer";
import { IInventoryListRs, InventoryQueryParams } from "@/models/management/core/inventory.interface";
import { useGetInventoryListCoreQuery } from "@/queries/core/inventory";
import TableListPage from "@/components/admin/TableListPage";
import { inventoryColumns } from "./columns";
import DrawerInventoryForm, { DrawerInventoryFormProps } from "./_components/DrawerInventoryForm";
import useCRUDInventory from "./modules/useCRUDInventory";
import { isUndefined } from "lodash";
import { useGetInventoryTypeListCoreQuery } from "@/queries/core/inventoryType";
import { EInventoryType } from "@/models/management/core/inventoryType.interface";
import { EProductType } from "@/models/management/core/productType.interface";

const initQueryParams = new InventoryQueryParams(
  {
    type: [
      EInventoryType.AIR,
      EInventoryType.HOTEL,
      EInventoryType.VISA,
      EInventoryType.TRANSPORT,
      EInventoryType.INSURANCE,
      EInventoryType.LANDPACKAGE,
      EInventoryType.RESTAURANT,
      EInventoryType.GUIDE,
    ],
    productType: [EProductType.TOUR],
  },
  1,
  20,
);

const InventoryPage = () => {
  const router = useRouter();

  const [isOpenDrawler, setOpenDrawler] = useState(false);
  const [queryParams, setQueryParams] = useState(initQueryParams);

  const { data: inventoryResponse, isLoading } = useGetInventoryListCoreQuery({
    queryParams: queryParams,
    enabled: !isUndefined(queryParams.requestObject?.type),
  });
  const { list: inventoryList, pageCurrent, pageSize, totalItems } = inventoryResponse || {};
  const { data: inventoryTypeList, isLoading: isLoadingInventoryType } = useGetInventoryTypeListCoreQuery({
    enabled: true,
  });
  const inventoryTypeOptions = useMemo(() => {
    return inventoryTypeList?.reduce<{ label: string; value: string }[]>((acc, type) => {
      return [...acc, { label: type, value: type }];
    }, []);
  }, [inventoryTypeList]);

  const { onCreateInventory } = useCRUDInventory();

  const onCancelDrawler = useCallback(() => {
    setOpenDrawler(false);
  }, []);

  const handleCreateInventory = useCallback<Required<DrawerInventoryFormProps>["onSubmit"]>((action, formData) => {
    if (action === "CREATE") {
      onCreateInventory(formData, () => {
        setOpenDrawler(false);
      });
    }
  }, []);

  const onChangeInventoryTypeQueryParams: SelectProps<string[], { label: string; value: string }>["onChange"] = (
    types,
  ) => {
    if (types.length === 0) {
      return;
    }

    let sortedTypes = types.sort() as EInventoryType[];

    setQueryParams((prev) => ({
      ...prev,
      requestObject: {
        ...prev.requestObject,
        type: sortedTypes,
      },
    }));
  };

  const onFilterProductType = (productType: EProductType) => {
    setQueryParams((prev) => ({
      ...prev,
      requestObject: {
        ...prev.requestObject,
        productType: [productType],
      },
    }));
  };
  return (
    <PageContainer
      name="Quản lý dịch vụ"
      modelName="dịch vụ"
      breadCrumItems={[{ title: "Quản lý dịch vụ" }]}
      onClick={() => setOpenDrawler(true)}
    >
      <Row gutter={16} align={"middle"}>
        <Col span={12} xl={8}>
          <Select
            value={queryParams?.requestObject?.type}
            mode="tags"
            style={{ width: "100%" }}
            placeholder="Loại kho"
            onChange={onChangeInventoryTypeQueryParams}
            options={inventoryTypeOptions}
            loading={isLoadingInventoryType}
            maxTagCount="responsive"
          />
        </Col>
        <Col>
          <Space>
            <Radio
              value={EProductType.TOUR}
              checked={queryParams.requestObject?.productType?.includes(EProductType.TOUR)}
              onChange={() => onFilterProductType(EProductType.TOUR)}
            >
              Dịch vụ trong tour
            </Radio>
            <Radio
              value={EProductType.EXTRA}
              checked={queryParams.requestObject?.productType?.includes(EProductType.EXTRA)}
              onChange={() => onFilterProductType(EProductType.EXTRA)}
            >
              Dịch vụ trong và ngoài tour
            </Radio>
          </Space>
        </Col>
      </Row>
      <Divider />
      <TableListPage<IInventoryListRs["result"][0]>
        scroll={{ x: 1000 }}
        modelName="Loại dịch vụ"
        columns={inventoryColumns}
        rowKey={"recId"}
        dataSource={inventoryList || []}
        fixedActionsColumn={false}
        showActionsLess={false}
        isLoading={isLoading}
        onView={(record) => router.push(`/portal/product/inventory/${record.recId}`)}
        pagination={{
          hideOnSinglePage: true,
          size: "small",
          total: totalItems,
          pageSize: pageSize,
          current: pageCurrent,
          onChange: (page, pageSize) =>
            setQueryParams((prev) => ({
              ...prev,
              pageCurrent: page,
            })),
        }}
      />
      <DrawerInventoryForm
        isOpen={isOpenDrawler}
        onCancel={onCancelDrawler}
        actionType={"CREATE"}
        onSubmit={handleCreateInventory}
      />
    </PageContainer>
  );
};
export default InventoryPage;
