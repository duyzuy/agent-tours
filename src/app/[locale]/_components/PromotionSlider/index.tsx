import React from "react";
import Image from "next/image";
import { Link } from "@/utils/navigation";
import PromotionCarousel from "./PromotionCarousel";
interface PromotionSliderProps {
  items: { id: number; thumb?: string; title: string; slug: string; date: string; description: string }[];
  title?: string;
}
const PromotionSlider: React.FC<PromotionSliderProps> = ({ items, title }) => {
  const ITEMS = [
    {
      id: 1,
      name: "Banner 1",
      slug: "/post/chill-he-cuc-nhiet-voi-loat-uu-dai-qua-tang-tu-vietravel-va-enchanteur",
      thumb: "/assets/images/banner-n1.jpg",
    },
    {
      id: 2,
      name: "Banner 2",
      slug: "/post/vui-he-cuc-tiet-kiem-voi-voucher-giam-gia-len-den-60-tu-vietravel-va-mykingdom",
      thumb: "/assets/images/banner-n2.jpg",
    },
    {
      id: 3,
      name: "Banner 3",
      slug: "/post/du-lich-tha-ga-thoa-suc-rinh-uu-dai-tu-anthai-va-ocb",
      thumb: "/assets/images/banner-n3.jpg",
    },
    {
      id: 4,
      name: "Banner 4",
      slug: "/post/deal-sieu-hot-tu-vietravel-x-momo-giam-den-250-000-dong-khi-thanh-toan-tour-du-lich-tron-goi",
      thumb: "/assets/images/banner-n4.jpg",
    },
  ];

  return (
    <PromotionCarousel>
      {ITEMS.map((_item) => (
        <div className="banner overflow-hidden">
          <Link href={_item.slug}>
            <Image src={_item.thumb} alt={_item.name} width={900} height={600} className="rounded-md" />
          </Link>
        </div>
      ))}
    </PromotionCarousel>
  );
};

function PromotionSliderSkeleton() {
  return (
    <div className="container md:px-6 px-3 lg:px-8 mx-auto">
      <div className="animate-pulse border bg-white rounded-md lg:p-6 p-3 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-slate-100 rounded-sm aspect-video"></div>
          <div className="bg-slate-100 rounded-sm aspect-video lg:block hidden"></div>
          <div className="bg-slate-100 rounded-sm aspect-video lg:block hidden"></div>
        </div>
      </div>
    </div>
  );
}

export default PromotionSlider;
export { PromotionSliderSkeleton };
