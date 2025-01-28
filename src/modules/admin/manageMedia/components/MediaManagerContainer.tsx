import React, { useMemo, useState } from "react";
import MediaFilesWraper, { MediaFilesWraperProps } from "./MediaFilesWraper";
import MediaFolderWraper from "./MediaFolderWraper";
import { MediaTypes } from "@/models/management/media.interface";
import classNames from "classnames";
import { useAdminPermission } from "@/modules/admin/auth/store/AdminPermissionContext";
import { ERolesFunctions } from "@/constants/permission.constant";
import { MediaManagerProvider } from "../mediaContext";
export interface MediaManagerContainerProps {
  className?: string;
  onSelect?: MediaFilesWraperProps["onSelect"];
  selectedFiles?: MediaFilesWraperProps["selectedFiles"];
  mediaTypes?: MediaTypes[];
  selecAble?: boolean;
  mode?: "container" | "drawer";
}

const MediaManagerContainer: React.FC<MediaManagerContainerProps> = ({
  className = "",
  selecAble,
  onSelect,
  selectedFiles,
  mediaTypes = [MediaTypes.FILE, MediaTypes.ICON, MediaTypes.IMAGE],
  mode = "container",
}) => {
  const [_, checkPermission] = useAdminPermission();
  const hasRoleCreate = checkPermission?.([ERolesFunctions.MEDIA_CREATE]);
  return (
    <MediaManagerProvider>
      <div
        className={classNames("flex h-full", {
          [className]: className,
        })}
      >
        <div className="col-left w-[320px] h-full pr-3 border-r">
          <MediaFolderWraper hasRoleCreate={hasRoleCreate} />
        </div>
        <div className="col-right flex-1 px-6">
          <MediaFilesWraper
            mediaTypes={mediaTypes}
            selectedFiles={selectedFiles}
            onSelect={onSelect}
            hasRoleCreate={hasRoleCreate}
          />
        </div>
      </div>
    </MediaManagerProvider>
  );
};
export default MediaManagerContainer;
