import { useMemo, useRef, useEffect, useCallback } from "react";

const channelInstances: Record<string, BroadcastChannel> = {} as const;

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
    if (isSubscribed.current) return;

    channel.onmessage = (event) => onMessageReceived(event.data);

    return () => {
      if (!isSubscribed.current) return;
      channel.close();
      isSubscribed.current = false;
    };
  }, [isSubscribed]);

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
