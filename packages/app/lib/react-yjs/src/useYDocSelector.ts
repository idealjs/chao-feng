import { useSyncExternalStoreWithSelector } from "use-sync-external-store/with-selector";
import { Doc } from "yjs";

import { useYDoc } from "./YDocProvider";

const useYSelector = <Result>(
  selector: (store: Doc | null) => Result,
  options?: {
    // enableV2Update?: boolean;
  }
) => {
  // const { enableV2Update } = options ?? {};
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
