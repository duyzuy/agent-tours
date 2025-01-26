import { EInventoryType } from "@/models/management/core/inventoryType.interface";
import { OperationThingTodoListResponse } from "@/models/management/core/operation/operationThingTodo.interface";
import { formatDate } from "@/utils/date";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Tabs, TabsProps, Tag } from "antd";
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
          <div className="max-h-96 overflow-y-auto -mx-4 p-4">
            {items?.map(({ deadline, deadlineId, preDeadline, remark, type, status }) => (
              <div className="todo-item border p-3 mb-3 rounded-md" key={deadlineId}>
                <div className="relative">
                  <Tag
                    color={status === "NEW" ? "blue" : "green"}
                    bordered={false}
                    className="!mr-0 !absolute right-0 bottom-0"
                  >
                    {status === "NEW" ? "Mới" : status === "DONE" ? "Hoàn thành" : "Không xác định"}
                  </Tag>
                  <div className="mb-2">{remark}</div>
                  <div className="flex gap-2 text-xs opacity-80">
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        ),
      },
    ];
  }, []);
  return (
    <div
      className={classNames("info border w-full rounded-md p-4", {
        [className]: className,
      })}
    >
      <div className="box-head mb-3 pb-3 border-b">
        <h3 className="font-semibold text-lg">Công việc cần làm</h3>
      </div>
      <Tabs items={tabItems} />
    </div>
  );
};

export default OperationThingTodoList;
