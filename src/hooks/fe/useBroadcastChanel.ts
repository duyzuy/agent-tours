import { useMemo, useRef, useEffect, useCallback } from "react";

const channelInstances: { [key: string]: BroadcastChannel } = {};

export const getSingletonChannel = (name: string): BroadcastChannel => {
  if (!channelInstances[name]) {
    channelInstances[name] = new BroadcastChannel(name);
  }
  return channelInstances[name];
};

export default function useBroadcastChannel<T>(channelName: string, onMessageReceived: (message: T) => void) {
  const channel = useMemo(() => getSingletonChannel(channelName), [channelName]);
  const isSubscribed = useRef(false);

  useEffect(() => {
    // || process.env.NODE_ENV !== "development"
    if (!isSubscribed.current) {
      channel.onmessage = (event) => onMessageReceived(event.data);
    }
    return () => {
      if (isSubscribed.current) {
        channel.close();
        isSubscribed.current = true;
      }
    };
  }, []);

  const postMessage = useCallback(
    (message: T) => {
      channel?.postMessage(message);
    },
    [channel],
  );

  return {
    postMessage,
  };
}
