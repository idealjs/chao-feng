import { useEffect } from "react";

import { useSocket } from "../features/SocketProvider";

const useInitBlockDoc = (blockId: string) => {
  const socket = useSocket();
  useEffect(() => {
    if (socket == null) {
      return;
    }
    socket.emit("BLOCK_DOC_INIT", { blockId });
  }, [blockId, socket]);
};

export default useInitBlockDoc;
