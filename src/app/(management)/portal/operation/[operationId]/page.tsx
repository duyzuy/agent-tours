"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Col, Divider, Row, Spin } from "antd";
import PageContainer from "@/components/admin/PageContainer";
import { useGetOperationDetailQuery } from "@/queries/core/operation";
import OperationStatus from "@/components/admin/operation/OperationStatus";
import OperationSellableDetail from "@/components/admin/operation/OperationSellableDetail";
import OperationThingTodoItemListContainer from "@/modules/admin/operation/components/OperationThingTodoItemListContainer";
import OperationPersonInformation from "@/components/admin/operation/OperationPersonInformation";
import OperationActions from "./_components/OperationActions";
import OperationTabsControl from "./_components/OperationTabsControl";

interface OperationDetailPage {
  params: { operationId: string };
}
const OperationDetailPage: React.FC<OperationDetailPage> = ({ params }) => {
  const { data, isLoading } = useGetOperationDetailQuery({ operationId: Number(params.operationId) });

  const router = useRouter();

  useEffect(() => {
    if (!data && !isLoading) {
      router.push("/portal/operation/list");
    }
  }, [data, isLoading]);

  if (isLoading) return <Spin />;

  if (!data) return null;

  return (
    <PageContainer
      name={`Điều hành #${data.id.toString()}`}
      modelName="Điều hành"
      breadCrumItems={[
        { title: "Điều hành", href: "/portal/operation/list" },
        {
          title: `#${data?.id.toString()}`,
        },
      ]}
      hideAddButton
      onBack={() => router.push("/portal/operation/list")}
    >
      <Row gutter={[24, 0]}>
        <Col span={24} xxl={16}>
          <OperationStatus status={data.status} />
          <Divider />
          <OperationSellableDetail
            sellableCode={data.sellable.code}
            startDate={data.sellable.startDate}
            endDate={data.sellable.endDate}
            validFrom={data.sellable.validFrom}
            validTo={data.sellable.validTo}
            closeDate={data.sellable.closeDate}
            open={data.sellable.open}
            used={data.sellable.used}
            available={data.sellable.available}
            templateCode={data.template.code}
            templateName={data.template.name}
          />
          <OperationActions operationId={data.id} status={data.status} />
          <OperationTabsControl operationId={data.id} status={data.status} sellableId={data.sellableId} />
        </Col>
        <Col span={24} xxl={8} className="!max-w-md">
          <OperationPersonInformation
            fullName={data.pic?.fullname || "--"}
            email={data.pic?.email || "--"}
            phoneNumber={data.pic?.phoneNumber || "--"}
          />
          <div className="h-6"></div>
          <OperationThingTodoItemListContainer operationId={data.id} />
        </Col>
      </Row>
    </PageContainer>
  );
};
export default OperationDetailPage;
