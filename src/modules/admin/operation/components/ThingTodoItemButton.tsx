import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge, Button, Popover, Space, Spin, Tag, Divider } from "antd";
import { BellOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { OperationThingTodoQueryParams } from "@/models/management/core/operation/operationThingTodo.interface";
import { useGetOperationThingTodoList } from "@/queries/core/operation";
import { formatDate } from "@/utils/date";
import { useThemeMode } from "@/context";
import styled from "styled-components";
import classNames from "classnames";
const ThingTodoItemButton = () => {
  const [open, setOpen] = useState(false);
  const [themeMode, setThemeMode] = useThemeMode();
  const pathname = usePathname();
  const thingsQueryParams = new OperationThingTodoQueryParams(
    {
      status: undefined,
      operationId: undefined,
      numberOfDayFromToday: 30,
      type: undefined,
    },
    1,
    100,
    { direction: "desc", sortColumn: "deadlineId" },
  );

  const [queryParams, _] = useState(thingsQueryParams);
  const { data: todoList, isLoading } = useGetOperationThingTodoList({
    queryParams: queryParams,
    enabled: open,
  });

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  useEffect(() => {
    open === true && setOpen(false);
  }, [pathname]);
  return (
    <div>
      <Popover
        open={open}
        trigger="click"
        onOpenChange={handleOpenChange}
        content={
          <div className="thing-todo-reminder relative">
            <div className="flex justify-between">
              <h3 className="flex gap-x-2">
                <BellOutlined />
                <span className="text-[16px]">Lời nhắc</span>
              </h3>
            </div>
            <Divider style={{ margin: "12px 0" }} />
            {isLoading ? (
              <Spin tip="...loading">
                <div style={{ width: 320, height: 160, background: "rgba(0, 0, 0, 0.05)", borderRadius: 4 }}></div>
              </Spin>
            ) : (
              <ReminderListWraper className="flex flex-col gap-y-3">
                {todoList?.map((item, _index) => (
                  <React.Fragment key={_index}>
                    {_index !== 0 ? <Divider style={{ margin: "1px 0" }} /> : null}
                    <div className="px-3 py-2 hover:bg-gray-100 rounded-md" key={_index}>
                      <Link
                        href={`/portal/operation/${item.operationId}`}
                        className={classNames("", {
                          "!text-gray-400": themeMode === "dark",
                          "!text-gray-800": themeMode === "light",
                        })}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold">{item.type}</span>
                          <Tag
                            color={
                              item.status === "NEW"
                                ? "blue"
                                : item.status === "DONE"
                                ? "green"
                                : item.status === "PRE_DEADLINE"
                                ? "orange"
                                : item.status === "EXPIRED"
                                ? "red"
                                : undefined
                            }
                            bordered={false}
                            className="!mr-0 font-normal"
                          >
                            {item.status === "NEW"
                              ? "Mới"
                              : item.status === "DONE"
                              ? "Hoàn thành"
                              : item.status === "PRE_DEADLINE"
                              ? "Hết hạn đợt 1"
                              : item.status === "EXPIRED"
                              ? "Hết hạn"
                              : "Không xác định"}
                          </Tag>
                        </div>
                        <div className="mb-2">{item.remark || "--"}</div>
                        <div className="flex-1 flex gap-x-1 opacity-60">
                          <ClockCircleOutlined />
                          <Space className="text-xs">
                            <div>{formatDate(item.preDeadline)}</div>
                            <span className="text-xs text-gray-500">|</span>
                            <div>{formatDate(item.deadline)}</div>
                          </Space>
                        </div>
                      </Link>
                    </div>
                  </React.Fragment>
                ))}
              </ReminderListWraper>
            )}
          </div>
        }
      >
        <Badge dot={true} className="!rounded-full" size="small">
          <Button
            icon={<BellOutlined />}
            type="text"
            className={classNames({
              "!text-gray-900 !bg-gray-100": themeMode === "light",
              "!text-gray-100 !bg-gray-800": themeMode === "dark",
            })}
            shape="circle"
          />
        </Badge>
      </Popover>
    </div>
  );
};
export default ThingTodoItemButton;

const ReminderListWraper = styled("div")`
  & {
    height: 560px;
    overflow-y: auto;
    width: 320px

    &::-webkit-scrollbar-track {
      border-radius: 10px;
      background-color: #f1f1f1;
    }

    &::-webkit-scrollbar {
      width: 6px;
      background-color: #f1f1f1;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.1);
      background-color: #d0d0d0;
    }
  }
`;
