import React, { memo } from "react";

const DateSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse flex py-3  bg-slate-100">
      <div className="px-4 w-1/6 py-3">
        <div className="h-3 bg-slate-200 rounded mb-2 w-10 mx-auto"></div>
        <div className="h-3 bg-slate-200 rounded"></div>
      </div>
      <div className="px-4 w-1/6 py-3">
        <div className="h-3 bg-slate-200 rounded mb-2 w-10 mx-auto"></div>
        <div className="h-3 bg-slate-200 rounded"></div>
      </div>
      <div className="px-4 w-1/6 py-3">
        <div className="h-3 bg-slate-200 rounded mb-2 w-10 mx-auto"></div>
        <div className="h-3 bg-slate-200 rounded"></div>
      </div>
      <div className="px-4 w-1/6 py-3">
        <div className="h-3 bg-slate-200 rounded mb-2 w-10 mx-auto"></div>
        <div className="h-3 bg-slate-200 rounded"></div>
      </div>
      <div className="px-4 w-1/6 py-3">
        <div className="h-3 bg-slate-200 rounded mb-2 w-10 mx-auto"></div>
        <div className="h-3 bg-slate-200 rounded"></div>
      </div>
      <div className="px-4 w-1/6 py-3">
        <div className="h-3 bg-slate-200 rounded mb-2 w-10 mx-auto"></div>
        <div className="h-3 bg-slate-200 rounded"></div>
      </div>
      <div className="px-4 w-1/6 py-3">
        <div className="h-3 bg-slate-200 rounded mb-2 w-10 mx-auto"></div>
        <div className="h-3 bg-slate-200 rounded"></div>
      </div>
    </div>
  );
};
export default memo(DateSkeleton);
