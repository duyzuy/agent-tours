"use client";
import React, { useEffect, useState } from "react";
import { Button, Form, Input, Tabs, TabsProps } from "antd";
import PageContainer from "@/components/admin/PageContainer";
import { useGetSettingEmailQuery } from "@/queries/cms/settings";
import { useUpdateSettingEmailMutation } from "@/mutations/managements/settings";
import FormItem from "@/components/base/FormItem";
import { useQueryClient } from "@tanstack/react-query";
import { queryCMS } from "@/queries/var";
import useMessage from "@/hooks/useMessage";
import ButtonMediaUpload from "../_components/ButtonMediaUpload";
import Link from "next/link";
const RuleAndPolicyPage = () => {
  const { data, isLoading } = useGetSettingEmailQuery();
  const { mutate: updateSettingEmail, isPending } = useUpdateSettingEmailMutation();
  const [emailSettingForm, setEmailSettingForm] = useState({ email: "", appPassword: "" });

  const queryClient = useQueryClient();
  const message = useMessage();
  const onChangeForm = (key: "email" | "appPassword", value: string) => {
    setEmailSettingForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const handleUpdateSettingEmail = () => {
    updateSettingEmail(
      { email: emailSettingForm.email, appPassword: emailSettingForm.appPassword },
      {
        onSuccess(data, variables, context) {
          queryClient.invalidateQueries({ queryKey: [queryCMS.GET_SETTING_EMAIL] });
          message.success("Cập nhật thành công");
        },
        onError(error, variables, context) {
          message.error(error.message);
        },
      },
    );
  };
  useEffect(() => {
    if (data && !isLoading) {
      setEmailSettingForm({ email: data.email, appPassword: data.appPassword });
    }
  }, [data, isLoading]);
  const tabItems: TabsProps["items"] = [
    {
      key: "email",
      label: "Cấu hình email",
      children: (
        <div className="pt-6">
          <div className="mb-3">
            <span className="block font-[500] text-lg">Cấu hình SMTP Gmail</span>
          </div>
          <div className="form max-w-[450px]">
            <div className="flex items-center gap-4">
              <ButtonMediaUpload />
              <Link href="/portal/media">Media</Link>
            </div>
            <Form layout="vertical">
              <FormItem label="Email" required>
                <Input
                  placeholder="Email"
                  value={emailSettingForm.email}
                  onChange={(ev) => onChangeForm("email", ev.target.value)}
                />
              </FormItem>
              <FormItem label="Mật khẩu ứng dụng" required>
                <Input
                  placeholder="Mật khẩu ứng dụng"
                  value={emailSettingForm.appPassword}
                  onChange={(ev) => onChangeForm("appPassword", ev.target.value)}
                />
              </FormItem>
              <Button type="primary" loading={isPending} onClick={handleUpdateSettingEmail}>
                Lưu
              </Button>
            </Form>
          </div>
        </div>
      ),
    },
  ];
  return (
    <React.Fragment>
      <PageContainer
        name="Cấu hình chung"
        modelName="Cấu hình chung"
        onClick={() => {}}
        hideAddButton
        breadCrumItems={[{ title: "Cấu hình chung" }]}
      >
        <Tabs defaultActiveKey="ruleAndPolicyList" items={tabItems} />
      </PageContainer>
    </React.Fragment>
  );
};
export default RuleAndPolicyPage;
