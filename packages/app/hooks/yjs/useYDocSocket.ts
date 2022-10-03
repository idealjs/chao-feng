import { useEffect, useMemo, useRef } from "react";
import { Socket } from "socket.io-client";
import { useSnapshot } from "valtio";
import { applyUpdate } from "yjs";

import { useYDoc } from "../../lib/react-yjs";
import usePageId from "../usePageId";
import { syncSuspenseProxy } from "./useSyncPropertiesDoc";

const useYDocSocket = (
  socket: Socket | null,
  options?: { enableV2Update?: boolean }
) => {
  const { enableV2Update } = options ?? {};
  const yDoc = useYDoc();
  const pageId = usePageId();
  const counter = useRef(0);

  const syncConfig = useSnapshot(syncSuspenseProxy);
  const suspense = useMemo(() => {
    if (pageId == null) {
      return false;
    }
    return syncConfig[pageId];
  }, [pageId, syncConfig]);

  useEffect(() => {
    const listener = (update: Uint8Array, origin?: any) => {
      console.group(
        "[debug] LOCAL DOC_UPDATE",
        origin,
        counter.current++,
        yDoc.getMap("prosemirror").toJSON()
      );
      if (origin !== socket && !suspense) {
        socket?.emit("DOC_UPDATE", {
          pageId,
          update,
        });
      }
      console.groupEnd();
    };

    yDoc?.on("update", listener);
    return () => {
      yDoc?.off("update", listener);
    };
  }, [pageId, socket, suspense, yDoc]);

  useEffect(() => {
    if (!enableV2Update) {
      const listener = (msg: { update: ArrayBuffer }) => {
        console.group(
          "[debug] DOC_UPDATE",
          msg.update,
          counter.current++,
          yDoc.getMap("prosemirror").toJSON()
        );
        console.debug("yDoc is null?", yDoc == null);
        console.groupEnd();
        applyUpdate(yDoc, new Uint8Array(msg.update), socket);
      };
      socket?.on("DOC_UPDATE", listener);
      return () => {
        socket?.off("DOC_UPDATE", listener);
      };
    }
  }, [enableV2Update, socket, yDoc]);
};

export default useYDocSocket;
