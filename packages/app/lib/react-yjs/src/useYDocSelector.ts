import { useSyncExternalStoreWithSelector } from "use-sync-external-store/with-selector";
import { Doc } from "yjs";

import { useYDoc } from "./YDocProvider";

const useYSelector = <Result>(selector: (store: Doc | null) => Result) => {
  const yDoc = useYDoc();

  return useSyncExternalStoreWithSelector(
    (listener) => {
      yDoc?.on("update", listener);
      return () => {
        yDoc?.off("update", listener);
      };
    },
    () => yDoc,
    () => yDoc,
    selector
  );
};

export default useYSelector;
