import { Dispatch, SetStateAction, useCallback } from "react";

import CommonScope from "../classes/CommonScope";
import CommonStore from "../classes/CommonStore";
import useScopeStore from "./useScopeStore";

const useStoreNext = <State>(
  store: CommonStore<State>,
  _scope?: CommonScope
) => {
  const scopeStore = useScopeStore(store, _scope);

  const setStore: Dispatch<SetStateAction<State>> = useCallback(
    (s) => {
      if (s instanceof Function) {
        scopeStore.subject.next(s(scopeStore.getState()));
        return;
      }
      scopeStore.subject.next(s);
    },
    [scopeStore]
  );

  return setStore;
};

export default useStoreNext;
