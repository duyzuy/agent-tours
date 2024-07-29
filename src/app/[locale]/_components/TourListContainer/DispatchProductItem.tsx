"use client";
import { FeProductItem } from "@/models/fe/productItem.interface";
import { useLanguage } from "../../hooks/useLanguage";
import { useEffect } from "react";
interface DispatchProductItemProps {
  data?: any;
}
const DispatchProductItem: React.FC<DispatchProductItemProps> = ({ data }) => {
  const [state, dispatch] = useLanguage();

  //   console.log(data);
  useEffect(() => {}, []);

  return null;
};
export default DispatchProductItem;
