import Image from "next/image";
const BannerSection = () => {
  return (
    <section className="banners">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
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
