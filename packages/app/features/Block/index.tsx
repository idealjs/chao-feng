import useBlock from "../../hooks/useBlock";
import BlockFactory from "./BlockFactory";
import NextToProvider from "./NextToProvider";

interface IProps {
  blockId: string;
}

const Block = (props: IProps) => {
  const { blockId } = props;
  const block = useBlock(blockId);

  return block ? (
    <NextToProvider nextTo={blockId}>
      <BlockFactory block={block} />
    </NextToProvider>
  ) : null;
};

export default Block;
