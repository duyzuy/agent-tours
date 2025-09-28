import ThemeModeToggle from "@/components/ThemeModeToggle";
import ThingTodoItemButton2 from "@/modules/admin/operation/components/ThingTodoItemButton2";
import AccountButton from "./AccountButton";

interface AdminHeaderProps {}

const AdminHeader: React.FC<AdminHeaderProps> = () => {
  return (
    <div className="flex justify-between items-center flex-1">
      <div className="font-semibold text-xl">Tour Management Platform</div>
      <div className="inline-flex items-center gap-x-3">
        <ThingTodoItemButton2 />
        <ThemeModeToggle />
        <AccountButton />
      </div>
    </div>
  );
};
export default AdminHeader;
