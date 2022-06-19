import { createStore, useStoreSelector } from "../lib/react-rxjs";
import { IBlock } from "../lib/type";

export const blocksStore = createStore<{
  [key: string]: IBlock | undefined;
}>({});

export const useBlock = (blockId?: string) => {
  return useStoreSelector(blocksStore, (blocks) => {
    if (blockId == null) {
      return;
    }
    return blocks[blockId];
  });
};
