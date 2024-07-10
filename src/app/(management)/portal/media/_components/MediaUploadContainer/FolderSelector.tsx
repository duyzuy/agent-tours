import { useState, useMemo } from "react";
import { useGetMediaFolders } from "@/queries/media";
import { IMediaFolderListRs, QueryParamsMediaFolders } from "@/models/management/media.interface";
import { SelectProps, TreeSelect } from "antd";
import { isEmpty, isUndefined } from "lodash";
import { mediaConfig } from "@/configs";

export interface FolderTreeSelectorProps {
  value?: string;
  onSelect?: SelectProps<string, FolderItemTree>["onChange"];
  disabled?: boolean;
}
export type FolderItemTree = {
  title: string;
  slug: string;
  id: number;
  nestedSlug: string[];
  parentId?: number;
  path: string;
  value: string;
  children: FolderItemTree[];
};
const FolderTreeSelector: React.FC<FolderTreeSelectorProps> = ({ value, onSelect, disabled }) => {
  const [queryFolter, setQueryFolder] = useState(new QueryParamsMediaFolders(1, 999));
  const { data: folderData, isLoading: isLoadingFolder } = useGetMediaFolders(queryFolter);

  const folderTreeOptions = useMemo(() => {
    let option: FolderItemTree = {
      id: 0,
      title: "Thư mục gốc",
      slug: "uploads",
      path: "uploads",
      value: "uploads",
      nestedSlug: ["uploads"],
      children: [],
    };

    const getFolderListTree = (
      items: IMediaFolderListRs["result"],
      parentId: number,
      parentFolderSlug: string[],
      path: string,
    ) => {
      let folders: FolderItemTree[] = [];

      items.forEach((item) => {
        let chilFolders: FolderItemTree[] = [];

        if (item.children && item.children.length) {
          chilFolders = getFolderListTree(
            item.children,
            item.id,
            [...parentFolderSlug, item.folderSlug],
            `${parentFolderSlug}/${item.folderSlug}`,
          );
        }

        folders = [
          ...folders,
          {
            id: item.id,
            title: item.folderName,
            slug: item.folderSlug,
            nestedSlug: [...parentFolderSlug, item.folderSlug],
            path: `${path}/${item.folderSlug}`,
            parentId: parentId,
            value: item.key,
            children: chilFolders,
          },
        ];
      });

      return folders;
    };
    if (!isUndefined(folderData)) {
      const itemsListTree = getFolderListTree(folderData.list, 0, [mediaConfig.rootFolder], mediaConfig.rootFolder);
      option = {
        ...option,
        children: itemsListTree,
      };
    }
    return [option];
  }, [folderData]);

  return (
    <TreeSelect
      defaultValue={value}
      treeLine={true}
      value={value}
      treeDefaultExpandAll={true}
      placeholder="Chọn thư mục"
      className="w-full"
      treeData={folderTreeOptions}
      disabled={disabled}
      onSelect={onSelect}
    />
  );
};
export default FolderTreeSelector;
