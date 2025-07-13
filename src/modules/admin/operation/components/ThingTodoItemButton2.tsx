import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge, Button, Space, Spin, Tag, Divider, Empty, Drawer } from "antd";
import { BellOutlined, ClockCircleOutlined } from "@ant-design/icons";
import {
  IOperationThingTodo,
  OperationThingTodoQueryParams,
} from "@/models/management/core/operation/operationThingTodo.interface";
import { useGetOperationThingTodoList } from "@/queries/core/operation";
import { formatDate } from "@/utils/date";
import { useThemeMode } from "@/context";
import classNames from "classnames";
import styled from "styled-components";
import InventoryTypesFilter, { InventoryTypesFilterProps } from "./InventoryTypesFilter";
import { EInventoryType } from "@/models/management/core/inventoryType.interface";

const ThingTodoItemButton2 = () => {
  const [open, setOpen] = useState(false);

  const [themeMode] = useThemeMode();
  const pathname = usePathname();
  const [thingsTodoQueryParams, setThingTodoQueryParams] = useState<OperationThingTodoQueryParams>(
    () =>
      new OperationThingTodoQueryParams(
        {
          status: undefined,
          operationId: undefined,
          numberOfDayFromToday: 30,
          type: undefined,
        },
        1,
        100,
        { direction: "desc", sortColumn: "deadlineId" },
      ),
  );

  const { data: todoList, isLoading } = useGetOperationThingTodoList({
    queryParams: thingsTodoQueryParams,
    enabled: open,
  });

  const handleFilter: InventoryTypesFilterProps["onChange"] = (newType) => {
    setThingTodoQueryParams((prev) => ({
      ...prev,
      requestObject: {
        ...prev.requestObject,
        type: newType,
      },
    }));
  };
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);
  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  useEffect(() => {
    handleClose();
  }, [pathname]);
  return (
    <React.Fragment>
      <Badge dot={true} className="!rounded-full" size="small">
        <Button
          icon={<BellOutlined />}
          type="text"
          shape="circle"
          className={classNames({
            "!text-gray-900 !bg-gray-100": themeMode === "light",
            "!text-gray-100 !bg-gray-800": themeMode === "dark",
          })}
          onClick={handleOpen}
        />
      </Badge>
      <DrawerStyled
        open={open}
        onClose={handleClose}
        width={450}
        destroyOnClose
        title={
          <h3 className="flex gap-x-2 justify-between items-center">
            <span className="text-[16px]">Thông báo</span>
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
              <BellOutlined />
            </div>
          </h3>
        }
      >
        <div className="sticky top-0 bg-white z-10 px-4 py-4 border-b">
          <InventoryTypesFilter
            value={thingsTodoQueryParams.requestObject?.type as EInventoryType}
            onChange={handleFilter}
          />
        </div>
        <div className="thing-todo-reminder relative">
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Spin tip="Đang tải...">
                <div style={{ width: 320, height: 120, borderRadius: 4 }}></div>
              </Spin>
            </div>
          ) : !todoList?.length ? (
            <div className="flex items-center justify-center">
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                style={{
                  width: 320,
                  height: 120,
                }}
                description="Đang trống."
                className="mx-auto"
              />
            </div>
          ) : (
            <div className="flex flex-col gap-y-3">
              {todoList.map((item, _index) => (
                <React.Fragment key={_index}>
                  {_index !== 0 ? <Divider style={{ margin: "1px 0" }} dashed /> : null}
                  <TodoItem data={item} />
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </DrawerStyled>
    </React.Fragment>
  );
};
export default ThingTodoItemButton2;

const DrawerStyled = styled(Drawer)`
  .travel-drawer-body {
    padding: 0 !important;
  }

  .travel-drawer-body {
    scrollbar-width: thin; /* Firefox */
    scrollbar-color: #c2c2c2 #ffffff; /* Firefox */
  }

  /* WebKit Browsers */
  .travel-drawer-body::-webkit-scrollbar {
    width: 8px; /* Vertical scrollbar */
    height: 8px; /* Horizontal scrollbar */
  }

  .travel-drawer-body::-webkit-scrollbar-track {
    background: #ffffff;
    border-radius: 10px;
  }

  .travel-drawer-body::-webkit-scrollbar-thumb {
    background: #c2c2c2;
    border-radius: 10px;
  }

  .travel-drawer-body::-webkit-scrollbar-thumb:hover {
    background: #c2c2c2;
  }
`;
interface TodoItemProps {
  data: IOperationThingTodo;
}
const TodoItem: React.FC<TodoItemProps> = ({ data }) => {
  const [themeMode, _] = useThemeMode();
  return (
    <div className="px-6 py-4 rounded-md">
      <Link
        href={`/portal/operation/${data.operationId}`}
        className={classNames("", {
          "!text-gray-400": themeMode === "dark",
          "!text-gray-800": themeMode === "light",
        })}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold">{data.type}</span>
          <Tag
            color={
              data.status === "NEW"
                ? "blue"
                : data.status === "DONE"
                  ? "green"
                  : data.status === "PRE_DEADLINE"
                    ? "orange"
                    : data.status === "EXPIRED"
                      ? "red"
                      : undefined
            }
            bordered={false}
            className="!mr-0 font-normal"
          >
            {data.status === "NEW"
              ? "Mới"
              : data.status === "DONE"
                ? "Hoàn thành"
                : data.status === "PRE_DEADLINE"
                  ? "Hết hạn đợt 1"
                  : data.status === "EXPIRED"
                    ? "Hết hạn"
                    : "Không xác định"}
          </Tag>
        </div>
        <div className="mb-2">{data.remark || "--"}</div>
        <div className="flex-1 flex gap-x-1 opacity-60">
          <ClockCircleOutlined />
          <Space className="text-xs">
            <div>{formatDate(data.preDeadline)}</div>
            <span className="text-xs text-gray-500">|</span>
            <div>{formatDate(data.deadline)}</div>
          </Space>
        </div>
      </Link>
    </div>
  );
};
