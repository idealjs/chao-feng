import { useEffect } from "react";
import { applyUpdate } from "yjs";

import { useSocket } from "../../features/SocketProvider";
import usePropertiesDoc from "./usePropertiesDoc";

const useSyncBlockDoc = (blockId: string) => {
  const socket = useSocket();

  const propertiesDoc = usePropertiesDoc(blockId);

  useEffect(() => {
    const listener = (msg: { blockId: string; update: ArrayBuffer }) => {
      console.group("[debug] PROPERTIES_DOC_UPDATED");
      if (propertiesDoc != null && msg.blockId === blockId) {
        applyUpdate(propertiesDoc, new Uint8Array(msg.update), socket);
      }
      console.groupEnd();
    };
    socket?.on("PROPERTIES_DOC_UPDATED", listener);

    return () => {
      socket?.off("PROPERTIES_DOC_UPDATED", listener);
    };
  }, [propertiesDoc, blockId, socket]);

  useEffect(() => {
    const listener = (update: Uint8Array, origin?: any) => {
      console.group("[debug] LOCAL_PROPERTIES_DOC_UPDATED");
      if (origin !== socket) {
        socket?.emit("PROPERTIES_DOC_UPDATED", {
          blockId,
          update,
        });
      }
      console.groupEnd();
    };
    propertiesDoc?.on("update", listener);
    return () => {
      propertiesDoc?.off("update", listener);
    };
  }, [propertiesDoc, blockId, socket]);
};

export default useSyncBlockDoc;
