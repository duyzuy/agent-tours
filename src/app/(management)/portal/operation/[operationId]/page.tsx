"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Spin, TagProps } from "antd";
import PageContainer from "@/components/admin/PageContainer";
import { useGetOperationDetailQuery } from "@/queries/core/operation";
import OperationContainer from "./OperationContainer";
import { IOperationStatus } from "@/models/management/core/operation.interface";
import { useGetOperationThingTodoList } from "@/queries/core/operation";

interface OperationDetailPage {
  params: { operationId: string };
}
const OperationDetailPage: React.FC<OperationDetailPage> = ({ params }) => {
  const { data, isLoading } = useGetOperationDetailQuery({ operationId: Number(params.operationId) });

  const router = useRouter();

  const getOperationStatus = (status?: IOperationStatus) => {
    let color: TagProps["color"];
    color =
      status === "ACCEPTED"
        ? "cyan"
        : status === "CANCELED"
        ? "red"
        : status === "HANDOVERED"
        ? "magenta"
        : status === "DONE"
        ? "success"
        : status === "NEW"
        ? "blue"
        : status === "LOCKED"
        ? "default"
        : status === "PENDINGCANCELED"
        ? "gold"
        : "";

    let label: string;
    label =
      status === "ACCEPTED"
        ? "Chấp nhận"
        : status === "CANCELED"
        ? "Huỷ"
        : status === "HANDOVERED"
        ? "Bàn giao"
        : status === "DONE"
        ? "Hoàn thành"
        : status === "NEW"
        ? "Mới"
        : status === "LOCKED"
        ? "Khoá"
        : status === "PENDINGCANCELED"
        ? "Chờ huỷ"
        : "";
    return label;
  };

  useEffect(() => {
    if (!data && !isLoading) {
      router.push("/portal/operation/list");
    }
  }, [data, isLoading]);

  if (isLoading) {
    return <Spin />;
  }
  if ((!data && !isLoading) || !data) {
    return null;
  }
  return (
    <PageContainer
      name={`Điều hành #${data.id.toString()} - ${getOperationStatus(data.status)}`}
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
      <OperationContainer operationId={data.id} data={data} />
    </PageContainer>
  );
};
export default OperationDetailPage;
