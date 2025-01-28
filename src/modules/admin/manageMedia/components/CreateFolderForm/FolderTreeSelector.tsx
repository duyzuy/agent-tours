import { useMemo } from "react";
import { MediaFolderQueryParamsFormData } from "../../media.interface";
import { SelectProps, TreeSelect } from "antd";
import { isUndefined } from "lodash";
import { mediaConfig } from "@/configs";
import { useGetMediaFolders } from "@/modules/admin/manageMedia/hooks/useGetMediaFolders";

export interface FolderTreeSelectorProps {
  value?: string;
  onSelect?: SelectProps<string, FolderOptionTree>["onChange"];
  disabled?: boolean;
}
export type FolderOptionTree = {
  id: number;
  title: string;
  slug: string;
  nestedSlugs?: string[];
  parentId?: number;
  parentSlug?: string;
  value: string;
  children: FolderOptionTree[];
  depth: number;
};
const FolderTreeSelector: React.FC<FolderTreeSelectorProps> = ({ value, onSelect, disabled }) => {
  const queryParams = new MediaFolderQueryParamsFormData(1, 999, undefined);
  const { data: folderData, isLoading: isLoadingFolder } = useGetMediaFolders({
    queryParams: queryParams,
    enabled: true,
  });

  const folderTreeOptions = useMemo(() => {
    let option: FolderOptionTree = {
      id: 0,
      title: "Thư mục gốc",
      slug: mediaConfig.rootFolder,
      value: mediaConfig.rootFolder,
      depth: 0,
      children: [],
      nestedSlugs: undefined,
      parentId: undefined,
      parentSlug: undefined,
    };

    if (!isUndefined(folderData)) {
      const childItemsOfRoot = getFolderListTree({
        items: folderData.list,
        depth: 1,
        parentSlug: mediaConfig.rootFolder,
        nestedSlugs: [mediaConfig.rootFolder],
      });
      option = {
        ...option,
        children: childItemsOfRoot,
      };
    }
    return [option];
  }, [folderData]);

  type FolderItem = Exclude<typeof folderData, undefined>["list"][number];

  function getFolderListTree({
    depth,
    items,
    parentSlug,
    nestedSlugs,
  }: {
    items: FolderItem[];
    depth: number;
    parentSlug: string;
    nestedSlugs: string[];
  }): FolderOptionTree[] {
    return items.map((item) => {
      const folderItem = {
        id: item.id,
        slug: item.folderSlug,
        title: item.folderName,
        parentId: item.parent,
        value: item.folderSlug,
        parentSlug: parentSlug,
        nestedSlugs: [...nestedSlugs],
        depth: depth,
      };
      let childItems: FolderOptionTree[] = [];

      if (item.children && item.children.length) {
        childItems = getFolderListTree({
          items: item.children,
          parentSlug: item.folderSlug,
          depth: depth + 1,
          nestedSlugs: [...nestedSlugs, item.folderSlug],
        });
      }
      return { ...folderItem, children: childItems };
    });
  }

  return (
    <TreeSelect
      defaultValue={value}
      treeLine={true}
      value={value}
      treeDefaultExpandAll={true}
      placeholder="Chọn thư mục"
      className="w-full"
      treeData={folderTreeOptions}
      loading={isLoadingFolder}
      disabled={disabled}
      onSelect={onSelect}
    />
  );
};
export default FolderTreeSelector;
