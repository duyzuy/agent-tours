import { useMemo } from "react";
import { useGetPermissions } from "../../permission/hooks";
import { Checkbox, Divider } from "antd";
import { IPermission } from "@/models/management/permission.interface";

export interface PermissionSelectorProps {
  values?: IPermission[];
  onChange?: (permissions: IPermission[]) => void;
  enabled?: boolean;
}
const PermissionSelector: React.FC<PermissionSelectorProps> = ({ values = [], onChange, enabled }) => {
  const { data: permissions, isLoading: isLoadingPermissionList } = useGetPermissions({ enabled });

  type PermissionList = Exclude<typeof permissions, undefined>["permissionList"];

  const groupedPermissionsList = useMemo(() => {
    return permissions?.permissionList.reduce<{
      [key: string]: PermissionList;
    }>((acc, per) => {
      acc[per.groupKey] = acc[per.groupKey] ? [...acc[per.groupKey], per] : [per];
      return acc;
    }, {});
  }, [permissions]);

  const indeterminate = (groupKey: string, permissionList: PermissionList) => {
    const persByGroup = values?.filter((item) => item.groupKey === groupKey);

    if (!persByGroup || !persByGroup.length) return false;

    return persByGroup.length > 0 && persByGroup.length < permissionList.length;
  };

  const handleChangeGroupPermissions = (checked: boolean, groupKey: string, pers: PermissionList) => {
    let newSelectedPermissions: PermissionList = values?.filter((per) => per.groupKey !== groupKey) || [];

    if (checked) {
      newSelectedPermissions = [...newSelectedPermissions, ...pers];
    }

    onChange?.(newSelectedPermissions);
  };

  const isCheckedAllByGroup = (groupKey: string, permissions: PermissionList) => {
    const persByGroup = values?.filter((item) => item.groupKey === groupKey);

    if (!persByGroup) return false;

    return persByGroup.length === permissions.length;
  };

  const handleChangePermission = (group: string, per: IPermission) => {
    let newSelectedPermissions = [...values];
    const indexPer = newSelectedPermissions.findIndex(
      (item) => item.localUser_PermissionKey === per.localUser_PermissionKey,
    );
    if (indexPer !== -1) {
      newSelectedPermissions.splice(indexPer, 1);
    } else {
      newSelectedPermissions = [...newSelectedPermissions, per];
    }

    onChange?.(newSelectedPermissions);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {!isLoadingPermissionList &&
        groupedPermissionsList &&
        Object.entries(groupedPermissionsList).map(([groupKey, pers]) => (
          <div className="border p-4 h-full rounded-md drop-shadow-sm bg-white" key={groupKey}>
            <Checkbox
              indeterminate={indeterminate(groupKey, pers)}
              onChange={(evt) => handleChangeGroupPermissions(evt.target.checked, groupKey, pers)}
              checked={isCheckedAllByGroup(groupKey, pers)}
            >
              {groupKey}
            </Checkbox>
            <Divider />
            {pers.map((per) => (
              <div key={per.localUser_PermissionKey}>
                <Checkbox
                  onChange={(value) => handleChangePermission(groupKey, per)}
                  checked={values?.some((item) => item.localUser_PermissionKey === per.localUser_PermissionKey)}
                  className="!align-top"
                >
                  {per.localUser_PermissionValue}
                </Checkbox>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};
export default PermissionSelector;
