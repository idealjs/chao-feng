import { schema } from "@idealjs/chao-feng-shared/lib/prosemirror";

import usePluginKey, { StoredPluginKey } from "../plugins/usePluginKey";
import { useEditorView } from "../PMEditor";

interface IProps {
  storedPluginKey: StoredPluginKey<{
    container: HTMLDivElement;
  }>;
}

const PMLink = (props: IProps) => {
  const { storedPluginKey } = props;
  const editor = useEditorView();
  const mark = usePluginKey(storedPluginKey, () => {
    const { $from } = editor.state.selection;
    const pos = $from.pos - $from.textOffset;
    const $pos = editor.state.doc.resolve(pos);

    const mark = schema.marks["link"].isInSet($pos.nodeAfter?.marks ?? []);
    return mark;
  });

  return <a href={mark?.attrs.href}>{mark?.attrs?.title}</a>;
};

export default PMLink;
