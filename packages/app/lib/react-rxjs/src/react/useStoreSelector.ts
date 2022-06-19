import { useSyncExternalStore } from "react";

import CommonScope from "../classes/CommonScope";
import CommonStore from "../classes/CommonStore";
import useScopeStore from "./useScopeStore";

const useStoreSelector = <State, Result>(
  store: CommonStore<State>,
  selector: (store: State) => Result,
  _scope?: CommonScope
) => {
  const scopeStore = useScopeStore(store, _scope);

  return useSyncExternalStore(
    scopeStore.subscribe,
    () => selector(scopeStore.getState()),
    () => selector(scopeStore.getState())
  );
};

export default useStoreSelector;
