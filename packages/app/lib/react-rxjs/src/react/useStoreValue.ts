import { useSyncExternalStore } from "react";

import CommonScope from "../classes/CommonScope";
import CommonStore from "../classes/CommonStore";
import useScopeStore from "./useScopeStore";

const useStoreValue = <State>(
  store: CommonStore<State>,
  _scope?: CommonScope
): State => {
  const scopeStore = useScopeStore(store, _scope);

  return useSyncExternalStore<State>(
    scopeStore.subscribe,
    scopeStore.getState,
    scopeStore.getState
  );
};

export default useStoreValue;
