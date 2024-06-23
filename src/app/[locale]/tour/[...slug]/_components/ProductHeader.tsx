import { useTranslations } from "next-intl";

interface ProductHeaderProps {
    name?: string;
    tourCode?: string;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({ name, tourCode }) => {
    const t = useTranslations("String");
    return (
        <div className="tour-content-head mb-6">
            <h1 className="text-xl text-primary-default font-bold">{name}</h1>
            <p className="text-red-500 text-lg font-bold">
                {`${t("productSingle.tourCode")} ${tourCode}`}
            </p>
        </div>
    );
};
export default ProductHeader;
