import { Block } from "@prisma/client";
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
      socket?.emit("RES_DELETED", {
        resURL: `/api/v1/blocks/${block.id}`,
      });
      socket?.emit("BLOCK_DELETED", {
        blockId: block.id,
      });
    },
    [socket]
  );
};

export default useDeleteBlock;
