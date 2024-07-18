import React from "react";
import { Button, Spin } from "antd";
import { MenuPositionType } from "@/models/management/cms/menu.interface";
export interface MenuPageWraperProps {
  title?: string;
  children?: React.ReactNode;
  menuName?: string;
  onSave?: () => void;
  menuPosition?: MenuPositionType;
  loading?: boolean;
}
const MenuPageWraper: React.FC<MenuPageWraperProps> = ({
  title = "Cấu trúc menu",
  children,
  menuName,
  onSave,
  menuPosition,
  loading,
}) => {
  return (
    <>
      <div className="py-2 mb-4">
        <p className="font-bold">{title}</p>
      </div>
      <div className="menu-items border mb-8">
        <div>
          <div className="menu-types px-4 py-4 flex-1 bg-gray-50">
            <div className="menu-type mb-4">
              <p className="font-semibold">{menuName}</p>
              <p className="text-xs text-gray-600">Vị trí hiển thị menu ngoài giao diện</p>
            </div>
          </div>
          <div className="menu-items-container py-4 px-4">
            <p className="font-bold py-3 mb-2">Danh sách</p>
            <div className="menu-items mb-6">{loading ? <Spin /> : children}</div>
            {onSave ? (
              <div className="footer pt-4 border-t">
                <Button type="primary" htmlType="button" className="bg-primary-default" onClick={onSave}>
                  Lưu menu
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};
export default MenuPageWraper;
