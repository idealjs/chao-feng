import type { Block, Prisma } from "@prisma/client";
import { useCallback } from "react";

import { useSocket } from "../../features/SocketProvider";

const useCreateBlock = () => {
  const socket = useSocket();
  return useCallback(
    async (params: {
      pageId: string;
      type: string;
      properties: Prisma.InputJsonValue;
      nextTo?: string;
    }) => {
      const { pageId, type, properties, nextTo } = params;
      const res = await fetch("/api/v1/blocks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pageId,
          type,
          properties,
          nextTo: nextTo,
        }),
      });
      const block = (await res.json()) as Block;
      socket?.emit("updated", {
        updatedUrl: `/api/v1/pages/${pageId}`,
      });
      return block;
    },
    [socket]
  );
};

export default useCreateBlock;
