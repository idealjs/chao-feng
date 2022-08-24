import { useEffect, useRef } from "react";
import { useSyncExternalStoreWithSelector } from "use-sync-external-store/with-selector";
import { Doc } from "yjs";

const useYDocSelector = <Result>(
  yDoc: Doc | undefined,
  selector: (yDoc: Doc | undefined) => Result
) => {
  const selectorRef = useRef(selector);
  useEffect(() => {
    selectorRef.current = selector;
  }, [selector]);

  return useSyncExternalStoreWithSelector(
    (listener) => {
      yDoc?.on("update", listener);
      return () => {
        yDoc?.off("update", listener);
      };
    },
    () => ({ yDoc }),
    () => ({ yDoc }),
    (extStore) => selectorRef.current(extStore.yDoc)
  );
};

export default useYDocSelector;
