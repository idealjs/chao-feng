import { IBlock, ITextBlock } from "../../../lib/type";
import { useBlock } from "../../../store/blocks";

interface IProps {
  blockId: string;
}

const Text = (props: IProps) => {
  const { blockId } = props;
  const block = useBlock(blockId);

  return <div contentEditable>{block?.properties.title?.[0]}</div>;
};

export default Text;

export const isTextBlock = (block?: IBlock): block is ITextBlock => {
  if (block?.type === "text") {
    return true;
  }
  return false;
};
