"use client";
import { createContext, useContext } from "react";

export interface TourCardDataContextApi {
  recId?: number;
  name?: string;
  thumbnailUrl?: string;
  href: string;
  tourCode: string;
  startDate?: string;
  endDate?: string;
  openAmount?: number;
  price?: number;
  otherDepartDate?: string[];
  departLocation?: string;
  promotion?: {
    promotionImage?: string;
    promotionLabel?: string;
    promotionLabelType?: "text" | "image" | "";
    promotionReferencePrice?: number;
    promotionValidFrom?: string;
    promotionValidTo?: string;
  };
}

export const TourCardContext = createContext<TourCardDataContextApi | undefined>(undefined);

export const TourCardContextProvider = ({
  children,
  data,
}: {
  children: React.ReactNode;
  data: TourCardDataContextApi;
}) => {
  return <TourCardContext.Provider value={data}>{children}</TourCardContext.Provider>;
};

export const useTourCardContext = () => {
  const context = useContext(TourCardContext);
  if (!context) {
    throw new Error("Hook must use in TourCardContext Provider");
  }
  return context;
};
