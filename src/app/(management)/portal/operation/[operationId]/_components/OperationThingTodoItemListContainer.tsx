import OperationThingTodoList from "@/components/admin/OperationThingTodoList";
import { OperationThingTodoQueryParams } from "@/models/management/core/operationThingTodo.interface";
import { useGetOperationThingTodoList } from "@/queries/core/operation";
import { Spin } from "antd";
import { isUndefined } from "lodash";
import { useState } from "react";

interface OperationThingTodoItemListContainerProps {
  operationId?: number;
}
const OperationThingTodoItemListContainer: React.FC<OperationThingTodoItemListContainerProps> = ({ operationId }) => {
  const thingsQueryParams = new OperationThingTodoQueryParams(undefined, operationId, "NEW", 20);
  const [queryParams, setQueryParams] = useState(thingsQueryParams);
  const { data: todoList, isLoading } = useGetOperationThingTodoList({
    queryParams: queryParams,
    enabled: !isUndefined(operationId),
  });

  return isLoading ? <Spin /> : <OperationThingTodoList items={todoList || []} />;
};
export default OperationThingTodoItemListContainer;
