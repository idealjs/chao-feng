import { Block } from "@prisma/client";

import useBlock from "../../../hooks/useBlock";
import { Decoration, ITextBlock } from "../../../lib/type";
import Toolbox from "../Toolbox";
interface IProps {
  block: ITextBlock;
}

const Text = (props: IProps) => {
  const { block } = props;

  return (
    <div contentEditable={true}>{block.properties.title?.[0] ?? block.id}</div>
  );
};

export default Text;

export const isTextBlock = (block?: Block): block is ITextBlock => {
  if (block?.type === "text") {
    return true;
  }
  return false;
};
