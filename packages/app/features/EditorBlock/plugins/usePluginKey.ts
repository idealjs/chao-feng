import EventEmitter from "events";
import { PluginKey } from "prosemirror-state";
import { useSyncExternalStoreWithSelector } from "use-sync-external-store/with-selector";

export class StoredPluginKey<State = unknown> extends EventEmitter {
  pluginKey: PluginKey<State>;

  constructor(name: string) {
    super();
    this.pluginKey = new PluginKey<State>(name);
  }
}

const usePluginKey = <Result, State = unknown>(
  storedPluginKey: StoredPluginKey<State>,
  selector: (pluginKey: PluginKey<State>) => Result
) => {
  return useSyncExternalStoreWithSelector(
    (onStoreChange) => {
      storedPluginKey.addListener("update", onStoreChange);
      return () => storedPluginKey.removeListener("update", onStoreChange);
    },
    () => ({ key: storedPluginKey.pluginKey }),
    () => ({ key: storedPluginKey.pluginKey }),
    (store) => {
      return selector(store.key);
    }
  );
};

export default usePluginKey;
