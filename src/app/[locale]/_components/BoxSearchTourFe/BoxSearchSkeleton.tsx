const BoxSearchSkeleton = () => {
  return (
    <div className="bg-white rounded-md max-w-2xl px-3 md:px-4 py-4 mx-auto">
      <div className="animate-pulse">
        <div className="lg:grid lg:grid-cols-4 gap-4 space-y-4 lg:space-y-0">
          <div className="lg:grid lg:grid-cols-2 lg:col-span-3 gap-3 space-y-3 lg:space-y-0">
            <div className="bg-slate-100 rounded-md h-10"></div>
            <div className="bg-slate-100 rounded-md h-10"></div>
          </div>
          <div className="bg-slate-100 rounded-md h-10 max-w-[180px]"></div>
        </div>
      </div>
    </div>
  );
};
export default BoxSearchSkeleton;
