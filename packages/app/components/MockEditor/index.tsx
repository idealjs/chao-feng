import { useEffect } from "react";
import { bindProxyAndYMap } from "valtio-yjs";
import { applyUpdate } from "yjs";

import { useSocket } from "../../features/SocketProvider";
import usePageId from "../../hooks/usePageId";
import { useYDoc } from "../../lib/react-yjs/src/YDocProvider";
import Page from "./Page";
import { blockStates, pageStates } from "./state";

const MockEditor = () => {
  const socket = useSocket();
  const yDoc = useYDoc();
  const pageId = usePageId();

  useEffect(() => {
    if (socket == null) {
      return;
    }
    socket.emit("ROOT_DOC_INIT");
  }, [socket]);

  useEffect(() => {
    if (yDoc == null) {
      return;
    }
    bindProxyAndYMap(pageStates, yDoc?.getMap("pages"));
  }, [yDoc]);

  useEffect(() => {
    if (yDoc == null) {
      return;
    }
    bindProxyAndYMap(blockStates, yDoc?.getMap("blocks"));
  }, [yDoc]);

  useEffect(() => {
    const listener = (msg: { update: ArrayBuffer }) => {
      if (yDoc != null) {
        console.debug("[debug] DOC_UPDATE");
        applyUpdate(yDoc, new Uint8Array(msg.update));
      }
    };
    socket?.on("DOC_UPDATE", listener);
    return () => {
      socket?.off("DOC_UPDATE", listener);
    };
  }, [pageId, socket, yDoc]);

  return (
    <div>
      <Page />
    </div>
  );
};

export default MockEditor;
