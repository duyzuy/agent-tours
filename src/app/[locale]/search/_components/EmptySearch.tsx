import Image from "next/image";
import { useTranslations } from "next-intl";
const EmptySearch = () => {
  const t = useTranslations("String");
  return (
    <div className="empty-search flex items-center justify-center py-6">
      <div className="empty-search__inner text-center">
        <div className="icon relative w-32 h-32 mx-auto mb-3">
          <Image src={"/assets/icons/search.svg"} alt="search" fill className=" object-contain" />
        </div>
        <div className="empty-search__content">
          <h3 className="text-xl font-[500] mb-2">{t("search.notFound")}</h3>
          <p className="text-gray-500">{t("search.retry")}</p>
        </div>
      </div>
    </div>
  );
};
export default EmptySearch;
