"use client";
import React, { useState } from "react";
import { Divider, Form, Radio, TablePaginationConfig } from "antd";

import PageContainer from "@/components/admin/PageContainer";
import {
  ITemplateSaleableListRs,
  TemplateSellableQueryParams,
} from "@/models/management/core/templateSellable.interface";
import useCRUDTemplateSellable from "./modules/useCRUDTemplateSellable";
import TableListPage from "@/components/admin/TableListPage";
import DrawerTemplateSellableForm, { DrawerTemplateSellableFormProps } from "./_components/DrawerTemplateSellableForm";
import { templateColums } from "./templateColums";
import { useGetTemplateSellableListCoreQuery } from "@/queries/core/templateSellable";
import FormItem from "@/components/base/FormItem";
import { useGetProductTypeListCoreQuery } from "@/queries/core/productType";
import { FilterValue } from "antd/es/table/interface";
import { EProductType } from "@/models/management/core/productType.interface";
import { useRouter } from "next/navigation";

const SellTemplatePage = () => {
  const [isOpen, setOpenDrawer] = useState(false);
  const { onCreate, onApproval, onDelete, onUpdate } = useCRUDTemplateSellable();

  const router = useRouter();
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

  const closeDrawerAndResetFormInit = () => {
    setOpenDrawer(false);
  };
  const setCreateTemplateproduct = () => {
    setOpenDrawer(true);
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

  const onSubmitTemplateSellable: DrawerTemplateSellableFormProps["onSubmit"] = (actionType, payload) => {
    if (actionType === "CREATE") {
      onCreate(payload, () => {
        closeDrawerAndResetFormInit();
      });
    }
  };
  return (
    <PageContainer
      name="Sản phẩm"
      modelName="sản phẩm"
      breadCrumItems={[{ title: "Sản phẩm" }]}
      onClick={setCreateTemplateproduct}
    >
      <Form>
        {productTypeList && (
          <FormItem>
            {productTypeList.map((type) => (
              <Radio
                key={type}
                value={type}
                checked={queryFilter?.requestObject?.andType === type}
                onChange={() => onFilterProductType(type)}
              >
                {type === EProductType.TOUR ? "Tour" : type === EProductType.EXTRA ? "Dịch vụ" : type}
              </Radio>
            ))}
          </FormItem>
        )}
      </Form>

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
        // expandable={{
        //   expandedRowRender: ({ destListJson }) => {
        //     return destListJson.map((destination) => (
        //       <div className="mb-4" key={destination.id}>
        //         <div className="py-2">
        //           <p className="font-bold">{destination.codeName}</p>
        //         </div>
        //         <Space wrap>
        //           {destination.listStateProvince.map((state) => (
        //             <React.Fragment key={state.recId}>
        //               {(state.stateProvinceKey && <Tag>{state.stateProvinceKey}</Tag>) ||
        //                 (state.countryKey && <Tag color="volcano">{state.countryKey}</Tag>) ||
        //                 (state.subRegionKey && <Tag color="cyan">{state.subRegionKey}</Tag>) ||
        //                 (state.regionKey && <Tag color="gold">{state.regionKey}</Tag>)}
        //             </React.Fragment>
        //           ))}
        //         </Space>
        //       </div>
        //     ));
        //   },
        // }}
        //onEdit={(record) => handleOpenDrawer({ type: EActionType.EDIT, record })}
        // onView={({ recId }) => router.push(`/portal/product/template-sellable/${recId}`)}
        // onDelete={(record) => onDelete(record.recId)}
        // onApproval={(record) => onApproval(record.recId)}
        // hideApproval={(record) => record.status === Status.OK}
        // showActionsLess={false}
      />
      <DrawerTemplateSellableForm
        onSubmit={onSubmitTemplateSellable}
        isOpen={isOpen}
        onCancel={closeDrawerAndResetFormInit}
        actionType={"CREATE"}
        // onApproval={(recId) =>
        //   onApproval(recId, () => {
        //     closeDrawerAndResetFormInit();
        //   })
        // }
      />
    </PageContainer>
  );
};
export default SellTemplatePage;
