import { useEffect } from "react";

import { useSocket } from "../../features/SocketProvider";

const useInitPageDoc = (pageId: string | undefined) => {
  const socket = useSocket();

  useEffect(() => {
    console.group("[debug] ROOT_DOC_INIT start");
    if (socket == null) {
      console.debug("ROOT_DOC_INIT socket is null");
      console.groupEnd();
      return;
    }
    if (pageId == null) {
      console.debug("ROOT_DOC_INIT pageId is null");
      console.groupEnd();
      return;
    }
    console.debug("[debug] ROOT_DOC_INIT end");
    console.groupEnd();
    socket.emit("ROOT_DOC_INIT", { pageId });
  }, [pageId, socket]);
};

export default useInitPageDoc;
