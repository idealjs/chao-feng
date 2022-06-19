import { Subject } from "rxjs";

import CommonScope from "../classes/CommonScope";
import CommonStore from "../classes/CommonStore";
import useScopeStore from "./useScopeStore";

const useRxSubject = <
  State,
  SubjectClass extends Subject<State> = Subject<State>
>(
  store: CommonStore<State, SubjectClass>,
  _scope?: CommonScope
): SubjectClass => {
  const scopeStore = useScopeStore(store, _scope);

  return scopeStore.subject;
};

export default useRxSubject;
