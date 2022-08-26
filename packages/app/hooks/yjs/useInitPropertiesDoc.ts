import { useEffect } from "react";

import { useSocket } from "../../features/SocketProvider";

const useInitPropertiesDoc = (blockId: string) => {
  const socket = useSocket();
  useEffect(() => {
    if (socket == null) {
      return;
    }
    socket.emit("PROPERTIES_DOC_INIT", { blockId });
  }, [blockId, socket]);
};

export default useInitPropertiesDoc;
