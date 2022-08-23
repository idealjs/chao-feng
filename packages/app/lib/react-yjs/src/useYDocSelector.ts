import { useSyncExternalStoreWithSelector } from "use-sync-external-store/with-selector";
import { Doc } from "yjs";

import { useYDoc } from "./YDocProvider";

const useYSelector = <Result>(selector: (yDoc: Doc) => Result) => {
  const yDoc = useYDoc();

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

export default useYSelector;
