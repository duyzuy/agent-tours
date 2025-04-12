import { Modal, ModalProps, Button } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
const ModalLanguageSwitchConfirm: React.FC<ModalProps> = ({ open, onCancel, onOk, ...restProps }) => {
  const renderModalFooter = () => {
    return (
      <div className="px-2 flex items-center flex-1 justify-center">
        <Button onClick={onCancel} className="w-24">
          Huỷ bỏ
        </Button>
        <Button onClick={onOk} type="primary" className="w-24">
          Xác nhận
        </Button>
      </div>
    );
  };

  return (
    <Modal open={open} onCancel={onCancel} footer={renderModalFooter} width={380} {...restProps}>
      <div className="body py-4">
        <div className="icon text-blue-600 text-center">
          <InfoCircleOutlined className="text-5xl" />
        </div>
        <div className="content py-2 text-center">
          <p className="font-bold text-center py-2 text-lg">Rời khỏi trang?</p>
          <p className="text-gray-500">Dữ liệu chưa được lưu sẽ không thể khôi phục lại</p>
          <p className="text-gray-500">Bạn chắc chắn muốn rời khỏi trang</p>
        </div>
      </div>
    </Modal>
  );
};
export default ModalLanguageSwitchConfirm;
