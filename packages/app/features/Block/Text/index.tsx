import { Block } from "@prisma/client";

import { IBaseTextBlock } from "../../../lib/type";

export interface ITextBlock extends IBaseTextBlock {
  type: "text";
}
interface IProps {
  block: ITextBlock;
}

const Text = (props: IProps) => {
  const { block } = props;

  return (
    <div contentEditable={true} suppressContentEditableWarning={true}>
      {block.properties.title?.[0] ?? block.id}
    </div>
  );
};

export default Text;

export const isTextBlock = (block?: Block): block is ITextBlock => {
  if (block?.type === "text") {
    return true;
  }
  return false;
};
