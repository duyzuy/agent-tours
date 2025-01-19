import ProductSummaryCard from "@/components/frontend/skeletons/ProductSummaryCard";
import ProductGalleries from "@/components/frontend/skeletons/ProductGalleries";
export default function SingleTourLoading() {
  return (
    <div>
      <div className="container mx-auto pt-3 lg:py-6 lg:px-8 md:px-6 px-3">
        <div className="flex flex-wrap items-start">
          <div className="tour-contents w-full lg:w-8/12 lg:pr-8">
            <ProductGalleries />
          </div>
          <ProductSummaryCard />
        </div>
      </div>
    </div>
  );
}
