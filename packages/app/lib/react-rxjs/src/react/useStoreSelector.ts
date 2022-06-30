import { useSyncExternalStoreWithSelector } from "use-sync-external-store/with-selector";

import CommonScope from "../classes/CommonScope";
import CommonStore from "../classes/CommonStore";
import useScopeStore from "./useScopeStore";

const useStoreSelector = <State, Result>(
  store: CommonStore<State>,
  selector: (store: State) => Result,
  _scope?: CommonScope
) => {
  const scopeStore = useScopeStore(store, _scope);

  return useSyncExternalStoreWithSelector(
    scopeStore.subscribe,
    scopeStore.getState,
    scopeStore.getState,
    selector
  );
};

export default useStoreSelector;
