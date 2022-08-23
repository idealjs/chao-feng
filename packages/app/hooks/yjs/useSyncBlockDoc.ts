import { useEffect } from "react";
import { applyUpdate } from "yjs";

import { useSocket } from "../../features/SocketProvider";
import useBlockDoc from "./useBlockDoc";

const useSyncBlockDoc = (blockId: string) => {
  const socket = useSocket();

  const blockDoc = useBlockDoc(blockId);

  useEffect(() => {
    const listener = (msg: { blockId: string; update: ArrayBuffer }) => {
      console.group("[debug] BLOCK_DOC_UPDATED");
      if (blockDoc != null && msg.blockId === blockId) {
        applyUpdate(blockDoc, new Uint8Array(msg.update), socket);
      }
      console.groupEnd();
    };
    socket?.on("BLOCK_DOC_UPDATED", listener);

    return () => {
      socket?.off("BLOCK_DOC_UPDATED", listener);
    };
  }, [blockDoc, blockId, socket]);

  useEffect(() => {
    const listener = (update: Uint8Array, origin?: any) => {
      console.group("[debug] LOCAL_BLOCK_DOC_UPDATED");
      if (origin !== socket) {
        socket?.emit("BLOCK_DOC_UPDATED", {
          blockId,
          update,
        });
      }
      console.groupEnd();
    };
    blockDoc?.on("update", listener);
    return () => {
      blockDoc?.off("update", listener);
    };
  }, [blockDoc, blockId, socket]);
};

export default useSyncBlockDoc;
