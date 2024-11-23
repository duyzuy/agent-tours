import { EProductType } from "@/models/management/core/productType.interface";
import { useGetProductTypeListCoreQuery } from "@/queries/core/productType";
import { Button, Modal } from "antd";
import classNames from "classnames";
export interface ModalProductTypeSelectorProps {
  open?: boolean;
  onClose?: () => void;
  onSelect?: (productType: EProductType) => void;
}
const ModalProductTypeSelector: React.FC<ModalProductTypeSelectorProps> = ({ open, onClose, onSelect }) => {
  const { data: productTypeList, isLoading: isLoadingProductTpe } = useGetProductTypeListCoreQuery({ enabled: open });

  return (
    <Modal open={open} width={360} footer={null} onCancel={onClose}>
      <h3 className="font-semibold text-lg text-center mb-6">Dịch vụ cần thêm</h3>
      <div className="flex gap-4">
        {productTypeList?.map((item) => (
          <div
            key={item}
            className={classNames(
              "px-6 py-4 w-1/2 rounded-md flex justify-center items-center cursor-pointer hover:bg-emerald-100",
              {
                "bg-emerald-50 hover:bg-emerald-100 text-emerald-600": item === EProductType.TOUR,
                "bg-pink-50 hover:bg-pink-100 text-pink-600": item === EProductType.EXTRA,
              },
            )}
          >
            <span className="text-center block font-semibold" onClick={() => onSelect?.(item)}>
              {item === EProductType.TOUR
                ? "Dịch vụ trong tour"
                : item === EProductType.EXTRA
                ? "Dịch vụ trong và ngoài tour"
                : item}
            </span>
          </div>
        ))}
      </div>
    </Modal>
  );
};
export default ModalProductTypeSelector;
