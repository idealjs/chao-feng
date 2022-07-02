import type { Prisma } from "@prisma/client";
import { useCallback } from "react";

const useCreateBlock = (pageId: string) => {
  return useCallback(
    async (params: {
      type: string;
      properties: Prisma.InputJsonValue;
      nextTo?: string;
    }) => {
      const { type, properties, nextTo } = params;
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
      return res.json();
    },
    [pageId]
  );
};

export default useCreateBlock;
