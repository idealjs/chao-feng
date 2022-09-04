import { Plugin } from "prosemirror-state";
import { useCallback } from "react";

import { StoredPluginKey } from "./usePluginKey";

const useCreatePlugin = () => {
  const createPlugin = useCallback(
    (
      storedKey: StoredPluginKey<{
        container: HTMLDivElement;
      }>
    ) => {
      const container = document.createElement("div");
      container.className = "plugin_container";

      return new Plugin({
        key: storedKey.pluginKey,
        state: {
          init(config, instance) {
            return {
              container,
            };
          },
          apply(tr, value, oldState, newState) {
            return value;
          },
        },
        view(editorView) {
          editorView.dom.parentNode?.appendChild(container);
          return {
            update(view, lastState) {
              storedKey.emit("update");
            },
          };
        },
      });
    },
    []
  );
  return createPlugin;
};

export default useCreatePlugin;
