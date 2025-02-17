import React, { useEffect, useState } from "react";
import { Button, Col, Divider, Drawer, Form, Input, Row, Select, Space } from "antd";
import { CreateFormOfPaymentPayload, EFopType } from "@/models/management/core/formOfPayment.interface";
import { useCreateFormOfPayment } from "@/modules/admin/form-of-payment/hooks/useCreateFormOfpayment";
import FormItem from "@/components/base/FormItem";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FOP_PAYMENT_TYPE_LIST, FOPFormData } from "@/modules/admin/form-of-payment/fop.interface";
import { moneyFormatVND } from "@/utils/helper";
import { createFopSchema } from "@/modules/admin/form-of-payment/fop.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { LinkOutlined, UploadOutlined } from "@ant-design/icons";
import MediaUploadDrawer, {
  MediaUploadDrawerProps,
} from "@/app/(management)/portal/media/_components/MediaUploadDrawer";
import { IMediaFile } from "@/models/management/media.interface";
import Link from "next/link";
import { mediaConfig } from "@/configs";
export interface DrawerPaymentFormProps {
  orderId?: number;
  isOpen?: boolean;
  onClose?: () => void;
  formOfPaymentType: FOPFormData["type"];
}

const DrawerPaymentForm: React.FC<DrawerPaymentFormProps> = ({ isOpen, onClose, orderId, formOfPaymentType }) => {
  const initialValue = new FOPFormData(orderId, formOfPaymentType, undefined, "", 0, "", "", "", "", "", "", "", "");
  const [openMedia, setOpenMedia] = useState(false);
  const [fileItems, setFileItems] = useState<IMediaFile[]>([]);
  const { control, handleSubmit, watch, setValue } = useForm<FOPFormData>({
    defaultValues: initialValue,
    resolver: yupResolver(createFopSchema),
  });
  const { mutate: createFormOfPayment, isPending } = useCreateFormOfPayment();

  const handleCreateFOP: SubmitHandler<FOPFormData> = (data) => {
    const attachedMedias: CreateFormOfPaymentPayload["attachedMedias"] = fileItems.map((item) => {
      return {
        mediaId: item.id,
        mediaType: item.mediaType,
        extension: item.extension,
        fullPath: item.fullPath,
        id: item.id,
        objectType: "MEDIA",
        path: item.path,
        slug: item.slug,
      };
    });

    let payload: CreateFormOfPaymentPayload = {
      orderId: data.orderId,
      amount: data.amount,
      attachedMedias: attachedMedias,
      fopDocument: data.fopDocument,
      fopType: data.fopType,
      infoMId: data.infoMId,
      infoNote: data.infoNote,
      infoNumber: data.infoNumber,
      infoTId: data.infoTId,
      infoTnxId: data.infoTnxId,
      infoTrace: data.infoTrace,
      payer: data.payer,
      rmk: data.rmk,
      type: data.type,
    };

    createFormOfPayment(payload, {
      onSuccess(data, variables, context) {
        onClose?.();
      },
    });
  };
  const handleConfirmMedia: MediaUploadDrawerProps["onConfirm"] = (media) => {
    setFileItems((prevMedia) => [...prevMedia, ...media]);
  };
  const handleOpenMediaFile = () => {
    setOpenMedia(true);
  };
  const isDisableButton =
    watch("amount") === 0 ||
    watch("amount") === undefined ||
    watch("fopDocument") === undefined ||
    watch("fopType") === undefined ||
    watch("payer") === undefined;

  useEffect(() => {
    setValue("type", formOfPaymentType);
    setValue("orderId", orderId);
  }, [formOfPaymentType, orderId]);
  return (
    <>
      <Drawer
        title={
          (formOfPaymentType === EFopType.PAYMENT && "Thanh toán") ||
          (formOfPaymentType === EFopType.REFUND && "Hoàn tiền") ||
          (formOfPaymentType === EFopType.DISCOUNT && "Giảm giá") ||
          (formOfPaymentType === EFopType.CHARGE && "Thêm phí") ||
          "--"
        }
        width={750}
        onClose={onClose}
        destroyOnClose={true}
        maskClosable={false}
        open={isOpen}
        afterOpenChange={(open) => {
          if (!open) {
            setFileItems([]);
          }
        }}
        footer={
          <Space className="py-3">
            <Button
              onClick={handleSubmit(handleCreateFOP)}
              type="primary"
              className="w-28"
              loading={isPending}
              disabled={isDisableButton}
            >
              Lưu
            </Button>
            <Button className="w-28" onClick={onClose}>
              Huỷ bỏ
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" disabled={isPending}>
          <Row gutter={16}>
            <Col span={12}>
              <Controller
                control={control}
                name="payer"
                render={({ field, fieldState: { error } }) => (
                  <FormItem
                    label={`${formOfPaymentType === EFopType.PAYMENT ? "Người thanh toán" : "Người nhận"}`}
                    validateStatus={error ? "error" : undefined}
                    help={error?.message}
                    required
                  >
                    <Input {...field} placeholder="Họ tên" />
                  </FormItem>
                )}
              />
            </Col>
            <Col span={12}>
              <Controller
                control={control}
                name="fopType"
                render={({ field, fieldState: { error } }) => (
                  <FormItem
                    label="Hình thức"
                    validateStatus={error ? "error" : undefined}
                    help={error?.message}
                    required
                  >
                    <Select {...field} options={FOP_PAYMENT_TYPE_LIST} placeholder="Hình thức" />
                  </FormItem>
                )}
              />
            </Col>
            <Col span={12}>
              <Controller
                control={control}
                name="amount"
                render={({ field, fieldState: { error } }) => (
                  <FormItem label="Số tiền" validateStatus={error ? "error" : undefined} help={error?.message} required>
                    <Input {...field} placeholder="Số tiền" />
                    <p className="text-xs text-red-600">{moneyFormatVND(field.value)}</p>
                  </FormItem>
                )}
              />
            </Col>
            <Col span={12}>
              <Controller
                control={control}
                name="fopDocument"
                render={({ field, fieldState: { error } }) => (
                  <FormItem
                    label="Thông tin thanh toán"
                    validateStatus={error ? "error" : undefined}
                    help={error?.message}
                    required
                  >
                    <Input {...field} placeholder="Thông tin hoá đơn, mã số thanh toán..." />
                  </FormItem>
                )}
              />
            </Col>
            <Col span={24}>
              <FormItem label="File đính kèm">
                <Button icon={<UploadOutlined />} onClick={handleOpenMediaFile}>
                  Tải lên
                </Button>
                <div className="flex flex-col gap-y-1 mt-3">
                  {fileItems.map((item) => (
                    <Link href={`${mediaConfig.rootApiPath}/${item.fullPath}`} key={item.id} target="_blank">
                      <span className="inline-flex items-center gap-x-2">
                        <LinkOutlined />
                        {item.path}
                      </span>
                    </Link>
                  ))}
                </div>
              </FormItem>
            </Col>
            <Col span={24}>
              <Divider orientation="left">Thông tin thêm</Divider>
            </Col>
            <Col span={8}>
              <Controller
                control={control}
                name="infoTId"
                render={({ field, fieldState: { error } }) => (
                  <FormItem
                    label="Thông tin thanh toán"
                    validateStatus={error ? "error" : undefined}
                    help={error?.message}
                  >
                    <Input {...field} placeholder="infoTId" />
                  </FormItem>
                )}
              />
            </Col>
            <Col span={8}>
              <Controller
                control={control}
                name="infoMId"
                render={({ field, fieldState: { error } }) => (
                  <FormItem label="infoMId" validateStatus={error ? "error" : undefined} help={error?.message}>
                    <Input {...field} placeholder="infoMId" />
                  </FormItem>
                )}
              />
            </Col>
            <Col span={8}>
              <Controller
                control={control}
                name="infoTnxId"
                render={({ field, fieldState: { error } }) => (
                  <FormItem label="infoTnxId" validateStatus={error ? "error" : undefined} help={error?.message}>
                    <Input {...field} placeholder="infoTnxId" />
                  </FormItem>
                )}
              />
            </Col>
            <Col span={12}>
              <Controller
                control={control}
                name="infoNumber"
                render={({ field, fieldState: { error } }) => (
                  <FormItem label="infoNumber" validateStatus={error ? "error" : undefined} help={error?.message}>
                    <Input {...field} placeholder="infoNumber" />
                  </FormItem>
                )}
              />
            </Col>
            <Col span={12}>
              <Controller
                control={control}
                name="infoTrace"
                render={({ field, fieldState: { error } }) => (
                  <FormItem label="infoTrace" validateStatus={error ? "error" : undefined} help={error?.message}>
                    <Input {...field} placeholder="infoTrace" />
                  </FormItem>
                )}
              />
            </Col>
            <Col span={24}>
              <Controller
                control={control}
                name="infoNote"
                render={({ field, fieldState: { error } }) => (
                  <FormItem label="Ghi chú" validateStatus={error ? "error" : undefined} help={error?.message}>
                    <Input.TextArea {...field} placeholder="Ghi chú" />
                  </FormItem>
                )}
              />
            </Col>
            <Col span={24}>
              <Divider orientation="left">Ghi chú</Divider>
            </Col>
            <Col span={24}>
              <Controller
                control={control}
                name="rmk"
                render={({ field, fieldState: { error } }) => (
                  <FormItem label="Ghi chú" validateStatus={error ? "error" : undefined} help={error?.message}>
                    <Input.TextArea {...field} placeholder="Ghi chú" />
                  </FormItem>
                )}
              />
            </Col>
          </Row>
        </Form>
      </Drawer>
      <MediaUploadDrawer
        isOpen={openMedia}
        mode="multiple"
        onClose={() => setOpenMedia(false)}
        onConfirm={handleConfirmMedia}
      />
    </>
  );
};
export default DrawerPaymentForm;
