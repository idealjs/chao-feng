import { useEffect } from "react";

import { useSocket } from "../../features/SocketProvider";

const useLoadPropertiesDoc = (blockId: string) => {
  const socket = useSocket();
  useEffect(() => {
    if (socket == null) {
      return;
    }
    console.debug("[debug] LOAD_PROPERTIES_DOC");
    socket.emit("LOAD_PROPERTIES_DOC", { blockId });
  }, [blockId, socket]);
};

export default useLoadPropertiesDoc;
