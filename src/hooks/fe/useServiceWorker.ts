import { useEffect } from "react";

const useServiceWorker = () => {
  const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.register("/service-worker.js", {
          scope: "/",
        });

        if (registration.installing) {
          console.log("Service worker installing");
        } else if (registration.waiting) {
          console.log("Service worker installed");
        } else if (registration.active) {
          console.log("Service worker active");
        }
        navigator.serviceWorker.oncontrollerchange = (ev) => {
          console.log("New service worker activated");
        };
        const keyList = await caches.keys();
      } catch (error) {
        console.error(`Registration failed with ${error}`);
      }
    }
  };

  useEffect(() => {
    //  registerServiceWorker();
  }, []);
};
export default useServiceWorker;
