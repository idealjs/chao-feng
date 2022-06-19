import { createEvent, createStore, useStoreMap } from "../lib/effector";
import { IBlock } from "../lib/type";

export const $blocks = createStore<{
  [key: string]: IBlock | undefined;
}>({});

export const $setBlocks = createEvent<{
  [key: string]: IBlock | undefined;
}>();

$blocks.on($setBlocks, (_, payload) => {
  return payload;
});

export const useBlock = (blockId?: string) => {
  return useStoreMap($blocks, (blocks) => {
    if (blockId == null) {
      return;
    }
    return blocks[blockId];
  });
};
