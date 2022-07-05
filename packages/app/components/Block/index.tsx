import useBlock from "../../hooks/useBlock";
import BlockFactory from "./BlockFactory";

interface IProps {
  blockId: string;
}

const Block = (props: IProps) => {
  const { blockId } = props;
  const block = useBlock(blockId);

  return block ? <BlockFactory block={block} /> : null;
};
export default Block;
