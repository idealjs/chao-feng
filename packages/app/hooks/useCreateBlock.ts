import type { Prisma } from "@prisma/client";
import { useCallback } from "react";

import usePage from "./usePage";

const useCreateBlock = (pageId: string) => {
  const { mutate } = usePage(pageId);
  return useCallback(
    async (params: { type: string; properties: Prisma.InputJsonValue }) => {
      const { type, properties } = params;
      const res = await fetch("/api/v1/blocks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pageId,
          type,
          properties,
        }),
      });
      mutate();
      return res.json();
    },
    [mutate, pageId]
  );
};

export default useCreateBlock;
