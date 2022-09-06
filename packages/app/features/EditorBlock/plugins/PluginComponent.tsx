import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

import { useEditorView } from "../PMEditor";
import usePluginKey, { StoredPluginKey } from "./usePluginKey";

const PluginComponent = (props: {
  className?: string;
  storedPluginKey: StoredPluginKey<{ container: HTMLDivElement }>;
  component: ReactNode;
}) => {
  const { className, storedPluginKey, component } = props;

  const editor = useEditorView();
  const container = usePluginKey(storedPluginKey, (pluginKey) => {
    return pluginKey.getState(editor.state)?.container;
  });

  useEffect(() => {
    if (className != null) {
      container?.classList.add(className);
      return () => {
        container?.classList.remove(className);
      };
    }
  }, [className, container?.classList]);

  return container != null ? createPortal(component, container) : null;
};

export default PluginComponent;
