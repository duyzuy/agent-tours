"use client";
import React, { useState } from "react";
import PageContainer from "@/components/admin/PageContainer";
import {
  ITemplateSaleableListRs,
  TemplateSellableQueryParams,
} from "@/models/management/core/templateSellable.interface";
import useCRUDTemplateSellable from "./modules/useCRUDTemplateSellable";
import TableListPage from "@/components/admin/TableListPage";
import DrawerTemplateSellable, { DrawerTemplateSellableProps, EActionType } from "./_components/DrawerTemplateSellable";
import { templateColums } from "./templateColums";
import { useGetTemplateSellableListCoreQuery } from "@/queries/core/templateSellable";
import { IDestination } from "@/models/management/region.interface";
import { Divider, Space, Tag, Form, Radio, TablePaginationConfig } from "antd";
import FormItem from "@/components/base/FormItem";
import { useGetProductTypeListCoreQuery } from "@/queries/core/productType";
import { FilterValue } from "antd/es/table/interface";
import { Status } from "@/models/common.interface";

const SellTemplatePage = () => {
  const [isOpen, setOpenDrawer] = useState(false);
  const { onCreate, onApproval, onDelete, onUpdate } = useCRUDTemplateSellable();
  const [actionType, setActionType] = useState<EActionType>();
  const [editRecord, setEditRecord] = useState<ITemplateSaleableListRs["result"][0]>();

  const [queryFilter, setQueryFilter] = useState(
    () =>
      new TemplateSellableQueryParams(
        {
          recId: undefined,
          andType: "TOUR",
          andCodeLike: undefined,
          andDestIn: undefined,
          status: undefined,
        },
        1,
        20,
      ),
  );

  const { data: templateResponse, isLoading } = useGetTemplateSellableListCoreQuery({
    queryParams: queryFilter,
    enabled: true,
  });
  const { list: templateList, pageCurrent, pageSize, totalItems } = templateResponse || {};
  const { data: productTypeList, isLoading: isLoadingProductType } = useGetProductTypeListCoreQuery({ enabled: true });

  const handleOpenDrawer = ({ type, record }: { type: EActionType; record?: ITemplateSaleableListRs["result"][0] }) => {
    console.log(type);

    if (type === EActionType.EDIT) {
      setEditRecord(record);
    }
    setActionType(() => type);
    setOpenDrawer(true);
  };
  const onCloseDrawerAndResetFormInit = () => {
    setOpenDrawer(false);
    setEditRecord(undefined);
  };

  const onFilterProductType = (type: string) => {
    setQueryFilter((prev) => ({
      ...prev,
      requestObject: {
        ...prev.requestObject,
        andType: type,
      },
    }));
  };
  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    // sorter: SorterResult<ITemplateSaleableListRs["result"][0]>,
  ) => {
    const { current, pageSize } = pagination;
    if (current && current !== queryFilter.pageCurrent) {
      setQueryFilter((prev) => ({
        ...prev,
        pageCurrent: current,
      }));
    }
  };

  const onSubmitTemplateSellable: DrawerTemplateSellableProps["onSubmit"] = (actionType, payload) => {
    if (actionType === EActionType.CREATE) {
      onCreate(payload, () => {
        onCloseDrawerAndResetFormInit();
      });
    }

    if (actionType === EActionType.EDIT && editRecord) {
      onUpdate(editRecord.recId, payload, () => {
        onCloseDrawerAndResetFormInit();
      });
    }
  };
  return (
    <PageContainer
      name="Nhóm sản phẩm"
      modelName="Nhóm sản phẩm"
      breadCrumItems={[{ title: "Nhóm sản phẩm" }]}
      onClick={() => handleOpenDrawer({ type: EActionType.CREATE })}
    >
      <div className="search-bar">
        <Form>
          {productTypeList && (
            <FormItem label="Loại sản phẩm">
              {productTypeList.map((type) => (
                <Radio
                  key={type}
                  value={type}
                  checked={queryFilter?.requestObject?.andType === type}
                  onChange={() => onFilterProductType(type)}
                >
                  {type}
                </Radio>
              ))}
            </FormItem>
          )}
        </Form>
      </div>
      <Divider />
      <TableListPage<ITemplateSaleableListRs["result"][0]>
        modelName="Template"
        dataSource={templateList || []}
        scroll={{ x: 1600 }}
        rowKey={"recId"}
        isLoading={isLoading}
        columns={templateColums}
        onChange={handleTableChange}
        fixedActionsColumn={false}
        pagination={{
          current: pageCurrent,
          pageSize: pageSize,
          total: totalItems,
        }}
        expandable={{
          expandedRowRender: ({ destListJson }) => {
            const destinationList: IDestination[] = JSON.parse(destListJson);

            return destinationList.map((destination) => (
              <div className="mb-4" key={destination.id}>
                <div className="py-2">
                  <p className="font-bold">{destination.codeName}</p>
                </div>
                <Space wrap>
                  {destination.listStateProvince.map((state) => (
                    <React.Fragment key={state.recId}>
                      {(state.stateProvinceKey && <Tag>{state.stateProvinceKey}</Tag>) ||
                        (state.countryKey && <Tag color="volcano">{state.countryKey}</Tag>) ||
                        (state.subRegionKey && <Tag color="cyan">{state.subRegionKey}</Tag>) ||
                        (state.regionKey && <Tag color="gold">{state.regionKey}</Tag>)}
                    </React.Fragment>
                  ))}
                </Space>
              </div>
            ));
          },
        }}
        onEdit={(record) => handleOpenDrawer({ type: EActionType.EDIT, record })}
        onDelete={(record) => onDelete(record.recId)}
        onApproval={(record) => onApproval(record.recId)}
        hideApproval={(record) => record.status === Status.OK}
      />
      <DrawerTemplateSellable
        onSubmit={onSubmitTemplateSellable}
        initialValues={editRecord}
        isOpen={isOpen}
        onCancel={onCloseDrawerAndResetFormInit}
        actionType={actionType}
        onApproval={(recId) =>
          onApproval(recId, () => {
            onCloseDrawerAndResetFormInit();
          })
        }
      />
    </PageContainer>
  );
};
export default SellTemplatePage;
