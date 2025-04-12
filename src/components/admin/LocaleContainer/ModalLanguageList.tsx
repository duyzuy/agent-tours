import { Modal, Button } from "antd";
import { Locale } from "@/models/management/cms/language.interface";
import classNames from "classnames";
import { memo, useState } from "react";
import { isUndefined } from "lodash";
export interface ModalLanguageListProps {
  items: Locale[];
  open?: boolean;
  onCancel?: () => void;
  onAdd?: (item: Locale) => void;
}
const ModalLanguageList: React.FC<ModalLanguageListProps> = ({ items, onCancel, open = false, onAdd }) => {
  const [selectingItem, setSelectingItem] = useState<Locale>();
  const onAddLang = (item?: Locale) => {
    item && onAdd?.(item);
    setSelectingItem(undefined);
  };
  const onCancelSelect = () => {
    onCancel?.();
    setSelectingItem(undefined);
  };
  const renderModalFooter = () => {
    return (
      <div className="px-2 flex items-center flex-1 justify-center">
        <Button className="w-24" onClick={onCancelSelect}>
          Huỷ bỏ
        </Button>
        <Button
          type="primary"
          className="w-24"
          disabled={isUndefined(selectingItem)}
          onClick={() => onAddLang(selectingItem)}
        >
          Chọn
        </Button>
      </div>
    );
  };
  return (
    <Modal open={open} onCancel={onCancel} footer={renderModalFooter} width={380}>
      <div className="body">
        <div className="content py-2 text-center">
          <p className="font-bold text-center py-2 text-lg">Thêm ngôn ngữ</p>
          <div className="body py-4">
            {items.map((lc, _index) => (
              <div
                className={classNames("border rounded-sm px-3 py-3 cursor-pointer", {
                  "mt-3": _index !== 0,
                  " bg-blue-50 border-primary-default": selectingItem?.key === lc.key,
                })}
                key={lc.key}
                onClick={() => setSelectingItem(lc)}
              >
                <div className="flex items-center">
                  <span className="flex items-center mr-8">
                    <lc.icon className="w-5 h-5 mr-2" />
                    {lc.shortName}
                  </span>
                  <span className="block w-1/2">{lc.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default memo(ModalLanguageList);
