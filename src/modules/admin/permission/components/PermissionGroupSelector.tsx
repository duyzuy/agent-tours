import { Select } from "antd";
import { isArray } from "lodash";

const GROUP_PERMISSION_LIST = [
  { label: "Agent", value: "AGENT" },
  { label: "Agent Staff", value: "AGENT_STAFF" },
  { label: "Sản phẩm", value: "PRODUCT" },
  { label: "Vendor", value: "VENDOR" },
  { label: "Supplier", value: "SUPPLIER" },
  { label: "Inventory", value: "INVENTORY" },
  { label: "Stock", value: "STOCK" },
  { label: "Mẫu sản phẩm", value: "TEMPLATE_SELLABLE" },
  { label: "Sản phẩm", value: "SELLABLE" },
  { label: "Booking", value: "BOOKING" },
  { label: "Manage Booking", value: "MANAGE_BOOKING" },
  { label: "Menu", value: "MENU" },
  { label: "Post", value: "POST" },
  { label: "Page", value: "PAGE" },
  { label: "Tag", value: "TAG" },
  { label: "Media", value: "MEDIA" },
  { label: "User", value: "USER" },
  { label: "Form of payment", value: "FOP" },
  { label: "Role", value: "ROLE" },
  { label: "Permission", value: "PERMISSION" },
  { label: "Role permission", value: "ROLE_PERMISSION" },
  { label: "Cấu hình hệ thống", value: "SYSTEM_CONFIG" },
  { label: "Ngôn ngữ", value: "LANGUAGE" },
  { label: "Dashboard", value: "DASHBOARD" },
  { label: "Mẫu nội dung", value: "CONTENT_TEMPLATE" },
  { label: "Destination", value: "DESTINATION" },
  { label: "Coupon", value: "COUPON" },
  { label: "Leading", value: "LEADING" },
  { label: "Payment", value: "PAYMENT" },
  { label: "Operation", value: "OPERATION" },
  { label: "Member", value: "MEMBER" },
];

type PermissionGroupOption = (typeof GROUP_PERMISSION_LIST)[number];
export interface PermissionGroupSelectorProps {
  value?: string;
  placeholder?: string;
  onSelect?: (option: PermissionGroupOption) => void;
}
const PermissionGroupSelector: React.FC<PermissionGroupSelectorProps> = ({
  value,
  placeholder = "Chọn nhóm chức năng",
  onSelect,
}) => {
  return (
    <Select<string, PermissionGroupOption>
      value={value}
      placeholder={placeholder}
      options={GROUP_PERMISSION_LIST}
      onChange={(value, option) => onSelect?.(isArray(option) ? option[0] : option)}
    />
  );
};

export default PermissionGroupSelector;
