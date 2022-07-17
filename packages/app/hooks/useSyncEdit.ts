import { useCallback, useEffect } from "react";
import { useSWRConfig } from "swr";

import { useSocket } from "../components/SocketProvider";

const useSyncEdit = () => {
  const { mutate } = useSWRConfig();
  const socket = useSocket();

  const updatedListener = useCallback(
    (msg: { updatedUrl: string | undefined }) => {
      const { updatedUrl } = msg;
      if (updatedUrl) {
        mutate(updatedUrl);
      }
    },
    [mutate]
  );

  useEffect(() => {
    socket?.on("updated", updatedListener);
    return () => {
      socket?.removeListener("updated");
    };
  }, [socket, updatedListener]);
};

export default useSyncEdit;
