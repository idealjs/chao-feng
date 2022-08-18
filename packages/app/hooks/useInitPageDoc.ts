import { useEffect } from "react";

import { useSocket } from "../features/SocketProvider";

const useInitPageDoc = (pageId: string | undefined) => {
  const socket = useSocket();

  useEffect(() => {
    console.group("[debug] PAGE_DOC_INIT start");
    if (socket == null) {
      console.debug("PAGE_DOC_INIT socket is null");
      return;
    }
    if (pageId == null) {
      console.debug("PAGE_DOC_INIT pageId is null");
      return;
    }
    console.debug("[debug] PAGE_DOC_INIT end");
    console.groupEnd();
    socket.emit("PAGE_DOC_INIT", { pageId });
  }, [pageId, socket]);
};

export default useInitPageDoc;
