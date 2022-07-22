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
      socket?.emit("updated", {
        updatedUrl: `/api/v1/pages/${block.pageId}`,
      });
    },
    [socket]
  );
};

export default useDeleteBlock;
