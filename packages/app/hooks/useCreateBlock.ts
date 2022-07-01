import type { Prisma } from "@prisma/client";
import { useCallback } from "react";
import { useSWRConfig } from "swr";

const useCreateBlock = (pageId: string) => {
  const { mutate } = useSWRConfig();
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
      mutate(`/api/v1/pages/${pageId}`);
      return res.json();
    },
    [mutate, pageId]
  );
};

export default useCreateBlock;
