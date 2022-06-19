import { useMemo } from "react";
import { Subject } from "rxjs";

import CommonScope from "../classes/CommonScope";
import CommonStore from "../classes/CommonStore";
import { useScope } from "./ScopeProvider";

const useScopeStore = <
  State,
  SubjectClass extends Subject<State> = Subject<State>
>(
  store: CommonStore<State, SubjectClass>,
  _scope?: CommonScope
): CommonStore<State, SubjectClass> => {
  const scope = useScope();
  const scopeStore = useMemo(() => {
    const scopeStore = (_scope ?? scope).getStore(store.id);

    if (scopeStore?.subscribe == null || scopeStore.getState == null) {
      throw new Error("");
    }
    return scopeStore;
  }, [_scope, scope, store.id]);

  return scopeStore;
};

export default useScopeStore;
