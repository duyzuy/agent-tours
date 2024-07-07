const BoxSearchSkeleton = () => {
  return (
    <div className="bg-white py-4 rounded-md max-w-2xl lg:px-8 px-4 md:px-6 mx-auto">
      <div className="animate-pulse">
        <div className="lg:grid lg:grid-cols-4 gap-4 space-y-4 lg:space-y-0">
          <div className="lg:grid lg:grid-cols-2 lg:col-span-3 gap-4 space-y-4 lg:space-y-0">
            <div className="bg-slate-100 rounded-lg h-8"></div>
            <div className="bg-slate-100 rounded-lg h-8"></div>
          </div>
          <div className="bg-slate-100 rounded-lg h-8 max-w-[180px]"></div>
        </div>
      </div>
    </div>
  );
};
export default BoxSearchSkeleton;
