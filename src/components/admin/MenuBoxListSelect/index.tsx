import { Checkbox, Button, Select, Pagination, Space, PaginationProps, Spin } from "antd";
import classNames from "classnames";
import { isUndefined } from "lodash";
import { memo, useEffect, useRef, useState } from "react";

type BaseOptionType = { id: string | number; [key: string]: any };

export interface MenuBoxListSelectProps<ValueType, OptionType extends BaseOptionType> {
  className?: string;
  items?: OptionType[];
  value?: ValueType[];
  onAdd?: (values: ValueType[], option: OptionType[]) => void;
  loading?: boolean;
  pagination?: {
    onChange: PaginationProps["onChange"];
    pageSize?: number;
    pageCurrent?: number;
    totalItem?: number;
  };
}
const MenuBoxListSelect = <ValueType extends number | string, OptionType extends BaseOptionType>({
  items,
  onAdd,
  className = "",
  value,
  pagination,
  loading,
}: MenuBoxListSelectProps<ValueType, OptionType>) => {
  const [selectedOption, setSelectOption] = useState<OptionType[]>([]);
  const [selectedValue, setSelectValue] = useState<ValueType[]>([]);

  const overLayRef = useRef<OptionType[]>([]);

  const resetSelect = () => {
    setSelectOption([]);
    setSelectValue([]);
  };
  const handleAdd = () => {
    onAdd?.(selectedValue, selectedOption);
    resetSelect();
  };

  const selectItem = (option: OptionType) => {
    const indexItem = selectedOption.findIndex((item) => item.id === option.id);
    let newItems = [...selectedOption];
    if (indexItem !== -1) {
      newItems.splice(indexItem, 1);
    } else {
      newItems = [...selectedOption, option];
    }
    const valueItems = newItems.reduce<ValueType[]>((acc, item) => [...acc, item.id as ValueType], []);

    setSelectOption(newItems);
    setSelectValue(valueItems);
  };

  useEffect(() => {
    if (!isUndefined(value)) {
      const options = items?.filter((item) => value.includes(item.id as ValueType));
      setSelectOption(options || []);
      setSelectValue(value);
    }
  }, [value]);
  const isItemSelected = (value: OptionType) => {
    return selectedOption?.some((item) => item.id === value.id);
  };

  useEffect(() => {
    if (items && items.length) {
      overLayRef.current = items;
    }
  }, [loading]);
  return (
    <div
      className={classNames("menu-items", {
        [className]: className,
      })}
    >
      {loading ? (
        <Spin tip="Loading...">
          <div className="items h-60 overflow-y-auto">
            {overLayRef.current?.map((item, _index) => (
              <div className="menu-item-picker page-content overlay-item" key={_index}>
                <p className="mb-3">
                  <Checkbox checked={isItemSelected(item)} onChange={(ev) => selectItem(item)}>
                    {item.name ? item.name : item.title ? item.title : ""}
                  </Checkbox>
                </p>
              </div>
            ))}
          </div>
        </Spin>
      ) : (
        // <div className="items h-56 overflow-y-auto mb-4">
        //   {items?.map((item) => (
        //     <div className={classNames("menu-item-picker page-content", {})} key={item.id}>
        //       <p className="mb-3">
        //         <Checkbox checked={isItemSelected(item)} onChange={(ev) => selectItem(item)}>
        //           {item.name ? item.name : item.title ? item.title : ""}
        //         </Checkbox>
        //       </p>
        //     </div>
        //   ))}
        // </div>
        <div className="h-56 overflow-y-auto mb-4">
          <MenuBoxListSelect.Items items={items} isItemSelected={isItemSelected} onSelect={selectItem} depth={0} />
        </div>
      )}
      <div className="actions pt-4 -ml-4 -mr-4 px-4 border-t flex justify-between items-center">
        <Pagination
          simple
          defaultCurrent={1}
          pageSize={pagination?.pageSize}
          current={pagination?.pageCurrent}
          size="small"
          total={pagination?.totalItem}
          hideOnSinglePage
          onChange={pagination?.onChange}
          disabled={loading}
        />
        <Button type="primary" size="small" ghost onClick={handleAdd} disabled={loading}>
          Thêm vào menu
        </Button>
      </div>
    </div>
  );
};
export default MenuBoxListSelect;

interface MenuBoxSelectItemsProps<ValueType, OptionType extends BaseOptionType> {
  items: MenuBoxListSelectProps<ValueType, OptionType>["items"];
  isItemSelected: (item: OptionType) => boolean;
  onSelect?: (item: OptionType) => void;
  depth: number;
}

MenuBoxListSelect.Items = function MenuBoxSelectItems<ValueType, OptionType extends BaseOptionType>({
  isItemSelected,
  items,
  depth,
  onSelect,
}: MenuBoxSelectItemsProps<ValueType, OptionType>) {
  return (
    <div
      className={classNames("items mb-4", {
        "pl-6": depth === 1,
        "pl-12": depth === 2,
      })}
    >
      {items?.map((item, _index) => (
        <div className={classNames("menu-item-picker page-content")} key={`${depth}-${_index}`}>
          <div className="mb-3">
            <Checkbox checked={isItemSelected(item)} onChange={(ev) => onSelect?.(item)}>
              {item.name ? item.name : item.title ? item.title : ""}
            </Checkbox>
          </div>
          <>
            {item?.children?.length ? (
              <MenuBoxSelectItems
                items={item.children}
                isItemSelected={isItemSelected}
                depth={depth + 1}
                onSelect={onSelect}
              />
            ) : null}
          </>
        </div>
      ))}
    </div>
  );
};
