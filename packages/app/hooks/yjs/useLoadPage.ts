import { useEffect } from "react";

import { useSocket } from "../../features/SocketProvider";

const useLoadPageDoc = (pageId: string | undefined) => {
  const socket = useSocket();

  useEffect(() => {
    console.group("[debug] LOAD_PAGE start");
    if (socket == null) {
      console.debug("LOAD_PAGE socket is null");
      console.groupEnd();
      return;
    }
    if (pageId == null) {
      console.debug("LOAD_PAGE pageId is null");
      console.groupEnd();
      return;
    }
    console.debug("[debug] LOAD_PAGE end");
    console.groupEnd();
    socket.emit("LOAD_PAGE", { pageId });
  }, [pageId, socket]);
};

export default useLoadPageDoc;
