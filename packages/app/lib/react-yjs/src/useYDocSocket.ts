import { useEffect } from "react";
import { Socket } from "socket.io-client";

import { useYDoc } from "./YDocProvider";

const useYDocSocket = (
  socket: Socket | null,
  options?: { enableV2Update?: boolean }
) => {
  const { enableV2Update } = options ?? {};
  const yDoc = useYDoc();

  useEffect(() => {
    if (enableV2Update) {
      const listener = () => {};
      yDoc?.on("update", listener);
      return () => {
        yDoc?.off("update", listener);
      };
    } else {
      const listener = () => {};
      yDoc?.on("update", listener);
      return () => {
        yDoc?.off("update", listener);
      };
    }
  }, [enableV2Update, yDoc]);

  useEffect(() => {
    if (enableV2Update) {
      const listener = () => {};
      socket?.on("update", listener);
      return () => {
        socket?.off("update", listener);
      };
    } else {
      const listener = () => {};
      socket?.on("update", listener);
      return () => {
        socket?.off("update", listener);
      };
    }
  }, [enableV2Update, socket]);
};

export default useYDocSocket;
