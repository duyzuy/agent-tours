import { useMemo, useState } from "react";
import classNames from "classnames";
import { isUndefined } from "lodash";
import { Button, Card, Checkbox, Divider, Form, Popover, Select, Space, Tabs, Tag } from "antd";
import FormItem from "@/components/base/FormItem";
import { EInventoryType } from "@/models/management/core/inventoryType.interface";
import {
  IOperationThingTodo,
  OperationThingTodoQueryParams,
} from "@/models/management/core/operation/operationThingTodo.interface";
import { useGetOperationThingTodoList } from "@/queries/core/operation";
import { formatDate } from "@/utils/date";
import { ClockCircleOutlined, FilterOutlined } from "@ant-design/icons";

interface OperationThingTodoItemListContainerProps {
  operationId?: number;
}
const OperationThingTodoItemListContainer: React.FC<OperationThingTodoItemListContainerProps> = ({ operationId }) => {
  const thingsQueryParams = new OperationThingTodoQueryParams(
    {
      status: undefined,
      operationId: operationId,
      numberOfDayFromToday: 20,
      type: undefined,
    },
    1,
    100,
    { direction: "desc", sortColumn: "deadlineId" },
  );

  const [queryParams, setQueryParams] = useState(thingsQueryParams);
  const { data: todoList, isLoading } = useGetOperationThingTodoList({
    queryParams: queryParams,
    enabled: true,
  });
  type OperationThingTodoItem = Exclude<typeof todoList, undefined>[number];

  const handleChangeStatus: ButtonFilterThingTodoProps["onChangeStatus"] = (status) => {
    setQueryParams((prev) => ({ ...prev, requestObject: { ...prev.requestObject, status: status } }));
  };
  const handleChangeDays: ButtonFilterThingTodoProps["onChangeDays"] = (day: number) => {
    setQueryParams((prev) => ({ ...prev, requestObject: { ...prev.requestObject, numberOfDayFromToday: day } }));
  };
  const thingTodoListGroupByType = useMemo(() => {
    return todoList?.reduce<{ [key in EInventoryType]?: OperationThingTodoItem[] }>((acc, item) => {
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
  }, [todoList]);

  return (
    <Card size="small" className={classNames("info border w-full rounded-md p-4")}>
      <div className="flex justify-between">
        <h3 className="font-semibold text-lg">Lời nhắc</h3>
        <ButtonFilterThingTodo
          status={queryParams.requestObject?.status}
          numberOfDayFromToday={queryParams.requestObject?.numberOfDayFromToday}
          onChangeDays={handleChangeDays}
          onChangeStatus={handleChangeStatus}
        />
      </div>
      <Divider style={{ margin: "12px 0" }} />
      <Tabs
        items={
          thingTodoListGroupByType &&
          Object.entries(thingTodoListGroupByType)?.map(([key, items]) => ({
            label: <span className="text-xs">{key}</span>,
            key: key,
            children: (
              <div className="max-h-96 overflow-y-auto -mx-3 p-3 flex flex-col gap-y-3">
                {items?.map((item, _index) => (
                  <ThingTodoCardItem key={_index} {...item} loading={isLoading} />
                ))}
              </div>
            ),
          }))
        }
        size="small"
      />
    </Card>
  );
};
export default OperationThingTodoItemListContainer;

interface ButtonFilterThingTodoProps {
  status: Exclude<OperationThingTodoQueryParams["requestObject"], undefined>["status"];
  numberOfDayFromToday?: number;
  onChangeStatus: (status: Exclude<OperationThingTodoQueryParams["requestObject"], undefined>["status"]) => void;
  onChangeDays: (days: number) => void;
}
const ButtonFilterThingTodo = ({
  status,
  numberOfDayFromToday,
  onChangeStatus,
  onChangeDays,
}: ButtonFilterThingTodoProps) => {
  return (
    <Popover
      title="Lọc"
      placement={"bottomRight"}
      content={
        <div className="w-[180px]">
          <Form layout="vertical">
            <FormItem label="Trạng thái">
              <Space wrap>
                <Checkbox checked={!status} onChange={() => onChangeStatus(undefined)}>
                  Tất cả
                </Checkbox>
                {["NEW", "EXPIRED", "PRE_DEADLINE", "DONE"].map((item) => (
                  <div key={item}>
                    <Checkbox
                      checked={status === item}
                      onChange={() =>
                        onChangeStatus(
                          item as Exclude<OperationThingTodoQueryParams["requestObject"], undefined>["status"],
                        )
                      }
                    >
                      {item === "NEW"
                        ? "Mới"
                        : item === "DONE"
                        ? "Hoàn thành"
                        : item === "PRE_DEADLINE"
                        ? "Hết hạn đợt 1"
                        : item === "EXPIRED"
                        ? "Hết hạn"
                        : "Không xác định"}
                    </Checkbox>
                  </div>
                ))}
              </Space>
            </FormItem>
            <FormItem label="Ngày gần nhất">
              <Select
                value={numberOfDayFromToday}
                options={[
                  { label: "5 ngày", value: 5 },
                  { label: "10 ngày", value: 10 },
                  { label: "15 ngày", value: 15 },
                  { label: "25 ngày", value: 25 },
                ]}
                onChange={onChangeDays}
              />
            </FormItem>
          </Form>
        </div>
      }
    >
      <Button type="text" size="small" icon={<FilterOutlined />}>
        Lọc
      </Button>
    </Popover>
  );
};
interface ThingTodoCardItemProps {
  deadline: string;
  preDeadline: string;
  deadlineId: number;
  remark: string;
  status: IOperationThingTodo["status"];
  loading?: boolean;
}
const ThingTodoCardItem = ({ deadline, deadlineId, preDeadline, remark, status, loading }: ThingTodoCardItemProps) => {
  return (
    <Card
      className="todo-item"
      loading={loading}
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
          <Tag
            color={
              status === "NEW"
                ? "blue"
                : status === "DONE"
                ? "green"
                : status === "PRE_DEADLINE"
                ? "orange"
                : status === "EXPIRED"
                ? "red"
                : undefined
            }
            bordered={false}
            className="!mr-0 font-normal"
          >
            {status === "NEW"
              ? "Mới"
              : status === "DONE"
              ? "Hoàn thành"
              : status === "PRE_DEADLINE"
              ? "Hết hạn đợt 1"
              : status === "EXPIRED"
              ? "Hết hạn"
              : "Không xác định"}
          </Tag>
        </div>
      }
    >
      <div className="content">{remark}</div>
    </Card>
  );
};
