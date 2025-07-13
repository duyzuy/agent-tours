"use client";
import { usePathname } from "next/navigation";
import { memo, PropsWithChildren, useMemo } from "react";

const BOOKING_ROUTES = ["passenger", "payment", "reservation"] as const;

interface PrimaryMenuWraperClientProps extends PropsWithChildren {}
const PrimaryMenuWraperClient: React.FC<PrimaryMenuWraperClientProps> = ({ children }) => {
  const pathname = usePathname();
  const isBookingProcess = useMemo(() => {
    return BOOKING_ROUTES.some((rKey) => pathname.includes(rKey));
  }, [pathname]);

  if (isBookingProcess) return null;
  return <>{children}</>;
};
export default memo(PrimaryMenuWraperClient);
