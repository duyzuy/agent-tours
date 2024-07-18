"use client";
import dynamic from "next/dynamic";
import BoxSearchSkeleton from "../../_components/BoxSearchTourFe/BoxSearchSkeleton";

const DynamicSearchBox = dynamic(() => import("../../_components/BoxSearchTourFe"), {
  loading: () => (
    <div className="container mx-auto">
      <BoxSearchSkeleton />
    </div>
  ),
  ssr: false,
});

const DestinationSearch = () => {
  return (
    <div
      className="search-wraper py-8 min-h-[280px] lg:min-h-[320px] flex items-end relative z-10"
      style={{
        background: "url('/assets/images/search-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <DynamicSearchBox
        onSubmit={() => {}}
        className="absolute -bottom-[125px] md:relative md:bottom-auto md:left-auto md:translate-x-0 left-[50%] -translate-x-[50%]"
        isLoading={false}
      />
    </div>
  );
};
export default DestinationSearch;
