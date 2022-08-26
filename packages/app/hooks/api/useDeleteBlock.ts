import type { Block } from "@prisma/client";
import { useCallback } from "react";

import { useSocket } from "../../features/SocketProvider";

const useDeleteBlock = () => {
  const socket = useSocket();

  return useCallback(
    async (params: { blockId: string }) => {
      const { blockId } = params;
      const res = await fetch(`/api/v1/blocks/${blockId}`, {
        method: "DELETE",
      });
      const block = (await res.json()) as Block;
      socket?.emit("ROOT_DOC_UPDATED", {
        pageId: block.pageId,
      });
    },
    [socket]
  );
};

export default useDeleteBlock;
