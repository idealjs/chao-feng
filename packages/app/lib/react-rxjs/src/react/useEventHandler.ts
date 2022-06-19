import CommonScope from "../classes/CommonScope";
import CommonStore from "../classes/CommonStore";
import useStoreNext from "./useStoreNext";

const useEventHandler = <E>(store: CommonStore<E>, _scope?: CommonScope) => {
  const nextStore = useStoreNext(store, _scope);
  return (event: E) => {
    nextStore(event);
  };
};

export default useEventHandler;
