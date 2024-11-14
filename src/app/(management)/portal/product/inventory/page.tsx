"use client";
import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Select, SelectProps, Row, Col, Radio, Space, Divider } from "antd";
import FormItem from "@/components/base/FormItem";
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
import ModalProductTypeSelector from "./_components/ModalProductTypeSelector";

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
  10,
);

const InventoryPage = () => {
  const router = useRouter();

  const [isOpenDrawler, setOpenDrawler] = useState(false);
  const [productType, setProductType] = useState<EProductType>();
  const [queryParams, setQueryParams] = useState(initQueryParams);
  const [openModalProductType, setOpenModalProductType] = useState(false);
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

  const setCreateInventory = (productType: EProductType) => {
    setOpenDrawler(true);
    setProductType(productType);
    setOpenModalProductType(false);
  };
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
    console.log(productType);
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
      onClick={() => setOpenModalProductType(true)}
    >
      <div className="mb-6">
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
      </div>
      <div className="mb-3 max-w-[420px]">
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
      </div>

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
      <ModalProductTypeSelector open={openModalProductType} onSelect={setCreateInventory} />
      <DrawerInventoryForm
        isOpen={isOpenDrawler}
        productType={productType}
        onCancel={onCancelDrawler}
        actionType={"CREATE"}
        onSubmit={handleCreateInventory}
      />
    </PageContainer>
  );
};
export default InventoryPage;
