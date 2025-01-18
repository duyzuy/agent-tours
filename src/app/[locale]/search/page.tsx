"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { LangCode } from "@/models/management/cms/language.interface";
import { BoxSearchBookingSkeleton, BoxSearchBookingContainerProps } from "../_components/BoxSearchBookingContainer";
import { useSearchTemplateTourMutation } from "@/mutations/fe/searchTour";
import { Spin } from "antd";
import { IFeTemplateProductItem } from "@/models/fe/productItem.interface";
import EmptySearch from "./_components/EmptySearch";

const DynamicTourCardItem = dynamic(() => import("@/components/frontend/TourCard"), {
  loading: () => <>loading</>,
  ssr: true,
});

import { useLocale } from "next-intl";

interface PageProps {
  params: { locale: LangCode };
  searchParams: { [key: string]: string | string[] | undefined };
}

const DynamicSearchBox = dynamic(() => import("../_components/BoxSearchBookingContainer"), {
  loading: () => (
    <div className="container mx-auto">
      <BoxSearchBookingSkeleton />
    </div>
  ),
  ssr: false,
});

const contentStyle: React.CSSProperties = {
  padding: "30px 100px",
  borderRadius: 4,
};

export default function FeSearchPage({ params, searchParams }: PageProps) {
  // const { locale } = params;

  const { mutate: onSearch, isPending, isIdle } = useSearchTemplateTourMutation();

  const [productList, setProductList] = useState<IFeTemplateProductItem[]>([]);
  const handleSubmitSearch: BoxSearchBookingContainerProps["onSubmit"] = (data) => {
    console.log("submit search");
    console.log(data);

    onSearch(data, {
      onSuccess(data, variables, context) {
        setProductList(data.result);
      },
      onError(error, variables, context) {
        console.log(error);
      },
    });
  };
  const content = <div style={contentStyle} />;
  return (
    <div className="page-search">
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
          onSubmit={handleSubmitSearch}
          className="absolute -bottom-[125px] md:relative md:bottom-auto md:left-auto md:translate-x-0 left-[50%] -translate-x-[50%]"
          isLoading={isPending}
        />
      </div>
      <div className="page-bottom py-12 container mx-auto px-4 md:px-6 lg:px-8 md:pt-8 pt-[150px]">
        {isIdle ? null : (
          <>
            {isPending ? (
              <div className="loading flex items-center justify-center py-8">
                <Spin tip="Đang tìm kiếm...">{content}</Spin>
              </div>
            ) : (
              <>
                {productList.length ? (
                  <div className="grid md:grid-cols-4 grid-cols-2 gap-4 lg:gap-6">
                    {productList?.map((product) => (
                      <DynamicTourCardItem
                        key={product.recId}
                        templateId={product.recId}
                        tourCode={product.code}
                        sellables={product.sellables}
                        depart={product.depart}
                        cms={product.cms}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptySearch />
                )}
              </>
            )}
          </>
        )}
        {/* <FlashSale /> */}
        {/* <LineSpacing spaceY={12} className="lg:px-0 px-4" /> */}
      </div>
    </div>
  );
}
