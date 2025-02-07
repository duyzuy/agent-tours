import { useState } from "react";
import { Button, Form, FormProps, Input, PopconfirmProps, Popover, Space } from "antd";
import { useRouter } from "next/navigation";
import useCancelBookingOrder from "../../modules/useCancelBookingOrder";

interface CancelBookingButtonProps {
  orderId: number;
}

type CancelOrderFormFields = {
  rmk4: string;
};
const CancelBookingButton = ({ orderId }: CancelBookingButtonProps) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { mutate: deleteOrder, isPending } = useCancelBookingOrder();
  const openPopConfirm: PopconfirmProps["afterOpenChange"] = (newOpen) => {
    setOpen(newOpen);
  };
  const closePopConfirm = () => {
    setOpen(false);
  };

  const handleConfirmDelete: FormProps<CancelOrderFormFields>["onFinish"] = (data) => {
    console.log(data);
    deleteOrder(
      { bookingOrder: { recId: orderId, rmk4: data.rmk4 } },
      {
        onSuccess(data, variables, context) {
          form.resetFields();
          setOpen(false);
          router.push("/portal/manage-booking/order-list");
        },
      },
    );
  };

  return (
    <>
      <Popover
        open={open}
        trigger="click"
        title={`Xoá order #${orderId}`}
        placement="bottom"
        onOpenChange={openPopConfirm}
        content={
          <>
            <Form<CancelOrderFormFields>
              name="cancel-order"
              form={form}
              layout="vertical"
              className="w-64"
              autoComplete="off"
              onFinish={handleConfirmDelete}
              disabled={isPending}
            >
              <Form.Item<CancelOrderFormFields> name="rmk4" rules={[{ required: true, message: "Không bỏ trống." }]}>
                <Input.TextArea placeholder="Lý do huỷ *" />
              </Form.Item>
              <Space>
                <Button type="primary" danger className="w-24" htmlType="submit" loading={isPending}>
                  Huỷ
                </Button>
                <Button onClick={closePopConfirm} className="w-24">
                  Đóng
                </Button>
              </Space>
            </Form>
          </>
        }
      >
        <Button type="text" className="!text-rose-700 !bg-rose-100 hover:!bg-rose-200">
          Huỷ đặt chỗ
        </Button>
      </Popover>
    </>
  );
};
export default CancelBookingButton;

// interface Props {
//   isShowModal?: boolean;
//   title?: string;
//   descriptions?: string;
//   orderId: number;
// }
// const ConfirmCancelModal: React.FC<Props> = ({ orderId, isShowModal, title = "", descriptions = "" }) => {
//   const router = useRouter();
//   const { onCancelBookingOrder } = useCancelBookingOrder();
//   const [cancelBookingData, setCancelBookingData] = useState<IBookingOrderCancelPayload>({
//     bookingOrder: { recId: orderId, rmk4: "" },
//   });

//   const onConfirmCancelBookingOrder = () =>
//     onCancelBookingOrder?.(cancelBookingData, () => {
//       router.push("/portal/manage-booking/order-list");
//     });

//   const renderModalFooter = () => {
//     return (
//       <div className="px-2 flex items-center flex-1 justify-center">
//         <Button onClick={onCancel} className="w-28">
//           Đóng
//         </Button>
//         <Button onClick={onConfirm} type="primary" danger className="w-28">
//           Đồng ý
//         </Button>
//       </div>
//     );
//   };

//   return (
//     <Modal open={isShowModal} onCancel={onCancel} footer={renderModalFooter} width={420} closeIcon={null}>
//       <div className="body pt-4">
//         <div className="icon text-red-500 text-center">
//           <ExclamationCircleOutlined className="text-5xl" />
//         </div>
//         <div className="content py-2 text-center">
//           <p className="font-bold text-center py-2 text-lg">{title}</p>
//           <p className="text-gray-500">{descriptions}</p>
//           <div className="h-8"></div>
//           <Form layout="vertical">
//             <FormItem required>
//               <Input.TextArea
//                 placeholder="Lý do huỷ"
//                 name="rmk4"
//                 onChange={(ev) =>
//                   setCancelBookingData((prev) => ({
//                     ...prev,
//                     bookingOrder: {
//                       ...prev?.bookingOrder,
//                       rmk4: ev.target.value,
//                     },
//                   }))
//                 }
//               />
//             </FormItem>
//           </Form>
//         </div>
//       </div>
//     </Modal>
//   );
// };
