import type { Block, Prisma } from "@prisma/client";
import { useCallback } from "react";

const useCreateBlock = () => {
  return useCallback(
    async (params: {
      pageId: string;
      type: string;
      properties: Prisma.InputJsonValue;
      nextTo?: string;
    }): Promise<Block> => {
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
      return await res.json();
    },
    []
  );
};

export default useCreateBlock;
