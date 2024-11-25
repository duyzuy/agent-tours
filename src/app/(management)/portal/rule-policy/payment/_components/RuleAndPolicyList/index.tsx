"use client";
import React, { useCallback, useMemo, useState } from "react";

import TableListPage from "@/components/admin/TableListPage";
import { Space, TableProps, Tag } from "antd";

import { columns } from "./columns";
import { IRuleAndPolicyListRs } from "@/models/ruleAndPolicy.interface";
import { IStateProvince } from "@/models/management/region.interface";
import { PolicyCat, PolicyRule } from "@/models/management/core/ruleAndPolicy.interface";

export interface DepositListProps {
  items: IRuleAndPolicyListRs["result"];
  onDelete: (id: number, cb?: () => void) => void;
}
const RuleAndPolicyList: React.FC<DepositListProps> = ({ items, onDelete }) => {
  const expandableProps = React.useMemo<TableProps<IRuleAndPolicyListRs["result"][0]>["expandable"]>(() => {
    return {
      columnWidth: 48,
      expandedRowRender: (record) => (
        <div>
          <div className="mb-3">
            <p className="font-[500]">Điểm đến áp dụng</p>
          </div>
          <Space wrap>
            {record.destList.map((item, _index) => {
              if (item.cat === "REGIONLIST") {
                return (
                  <Tag color="red" key={_index} bordered={false}>
                    {item.regionKey}
                  </Tag>
                );
              }
              if (item.cat === "SUBREGIONLIST") {
                return (
                  <Tag color="pink" key={_index} bordered={false}>
                    {item.subRegionKey}
                  </Tag>
                );
              }
              if (item.cat === "STATEPROVINCELIST") {
                return (
                  <Tag key={_index} bordered={false}>
                    {item.stateProvinceKey}
                  </Tag>
                );
              }
              return (
                <Tag color="blue" key={_index} bordered={false}>
                  {item.countryName}
                </Tag>
              );
            })}
          </Space>
        </div>
      ),
      rowExpandable: (record) => record.cat === PolicyCat.BYDESTINATION,
    };
  }, []);

  return (
    <TableListPage<IRuleAndPolicyListRs["result"][0]>
      scroll={{ x: 1000 }}
      modelName="Chính sách"
      dataSource={items}
      rowKey={"id"}
      columns={columns}
      expandable={expandableProps}
      onDelete={(record) => onDelete(record.id)}
      showActionsLess={false}
      isLoading={false}
      fixedActionsColumn={false}
    />
  );
};
export default RuleAndPolicyList;
