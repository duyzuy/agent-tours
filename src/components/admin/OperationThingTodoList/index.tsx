import { EInventoryType } from "@/models/management/core/inventoryType.interface";
import { IOperation } from "@/models/management/core/operation.interface";
import {
  IOperationThingTodo,
  OperationThingTodoListResponse,
} from "@/models/management/core/operationThingTodo.interface";
import { formatDate } from "@/utils/date";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Tabs, TabsProps, Tag } from "antd";
import classNames from "classnames";
import React, { Component, useMemo } from "react";

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
          <div className="w-[320px]">
            {items?.map(({ deadline, deadlineId, preDeadline, remark, type, status }) => (
              <div className="todo-item border-b mb-2 pb-2" key={deadlineId}>
                <div className="p-1 hover:bg-gray-100 rounded-md relative">
                  <Tag
                    color={status === "NEW" ? "blue" : "green"}
                    bordered={false}
                    className="!mr-0 !absolute right-0 bottom-0"
                  >
                    {status === "NEW" ? "Mới" : status === "DONE" ? "Hoàn thành" : "Không xác định"}
                  </Tag>
                  <div className="mb-2">{remark}</div>
                  <div className="flex gap-2 text-xs">
                    <ClockCircleOutlined />
                    <span className="pre-date">{preDeadline ? formatDate(preDeadline) : null}</span>
                    <span>|</span>
                    <span className="date">{deadline ? formatDate(deadline) : null}</span>
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
      className={classNames("info border rounded-md p-4", {
        [className]: className,
      })}
    >
      <div className="box-head mb-3 pb-3 border-b">
        <h3 className="font-semibold">Công việc cần làm</h3>
      </div>
      <div className="box-content flex gap-x-3">
        <Tabs type="card" tabPosition="left" items={tabItems} />
      </div>
    </div>
  );
};

export default OperationThingTodoList;
