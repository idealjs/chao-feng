import type { Prisma } from "@prisma/client";
import { useCallback } from "react";

import { createStore, useStoreNext, useStoreSelector } from "../lib/react-rxjs";
import { IBlock } from "../lib/type";

export const blocksStore = createStore<IBlock[]>();

export const useBlock = <P extends Prisma.JsonObject = {}>(
  blockId?: string
) => {
  return useStoreSelector(blocksStore, (blocks) => {
    if (blockId == null) {
      return;
    }
    return blocks?.find((block) => block.id === blockId) as
      | IBlock<P>
      | undefined;
  });
};

export const useSetBlocks = () => {
  return useStoreNext(blocksStore);
};
