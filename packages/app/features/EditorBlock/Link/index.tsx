import { linkSchema } from "@idealjs/chao-feng-shared/lib/prosemirror";

import { IBaseTextBlock } from "../../../lib/type";
import useComposistion from "../useComposition";
import useProseMirror from "../useProseMirror";
export interface ILinkBlock extends IBaseTextBlock {
  type: "text";
  properties: {
    title?: string | undefined;
    linkId: string;
  };
}

interface IProps {
  blockId: string;
}

const Link = (props: IProps) => {
  const { blockId } = props;

  const [ref, editor] = useProseMirror<HTMLDivElement>(blockId, linkSchema);
  useComposistion(editor, blockId);

  return <div ref={ref}></div>;
};

export default Link;

export const isLinkBlock = (block?: { type: string }): block is ILinkBlock => {
  if (block?.type === "link") {
    return true;
  }
  return false;
};
