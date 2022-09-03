import { schema } from "@idealjs/chao-feng-shared/lib/prosemirror";

import { IBaseTextBlock } from "../../../lib/type";
import useComposistion from "../useComposition";
import useProseMirror from "../useProseMirror";

export interface ITextBlock extends IBaseTextBlock {
  type: "text";
}
interface IProps {
  blockId: string;
}

const Text = (props: IProps) => {
  const { blockId } = props;

  const [ref, editor] = useProseMirror<HTMLDivElement>(blockId, schema);
  useComposistion(editor, blockId);

  return <div ref={ref}></div>;
};

export default Text;

export const isTextBlock = (block?: { type: string }): block is ITextBlock => {
  if (block?.type === "text") {
    return true;
  }
  return false;
};
