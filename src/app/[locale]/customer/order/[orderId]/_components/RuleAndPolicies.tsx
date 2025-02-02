import { IFeOrderDetail } from "@/models/fe/order.interface";
import React from "react";

interface RuleAndPoliciesProps {
  items: IFeOrderDetail["rulesAndPolicies"];
}
const RuleAndPolicies: React.FC<RuleAndPoliciesProps> = ({ items }) => {
  return <div></div>;
};

export default RuleAndPolicies;
