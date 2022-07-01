import {
  createStore,
  useStoreNext,
  useStoreSelector,
  useStoreValue,
} from "../lib/react-rxjs";

export const blocksOrderStore = createStore<string | null>();

export const useBlocksOrder = () => {
  return useStoreValue(blocksOrderStore);
};

export const useSetBlocksOrder = () => {
  return useStoreNext(blocksOrderStore);
};

export const useParsedBlocksOrder = () => {
  return useStoreSelector(blocksOrderStore, (order) => {
    if (order == null) {
      return [];
    }
    return order.split(",");
  });
};
