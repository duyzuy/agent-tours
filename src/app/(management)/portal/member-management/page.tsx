"use client";
import React, { useState } from "react";
import PageContainer from "@/components/admin/PageContainer";
import TableListPage from "@/components/admin/TableListPage";
import { columns } from "./columns";
import { MemberQueryParamsFormData } from "@/modules/admin/manageMember/member.interface";
import MemberFormDrawer, { MemberFormDrawerProps } from "@/modules/admin/manageMember/components/MemberFormDrawer";
import { useUpdateMember, useGetMemberList, useResetPasswordMember } from "@/modules/admin/manageMember";
import { ColumnsType } from "antd/es/table";
import { Button, Popconfirm } from "antd";

const UserPage: React.FC = () => {
  const [queryParams, setQueryParams] = useState(
    () => new MemberQueryParamsFormData({ username: "", email: "", phoneNumber: "" }, 1, 10),
  );
  const { data: memberData, isLoading } = useGetMemberList({ queryParams: queryParams, enabled: true });
  const drawer = MemberFormDrawer.useDrawer();

  const { mutate: updateMember, isPending: loadingUpdate } = useUpdateMember();
  const { mutate: resetPassword, isPending: loadingResetPassword } = useResetPasswordMember();

  type MemberItem = Exclude<typeof memberData, undefined>["list"][number];

  const [editRecord, setEditRecord] = useState<MemberItem>();

  const handleEdit = (record: MemberItem) => {
    setEditRecord(record);
    drawer.openDrawer();
  };

  const handleCancel = () => {
    setEditRecord(undefined);
    drawer.closeDrawer();
  };
  const handleSubmitFormData: MemberFormDrawerProps["onSubmit"] = (formData) => {
    updateMember(formData, {
      onSuccess(data, variables, context) {
        drawer.closeDrawer();
        setEditRecord(undefined);
      },
    });
  };

  const handleSendResetPassword = (userId: number) => {
    resetPassword(userId);
  };
  const mergedColumns: ColumnsType<Exclude<typeof memberData, undefined>["list"][number]> = [
    ...columns,
    {
      title: "Hành động",
      render(value, record, index) {
        return (
          <Popconfirm
            trigger={"click"}
            title="Lây lại mật khẩu mới!"
            description="Gửi mật khẩu mới đến email của tài khoản đăng ký."
            okText="Đồng ý"
            cancelText="Huỷ bỏ"
            onConfirm={() => handleSendResetPassword(record.recId)}
          >
            <Button type="text" className="!bg-amber-50 !text-amber-600" size="small" loading={loadingResetPassword}>
              Reset mật khẩu
            </Button>
          </Popconfirm>
        );
      },
    },
  ];
  return (
    <PageContainer
      name="Thành viên đăng ký"
      modelName="thành viên"
      hideAddButton={true}
      breadCrumItems={[{ title: "Thành viên đăng ký" }]}
    >
      <TableListPage<MemberItem>
        scroll={{ x: 1200 }}
        modelName="Tài khoản"
        columns={mergedColumns}
        rowKey={"recId"}
        dataSource={memberData?.list || []}
        isLoading={isLoading}
        onEdit={(record) => handleEdit(record)}
      />
      <MemberFormDrawer
        isOpen={drawer.isOpen}
        initialValue={editRecord}
        onCancel={handleCancel}
        onSubmit={handleSubmitFormData}
        loading={loadingUpdate}
      />
    </PageContainer>
  );
};
export default UserPage;
