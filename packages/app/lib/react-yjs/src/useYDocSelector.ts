import { useSyncExternalStoreWithSelector } from "use-sync-external-store/with-selector";
import { Doc } from "yjs";

const useYDocSelector = <Result>(
  yDoc: Doc,
  selector: (yDoc: Doc) => Result
) => {
  return useSyncExternalStoreWithSelector(
    (listener) => {
      yDoc?.on("update", listener);
      return () => {
        yDoc?.off("update", listener);
      };
    },
    () => ({ yDoc }),
    () => ({ yDoc }),
    (extStore) => selector(extStore.yDoc)
  );
};

export default useYDocSelector;
