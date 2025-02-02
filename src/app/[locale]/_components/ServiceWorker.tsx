"use client";
import { useEffect } from "react";
import { useSession, getSession } from "next-auth/react";
import useServiceWorker from "@/hooks/fe/useServiceWorker";

const ServiceWorker = () => {
  useServiceWorker();

  // const session = useSession();
  // useEffect(() => {
  //   (async () => {
  //     const session2 = await getSession({ triggerEvent: true });
  //     console.log(session2);
  //   })();
  // }, [session]);

  // console.log(session);

  return null;
};
export default ServiceWorker;
