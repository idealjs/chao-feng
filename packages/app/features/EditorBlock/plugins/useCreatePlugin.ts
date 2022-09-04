import { PluginKey } from "prosemirror-state";
import { Plugin } from "prosemirror-state";
import { useCallback } from "react";

const useCreatePlugin = () => {
  const createPlugin = useCallback((key: PluginKey) => {
    const container = document.createElement("div");
    container.className = "plugin_container";

    return new Plugin({
      key,
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
          update(view, lastState) {},
        };
      },
    });
  }, []);
  return createPlugin;
};

export default useCreatePlugin;
