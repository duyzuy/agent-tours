"use client";
import { FeProductItem } from "@/models/fe/productItem.interface";
import { useLanguage } from "../../hooks/useLanguage";
import { useEffect } from "react";
interface DispatchProductItemProps {
    data?: FeProductItem["template"]["cms"][];
}
const DispatchProductItem: React.FC<DispatchProductItemProps> = ({ data }) => {
    const [state, dispatch] = useLanguage();

    console.log(state);
    useEffect(() => {}, []);

    return null;
};
export default DispatchProductItem;
