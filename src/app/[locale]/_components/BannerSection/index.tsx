import Image from "next/image";

interface BannerSectionProps {
  title?: string;
}
const BannerSection: React.FC<BannerSectionProps> = ({ title = "Ưu đãi dành cho bạn" }) => {
  return (
    <section className="banners">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="tour__list-head pt-8 pb-4">
          <h3 className="text-xl lg:text-2xl font-[500]">{title}</h3>
        </div>
        <div className="items-center grid grid-cols-2 lg:grid-cols-3 lg:gap-6 gap-3">
          <div className="banner overflow-hidden">
            <Image src="/assets/images/banner-1.jpg" alt="banner" width={900} height={600} className="rounded-md" />
          </div>
          <div className="banner  overflow-hidden">
            <Image src="/assets/images/banner-2.jpg" alt="banner" width={900} height={600} className="rounded-md" />
          </div>
          <div className="banner overflow-hidden">
            <Image src="/assets/images/banner-3.jpg" alt="banner" width={900} height={600} className="rounded-md" />
          </div>
        </div>
      </div>
    </section>
  );
};
export default BannerSection;
