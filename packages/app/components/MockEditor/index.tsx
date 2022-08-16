import { useEffect } from "react";
import { applyUpdate } from "yjs";

import { useSocket } from "../../features/SocketProvider";
import usePageId from "../../hooks/usePageId";
import { useYDoc } from "../../lib/react-yjs/src/YDocProvider";
import Page from "./Page";

const MockEditor = () => {
  const socket = useSocket();
  const yDoc = useYDoc();
  const pageId = usePageId();

  useEffect(() => {
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
  }, [pageId, socket, yDoc]);

  return (
    <div>
      <Page />
    </div>
  );
};

export default MockEditor;
