import { useEffect } from "react";
import { Socket } from "socket.io-client";
import { applyUpdate } from "yjs";

import { useYDoc } from "./YDocProvider";

const useYDocSocket = (
  socket: Socket | null,
  options?: { enableV2Update?: boolean }
) => {
  const { enableV2Update } = options ?? {};
  const yDoc = useYDoc();

  useEffect(() => {
    if (!enableV2Update) {
      const listener = (msg: { update: ArrayBuffer }) => {
        console.group("[debug] DOC_UPDATE");
        console.debug("yDoc is null?", yDoc == null);
        console.groupEnd();
        if (yDoc != null) {
          applyUpdate(yDoc, new Uint8Array(msg.update));
        }
      };
      socket?.on("DOC_UPDATE", listener);
      return () => {
        socket?.off("DOC_UPDATE", listener);
      };
    }
  }, [enableV2Update, socket, yDoc]);
};

export default useYDocSocket;
