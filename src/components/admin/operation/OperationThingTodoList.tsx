import { EInventoryType } from "@/models/management/core/inventoryType.interface";
import { OperationThingTodoListResponse } from "@/models/management/core/operation/operationThingTodo.interface";
import { formatDate } from "@/utils/date";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Card, Divider, Space, Tabs, TabsProps, Tag } from "antd";
import classNames from "classnames";
import React, { useMemo } from "react";

type OperationThingTodoItem = OperationThingTodoListResponse["result"][number];
interface OperationThingTodoListProps {
  className?: string;
  items: OperationThingTodoListResponse["result"];
}
const OperationThingTodoList: React.FC<OperationThingTodoListProps> = ({ className = "", items }) => {
  const groupingTodoList = useMemo(() => {
    return items.reduce<{ [key in EInventoryType]?: OperationThingTodoItem[] }>((acc, item) => {
      if (acc[item.type]) {
        acc = {
          ...acc,
          [item.type]: [...(acc[item.type] || []), item],
        };
      } else {
        acc = { ...acc, [item.type]: [item] };
      }
      return acc;
    }, {});
  }, [items]);
  let tabItems: TabsProps["items"] = [];

  Object.entries(groupingTodoList)?.forEach(([key, items]) => {
    tabItems = [
      ...(tabItems || []),
      {
        label: key,
        key: key,
        children: (
          <div className="max-h-96 overflow-y-auto -mx-3 p-3 flex flex-col gap-y-3">
            {items?.map(({ deadline, deadlineId, preDeadline, remark, type, status }) => (
              <Card
                className="todo-item"
                key={deadlineId}
                size="small"
                title={
                  <div className="flex items-center justify-between">
                    <Space className="!text-xs font-normal">
                      <ClockCircleOutlined />
                      <div className="flex">
                        <div className="date">{deadline ? formatDate(deadline) : null}</div>
                        {preDeadline ? (
                          <>
                            <span className="mx-2">|</span>
                            <div className="pre-date">{formatDate(preDeadline)}</div>
                          </>
                        ) : null}
                      </div>
                    </Space>
                    <Tag color={status === "NEW" ? "blue" : "green"} bordered={false} className="!mr-0">
                      {status === "NEW" ? "Mới" : status === "DONE" ? "Hoàn thành" : "Không xác định"}
                    </Tag>
                  </div>
                }
              >
                <div className="content">{remark}</div>
              </Card>
            ))}
          </div>
        ),
      },
    ];
  }, []);

  return (
    <Card
      size="small"
      className={classNames("info border w-full rounded-md p-4", {
        [className]: className,
      })}
    >
      <h3 className="font-semibold text-lg">Công việc cần làm</h3>
      <Divider style={{ margin: "12px 0" }} />
      <Tabs items={tabItems} />
    </Card>
  );
};

export default OperationThingTodoList;
