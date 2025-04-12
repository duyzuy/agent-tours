"use client";
import { useEffect, useState } from "react";

interface Props {
  children?: React.ReactNode;
}
const PureClient: React.FC<Props> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? children : null;
};
export default PureClient;
